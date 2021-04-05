const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser());
app.use(express.json());

mongoose.connect('mongodb+srv://shivam:test123@sandbox.3bkoa.mongodb.net/FundIndia?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true},()=>console.log('connected to database'));

app.listen(4000,console.log('server up and running'));
