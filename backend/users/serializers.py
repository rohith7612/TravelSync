from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name', 
                  'bio', 'profile_picture', 'age', 'gender', 'travel_style', 'budget_range', 
                  'is_verified', 'rating')
        extra_kwargs = {
            'password': {'write_only': True},
            'rating': {'read_only': True},
            'is_verified': {'read_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        return super().update(instance, validated_data)
