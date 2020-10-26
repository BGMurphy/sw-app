console.log('Clientside js is loaded')

var url = window.location.pathname
var id = url.split('/')
fetch('http://localhost:3000/api/filmDetails/' + id[id.length - 1] + '/').then((response) => {
    response.json().then((movie) => {
        if(movie.error) {
            console.log(movie.error) 
        } else {
            console.log(movie)
            var movieDiv = document.createElement("div")
            var title = document.createElement("h2")
            var planets = document.createElement("h3")
            var characters = document.createElement("h3")
            var vehicles = document.createElement("h3")
            var director = document.createElement("P")
            var release = document.createElement("P")
            var item = document.createElement("P")

            movieDiv.id = movie.url
            release.innerText = movie.release_date
            title.innerText = movie.title 
            director.innerText = movie.director
            planets.innerText = "Planets"
            characters.innerText = "Characters"
            vehicles.innerText = "Vehicles"

            document.getElementById("mainDiv").appendChild(movieDiv)
            document.getElementById(movie.url).appendChild(title)
            document.getElementById(movie.url).appendChild(release)
            document.getElementById(movie.url).appendChild(director)

            document.getElementById(movie.url).appendChild(planets)
            movie.planets.forEach((planet) => {
                var li = document.createElement('li')
                item = document.createElement("a")
                var charNum = planet.url.split("/")
                item.href = 'localhost:3000/planets/' + charNum[charNum.length - 2]
                item.innerText = planet.name
                li.appendChild(item);
                document.getElementById(movie.url).appendChild(li)
            })

            document.getElementById(movie.url).appendChild(characters)
            movie.characters.forEach((character) => {
                var li = document.createElement('li')
                item = document.createElement("a")
                var charNum = character.url.split("/")
                item.href = 'localhost:3000/character/' + charNum[charNum.length - 2]
                item.innerText = character.name
                li.appendChild(item);
                document.getElementById(movie.url).appendChild(li)
            })

            document.getElementById(movie.url).appendChild(vehicles)
            movie.vehicles.forEach((vehicle) => {
                var li = document.createElement('li')
                item = document.createElement("a")
                item.innerText = vehicle.name
                li.appendChild(item);
                document.getElementById(movie.url).appendChild(li)
            })
        }
    })
})

