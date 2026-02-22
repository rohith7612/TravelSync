import { apiClient } from './api';

export interface TripData {
    title: string;
    destination: string;
    start_date: string;
    end_date: string;
    budget: string;
    max_participants: number;
    description: string;
    travel_style: string;
    is_public: boolean;
}

export const tripsService = {
    // Create a new trip
    createTrip: async (data: TripData) => {
        const response = await apiClient.post('/trips/', data);
        return response.data;
    },

    // Fetch feed of public trips
    getDiscoverFeed: async () => {
        const response = await apiClient.get('/trips/');
        return response.data;
    },

    // Get specific trip
    getTripDetails: async (tripId: string) => {
        const response = await apiClient.get(`/trips/${tripId}/`);
        return response.data;
    },

    // Request to join a specific trip
    requestToJoin: async (tripId: string) => {
        const response = await apiClient.post(`/trips/${tripId}/join/`);
        return response.data;
    },

    // Get upcoming confirmed trips for the user
    getDashboardTrips: async () => {
        const response = await apiClient.get('/trips/upcoming/');
        return response.data;
    }
};
