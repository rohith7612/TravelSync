from rest_framework import serializers
from .models import ChatRoom, Message
from users.models import User

class UserSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'profile_picture']

class MessageSerializer(serializers.ModelSerializer):
    sender_summary = UserSummarySerializer(source='sender', read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'room', 'sender', 'sender_summary', 'content', 'timestamp', 'is_read']
        read_only_fields = ['id', 'timestamp', 'sender_summary']

class ChatRoomSerializer(serializers.ModelSerializer):
    participants_summary = UserSummarySerializer(source='participants', many=True, read_only=True)
    recent_message = serializers.SerializerMethodField()

    class Meta:
        model = ChatRoom
        fields = ['id', 'trip', 'name', 'participants', 'participants_summary', 'created_at', 'recent_message']
        read_only_fields = ['id', 'created_at', 'participants_summary']

    def get_recent_message(self, obj):
        message = obj.messages.order_by('-timestamp').first()
        if message:
            return MessageSerializer(message).data
        return None
