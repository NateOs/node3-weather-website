const request = require('request')

const forecast = (latitude, longitude, callback) => {

const url = 'https://api.darksky.net/forecast/1d8df331b4d847f5eef1f21405e1e938/'+ latitude + ',' + longitude

    request({ url, json:true }, (error, {body}={}) => {
        if (error) {
           callback('Unable to connect to weather services', undefined) 
      } else if (body.error) {
           callback('Unable to find location', undefined) 
      }else{
           callback(undefined, body.daily.data[0].summary + 'It is '+ body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + ' percent chance of rain' );

        }
    })
}



module.exports = forecast

