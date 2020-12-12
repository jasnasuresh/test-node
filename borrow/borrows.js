const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const axios = require("axios")
var path = require('path');
//app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'frontend')));

//CustomerID < --
//BookID < --
//DateBorrowed <--
//ExpectedReturn <--

app.use(bodyParser.json())

const http = require('http').Server(app)
var urlParser = bodyParser.urlencoded({extended:false});
var url = require('url');
const { resolve } = require('path');
const { rejects } = require('assert');
var adr = 'https://www.w3schools.com';

mongoose.connect("mongodb+srv://jasnasuresh:Pureheart123@cluster0.f8atr.mongodb.net/Borrow?retryWrites=true&w=majority",  {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Database connected for borrow")
})
require("./Borrow")
const Borrow = mongoose.model("Borrow")

app.post("/borrows",urlParser,async(req,res)=> {
    var newBorrow = {
        CustomerID:mongoose.Types.ObjectId(req.body.CustomerID),
        BookID:mongoose.Types.ObjectId(req.body.BookID),
        DateBorrowed:req.body.DateBorrowed,
        ExpectedReturn:req.body.ExpectedReturn
    }

    var borrow = new Borrow(newBorrow)

    borrow.save().then(() => {
        console.log("Book has been borrowed")
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
    res.send("Book borrowed")
})
app.get('/borrow1',function(req,res) {

    //console.log(req.params);
    //res.sendFile('borrows.html', { root: __dirname });     // var d=window.document.getElementById('login_input').reset();
    res.sendFile(path.join(__dirname,'frontend/borrows.html'));

    //console.log(__dirname)
    //var customer_id = req.customer_id;
    //var book_id = req.query.book_id;
    //var DateBorrowed = req.query.dateBorrowed;
    //var ExpectedReturn = req.query.ExpectedReturn;
    

    //var q = url.parse(adr, true);
    
  
  });
app.get("/borrowlist",(req,res) => {
    Borrow.find().then((books) => {
        res.json(books)
    }).catch((err) => {
        if(err){
            throw err
        }
    })
    })
app.get("/borrows/:id",(req,res) => {
    Borrow.findById(req.params.id).then((borrow) => {
        if(borrow){
                axios.get("http://localhost:3001/customer/" + borrow.CustomerID).then((response) => {
                   var borrowObject = {customername: response.data.name, bookTitle: ''}

                   axios.get("http://localhost:3000/book/"+ borrow.BookID).then((response) => {
                       borrowObject.bookTitle  = response.data.title
                       res.json(borrowObject)
                   })

                })
                
        }
        else{
            res.send("Invalid")
        }
    })
})

app.listen(3002, () => {
    console.log("Running borrow service")
})