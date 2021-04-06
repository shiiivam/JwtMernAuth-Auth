const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();
app.use(cookieParser());
app.use(express.json());

const mongo_url = process.env.MONGODB_CONN;

mongoose.connect(mongo_url,{useNewUrlParser: true, useUnifiedTopology: true},()=>console.log('connected to database'));

const userRouter = require('./routes/User');
app.use('/user',userRouter)

app.listen(4000,console.log('server up and running'));
