from django.db import models
from django.conf import settings
from trips.models import Trip

class Expense(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='expenses')
    paid_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='paid_expenses')
    title = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default='USD')
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.amount} by {self.paid_by.username}"

class ExpenseSplit(models.Model):
    expense = models.ForeignKey(Expense, on_delete=models.CASCADE, related_name='splits')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='expense_splits')
    amount_owed = models.DecimalField(max_digits=10, decimal_places=2)
    is_settled = models.BooleanField(default=False)

    class Meta:
        unique_together = ('expense', 'user')

    def __str__(self):
        status = "Settled" if self.is_settled else "Owes"
        return f"{self.user.username} {status} {self.amount_owed} for {self.expense.title}"

class Settlement(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='settlements')
    paid_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sent_settlements')
    paid_to = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='received_settlements')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('completed', 'Completed')], default='completed')

    def __str__(self):
        return f"{self.paid_by.username} paid {self.amount} to {self.paid_to.username}"
