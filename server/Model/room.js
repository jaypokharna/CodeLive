const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructure Schema directly from mongoose

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/codelive", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Server'))
    .catch(error => console.error('MongoDB connection error:', error));

// Define the schema for the Room model
const roomSchema = new Schema({
    roomId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    code: {
        type: String
    }
});

// Create and export the Room model
module.exports = mongoose.model('Room', roomSchema);
