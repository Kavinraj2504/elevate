const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const leadRoutes = require('./routes/leads');

const app = express();
app.use(cors({
    origin:"*",
}));
app.use(express.json());

app.use('/api/leads', leadRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(8000, () => console.log('Server running on port 5000')))
    .catch(err => console.error(err));
