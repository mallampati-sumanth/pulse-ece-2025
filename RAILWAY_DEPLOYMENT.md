# 🚂 Railway Deployment Guide for Pulse Student Management System

## Overview
Railway is a modern deployment platform that makes it easy to deploy Node.js applications with automatic deployments from GitHub.

## Prerequisites
1. GitHub account with your repository pushed
2. Railway account (sign up at [railway.app](https://railway.app))
3. MongoDB Atlas account (recommended for production database)

## Step-by-Step Deployment

### 1. Prepare Your Repository on GitHub

First, push your code to GitHub following the instructions in `GITHUB_SETUP.md`:

```bash
# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/pulse-student-management.git
git branch -M main
git push -u origin main
```

### 2. Set Up MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas/database)
2. Create a free account and cluster
3. Create a database user
4. Whitelist Railway's IP addresses (or use 0.0.0.0/0 for all IPs)
5. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/pulse-db`

### 3. Deploy to Railway

#### Option A: Deploy from GitHub (Recommended)

1. Go to [railway.app](https://railway.app) and sign in
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Connect your GitHub account if not already connected
5. Select your `pulse-student-management` repository
6. Railway will automatically detect it's a Node.js project

#### Option B: Deploy from Template

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository

### 4. Configure Environment Variables

In your Railway project dashboard:

1. Go to your project → Variables tab
2. Add these environment variables:

```
DB=mongodb+srv://username:password@cluster.mongodb.net/pulse-db
DB_PASSWORD=your_actual_mongodb_password
SECRET=your-super-secret-session-key-make-it-very-long-and-random
PORT=4000
GMAIL_USER=msumanth117@gmail.com
GMAIL_CLIENT_ID=your-gmail-oauth-client-id
GMAIL_CLIENT_SECRET=your-gmail-oauth-client-secret
GMAIL_REFRESH_TOKEN=your-gmail-oauth-refresh-token
JWT_SECRET=another-super-secret-jwt-key-very-long
JWT_EXPIRES_IN=24h
NODE_ENV=production
```

### 5. Deploy and Initialize Database

1. Railway will automatically deploy your application
2. Once deployed, open the Railway console for your project
3. Run the database setup command:
   ```bash
   npm run setup-db
   ```
4. This will create the database indexes and default admin user

### 6. Access Your Application

1. Railway will provide you with a public URL (e.g., `https://your-app-name.up.railway.app`)
2. Your application will be available at that URL
3. Admin access: `https://your-app-name.up.railway.app/admin`
   - Email: admin@pulse.com
   - Password: admin123 (change this immediately!)

## Railway-Specific Features

### Automatic Deployments
- Railway automatically redeploys when you push to your main branch
- No need to manually trigger deployments

### Custom Domains
- You can add custom domains in Railway dashboard
- Go to Settings → Domains

### Scaling
- Railway automatically handles scaling
- Monitor usage in the dashboard

### Logs and Monitoring
- View real-time logs in Railway dashboard
- Monitor resource usage and performance

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DB` | MongoDB connection string | `mongodb+srv://user:pass@cluster.net/pulse-db` |
| `DB_PASSWORD` | MongoDB password | `your_secure_password` |
| `SECRET` | Session secret key | `super-long-random-string-for-sessions` |
| `PORT` | Application port | `4000` |
| `GMAIL_USER` | Gmail for notifications | `msumanth117@gmail.com` |
| `GMAIL_CLIENT_ID` | OAuth Client ID | `your-oauth-client-id` |
| `GMAIL_CLIENT_SECRET` | OAuth Client Secret | `your-oauth-client-secret` |
| `GMAIL_REFRESH_TOKEN` | OAuth Refresh Token | `your-oauth-refresh-token` |
| `JWT_SECRET` | JWT signing secret | `super-secret-jwt-key` |
| `NODE_ENV` | Environment | `production` |

## Post-Deployment Checklist

- [ ] Application loads successfully
- [ ] Database connection works
- [ ] Admin login works
- [ ] Student registration works
- [ ] File uploads work
- [ ] Email notifications work (if configured)
- [ ] Change default admin password
- [ ] Set up custom domain (optional)
- [ ] Configure backup strategy

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check MongoDB Atlas connection string
   - Verify IP whitelist includes Railway IPs or use 0.0.0.0/0
   - Ensure database user has proper permissions

2. **Environment Variables Not Working**
   - Verify all variables are set in Railway dashboard
   - Check for typos in variable names
   - Redeploy after adding new variables

3. **File Uploads Not Working**
   - Railway has ephemeral storage
   - Consider using cloud storage (AWS S3, Cloudinary) for production

4. **Email Not Working**
   - Verify Gmail OAuth credentials
   - Check Gmail API is enabled in Google Cloud Console

### Getting Help

1. Check Railway documentation: [docs.railway.app](https://docs.railway.app)
2. Check application logs in Railway dashboard
3. View MongoDB Atlas logs for database issues
4. Check GitHub repository issues

## Additional Railway Commands

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Link to your project
railway link

# View logs
railway logs

# Run commands in Railway environment
railway run npm run setup-db
```

## Security Recommendations

1. **Change Default Admin Password** immediately after deployment
2. **Use Strong Secrets** for SESSION_SECRET and JWT_SECRET
3. **Enable HTTPS** (Railway provides this automatically)
4. **Regular Backups** of your MongoDB Atlas database
5. **Monitor Access Logs** regularly

## Scaling Considerations

- Railway automatically handles basic scaling
- For high traffic, consider:
  - MongoDB Atlas dedicated clusters
  - Redis for session storage
  - CDN for static assets
  - Load balancing for multiple instances
