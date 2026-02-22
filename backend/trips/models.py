from django.db import models
from django.conf import settings

class Trip(models.Model):
    STATUS_CHOICES = [
        ('planning', 'Planning'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    TRAVEL_STYLE_CHOICES = [
        ('backpacking', 'Backpacking'),
        ('luxury', 'Luxury'),
        ('mid_range', 'Mid-Range'),
        ('budget', 'Budget'),
    ]

    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='created_trips')
    title = models.CharField(max_length=200)
    description = models.TextField()
    destination = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField()
    budget = models.DecimalField(max_digits=10, decimal_places=2, help_text="Estimated cost per person")
    travel_style = models.CharField(max_length=50, choices=TRAVEL_STYLE_CHOICES)
    max_participants = models.PositiveIntegerField(default=1)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='planning')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class TripParticipant(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]

    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='participants')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='joined_trips')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('trip', 'user')

    def __str__(self):
        return f"{self.user.username} - {self.trip.title} ({self.status})"
