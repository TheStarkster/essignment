const express = require('express'),
    express_Session = require('express-session'),
    flash = require('connect-flash'),
    mongoose = require('mongoose'),
    mongodb = require('mongodb'),
    bodyParser = require('body-parser'),
    app = express();

//BodyParser...
app.use(express.urlencoded({ extended: false }));
//Express-Session...
app.use(express_Session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Connnect Flash...
app.use(flash());

try {
    mongoose.connect('mongodb://localhost:27017/tests', { useNewUrlParser: true })
        .then(() => console.log("MongoDB Connection Succeed"));
} catch (error) {
    console.log(error);
}
// Some Global Vars...
app.use((req,res,next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

// Routes...
// app.use('/',require('./routes/index'));

//Running...
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Backend Server Started on Port: ${PORT}`));