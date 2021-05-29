
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const products = require('./models/products');
const seedDB = require('./seed');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

// Routes
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');


const sessionConfig = {
    secret: 'iamnotlucifer',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
};
// Database Stuff
mongoose.connect(process.env.DB_URL, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(()=>{
        console.log('DB Connected');
    })
    .catch(err=>{
        console.log('Error in DB Connection!!!');
    })

// seedDB();

// set 
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// use
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(session(sessionConfig));
app.use(flash());

// For initialize passport and sessions for storing user information
app.use(passport.initialize());
app.use(passport.session());

// configuring the passport to use local strategy
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser()); //to store in sessions
passport.deserializeUser(User.deserializeUser()); //to remove from sessions

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.userName = req.user;
    next();
})


app.get('/',(req,res)=>{
    res.render('index');
})

app.use(productRoutes);
app.use(authRoutes);
app.use(cartRoutes);




app.listen(process.env.PORT || 5000,()=>{
    console.log('Server is running on port 5000');
})