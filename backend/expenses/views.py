from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, F
from django.db import transaction
from .models import Expense, ExpenseSplit, Settlement
from .serializers import ExpenseSerializer, SettlementSerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Users can see expenses for trips they are part of
        return Expense.objects.filter(trip__participants__user=self.request.user).distinct()

    def perform_create(self, serializer):
        with transaction.atomic():
            expense = serializer.save(paid_by=self.request.user)
            
            # Auto-split logic: split equally among all trip participants
            participants = expense.trip.participants.filter(status='accepted')
            num_participants = participants.count()
            
            if num_participants > 0:
                amount_per_person = expense.amount / num_participants
                
                for participant in participants:
                    # If the person who paid is the participant, they don't owe themselves, but we record it as settled
                    is_settled = (participant.user == self.request.user)
                    ExpenseSplit.objects.create(
                        expense=expense,
                        user=participant.user,
                        amount_owed=amount_per_person,
                        is_settled=is_settled
                    )

    @action(detail=False, methods=['get'])
    def balances(self, request):
        trip_id = request.query_params.get('trip_id')
        if not trip_id:
            return Response({"error": "trip_id parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        # This is a naive balance calculation.
        # How much the current user paid for others
        paid_for_others = ExpenseSplit.objects.filter(
            expense__trip_id=trip_id,
            expense__paid_by=request.user,
            is_settled=False
        ).exclude(user=request.user).aggregate(total=Sum('amount_owed'))['total'] or 0

        # How much the current user owes others
        owes_others = ExpenseSplit.objects.filter(
            expense__trip_id=trip_id,
            user=request.user,
            is_settled=False
        ).exclude(expense__paid_by=request.user).aggregate(total=Sum('amount_owed'))['total'] or 0

        balance = paid_for_others - owes_others

        return Response({
            "trip_id": trip_id,
            "total_paid_for_others": paid_for_others,
            "total_owed_to_others": owes_others,
            "net_balance": balance # Positive means people owe this user, negative means this user owes people
        })

class SettlementViewSet(viewsets.ModelViewSet):
    serializer_class = SettlementSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Settlement.objects.filter(models.Q(paid_by=self.request.user) | models.Q(paid_to=self.request.user))

    def perform_create(self, serializer):
        with transaction.atomic():
            settlement = serializer.save(paid_by=self.request.user)
            
            # Mark splits as settled where this user owed the `paid_to` user
            splits_to_settle = ExpenseSplit.objects.filter(
                user=self.request.user,
                expense__paid_by=settlement.paid_to,
                expense__trip=settlement.trip,
                is_settled=False
            )
            # In a real app we'd track partial settlements, but for simplicity we mark them settled
            splits_to_settle.update(is_settled=True)
