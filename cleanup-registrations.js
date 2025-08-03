const mongoose = require('mongoose');
const dotenv = require('dotenv');
const EventRegistration = require('./Models/eventRegistrationModel');

dotenv.config({ path: './config.env' });
const DB = process.env.DB.replace('<password>', process.env.DB_PASSWORD);

async function cleanupOrphanedRegistrations() {
  try {
    await mongoose.connect(DB);
    console.log('✅ Connected to DB');
    
    // Remove registrations where event is null or doesn't exist
    const result = await EventRegistration.deleteMany({ 
      $or: [
        { event: null },
        { event: { $exists: false } }
      ]
    });
    
    console.log(`🗑️  Deleted ${result.deletedCount} orphaned registrations`);
    
    // Also remove any registrations where the event ID doesn't exist in Event collection
    const Event = require('./Models/eventModel');
    const allRegistrations = await EventRegistration.find().populate('event');
    
    let deletedCount = 0;
    for (const registration of allRegistrations) {
      if (!registration.event) {
        await EventRegistration.findByIdAndDelete(registration._id);
        deletedCount++;
      }
    }
    
    console.log(`🗑️  Deleted ${deletedCount} additional orphaned registrations`);
    console.log('✅ Cleanup completed successfully');
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

cleanupOrphanedRegistrations();
