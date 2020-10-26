const express = require('express')
const path = require('path')
const hbs = require('hbs')
const myFetch = require('./utils/fetchMovieInfo')
const fetchNounInfo = require('./utils/fetchNounInfo')


const app = express()

//Define paths for Express
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.use(express.static(path.join(__dirname, '../public')))

// Define handlebars engine setup and views/partials locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Star Wars',
        name: "Ben Murphy",
    })
})

app.get('/filmDetails/:id', (req, res) => {
    res.render('filmDetails', {
        title: 'Star Wars',
        name: "Ben Murphy",
    })
})

app.get('/api/filmDetails/:id', (req, res) => {
    myFetch.fetchAll(req.params.id).then((info) => {
        res.send(info)
    }).catch((e) => {
        console.log(e)
    })
})

app.get('/character/:id', (req, res) => {
    myFetch.fetchThings(['http://swapi.dev/api/people/' + req.params.id + '/']).then((info) => {
        return res.render('people', {
            title: info[0].name,
            name: "Ben Murphy",
            nounData: info[0]
        })
    }).catch((e) => {
        return res.render('404', {
            errorMessage: e,
            title: '404',
            name: "Ben Murphy"
        })
    })
})

app.get('/planets/:id', (req, res) => {
    myFetch.fetchThings(['http://swapi.dev/api/planets/' + req.params.id + '/']).then((info) => {
        return res.render('planets', {
            title: info[0].name,
            name: "Ben Murphy",
            nounData: info[0]
        })
    }).catch((e) => {
        return res.render('404', {
            errorMessage: e,
            title: '404',
            name: "Ben Murphy"
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404',
        name: "Ben Murphy"
    })
})




app.listen(3000, () => {
    console.log('Server is up on port 3000')
})