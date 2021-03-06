const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {isLoggedIn} = require('../middleware');
const Product = require('../models/product');




router.post('/register',async (req,res)=>{
    try {
         const {email,password,passwordVerify} = req.body;

         //Validation
         if(!email || !password || !passwordVerify){
              return res.status(400).json({errorMessage: "Please enter all the required credentials"});
         }

         if(password.length<4) {
             return res.status(400).json({errorMessage: "Please enter password of atleast 4 characters"});
         }

         if(password !== passwordVerify) {
             return res.status(400).json({errorMessage: "Please enter the same password twice"});
         }

         const existingUser = await User.findOne({email});

         if(existingUser){
             return  res.status(400).json({errorMessage: "User with this email is already registered"});
         }

         // hash the password
         const salt = await  bcrypt.genSalt();
         
         const passwordHash = await bcrypt.hash(password,salt);

         // save the new user account to the database 
         const newUser = new User({
             email,
             passwordHash
         })

         const savedUser = await newUser.save();

         // log the user in with signIn only
         const token = jwt.sign({
             user: savedUser._id,
         },process.env.JWT_SECRET);

         res.cookie('token', token, {
             httpOnly: true
         })

         res.status(200).send("Registered Successfully");
         
    }
    catch (e){
        console.log(e);
        res.status(500).send("Registered Error");
    }
})



// login the existing user

router.post('/login',async(req,res)=>{
   try {
     const {email,password} = req.body;
        if(!email || !password ){
                   return res.status(400).json({errorMessage: "Please enter all the required credentials"});
        }

        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(400).json({errorMessage: "Wrong email or password"});
        }

        const passwordCorrect = await bcrypt.compare(password,existingUser.passwordHash);

        if(!passwordCorrect){
            return res.status(400).json({errorMessage: "Wrong  password"});
        }

        // sign the token
        const token = jwt.sign(
            {
                user: existingUser._id
            },
            process.env.JWT_SECRET
        )

        res.cookie("token", token,{
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        res.send("User LoggedIn(sent you a user token");

   }
   catch(e){
       console.log(e);
       res.status(500).send("Login Error");
   }
})

router.get('/logout', (req,res)=>{
     
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    })

    res.status(200).send("LoggedOut  Successfully");
})

// verify user is loggedIN or not
router.get('/loggedIn' , (req,res)=>{
     try{
         const token = req.cookies.token;
         if(!token) return res.status(200).json(false);
        
         jwt.verify(token, process.env.JWT_SECRET);
         res.send(true);
     }catch(err){
         console.err(err);
         res.status(200).json(false);
     }
})

// User Cart End Points

// to get the current user's cart
router.get('/user/cart',isLoggedIn, async(req,res)=>{

   try{
    const userId = req.user;

    const user = await User.findById(userId).populate('cart');
    
    res.status(200).json(user.cart)
   } catch(e){
       console.log(e.message);
       res.status(400).json();
   }
     
})

// to add the item in cart
router.post('/user/cart/add', isLoggedIn, async(req,res)=>{
      
  try{

    const {productId} = req.body;

    const product = await Product.findById(productId);

    const userId = req.user;

    const user = await User.findById(userId);

    user.cart.push(product);

    await user.save();

    res.status(200).json("Added To Cart Successfully");


  }
  catch(e){
    console.log(e.message);
    res.status(400).json();
  }

})

router.post('/user/cart/remove',isLoggedIn, async(req,res)=>{

    try{
        const {productid} = req.body;

        const userid = req.user;
   
        const user = await User.findByIdAndUpdate(userid,{$pull: {cart:productid}});

       

        res.status(200).json("Removed Successfully");

    } catch(e){
        console.log(e.message) ;
        res.status(400).send("Cannot Remove from Cart");
    }


})






module.exports = router;