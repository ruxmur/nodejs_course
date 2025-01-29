const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// note: 
// run 'nodemon app' to start the server
// run 'mongod' to start the mongodb server
// go to http://localhost:3000/blogs

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
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
