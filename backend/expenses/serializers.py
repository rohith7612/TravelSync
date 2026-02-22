from rest_framework import serializers
from .models import Expense, ExpenseSplit, Settlement
from users.models import User

class UserSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'profile_picture']

class ExpenseSplitSerializer(serializers.ModelSerializer):
    user_summary = UserSummarySerializer(source='user', read_only=True)

    class Meta:
        model = ExpenseSplit
        fields = ['id', 'expense', 'user', 'user_summary', 'amount_owed', 'is_settled']
        read_only_fields = ['id', 'user_summary']

class ExpenseSerializer(serializers.ModelSerializer):
    paid_by_summary = UserSummarySerializer(source='paid_by', read_only=True)
    splits = ExpenseSplitSerializer(many=True, read_only=True)

    class Meta:
        model = Expense
        fields = ['id', 'trip', 'paid_by', 'paid_by_summary', 'title', 'amount', 'currency', 'date', 'created_at', 'splits']
        read_only_fields = ['id', 'created_at', 'paid_by_summary', 'splits']

class SettlementSerializer(serializers.ModelSerializer):
    paid_by_summary = UserSummarySerializer(source='paid_by', read_only=True)
    paid_to_summary = UserSummarySerializer(source='paid_to', read_only=True)

    class Meta:
        model = Settlement
        fields = ['id', 'trip', 'paid_by', 'paid_by_summary', 'paid_to', 'paid_to_summary', 'amount', 'date', 'status']
        read_only_fields = ['id', 'date', 'paid_by_summary', 'paid_to_summary']
