const express = require("express")
const app =express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
var urlParser = bodyParser.urlencoded({extended:false});
//app.use(express.static("public"));
var path = require('path');
app.use(express.static(path.join(__dirname, 'frontend')));
const hostname = '0.0.0.0';

app.use(bodyParser.json());


mongoose.connect("mongodb+srv://jasnasuresh:Pureheart123@cluster0.f8atr.mongodb.net/Customers?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true},() => {
    console.log("Database connected for customers")
})

const http = require('http').Server(app)
var urlParser = bodyParser.urlencoded({extended:false});
var url = require('url');
const { resolve } = require('path');
const { rejects } = require('assert');
var adr = 'https://www.w3schools.com';

require("./Customer")
const Customer = mongoose.model("Customer")

app.post("/customer", urlParser,async(req,res) => {
    var newCustomer = {
        membership_id: req.body.membership_id,
        name:req.body.name,
        email: req.body.email
    }

    var customer = new Customer(newCustomer)

    customer.save().then(() => {
        res.send("Customer created");
    }).catch((err) => {
        if(err){
            throw err
        }
    
    })
    })
    app.get('/customer1',function(req,res) {

        //console.log(req.params);
        //res.sendFile('customer.html', { root: __dirname }); 
        res.sendFile(path.join(__dirname,'frontend/customer.html'));
        // var d=window.document.getElementById('login_input').reset();
      
        //console.log(__dirname)
       // var membership_id = req.query.membership_id;
        //var name = req.query.name;
        //var email = req.query.email;

    
        //var q = url.parse(adr, true);
        
      
      });
    app.get("/customers", (req,res) => {
        Customer.find().then((customers) => {
            res.json(customers)
        }).catch((err) => {
            if(err){
            throw err
        }
        })
    })

    app.get("/customer/:id", (req,res) => {
        Customer.findById(req.params.id).then((customer) => {
            if(customer){
                res.json(customer)
            }else{
                res.send("Invalid Id")
            }
            }).catch((err)=> {
                if(err){
                    throw err
                }
            })
        })

        app.delete("/customer/:id",(req,res) => {
            Customer.findByIdAndRemove(req.params.id).then(() => {
                res.send("Customer deleted")

            }).catch((err) => {
                if(err){
                    throw err
                }
            })
        })
    
app.listen("3001",hostname,() => {
    console.log("Running customers service")
})