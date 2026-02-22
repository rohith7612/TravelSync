import json
from channels.generic.websocket import AsyncWebsocketConsumer

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # We need a robust way to identify the user. For pure websocket prototyping, 
        # we assume the user_id is passed in the route or they join their specific group
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        self.user_group_name = f'user_notifications_{self.user_id}'

        await self.channel_layer.group_add(
            self.user_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.user_group_name,
            self.channel_name
        )

    # Receive message from room group
    async def send_notification(self, event):
        notification = dict(event)
        notification.pop('type', None)
        
        # Send message to WebSocket
        await self.send(text_data=json.dumps(notification))
