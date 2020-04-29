const request = require("request")

const forecast = (lat, long, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(long)}&appid=de87993c03af3f1c90ebc9f2a863a6ec`
    request({ url, json: true }, (error, { body }) => {
            if (error) {
                callback("Unable to connect to weather services.", undefined)
            } else if (body.error) {
                callback("Cant find forecast details.", undefined)
            }   
            else{
                callback(undefined, body)
            }
        })
}

module.exports = forecast