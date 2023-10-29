const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express();
const userRouter  = require('./routes/user.route')
const authRouter = require('./routes/auth.route')


// .env config 
dotenv.config();

app.use(express.json())


//database connection
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database connected...")
}).catch((error)=>{
    console.log(error)
})


// routes begin from here
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)



//server
app.listen(3000,()=>{
    console.log("server running on port 3000 ...");
})