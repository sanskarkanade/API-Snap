const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// load env vars
dotenv.config();

// connect database
connectDB();

// init app
const app = express();
app.use(cors());
app.use(express.json());

// mount routes
app.use('/api/auth',     require('./routes/authRoutes'));
app.use('/api/user',     require('./routes/userRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));

// fallback
app.get('/', (_, res) => res.send('API Snap backend is running'));

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
