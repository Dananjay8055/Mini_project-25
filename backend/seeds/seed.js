import mongoose from 'mongoose';
import { seedRoles } from './seedRoles.js';
import { seedDesignations } from './seedDesignations.js';
import { seedPermissions } from './seedPermissions.js';
import { Role } from '../models/UserModels.js';
import { Permission } from '../models/PermissionModels.js';
import dotenv from 'dotenv';
dotenv.config();

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URL || "mongodb://localhost:27017/yourdbname";

async function seed() {
    console.log("connecting to MongoDB...");
    await mongoose.connect(mongoURI)
      .then(() => console.log('Connected to MongoDB...'))
      .catch(err => console.error('Error connecting to MongoDB:', err));
    try {
        await mongoose.connection.db.dropDatabase();
    // Start by clearing existing data (optional but good practice)
    // await clearCollections();
    await seedPermissions();
    await seedRoles();
    await seedDesignations();
    console.log('Seeding roles and permissions...');

    console.log('Seed data inserted successfully!');

  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    // Close the connection after seeding is done
    mongoose.connection.close();
  }
}

// Utility function to clear collections (optional, but useful for resetting data)
async function clearCollections() {
  await Role.deleteMany({});
  await Permission.deleteMany({});
  console.log('Cleared existing data from collections...');
}

// Utility function to insert data into a collection
async function insertData(Model, data) {
  await Model.insertMany(data);
  console.log(`Inserted data into ${Model.modelName} collection...`);
}

// Run the seed script
seed();
