from django.contrib import admin
from .models import EmergencyContact, SOSAlert, Review, Report

@admin.register(SOSAlert)
class SOSAlertAdmin(admin.ModelAdmin):
    list_display = ('user', 'trip', 'timestamp', 'is_active')
    list_filter = ('is_active', 'timestamp')
    search_fields = ('user__username',)
    actions = ['resolve_alerts']

    def resolve_alerts(self, request, queryset):
        queryset.update(is_active=False)
        self.message_user(request, "Selected alerts marked as resolved.")

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('reporter', 'reported_user', 'reason', 'created_at', 'is_resolved')
    list_filter = ('is_resolved', 'created_at')
    search_fields = ('reporter__username', 'reported_user__username', 'reason')
    actions = ['mark_resolved']

    def mark_resolved(self, request, queryset):
        queryset.update(is_resolved=True)
        self.message_user(request, "Selected reports marked as resolved.")

admin.site.register(EmergencyContact)
admin.site.register(Review)
