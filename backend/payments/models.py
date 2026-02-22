from django.db import models
from trips.models import Trip
from django.conf import settings

class Payment(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='payments')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    commission = models.DecimalField(max_digits=10, decimal_places=2, help_text="5% platform fee")
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('success', 'Success'), ('failed', 'Failed')])
    transaction_id = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} paid {self.amount} for {self.trip.title}"
