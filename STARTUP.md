# TripSync Startup Guide

## Prerequisites
- Python 3.10+
- Node.js 18+

## Backend Setup
1. Open a terminal in the `backend/` directory.
2. Activate the virtual environment:
   - Windows: `.\venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
3. Run migrations:
   `python manage.py migrate`
4. Start the server:
   `python manage.py runserver`
   The API will be available at http://127.0.0.1:8000/

## Frontend Setup
1. Open a terminal in the `frontend/` directory.
2. Install dependencies:
   `npm install`
3. Start the development server:
   `npm run dev`
4. Open the application:
   http://localhost:3000/
