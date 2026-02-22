from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmergencyContactViewSet, SOSAlertViewSet, ReviewViewSet, ReportViewSet

router = DefaultRouter()
router.register(r'contacts', EmergencyContactViewSet, basename='emergencycontact')
router.register(r'alerts', SOSAlertViewSet, basename='sosalert')
router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'reports', ReportViewSet, basename='report')

urlpatterns = [
    path('', include(router.urls)),
]
