const request = require('request')
const util = require('util')
const fetch = require('node-fetch')

const fetchMovieInfo = async (id) => {
    const url = 'http://swapi.dev/api/films/' + id + '/'
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data) {
                resolve(data)
            } else {
                reject("Unable to resolve films")
            }
        }).catch((error => {
            console.log(error)
        }))
    })
}

const fetchThings = (urls) => {
    return new Promise((resolve, reject) => {
        Promise.all(urls.map((request) => {
            return fetch(request).then((response) => {
                return response.json();
            }).catch((e) => {
                return e
            });
        })).then((values) => {
            if(values[0].type != 'invalid-json') {
                resolve(values)
            } else {
                reject("Unable to resolve")
            }
        }).catch(console.error.bind(console));
    })
}

const fetchAll = async (id) => {
    const info = await fetchMovieInfo(id)
    let [planets, characters, vehicles] = await Promise.all([fetchThings(info.planets), fetchThings(info.characters), fetchThings(info.vehicles)]);
    info.planets = planets
    info.characters = characters
    info.vehicles = vehicles
    return info
}

module.exports = {
    fetchAll,
    fetchThings
}