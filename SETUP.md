# 🚀 Pulse - Setup Guide

## Quick Start

### 1. Database Setup

**Option A: Local MongoDB**
1. Install MongoDB locally from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```
3. Update `config.env`:
   ```
   DB=mongodb://localhost:27017/pulse-db
   DB_PASSWORD=
   ```

**Option B: MongoDB Atlas (Recommended for Production)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas/database)
2. Create a new cluster
3. Get connection string and update `config.env`:
   ```
   DB=mongodb+srv://username:<password>@cluster.mongodb.net/pulse-db
   DB_PASSWORD=your_actual_password
   ```

### 2. Environment Configuration

1. Copy the example config:
   ```bash
   cp config.env.example config.env
   ```

2. Update `config.env` with your values:
   ```
   # Database Configuration
   DB=mongodb://localhost:27017/pulse-db
   DB_PASSWORD=your_db_password
   
   # Session Configuration
   SECRET=your-super-secret-session-key-make-it-long-and-random
   
   # Server Configuration
   PORT=4000
   
   # Email Configuration (Gmail OAuth)
   GMAIL_USER=msumanth117@gmail.com
   GMAIL_CLIENT_ID=your-gmail-client-id
   GMAIL_CLIENT_SECRET=your-gmail-client-secret
   GMAIL_REFRESH_TOKEN=your-gmail-refresh-token
   
   # JWT Configuration
   JWT_SECRET=another-super-secret-jwt-key
   JWT_EXPIRES_IN=24h
   ```

### 3. Gmail OAuth Setup (For Email Features)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Gmail API
4. Create OAuth 2.0 credentials
5. Get Client ID, Client Secret, and Refresh Token
6. Update config.env with these values

### 4. Install Dependencies and Setup

```bash
# Install dependencies
npm install

# Setup database (creates indexes and default admin user)
npm run setup-db

# Start the application
npm start
```

### 5. Default Admin Access

After running `npm run setup-db`, a default admin user is created:
- **Email:** admin@pulse.com
- **Password:** admin123

⚠️ **Important:** Change this password immediately after first login!

### 6. Application Access

- **Main Application:** http://localhost:4000
- **Admin Panel:** http://localhost:4000/admin
- **Faculty Portal:** http://localhost:4000/faculty

## 🔧 Development

```bash
# Development mode with auto-restart
npm run dev

# Setup database
npm run setup-db
```

## 🚀 Production Deployment

### Environment Variables for Production

Set these environment variables in your hosting platform:

```
DB=mongodb+srv://username:password@cluster.mongodb.net/pulse-db
SECRET=production-secret-key-very-long-and-random
PORT=4000
GMAIL_USER=msumanth117@gmail.com
GMAIL_CLIENT_ID=your-production-gmail-client-id
GMAIL_CLIENT_SECRET=your-production-gmail-client-secret
GMAIL_REFRESH_TOKEN=your-production-gmail-refresh-token
JWT_SECRET=production-jwt-secret-key
JWT_EXPIRES_IN=24h
```

### Recommended Hosting Platforms

1. **Render** (Free tier available)
2. **Heroku** (Free tier discontinued but paid plans available)
3. **Railway**
4. **Vercel** (for serverless deployment)

## 📱 Features Overview

- **Student Management:** Registration, authentication, profile management
- **Blood Donation System:** Track donors and manage blood bank
- **Event Management:** Create and manage college events
- **Faculty Portal:** Faculty-specific dashboard and features
- **Admin Panel:** Complete administrative control
- **File Uploads:** Profile pictures and documents
- **Email Integration:** Automated notifications

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Frontend:** EJS templates, vanilla JavaScript
- **Authentication:** Express sessions + MongoDB store
- **File Upload:** Multer
- **Email:** Nodemailer with Gmail OAuth
- **Security:** bcrypt password hashing

## 🔒 Security Features

- Password hashing with bcrypt
- Session-based authentication
- JWT token support
- File upload validation
- CSRF protection ready
- Input validation with Validator.js

## 📞 Support

For issues or questions:
1. Check the console logs for error messages
2. Ensure all environment variables are properly set
3. Verify database connection
4. Check if all dependencies are installed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
