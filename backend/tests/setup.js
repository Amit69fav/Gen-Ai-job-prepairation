const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

module.exports = async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    // We can't easily export mongoServer to use in afterAll if we just return URI
    // So let's handle connection here or in a global setup
    process.env.MONGO_URI = mongoUri;
    process.env.JWT_SECRET = 'test-secret';
    process.env.NODE_ENV = 'test';
};

// Also need a way to close it
module.exports.stop = async () => {
    await mongoose.disconnect();
    if (mongoServer) {
        await mongoServer.stop();
    }
};
