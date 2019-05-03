var express= require('express')
var Cities = require('../database/model/cities')

var router = express.Router();

router.get('/', function(req,res){
    console.log("router Get..:")
    Cities.findAll()
    .then(cities => {
        return res.json(cities);
    })
    .catch(err => {
        return res.json(err);
    
    });
})

router.post('/', function(req, res){
    
    console.log("router Posting..: "+ req.body.city)

    let myBody = req.body.city;
    let city = new Cities();
    city.city_name = req.body.city;

    city.save().then((city)=>{
        console.log(`Inserted ${city.city_name}`)
        return res.json(city)
    })
    .catch(err =>{
        console.log("POST ERROR")
        return res.json(err)
    })
 })

 module.exports = router;
