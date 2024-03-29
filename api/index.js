const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express();
const userRouter  = require('./routes/user.route')
const authRouter = require('./routes/auth.route')
const listingRouter = require('./routes/listing.route')
const  cookieParser = require('cookie-parser');


// .env config 
dotenv.config();

// for json data transfer
app.use(express.json())

//cookie
app.use(cookieParser())


//database connection
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database connected...")
}).catch((error)=>{
    console.log(error)
})


// routes begin from here
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/listing',listingRouter)



// middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

//server
app.listen(3000,()=>{
    console.log("server running on port 3000 ...");
})