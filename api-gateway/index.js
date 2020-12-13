const express = require('express');
const fetch = require('node-fetch');
// Create the Server Instance
const app = express();
var bodyParser = require('body-parser');
//var router = require('./books/books')
const PORT = process.env.PORT || 3003;
var path = require('path');
var urlParser = bodyParser.urlencoded({extended:false});

app.use(express.static(path.join(__dirname, 'frontend')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

// This meta data is used for every request so we can define it once as a constant.
const fetchData = {
    method: "POST",
    headers: {
        "Content-Type":"application/json"
    }
}
/*
Tell express to use its static and JSON middleware.
If the server recevies JSON in a request's body it will automatically convert the JSON to a JavaScript object.
Since the server also hosts the frontend of our application we have to allow .css and .js files to 
be accessed from the server from a static directory.
*/
//app.use('/static', express.static(__dirname + '/public'));
app.use(express.json());

/*
 Configure the REST paths for the server.
 Express provides functions to add paths. app.get() will listen for GET requests, app.post() for POST requests.
 These functions require the url part to listen to and a callback function to execute when something arrives at this url.
 The callback function to execute receives the request (req) and a JavaScript Object containing multiple reply functions (res) from express.
 At the end of our callback we use the reply functions to fulfill a request.
*/

/* 
Provide the frontend.
If a request is made to the URL paths specified the server sends the corresponding HTML files.
*/

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/ind2.html');
});
//app.use(router)

app.get('/customer1', (req, res) => {
    res.sendFile(__dirname + '/frontend/customer.html')
});

app.get('/book1', (req, res) => {
    res.sendFile(__dirname + '/frontend/books.html')
});

app.get('/borrow1', (req, res) => {
    res.sendFile(__dirname + '/frontend/borrows.html')
});



//app.use('/static', express.static(__dirname + '/frontend'));


app.post('/customer/add', (req, res) => {
    fetch('http://localhost:3001/customer', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/book/add',urlParser,async (req, res) => {
    fetch('http://localhost:3000/books', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});


app.post('/borrow/add', (req, res) => {
    fetch('http://localhost:3002/borrows', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
}); 
app.listen(PORT, () => console.log(`Api Gateway listening on ${PORT}`));