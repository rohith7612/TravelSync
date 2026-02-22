from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Trip, TripParticipant
from .serializers import TripSerializer, TripParticipantSerializer

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.created_by == request.user

class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all().order_by('-created_at')
    serializer_class = TripSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def upcoming(self, request):
        from django.db.models import Q
        user = request.user
        # Get trips where user is the creator OR an accepted participant
        trips = Trip.objects.filter(
            Q(created_by=user) | Q(participants__user=user, participants__status='accepted')
        ).distinct().order_by('start_date')
        
        serializer = self.get_serializer(trips, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def join(self, request, pk=None):
        trip = self.get_object()
        user = request.user

        if trip.participants.filter(user=user).exists():
            return Response({'detail': 'You have already joined or requested to join this trip.'},
                            status=status.HTTP_400_BAD_REQUEST)

        if trip.participants.count() >= trip.max_participants:
             return Response({'detail': 'This trip is full.'},
                            status=status.HTTP_400_BAD_REQUEST)

        TripParticipant.objects.create(trip=trip, user=user, status='pending')
        return Response({'detail': 'Join request sent.'}, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def leave(self, request, pk=None):
        trip = self.get_object()
        user = request.user
        
        participant = get_object_or_404(TripParticipant, trip=trip, user=user)
        if trip.created_by == user:
            return Response({'detail': 'The creator cannot leave the trip. Delete the trip instead.'},
                            status=status.HTTP_400_BAD_REQUEST)
            
        participant.delete()
        return Response({'detail': 'You have left the trip.'}, status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['get'])
    def participants(self, request, pk=None):
        trip = self.get_object()
        participants = TripParticipant.objects.filter(trip=trip)
        serializer = TripParticipantSerializer(participants, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], url_path='approve-participant/(?P<user_id>\d+)')
    def approve_participant(self, request, pk=None, user_id=None):
        trip = self.get_object()
        if trip.created_by != request.user:
            return Response({'detail': 'Only the trip creator can approve participants.'},
                            status=status.HTTP_403_FORBIDDEN)
        
        participant = get_object_or_404(TripParticipant, trip=trip, user_id=user_id)
        if participant.status == 'accepted':
             return Response({'detail': 'User is already accepted.'},
                            status=status.HTTP_400_BAD_REQUEST)
             
        participant.status = 'accepted'
        participant.save()
        return Response({'detail': 'Participant approved.'})

    @action(detail=True, methods=['post'], url_path='reject-participant/(?P<user_id>\d+)')
    def reject_participant(self, request, pk=None, user_id=None):
        trip = self.get_object()
        if trip.created_by != request.user:
            return Response({'detail': 'Only the trip creator can reject participants.'},
                            status=status.HTTP_403_FORBIDDEN)
        
        participant = get_object_or_404(TripParticipant, trip=trip, user_id=user_id)
        participant.status = 'rejected'
        participant.save()
        # Alternatively, delete the record? For now, keep as rejected.
        return Response({'detail': 'Participant rejected.'})
