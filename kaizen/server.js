require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const helmet=require("helmet")
const app = express();
const cors = require("cors");
app.use(cors({
    origin:"*",
}));
// Middleware
app.use(helmet());
app.use(express.json());

// Connect to MongoDB
connectDB(process.env.MONGODB_URI);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/campaigns', require('./routes/campaignRoutes'));
app.use('/api/leads', require('./routes/leadRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
