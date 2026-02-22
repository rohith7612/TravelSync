from rest_framework import serializers

# Assuming that you might need a simplified visual serializer or 
# you can just import the TripSerializer from trips.

from trips.models import Trip
from users.models import User

class DiscoverTripSerializer(serializers.ModelSerializer):
    creator_username = serializers.CharField(source='created_by.username', read_only=True)
    compatibility_score = serializers.IntegerField(read_only=True, required=False) # Injected manually in views

    class Meta:
        model = Trip
        fields = ['id', 'title', 'destination', 'start_date', 'budget', 'travel_style', 'creator_username', 'compatibility_score', 'description']
