const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware');
const Product = require('../models/products');
const User = require('../models/user');

router.get('/user/:userId/cart',isLoggedIn,async(req,res)=>{
    try{
        const user = await User.findById(req.params.userId).populate('cart');
        res.render('cart/cart',{userCart: user.cart});
    }catch(e){
        console.log(e.message);
        req.flash('error','Cannot find cart at current moment');
        res.render('partials/error');
    }
})

router.post('/user/:id/cart',isLoggedIn,async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        const user = req.user;

        user.cart.push(product);
        req.flash('success','Product added to Cart :)');
        await user.save();
        res.redirect(`/products`);
    }catch(e){
        console.log(e.message);
        req.flash('error','Cannot add this product at current moment');
        res.redirect('error');
    }
})

router.delete('/user/:userId/cart/:id',async(req,res)=>{
    try{
        const {userId,id} = req.params;
        await User.findByIdAndUpdate(userId,{$pull:{cart:id}})
        req.flash('success','Product removed successfully');
        res.redirect(`/user/${userId}/cart`);
    }catch(e){
        console.log(e.message);
        req.flash('error','Cannot remove this product at current moment');
        res.redirect('error');
    }
})

router.get('/cart/payment',isLoggedIn,(req,res)=>{
    res.render('payment/payment')
})

module.exports = router;