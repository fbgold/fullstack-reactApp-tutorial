const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dbConnection = require('./database/connection');
//const cityTbl = require('./database/model/cities');
const serviceController = require('./api/cities');
const weatherController = require('./api/weather');

const ENV = process.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', '*'); 
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,PATCH');
        return res.status(200).json({});
    }
    next();
});

 
app.use('/api/cities',serviceController);
app.use('/api/weather', weatherController);

app.listen(PORT, () =>{
    console.log(`Server listening on port ${PORT}...!!!`)
});

module.exports = app;

