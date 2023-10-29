const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database connected...")
}).catch((error)=>{
    console.log(error)
})

app.listen(3000,()=>{
    console.log("server running on port 3000 ...");
})