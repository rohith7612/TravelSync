from django.urls import path
from .views import DiscoverView, DashboardSummaryView

urlpatterns = [
    path('discover/', DiscoverView.as_view(), name='discover'),
    path('dashboard/', DashboardSummaryView.as_view(), name='dashboard'),
]
