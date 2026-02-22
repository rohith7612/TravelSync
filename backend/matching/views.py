from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from trips.models import Trip, TripParticipant
from .serializers import DiscoverTripSerializer
from .utils import calculate_compatibility_score

class DiscoverView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        
        # In a real system, you'd filter out trips the user is already in or past trips
        trips = Trip.objects.filter(status='planning').exclude(participants__user=user)
        
        trip_scores = []
        for trip in trips:
            score = calculate_compatibility_score(user, trip)
            if score > 0:
                trip_scores.append({
                    'trip': trip,
                    'score': score
                })
                
        # Sort by score descending
        trip_scores.sort(key=lambda x: x['score'], reverse=True)
        
        # Serialize the top matches
        serialized_trips = []
        for match in trip_scores[:20]: # Top 20
            data = DiscoverTripSerializer(match['trip']).data
            data['compatibility_score'] = match['score']
            serialized_trips.append(data)
            
        return Response(serialized_trips)


class DashboardSummaryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        
        upcoming_trips = Trip.objects.filter(participants__user=user, status='confirmed').count()
        join_requests = TripParticipant.objects.filter(trip__created_by=user, status='pending').count()
        
        # We can also pull in total expense balance here by querying expenses app or 
        # doing it on the frontend. We will keep it light here.
        
        return Response({
            'upcoming_trips_count': upcoming_trips,
            'pending_join_requests_count': join_requests,
            'notifications_count': 0 # Placeholder for Notification system
        })
