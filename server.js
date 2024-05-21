const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const opinionSchema = new mongoose.Schema({
    text: String,
    createdAt: { type: Date, default: Date.now }
});

const Opinion = mongoose.model('Opinion', opinionSchema);

// Routes
app.post('/opinions', async (req, res) => {
    const opinion = new Opinion(req.body);
    await opinion.save();
    res.status(201).send(opinion);
});

app.get('/opinions', async (req, res) => {
    const opinions = await Opinion.find().sort({ createdAt: -1 });
    res.send(opinions);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
