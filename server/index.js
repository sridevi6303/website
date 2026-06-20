const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const authMiddleware = require('./config/authMiddleware');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern-task';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error', err));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes);

app.get('/', (req, res) => res.send({ status: 'ok' }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
