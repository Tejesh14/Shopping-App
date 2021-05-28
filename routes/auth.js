const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

// for rendering register page
router.get('/register',(req,res)=>{
    res.render('auth/signup');
})

// for redirecting to login after registering
router.post('/register',async(req,res)=>{
    try{
        const user = new User({email: req.body.email, username: req.body.username});
        await User.register(user, req.body.password);
        req.flash('success','Registered Successfully');
        res.redirect('/login');
    }catch(e){
        req.flash('error',e.message);
        res.redirect('/register');
    }
})

// for rendering login page
router.get('/login',(req,res)=>{
    res.render('auth/login');
})

// for redirecting to products if user is authenticated else sending error
router.post('/login', passport.authenticate('local', 
    { 
        failureRedirect: '/login',
        failureFlash: true 
    }),(req,res)=>{
        // console.log(req.user);
        req.flash('success',`Welcome back ${req.user.username} :)`);
        res.redirect('/products');
    }
)

// for logout
router.get('/logout',(req,res)=>{
    req.logOut();
    req.flash('success','Successfully Logout!');
    res.redirect('/login');
})

module.exports = router;