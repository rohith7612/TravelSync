from rest_framework import serializers
from .models import EmergencyContact, SOSAlert, Review, Report
from users.models import User

class UserSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'profile_picture']

class EmergencyContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyContact
        fields = ['id', 'user', 'name', 'phone_number', 'relation']
        read_only_fields = ['id', 'user']

class SOSAlertSerializer(serializers.ModelSerializer):
    user_summary = UserSummarySerializer(source='user', read_only=True)
    
    class Meta:
        model = SOSAlert
        fields = ['id', 'user', 'user_summary', 'trip', 'location_lat', 'location_lng', 'message', 'timestamp', 'is_active']
        read_only_fields = ['id', 'user', 'user_summary', 'timestamp']

class ReviewSerializer(serializers.ModelSerializer):
    reviewer_summary = UserSummarySerializer(source='reviewer', read_only=True)
    reviewee_summary = UserSummarySerializer(source='reviewee', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'reviewer', 'reviewer_summary', 'reviewee', 'reviewee_summary', 'trip', 'rating', 'comment', 'created_at']
        read_only_fields = ['id', 'reviewer', 'reviewer_summary', 'reviewee_summary', 'created_at']

class ReportSerializer(serializers.ModelSerializer):
    reporter_summary = UserSummarySerializer(source='reporter', read_only=True)
    reported_user_summary = UserSummarySerializer(source='reported_user', read_only=True)

    class Meta:
        model = Report
        fields = ['id', 'reporter', 'reporter_summary', 'reported_user', 'reported_user_summary', 'reason', 'description', 'created_at', 'is_resolved']
        read_only_fields = ['id', 'reporter', 'reporter_summary', 'reported_user_summary', 'created_at']
