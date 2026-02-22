from rest_framework import serializers
from .models import Trip, TripParticipant
from users.serializers import UserSerializer # Assuming UserSerializer exists

class TripParticipantSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = TripParticipant
        fields = ['id', 'user', 'status', 'joined_at']

class TripSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    participants_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Trip
        fields = [
            'id', 'created_by', 'title', 'description', 
            'destination', 'start_date', 'end_date', 'budget', 
            'travel_style', 'max_participants', 'status', 
            'created_at', 'updated_at', 'participants_count'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at', 'participants_count']

    def get_participants_count(self, obj):
        return obj.participants.count()

    def create(self, validated_data):
        trip = Trip.objects.create(**validated_data)
        # Add creator as a participant automatically
        from .models import TripParticipant 
        TripParticipant.objects.create(trip=trip, user=trip.created_by, status='accepted')
        return trip
