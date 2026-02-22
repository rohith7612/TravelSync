import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .models import ChatRoom, Message
from django.contrib.auth import get_user_model

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = f'chat_{self.room_id}'

        # TODO: Add authentication checks to verify user is allowed in this room.
        # For now, accept all connections.
        
        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_content = text_data_json.get('message', '')
        # In a real app we'd get `self.scope['user']`, assuming JWT auth in Channels
        # Here we dummy inject user ID 1 or depend on client payload since this is a stub test without custom JWT auth middleware
        user_id = text_data_json.get('user_id')

        if not message_content or not user_id:
            return

        # Save message to DB
        saved_message = await self.save_message(user_id, self.room_id, message_content)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': saved_message.content,
                'sender_id': saved_message.sender.id,
                'sender_username': saved_message.sender.username,
                'timestamp': saved_message.timestamp.isoformat()
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'sender_id': event['sender_id'],
            'sender_username': event['sender_username'],
            'timestamp': event['timestamp']
        }))

    @sync_to_async
    def save_message(self, user_id, room_id, content):
        user = User.objects.get(id=user_id)
        room = ChatRoom.objects.get(id=room_id)
        return Message.objects.create(sender=user, room=room, content=content)
