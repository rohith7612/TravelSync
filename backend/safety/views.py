from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import EmergencyContact, SOSAlert, Review, Report
from .serializers import EmergencyContactSerializer, SOSAlertSerializer, ReviewSerializer, ReportSerializer

class EmergencyContactViewSet(viewsets.ModelViewSet):
    serializer_class = EmergencyContactSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return EmergencyContact.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SOSAlertViewSet(viewsets.ModelViewSet):
    serializer_class = SOSAlertSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Users can see their own alerts, and maybe admin can see all
        # or trip participants can see active alerts for their trip
        return SOSAlert.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Trigger an alert. In a real system, this might send an SMS or notification
        # to the associated Emergency Contacts
        serializer.save(user=self.request.user, is_active=True)

    @action(detail=True, methods=['post'])
    def resolve(self, request, pk=None):
        alert = self.get_object()
        alert.is_active = False
        alert.save()
        return Response({'status': 'alert resolved'})

class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return reviews for this user or made by this user
        return Review.objects.filter(models.Q(reviewer=self.request.user) | models.Q(reviewee=self.request.user))

    def perform_create(self, serializer):
        serializer.save(reviewer=self.request.user)

class ReportViewSet(viewsets.ModelViewSet):
    serializer_class = ReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Report.objects.filter(reporter=self.request.user)

    def perform_create(self, serializer):
        serializer.save(reporter=self.request.user)
