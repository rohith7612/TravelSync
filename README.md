<h1 align="center">🌍 TravelSync</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white" alt="Flutter Badge"/>
  <img src="https://img.shields.io/badge/Dart-0175C2?style=for-the-badge&logo=dart&logoColor=white" alt="Dart Badge"/>
  <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Django Badge"/>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python Badge"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL Badge"/>
  <img src="https://img.shields.io/badge/Mapbox-000000?style=for-the-badge&logo=mapbox&logoColor=white" alt="Mapbox Badge"/>
</p>

<p align="center">
  <b>A comprehensive, cross-platform collaborative trip-planning application built with Flutter and Django. Designed for groups to seamlessly coordinate travel itineraries, share expenses, and discover new destinations.</b>
</p>

---

## 🚀 Features

*   👥 **Real-Time Collaboration**: Invite friends to trips and plan itineraries together.
*   🗺️ **Interactive Maps**: Powered by MapBox integration for exploring destinations, points of interest, and generating visual trip routes.
*   📝 **Dynamic Itinerary Builder**: Easily drag and drop activities, flights, and accommodations into a day-by-day structure.
*   💰 **Expense Tracking & Splitting**: Log trip expenses, track who paid what, and seamlessly split costs among group members.
*   💬 **In-App Group Chat**: Real-time communication specific to each trip using WebSockets.
*   🎫 **Document Storage**: Centralized place to store flight tickets, hotel reservations, and travel documents.
*   🤖 **AI Travel Assistant (Planned)**: Get smart recommendations for activities and dining based on group preferences.
*   📱 **Cross-Platform**: Available on both Android and iOS devices with a unified, beautiful UI.

---

## 🛠️ Tech Stack

### Frontend (Mobile App)
*   [Flutter](https://flutter.dev/) - Cross-platform UI toolkit.
*   [Dart](https://dart.dev/) - Programming language.
*   **State Management**: Provider / Riverpod (check source for specifics).
*   **Maps**: `flutter_map` with Mapbox integration.

### Backend (REST API)
*   [Django](https://www.djangoproject.com/) - High-level Python Web framework.
*   [Django REST Framework (DRF)](https://www.django-rest-framework.org/) - Powerful and flexible toolkit for building Web APIs.
*   [PostgreSQL](https://www.postgresql.org/) - Robust open-source relational database.
*   **WebSockets**: Django Channels for real-time chat and updates.
*   **Authentication**: JWT-based authentication.

---

## 📂 Repository Structure

The project is structured into two main directories:

*   `/frontend`: Contains the complete Flutter mobile application source code.
*   `/backend`: Contains the Django Python REST API and background worker configurations.

---

## ⚙️ Getting Started

### Prerequisites
*   [Flutter SDK](https://flutter.dev/docs/get-started/install) installed.
*   [Python 3.10+](https://www.python.org/downloads/) installed.
*   [PostgreSQL](https://www.postgresql.org/download/) database running locally or remotely.

### 1. Setting up the Backend
Navigate to the `backend` directory and follow the instructions in its specific README (if available) or use these general commands:

```bash
cd backend

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Set up environment variables (.env file)
# Example: DB_NAME, DB_USER, DB_PASSWORD, SECRET_KEY

# Run migrations
python manage.py migrate

# Start the Django development server
python manage.py runserver
```

### 2. Setting up the Frontend
Navigate to the `frontend` directory:

```bash
cd frontend

# Get Flutter packages
flutter pub get

# Add required API keys (e.g., MapBox token) to your environment or config file

# Run the app on an emulator or connected device
flutter run
```

---

## 🤝 Contributing

Contributions make the open source community such an amazing place to learn, inspire, and create. Any contributions you make to **TravelSync** are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Contact

**Rohith Prudhvi**  
GitHub: [@rohith7612](https://github.com/rohith7612)  

Project Link: [https://github.com/rohith7612/TravelSync](https://github.com/rohith7612/TravelSync)