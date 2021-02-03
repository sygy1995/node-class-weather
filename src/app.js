const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
// heroku port
const port = process.env.PORT || 3000;

// current directory and current file in __dirname and __filename
// use public dir for static stuffs
const punlicPath = path.join(__dirname,'../public');
app.use(express.static(punlicPath));
const viewPath = path.join(__dirname,'../templates/views');
// set to use the view diectory
app.set('views',viewPath);
// path to headers/footers (partial)
const partialsPath = path.join(__dirname,'../templates/partials');
hbs.registerPartials(partialsPath);

// what to be sent back when visited

// get handelbar set up (module name hbs)
app.set('view engine', 'hbs');
// will go to the view folder (by default) to find the desitnation of render
// can serve up dynamic content
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Yifan'
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Yifan'
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Yifan',
        help_text: 'Example help message'
    });
});

app.get('/weather', (req, res)=> {
    const query = req.query;
    if (!query.address) {
        return res.send({error: 'Please provide an address!'});
    } else{
        const address = query.address

        if (!address) {
            return res.send({error: 'Please provide an address!'});
        } else{
            // default object helps the prevent destructuring of empty object
            // or just not use the destructuring will also work
            geocode(address, (error, {latitude,longitude,location} = {}) => {
                if (error){
                    return res.send({error});
                }
                forecast(latitude, longitude, (error,  {weather, temperature, feels_like} = {}) => {
                    if (error) {
                        return res.send({error});
                    }
                    return res.send({
                        location,
                        weather,
                        temperature,
                        feels_like
                    });
                });
            });
        }
    }
    
});

// http response can only be sent once, return stops the function execution.
app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Yifan',
        message: 'Help article not found'
    });
})

// *wildcatd, math any unmatched
app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Yifan',
        message: 'Page not exist'
    });
})

// heroku use start script and provides the port
app.listen(port, () => {
    console.log('Server is up on port '+port);
});