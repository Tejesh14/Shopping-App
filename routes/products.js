const express = require('express');
const { ConnectionStates } = require('mongoose');
const router = express.Router();
const Product = require('../models/products');
const Review = require('../models/review');
const isLoggedIn = require('../middleware'); 


// Get all products
router.get('/products',async(req,res)=>{
    try{
        const allProducts = await Product.find({});
        res.render('products/index',{allProducts});
    }catch(e){
        console.log(e.message);
        req.flash('error','Cannot find products');
        res.redirect('/error');
    }
})

// create new products form
router.get('/products/new',isLoggedIn,(req,res)=>{
    res.render('products/new');
})


// get particular product
router.get('/products/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const singleProduct = await Product.findById(id).populate('reviews');
        // console.log(req.user.username);
        res.render('products/show',{prod:singleProduct});
    }catch(e){
        console.log(e.message);
        req.flash('error','Cannot Find product!');
        res.redirect('/error');
    }
})

// creates new product
router.post('/products',isLoggedIn,async(req,res)=>{
    try{
        await Product.create(req.body);
        req.flash('success','Product Created Successfully');
        res.redirect('/products');
    }catch(e){
        console.log(e.message);
        req.flash('error','Cannot create new product!');
        res.redirect('/error');
    }
})

// to get edit form
router.get('/products/:id/edit',isLoggedIn,async(req,res)=>{
    try{
        const {id} = req.params;
        const singleProduct = await Product.findById(id);
        res.render('products/edit',{prod:singleProduct});
    }
    catch{
        console.log(e.message);
        req.flash('error','Cannot Edit product!');
        res.redirect('/error');
    }
})

// to edit 
router.patch('/products/:id',isLoggedIn,async(req,res)=>{
    try{
        const {id} = req.params;
        await Product.findByIdAndUpdate(id,req.body);
        req.flash('success','Product Updated successfully');
        res.redirect(`/products/${id}`);
    }
    catch(e){
        console.log(e.message);
        req.flash('error','Cannot Update product!');
        res.render('error');
    }
})

// to delete
router.delete('/products/:id',isLoggedIn,async(req,res)=>{
    try{
        const {id} = req.params;
        await Product.findByIdAndDelete(id);
        req.flash('success','Product Deleted Successfully!');
        res.redirect('/products');
    }catch(e){
        console.log(e.message);
        req.flash('error','Cannot Delete product!');
        res.render('error');
    }
})

//Comments routes
router.post('/products/:id/review',isLoggedIn,async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        const review = new Review({
            user: req.user.username,
            ...req.body
        });
        
        product.reviews.push(review);
        await review.save();
        await product.save();
        
        res.redirect(`/products/${id}`);
    }catch(e){
        console.log(e.message);
        req.flash('error','Cannot comment  product!');
        res.render('error');
    }
})

// Error Route
router.get('/error',(req,res)=>{
    res.status(404).render('partials/error');
})

module.exports = router;