# Pulse - Student Management System

A comprehensive web application for student management with features for blood donation tracking, event management, and faculty administration.

## 🚀 Features

- **Student Management**: Registration, profile management, and authentication
- **Blood Donation System**: Track blood donors and blood group information
- **Event Management**: Create and manage college events
- **Faculty Administration**: Separate faculty portal with administrative features
- **Admin Panel**: Complete administrative control over users and content
- **File Uploads**: Profile picture and document management
- **Email Integration**: Automated email notifications using Gmail OAuth

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Template Engine**: EJS
- **Authentication**: Express Sessions with MongoDB store
- **File Upload**: Multer
- **Email**: Nodemailer with Gmail OAuth
- **Security**: bcrypt for password hashing, JWT for tokens

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Gmail account for email services

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Pulse-main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `config.env.example` to `config.env`
   - Update the following variables in `config.env`:
     ```
     DB=mongodb://localhost:27017/pulse-db
     DB_PASSWORD=your_db_password
     SECRET=your-super-secret-session-key
     PORT=4000
     GMAIL_USER=your-email@gmail.com
     GMAIL_CLIENT_ID=your-gmail-client-id
     GMAIL_CLIENT_SECRET=your-gmail-client-secret
     GMAIL_REFRESH_TOKEN=your-gmail-refresh-token
     JWT_SECRET=your-jwt-secret-key
     JWT_EXPIRES_IN=24h
     ```

4. Start the MongoDB service:
   ```bash
   # For Windows (if using local MongoDB)
   net start MongoDB
   
   # For macOS/Linux
   sudo systemctl start mongod
   ```

5. Run the application:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:4000`

## 🏗 Project Structure

```
Pulse-main/
├── Controllers/          # Route controllers
│   ├── adminController.js
│   ├── facultyController.js
│   ├── pageController.js
│   └── UserController.js
├── Models/              # Database models
│   ├── joinPulse.js
│   └── userModel.js
├── Routes/              # Express routes
│   ├── adminRoutes.js
│   ├── facultyRoutes.js
│   ├── pageRoutes.js
│   └── userRoutes.js
├── middlewares/         # Custom middleware
│   └── isAuthenticated.js
├── public/              # Static files
│   ├── imgs/           # Images
│   ├── scripts/        # Client-side JavaScript
│   ├── styles/         # CSS files
│   └── uploads/        # User uploaded files
├── utils/               # Utility functions
│   ├── nodeMailer.js
│   └── OAuthMailer.js
├── views/               # EJS templates
├── app.js               # Express app configuration
├── server.js            # Server entry point
└── package.json         # Dependencies and scripts
```

## 🔐 Database Models

### User Model
- Personal information (name, email, phone, batch, branch)
- Authentication (password with bcrypt hashing)
- Blood group information
- Profile picture upload
- Password reset functionality

### Pulse Join Model
- Student enrollment information
- Wing and batch details
- Contact information

## 🔧 API Routes

### User Routes (`/`)
- `GET /` - Home page
- `GET /signin` - Sign in page
- `POST /signin` - User authentication
- `GET /signup` - Registration page
- `POST /signup` - User registration
- `GET /profile` - User profile
- `POST /profile` - Update profile

### Admin Routes (`/admin`)
- Admin dashboard and user management
- Blood donation tracking
- Faculty management

### Faculty Routes (`/faculty`)
- Faculty-specific features
- Student management
- Event coordination

## 🚀 Deployment

The application is currently deployed at: https://pulse-89zo.onrender.com

### Deploying to Render/Heroku

1. Create a new app on your hosting platform
2. Set environment variables in the platform's dashboard
3. Connect your GitHub repository
4. Deploy the application

### Database Setup

For production, use MongoDB Atlas:
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Update the `DB` variable in your environment configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For support or questions, please contact the development team or create an issue in the repository.
