const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./Models/userModel');
const Pulse = require('./Models/joinPulse');

// Load environment variables
dotenv.config({ path: './config.env' });

// Database connection
const DB = process.env.DB.replace('<password>', process.env.DB_PASSWORD);

async function setupDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(DB);
    console.log('✅ Connected to MongoDB successfully');

    // Create indexes for better performance
    await User.createIndexes();
    await Pulse.createIndexes();
    console.log('✅ Database indexes created successfully');

    // Create default admin user (optional)
    const adminExists = await User.findOne({ email: 'admin@pulse.com' });
    if (!adminExists) {
      const adminUser = new User({
        name: 'Admin User',
        email: 'admin@pulse.com',
        phone: 1234567890,
        password: 'admin123', // This will be hashed automatically
        batch: 'Y20',
        branch: 'CSE',
        blood: 'O+',
        role: 'admin'
      });
      
      await adminUser.save();
      console.log('✅ Default admin user created successfully');
      console.log('📧 Admin Email: admin@pulse.com');
      console.log('🔐 Admin Password: admin123');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    console.log('🎉 Database setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('📂 Database connection closed');
  }
}

// Run the setup
setupDatabase();
