from django.contrib.auth.admin import UserAdmin
from django.contrib import admin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'is_verified', 'rating', 'is_active', 'is_staff')
    list_filter = ('is_verified', 'is_active', 'is_staff')
    search_fields = ('username', 'email', 'phone')
    ordering = ('-date_joined',)
    
    fieldsets = UserAdmin.fieldsets + (
        ('Platform Info', {'fields': ('bio', 'profile_picture', 'age', 'gender', 'phone')}),
        ('Travel Match Info', {'fields': ('travel_style', 'budget_range')}),
        ('Verification & Trust', {'fields': ('is_verified', 'verification_badge', 'rating', 'rating_count')}),
    )
