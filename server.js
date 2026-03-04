const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));  // frontend folder fr

// API ROUTES
app.use('/tasks', require('./routes/tasks'));
app.use('/users', require('./routes/users'));

// Frontend routes
app.get('/', (req, res) => {
  res.render('index', { text: "Hello" });
});

// MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB:', err));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server on ${port}`));
