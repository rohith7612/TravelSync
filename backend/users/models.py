from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Personal Info
    bio = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    age = models.PositiveIntegerField(blank=True, null=True)
    gender = models.CharField(max_length=20, blank=True, null=True, choices=[
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
        ('prefer_not_to_say', 'Prefer not to say'),
    ])
    
    # Travel Preferences
    TRAVEL_STYLE_CHOICES = [
        ('backpacking', 'Backpacking'),
        ('luxury', 'Luxury'),
        ('mid_range', 'Mid-Range'),
        ('budget', 'Budget'),
    ]
    travel_style = models.CharField(max_length=50, choices=TRAVEL_STYLE_CHOICES, blank=True, null=True)
    budget_range = models.CharField(max_length=50, blank=True, null=True) # e.g. "500-1000"
    
    # Verification & Trust
    is_verified = models.BooleanField(default=False)
    verification_badge = models.CharField(max_length=50, blank=True, null=True) # e.g. "verified_email", "verified_id"
    rating = models.FloatField(default=0.0)
    rating_count = models.PositiveIntegerField(default=0)
    
    # Contact
    phone = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.username
