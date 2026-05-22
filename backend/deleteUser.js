require("dotenv").config();
const mongoose = require("mongoose");

async function deleteAllUsers() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const result = await mongoose.connection.collection("users").deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} user(s) from the database`);

    // Also clear the blacklist
    await mongoose.connection.collection("tokenblacklists").deleteMany({});
    console.log("✅ Cleared token blacklist");

    await mongoose.disconnect();
    console.log("Done. Now go register a fresh account at /register");
}

deleteAllUsers().catch(console.error);
