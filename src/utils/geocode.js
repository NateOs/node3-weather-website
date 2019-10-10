const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoic29kamFuYXRoYW4iLCJhIjoiY2p5ZGVpaGY2MHJuejNtcGIyZ2kybTgzNCJ9.bdp6GB4CrZGJ2RMnph9Vmg'
    request({ url, json:true }, (error, {body} = {}) => {
        if (error) {
           callback('Unable to connect to location services', undefined) 
      } else if (body.features.length === 0) {
           callback('Unable to find location', undefined) 
      }else{
          callback(undefined, {
              latitude: body.features[0].center[1],
              longitude: body.features[0].center[0],//i changed this to logitude,just incase the code doesn't run, chnage it back
              location: body.features[0].place_name
            })
        }
    })
}

module.exports= geocode