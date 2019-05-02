const request = require('request-promise');
const API_KEY = '6dfa01f742ba86c40b81080b7c7f57b8';

class Weather {
    static retrieveByCity(city,callback){
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`
        request({
            uri: url,
            json: true
        }).then((res)=>{
            callback(res)
        }).catch((err)=>{
            console.log(err)
            callback({error: 'Could not reach weather api'})
        })
    }
}

module.exports = Weather;
