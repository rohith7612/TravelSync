from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import Trip

User = get_user_model()

class TripTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password123')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_create_trip(self):
        data = {
            'title': 'Test Trip',
            'description': 'A nice trip',
            'destination': 'Paris',
            'start_date': '2023-10-01',
            'end_date': '2023-10-10',
            'budget': 1000.00,
            'travel_style': 'backpacking',
            'max_participants': 5
        }
        response = self.client.post('/api/trips/trips/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Trip.objects.count(), 1)
        self.assertEqual(Trip.objects.get().created_by, self.user)
