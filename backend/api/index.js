require('dotenv').config({ path: __dirname + '/../.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const http = require('http');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Define schema and model for your collection
const polarityDataSchema = new mongoose.Schema({}, { collection: 'PolarityData' });
const PolarityData = mongoose.model('PolarityData', polarityDataSchema);

// Define API route
app.get('/api/polaritydata', async (req, res) => {
    try {
        const data = await PolarityData.find({});
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving data", error });
    }
});

const server = http.createServer(app);
server.listen(5000, () => {
  console.log(`Server is listening on port ${5000}`);
});

// Export the app for serverless function in Vercel
module.exports = app;
