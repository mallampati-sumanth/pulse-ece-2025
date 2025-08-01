# 📋 Railway Deployment Checklist

## Pre-Deployment
- [ ] Code pushed to GitHub repository
- [ ] MongoDB Atlas cluster created and configured
- [ ] Gmail OAuth credentials obtained (optional for email features)
- [ ] Railway account created

## Deployment Steps
- [ ] Create new Railway project
- [ ] Connect GitHub repository
- [ ] Configure environment variables in Railway dashboard
- [ ] Wait for automatic deployment
- [ ] Run database setup: `npm run setup-db`
- [ ] Test application functionality

## Environment Variables to Set in Railway
```
DB=mongodb+srv://username:password@cluster.mongodb.net/pulse-db
SECRET=your-super-secret-session-key
GMAIL_USER=msumanth117@gmail.com
GMAIL_CLIENT_ID=your-gmail-oauth-client-id
GMAIL_CLIENT_SECRET=your-gmail-oauth-client-secret
GMAIL_REFRESH_TOKEN=your-gmail-oauth-refresh-token
JWT_SECRET=your-jwt-secret-key
NODE_ENV=production
```

## Post-Deployment
- [ ] Application loads at Railway URL
- [ ] Admin login works (admin@pulse.com / admin123)
- [ ] Change default admin password
- [ ] Test student registration
- [ ] Test file uploads
- [ ] Test email functionality (if configured)
- [ ] Set up custom domain (optional)

## Quick Start Commands
```bash
# Push to GitHub
git add .
git commit -m "Ready for Railway deployment"
git push origin main

# After Railway deployment, run in Railway console:
npm run setup-db
```

## Default Admin Credentials
- Email: admin@pulse.com
- Password: admin123
- **⚠️ CHANGE IMMEDIATELY AFTER FIRST LOGIN!**

## Support URLs
- Railway Dashboard: https://railway.app/dashboard
- MongoDB Atlas: https://cloud.mongodb.com
- GitHub Repository: https://github.com/YOUR_USERNAME/pulse-student-management
