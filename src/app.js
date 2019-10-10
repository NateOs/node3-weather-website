//server side JS
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const queryString = require('querystring')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//initialising express app
const app = express()

//paths definitions
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setting hbs and view loc
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setting up static path
app.use(express.static(publicDirectoryPath)) //static directory serves css, img etc

//routes setup

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nate Sodja'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nate Sodja'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
    title: 'Help',
    name: 'Nate Sodja'    })
})

//weather route handler
app.get('/weather', (req, res) => {
    if (!req.query.address){ //request query is used to grab user entry from browser
        return res.send({
            error: 'You must provide an address'
        })
    } 
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
    // console.log(req.query.address)

//geocoding
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => 
  {
    if (error)
    {
      return res.send(error)
    }
//getting forecast with coordinates with darksky api
     forecast(latitude, longitude, (error, forecastData) => {
      if (error)
      {
        return res.send({error})
      }

     res.send({
        forecast: forecastData,
        location,
        address: req.query.address
    })
   })
})
})

// app.get('/products', (req, res) => {
//     if (!req.query.search){
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }
//     res.send({
//         products: []
//     })
//     console.log(req.query.search)
// })

//rendering 404 for unavailable help article
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorText: '404, Help article not found',
        name: 'Nate Sodja',
        title:'404'
    })
})

//rendering 404 for pages that are unavailable
app.get('*', (req, res) => {
    res.render('404', {
        errorText: '404, Page not found',
        name: 'Nate Sodja',
        title: '404'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})