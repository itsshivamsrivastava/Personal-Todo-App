const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const adminRoutes = require('./routes/adminRoutes');
const dotenv = require('dotenv');
const cors = require('cors'); 

dotenv.config(); 

connectDB();

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors()); 

// Routes
app.use('/api/auth', authRoutes); 
app.use('/api/todos', todoRoutes); 
app.use('/api/admin', adminRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));