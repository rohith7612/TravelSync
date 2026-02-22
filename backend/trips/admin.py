from django.contrib import admin
from .models import Trip, TripParticipant

@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = ('title', 'destination', 'start_date', 'status', 'created_by')
    list_filter = ('status', 'travel_style')
    search_fields = ('title', 'destination')
    actions = ['approve_trips', 'cancel_trips']

    def approve_trips(self, request, queryset):
        queryset.update(status='confirmed')
        self.message_user(request, "Selected trips have been confirmed.")
    approve_trips.short_description = "Mark selected trips as Confirmed"

    def cancel_trips(self, request, queryset):
        queryset.update(status='cancelled')
        self.message_user(request, "Selected trips have been cancelled.")
    cancel_trips.short_description = "Cancel selected trips"

admin.site.register(TripParticipant)
