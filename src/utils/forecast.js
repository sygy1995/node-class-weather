const request = require('request');

const forecast = (latitude, longtigude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c6a8760657d99effd1826f4b5aeb9ce3&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longtigude)+'&units=m';
    // property shorthand with url
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (response.body.error) {
            callback('invalid input',undefined);
        } else {
            callback(undefined,{
                weather: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                feels_like: response.body.current.feelslike
            });
        }
        
    });
};

module.exports = forecast;