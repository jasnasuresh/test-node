const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const db = require('./main');
var path = require('path');
app.use(bodyParser.json());
const mongoose = require("mongoose");
var urlParser = bodyParser.urlencoded({extended:false});
//app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'frontend')));
const hostname = '0.0.0.0';
var router = express.Router()

const http = require('http').Server(app)
var urlParser = bodyParser.urlencoded({extended:false});
var url = require('url');
const { resolve } = require('path');
const { rejects } = require('assert');
//var adr = 'https://www.w3schools.com';
//const APIURL = 'http://localhost:3001/customer1';
require("./Book")
const Book = mongoose.model("Book")
//var MongoClient = require('mongodb').MongoClient;
//var uri = "mongodb://<username>:<password>@<hostname>/<dbname>?ssl=true&replicaSet=atlas-8cs00r-shard-0&authSource=admin&retryWrites=true&w=majority";
//MongoClient.connect(uri, function(err, client) {
  //const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  //client.close();
//});
mongoose.connect("mongodb+srv://jasnasuresh:Pureheart123@cluster0.f8atr.mongodb.net/LetsRead?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true},() => {
    console.log("Database is connected");
});


/*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://jasnasuresh:Pureheart123@cluster0.f8atr.mongodb.net/LetsRead?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log("Connected");
  client.close();
});*/



/*app.get('/',(req,res) => {
    console.log(req.params);
    //res.sendFile('ind2.html', { root: __dirname });    // var d=window.document.getElementById('login_input').reset();
    res.sendFile(path.join(__dirname,'frontend/ind2.html'));

    console.log(__dirname)
    

    //var q = url.parse(adr, true);
    
    //res.json(db.addBook(req.body));
 
});*/

app.post("/books",urlParser,async(req,res) => {
    var newBook = {
        id: req.body.ID,
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        edition: req.body.edition
    }


    var book = new Book (newBook)
    
    book.save().then(() => {
        console.log("New Book created")
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
    res.send("A new book is created")
})
/*app.get('/book1',function(req,res) {

    //console.log(req.params);
    //res.sendFile('books.html', { root: __dirname }); 
   res.sendFile(path.join(__dirname,'frontend/books.html'));

    // var d=window.document.getElementById('login_input').reset();
  
    //console.log(__dirname)
    //var id = req.query.id;
    //var title = req.query.title;
    //var author = req.query.author;
    //var publisher = req.query.publisher;
    //var edition = req.query.edition;

    //var q = url.parse(adr, true);
    
  
  });*/


app.get("/booklist", (req,res) => {
    Book.find().then((books) => {
        res.json(books)

    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

app.get("/books/:id",(req,res) => {
    Book.findById(req.params.id).then((book) => {
        if(book){
            res.json(book)
        }else{
            res.sendStatus(404);
        }
    


    }).catch(err => {
        if(err){
            throw err;
        }
    })
    
})

app.delete("/book/:id",(req,res) => {
    Book.findOneAndRemove(req.params.id).then(() => {
        res.send("Book removed")
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

app.listen(3000,hostname, () => {
    console.log("Up and running! -- This is our Books service");
})

module.exports = router