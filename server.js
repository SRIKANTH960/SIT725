const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(mongodb+srv://srireddy040409:Plasmatrojan0404@cluster0.x4g8f.mongodb.net/sit725?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

// Schema and Model
const recordSchema = new mongoose.Schema({ 
    name: String, 
    value: Number 
});
const Record = mongoose.model('Record', recordSchema);

// Routes
app.get('/api/records', async (req, res) => {
    try {
        const records = await Record.find();
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching records', error: err });
    }
});

app.post('/api/records', async (req, res) => {
    try {
        const newRecord = new Record(req.body);
        await newRecord.save();
        res.json({ message: 'Record added successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Error saving record', error: err });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
