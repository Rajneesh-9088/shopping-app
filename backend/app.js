const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/product');
const seedDB = require('./seed');
require('dotenv').config();
const cookieParser = require('cookie-parser');


mongoose.connect(process.env.MONGO_URI, 
{    
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false,
     useCreateIndex: true
}).then(()=>{console.log("DB Connected")})
.catch((err)=>{console.log(err)});

    // seedDB();

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes') ;


app.use(express.json()); 
app.use(cookieParser());// parse incoming body
app.use(authRoutes);
app.use(productRoutes);



app.get('/hello',(req,res)=>{
    res.status(200).send("Hello Rajneesh");
})

app.use(productRoutes);


app.listen(3003,()=>{
    console.log("Server started at port 3003");
})