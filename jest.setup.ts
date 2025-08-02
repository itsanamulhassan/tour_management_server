import mongoose from "mongoose";
import env from "./src/app/configurations/env"; // Import environment variables (like db_url)

// ✅ Run before all tests: Connect to MongoDB
beforeAll(async () => {
  await mongoose.connect(env.db_url);
});

// ✅ Run after each test: Clean all documents from every collection
// afterEach(async () => {
//   if (mongoose.connection.db) {
//     const collections = await mongoose.connection.db.collections();

//     // Loop through all collections and delete their documents
//     for (const collection of collections) {
//       await collection.deleteMany({});
//     }
//   }
// });

// ✅ Run after all tests: Close the MongoDB connection
afterAll(async () => {
  await mongoose.connection.close();
});
