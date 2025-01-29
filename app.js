const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbUri = "mongodb+srv://ruxmur:xzqGRr52RzuMiUln@cluster0.zfwjm.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(dbUri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => res.render('index', { title: 'All Blogs', blogs: result }))
        .catch(err => console.log(err));
});
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
