# SkillLink Deployment Guide

## Quick Deploy (Recommended)

### 1. Setup MongoDB Atlas (Free)
1. Go to https://mongodb.com/atlas
2. Create free account
3. Create new cluster (free tier)
4. Create database user
5. Get connection string

### 2. Deploy Backend (Railway)
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "Deploy from GitHub repo"
4. Select your repository
5. Choose "backend" folder as root directory
6. Add environment variables:
   - `MONGODB_URI`: Your Atlas connection string
   - `JWT_SECRET`: any random string (e.g., "mySecretKey123")
   - `EMAIL_USER`: your Gmail
   - `EMAIL_PASS`: your Gmail app password
   - `PORT`: 5000

### 3. Deploy Frontend (Vercel)
1. Go to https://vercel.com
2. Sign up with GitHub
3. Import your repository
4. Set framework preset: "Vite"
5. Set root directory: "frontend"
6. Add environment variable:
   - `VITE_API_URL`: Your Railway backend URL + "/api"

### 4. Alternative: Netlify (Frontend)
1. Go to https://netlify.com
2. Drag and drop "frontend" folder
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variable:
   - `VITE_API_URL`: Your Railway backend URL + "/api"

## Environment Variables Needed

### Backend (Railway):
- MONGODB_URI
- JWT_SECRET
- EMAIL_USER
- EMAIL_PASS
- PORT

### Frontend (Vercel/Netlify):
- VITE_API_URL

## URLs After Deployment
- Frontend: https://your-app.vercel.app
- Backend: https://your-app.railway.app