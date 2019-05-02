var express= require('express')
var Cities = require('../database/model/cities')

var router = express.Router();

router.get('/', function(req,res){
    Cities.findAll()
    .then(cities => {
        return res.json(cities);
    })
    .catch(err => {
        return res.json(err);
    
    });
})

router.post('/', function(req, res){
    let myBody = req.body;
    let city = new Cities();
    city.city_name = req.body.city;
    city.save().then((city)=>{
        console.log(`Inserted ${city.city_name}`)
        return res.json(city)
    })
    .catch(err =>{
        return res.json(err)
    })
 })

 module.exports = router;
