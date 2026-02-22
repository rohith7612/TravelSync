from django.contrib import admin
from .models import Payment
from django.db.models import Sum

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'trip', 'amount', 'commission', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('user__username', 'trip__title', 'transaction_id')
    readonly_fields = ('amount', 'commission', 'created_at', 'user', 'trip')

    # View revenue analytics inside the admin page
    change_list_template = "admin/payments_change_list.html"

    def changelist_view(self, request, extra_context=None):
        response = super().changelist_view(request, extra_context=extra_context)
        try:
            qs = response.context_data['cl'].queryset
            total_revenue = qs.filter(status='success').aggregate(Sum('commission'))['commission__sum'] or 0
        except (AttributeError, KeyError):
            total_revenue = 0
            
        extra_context = extra_context or {}
        extra_context['total_revenue'] = total_revenue
        return super().changelist_view(request, extra_context=extra_context)
