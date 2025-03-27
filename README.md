# UniShift - Student Event Management System

A web application for managing student events and job opportunities.

## Deployment Instructions

### Frontend Deployment (Vercel)

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com) and sign in with GitHub
3. Click "Import Project" and select your repository
4. Select "Frontend" as the project type
5. Configure the build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add the following environment variable:
   - `VITE_API_URL`: Your backend API URL (after deploying the backend)
7. Click "Deploy"

### Backend Deployment (Render)

1. Push your code to a GitHub repository
2. Go to [Render](https://render.com) and sign in
3. Click "New +" and select "Web Service"
4. Connect your repository
5. Configure the service:
   - Name: unishift-api
   - Environment: Python
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`
6. Add the following environment variables:
   - `FLASK_ENV`: production
   - `DATABASE_URL`: Your PostgreSQL database URL (Render will provide one)
   - `JWT_SECRET_KEY`: A secure random string
7. Click "Create Web Service"

## Local Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## Features
- Employer and Employee login/registration
- Event listing with filters
- Event details with apply button
- Employer dashboard with published events
- Applicant management with ratings
