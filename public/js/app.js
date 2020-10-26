console.log('Clientside js is loaded')

function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myList");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        item = li[i].getElementsByTagName("a")[0];
        txtValue = item.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

fetch('https://swapi.dev/api/films/').then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error) 
        } else {
            data.results.forEach(movie => {
                var charNum = movie.url.split("/")
                var item = document.createElement("a")
                var li = document.createElement('li');
                item.href = 'localhost:3000/filmDetails/' + charNum[charNum.length - 2]
                item.innerText = movie.title
                li.appendChild(item);
                document.getElementById("myList").appendChild(li)
            })
        }
    }).catch((error => {
        console.log(error)
    }))
})