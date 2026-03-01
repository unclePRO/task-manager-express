const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB.'))
  .catch(err => console.error('MongoDB connection error:', err));


app.get('/', logger, (req, res) => {
    console.log('HI');
    res.render('index', {text: "nigga"});
})

const userRouter = require('./routes/users');
app.use('/users', userRouter);

const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
} 

process.on('uncaughtException', err => {
  console.error('Uncaught:', err);
  process.exit(1);
});

app.listen(3000);