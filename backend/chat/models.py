from django.db import models
from django.conf import settings

class ChatRoom(models.Model):
    # A chat room could be linked to a specific trip or be a general direct message room
    trip = models.ForeignKey('trips.Trip', on_delete=models.CASCADE, related_name='chat_rooms', null=True, blank=True)
    name = models.CharField(max_length=255, blank=True)
    participants = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='chat_rooms')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name or 'ChatRoom'} ({self.id})"

class Message(models.Model):
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sent_messages')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"{self.sender.username}: {self.content[:20]}"
