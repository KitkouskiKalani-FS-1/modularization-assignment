const express = require('express');
const userRoute = require('../api/routes/userRoute');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("../config/swaggerOptions");

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

app.use((req,res,next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if(req.method === 'OPTION'){
        res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE');
    }
    next();
})

app.get('/', (req,res) =>{
    res.status(200).json({
        message: 'Service is up',
    });
});

app.use('/users', userRoute);

//middleware to api-docs
console.log(swaggerDocs);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use((req,res,next)=>{
    const error = new Error('Not Found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500).json({
        error:{
            message: error.message,
            status: error.status,
        }
    })

});

mongoose.connect(process.env.mongoDBURL, (err) =>{
    if(err){
        console.log('Error: ', err.message);
    } else {
        console.log('MongoDB connection successful');
    }
})

module.exports = app;