const express = require('express');
const router  = express.Router();
const Product = require('../models/product');


router.get('/products', async (req,res)=>{
    
    try{
        const products = await Product.find({});
        res.json(products);
    }
    catch(e) {
        console.log("Error in geting products");
    }
   
})

router.post('/products', async(req,res)=>{

 const product =  await Product.create(req.body);

 res.status(200).json(product);


})

router.get('/products/:id', async(req,res)=>{
    const product = await Product.findById(req.params.id);
    res.json(product);
})













module.exports = router;