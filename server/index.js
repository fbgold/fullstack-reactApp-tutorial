const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dbConnection = require('./database/connection');
const cityTbl = require('./database/model/cities');
const serviceController = require('./api/cities');
const weatherController = require('./api/weather');

const ENV = process.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api/cities',serviceController);
app.use('/api/weather', weatherController);
app.listen(PORT, () =>{
    console.log(`Server listening on port ${PORT}...!!!`)
});

cityTbl.findAll()
.then(city => {
    console.log(city[0].id,' - ', city[0].city_name);
})
.catch(err => {
    console.log(err);

});

module.exports = app;

