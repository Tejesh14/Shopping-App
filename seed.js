const mongoose = require('mongoose');
const Product = require('./models/products');

const products = [
    {
        name: 'Macbook Air',
        img: "https://images.unsplash.com/photo-1512824793006-f5d72fb3d4d7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9vayUyMGFpcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 65000,
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi debitis enim ducimus tempore nam corporis omnis, deleniti porro non repellat fugit, iure accusamus, adipisci doloribus? Magnam aliquam quam fuga placeat.'
    },
    {
        name: 'Mac',
        img: "https://images.unsplash.com/photo-1527443195645-1133f7f28990?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWFjfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 150000,
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi debitis enim ducimus tempore nam corporis omnis, deleniti porro non repellat fugit, iure accusamus, adipisci doloribus? Magnam aliquam quam fuga placeat.'
    },
    {
        name: 'iPhone 12',
        img: "https://images.unsplash.com/photo-1617997455403-41f333d44d5b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGlwaG9uZSUyMDEyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 50000,
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi debitis enim ducimus tempore nam corporis omnis, deleniti porro non repellat fugit, iure accusamus, adipisci doloribus? Magnam aliquam quam fuga placeat.'
    },
    {
        name: 'Macbook Pro',
        img: "https://images.unsplash.com/photo-1537498425277-c283d32ef9db?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9vayUyMHByb3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 265000,
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi debitis enim ducimus tempore nam corporis omnis, deleniti porro non repellat fugit, iure accusamus, adipisci doloribus? Magnam aliquam quam fuga placeat.'
    },
    {
        name: 'iWatch',
        img: "https://images.unsplash.com/photo-1558126319-c9feecbf57ee?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aXdhdGNofGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 35000,
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi debitis enim ducimus tempore nam corporis omnis, deleniti porro non repellat fugit, iure accusamus, adipisci doloribus? Magnam aliquam quam fuga placeat.'
    }
]

const seedDB = async()=>{
    await Product.insertMany(products)
    .then(()=>{
        console.log('DB Seeded :)');
    })
    .catch(err=>{
        console.log('DB not Seeded Error!!');
        console.log(err);
    })
}

module.exports = seedDB;