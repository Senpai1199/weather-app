const path = require("path")
const hbs = require("hbs")

const geoCode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const express = require("express")

console.log(__dirname)
console.log(path.join(__dirname, '../public/index.html'))

const app = express()

const port = process.env.PORT || 3000

// Define paths for express conf ig
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') // Handlebars -> template engine
app.set('views', viewsPath) // templates path
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Divyansh Agarwal"
    }) // hbs file
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Divyansh Agarwal"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "This is some useful text.",
        title: "Help Page",
        name: "Divyansh Agarwal"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address."
        })
    }
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            else if (forecastData) {
                res.send({
                    temperature: forecastData.main.temp,
                    location: location,
                    windSpeed: forecastData.wind.speed,
                    address: req.query.address

                })
            }
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term."
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render("404", {
        message: "Help article not found",
        name: "Divyansh Agarwal"
    })
})

app.get('*', (req, res) => { // * -> match anything that doesn't exist
    res.render("404", {
        message: "Page not found"
})})

app.listen(port, () => {
    console.log("Server is running on port: ", port)
})

