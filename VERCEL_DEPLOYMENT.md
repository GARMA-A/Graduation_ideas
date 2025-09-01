# Vercel Deployment Guide

This project is configured to deploy both the frontend (React + Vite) and backend (Express + TypeScript) on Vercel as serverless functions.

## Project Structure

```
├── backend/                 # Express backend (renamed from 'api')
│   ├── src/                # TypeScript source files
│   └── dist/               # Compiled JavaScript files
├── api/                    # Vercel serverless functions
│   └── index.js           # Main API handler
├── src/                    # React frontend source
├── dist/                   # Built frontend files
├── vercel.json            # Vercel configuration
└── package.json           # Frontend dependencies & build scripts
```

## Deployment Instructions

### 1. Environment Variables

Set up the following environment variables in your Vercel dashboard:

- `MONGO_URI`: Your MongoDB connection string
- `ALLOW_ORIGIN`: Comma-separated list of allowed origins (e.g., `https://your-app.vercel.app`)
- `NODE_ENV`: Set to `production`

### 2. Deploy to Vercel

1. Connect your repository to Vercel
2. Vercel will automatically detect the configuration from `vercel.json`
3. The build process will:
   - Compile the backend TypeScript to JavaScript
   - Build the React frontend
   - Deploy both as serverless functions and static files

### 3. API Routes

All API routes are accessible at `/api/*` and are handled by the Express serverless function:

- `/api/auth/*` - Authentication routes
- `/api/notes/*` - Notes CRUD operations
- `/api/users/*` - User management

## Local Development

For local development, you can still use Docker:

```bash
# Start all services (frontend, backend, MongoDB)
docker-compose up

# Or run individually
npm run dev          # Frontend only
cd backend && npm run dev  # Backend only
```

## Configuration Files

- `vercel.json`: Configures Vercel deployment, routing, and build settings
- `api/index.js`: Serverless function wrapper for the Express app
- `.env.example`: Template for environment variables

## Key Changes Made

1. **Backend Directory**: Renamed `api/` to `backend/` to avoid conflicts with Vercel's API structure
2. **Serverless Wrapper**: Created `api/index.js` to handle all API routes as a single serverless function
3. **Build Process**: Updated to compile backend before frontend build
4. **Error Handling**: Enhanced to handle missing environment variables gracefully
5. **CORS Configuration**: Made more flexible for Vercel deployment

## Notes

- The Express app is configured to work both as a traditional server (local development) and as serverless functions (Vercel)
- Database connections are handled gracefully when environment variables are missing
- All existing API routes and functionality remain unchanged