

function init() {

    var listobject = JSON.parse(localStorage.getItem("booklist")) || [];
    if (listobject.length > 0) {
        document.getElementById("booklist-message").style.display="none";
    }
    else {
        document.getElementById("booklist-message").style.display="block";
    }


var mylist = document.querySelector("#book-list");

mylist.innerHTML = "";

document.getElementById("recommendation").style.display = "none";

var col1 = document.createElement("ul");
mylist.appendChild(col1);
for (i = 0; i< listobject.length; i++) {
    row1 = document.createElement("li");
    row1.setAttribute("id",i);
    col1.appendChild(row1);
    row1.innerHTML = "<img src=" + listobject[i].cover + ">";   
}

var col2 = document.createElement("ul");
mylist.appendChild(col2);
for (i = 0; i< listobject.length; i++) {
    row2 = document.createElement("li");
    row2.setAttribute("id",i);
    col2.appendChild(row2);
    row2.innerHTML = listobject[i].name;  
}

var col3 = document.createElement("ul");
mylist.appendChild(col3);
for (i = 0; i< listobject.length; i++) {
    row3 = document.createElement("li");
    col3.appendChild(row3);
    button3 = document.createElement("button");
    button3.textContent = "Read";
    button3.setAttribute("type","submit");
    button3.setAttribute("id", i);
    button3.setAttribute("class","search-button");
    button3.setAttribute("onclick","readitem()");  
    row3.appendChild(button3);
}




}

init();


function search() {

    var searchitem = document.querySelector("#searchinput").value;
    var APIKEY = 'AIzaSyC1iMASMU6DwdM0oMSW9ZiO5QiaDSTIZNk';
    var APIKEY2 = 'nnbTrsxHfwrtdzCksGQ6yg9u7OtZCQZG';

    fetch('https://www.googleapis.com/books/v1/volumes?key='+APIKEY +'&q='+ searchitem)
    .then(response => response.json())
    .then(function(response) {
        console.log(response)
        console.log(response.items[1].volumeInfo.imageLinks.thumbnail)

        var bookcover = response.items[0].volumeInfo.imageLinks.thumbnail;
        var bookname = response.items[0].volumeInfo.title;
        var linktobook = response.items[0].selfLink;


        var coverimg = document.querySelector("#activebook-img");
        coverimg.setAttribute("src",bookcover);
        coverimg.setAttribute("alt",linktobook);

        var useroptions = document.querySelector("#user-options");
        useroptions.setAttribute("style","display:block");

        var titledisplay = document.querySelector("#activebook-title");
        titledisplay.innerHTML = bookname;

        var authorrec = response.items[0].volumeInfo.authors;


        return fetch('https://api.nytimes.com/svc/books/v3/reviews.json?author='+authorrec + '&api-key='+APIKEY2)
        .then(response => response.json())
        .then(function(response) {
            console.log(response)

            var listrec = [];

            for (i = 0;i<response.results.length; i++) {
                listrec[i] = response.results[i].book_title;
            }
        
            var pick3 = [listrec[0],listrec[1],listrec[2]];
            console.log(pick3[0]);
            if (pick3[0] === undefined ) {
               document.getElementById("recommendation").style.display = "none";
            }
            else {
                document.getElementById("recommendation").style.display = "block";
            }

                return fetch('https://www.googleapis.com/books/v1/volumes?key='+APIKEY +'&q='+ pick3[0])
                .then(response => response.json())
                .then(function(response) {
                    var reccover0 = response.items[1].volumeInfo.imageLinks.thumbnail;
                    document.getElementById('rec-0').setAttribute("src",reccover0);


                return fetch('https://www.googleapis.com/books/v1/volumes?key='+APIKEY +'&q='+ pick3[1])
                .then(response => response.json())
                .then(function(response) {
                    var reccover1 = response.items[1].volumeInfo.imageLinks.thumbnail;
                    document.getElementById('rec-1').setAttribute("src",reccover1);

                return fetch('https://www.googleapis.com/books/v1/volumes?key='+APIKEY +'&q='+ pick3[2])
                .then(response => response.json())
                .then(function(response) {
                    var reccover2 = response.items[1].volumeInfo.imageLinks.thumbnail;
                    document.getElementById('rec-2').setAttribute("src",reccover2);
                })


        })
    })

    })

})

}


function addtolist() {

    var listobject = JSON.parse(localStorage.getItem("booklist")) || [];


    var bookcover = document.querySelector("#activebook-img").getAttribute("src");
    var bookname = document.querySelector("#activebook-title").innerHTML;
    var linktobook = document.querySelector("#activebook-img").getAttribute("alt");

    var booklist = {
        name:bookname,
        cover:bookcover,
        link:linktobook,
    }

    listobject.push(booklist);
    localStorage.setItem("booklist", JSON.stringify(listobject));

    var mylist = document.querySelector("#book-list");

    mylist.innerHTML = "";

    var col1 = document.createElement("ul");
    mylist.appendChild(col1);
    for (i = 0; i< listobject.length; i++) {
        row1 = document.createElement("li");
        row1.setAttribute("id",i);
        col1.appendChild(row1);
        row1.innerHTML = "<img src=" + listobject[i].cover + ">";   
    }
    
    var col2 = document.createElement("ul");
    mylist.appendChild(col2);
    for (i = 0; i< listobject.length; i++) {
        row2 = document.createElement("li");
        row2.setAttribute("id",i);
        col2.appendChild(row2);
        row2.innerHTML = listobject[i].name;  
    }
    
    var col3 = document.createElement("ul");
    mylist.appendChild(col3);
    for (i = 0; i< listobject.length; i++) {
        row3 = document.createElement("li");
        col3.appendChild(row3);
        button3 = document.createElement("button");
        button3.textContent = "Read";
        button3.setAttribute("type","submit");
        button3.setAttribute("id", i);
        button3.setAttribute("class","search-button");
        button3.setAttribute("onclick","readitem()");  
        row3.appendChild(button3);
    }

    
    if (listobject.length > 0) {
        document.getElementById("booklist-message").style.display="none";
    }

    
}



function readitem() {

    var listobject = JSON.parse(localStorage.getItem("booklist")) || [];
    
    var toberemoved = event.target.id;
    console.log(toberemoved);
    listobject.splice(toberemoved,1);

    localStorage.setItem("booklist", JSON.stringify(listobject));

    init();
}