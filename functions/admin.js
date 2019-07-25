const functions = require('firebase-functions')
//var GuruvestMobileApi = require('guruvest_mobile_api')
const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')
//const validateFirebaseIdToken = require('../utils/auth.js')
const cookieParser = require('cookie-parser')()
//const app = express()
//import express from 'express';
const foremen = require('./db')
const Orders = require('./db')
//import {foremen ,Orders } from './db';

const app = express();
app.use(cookieParser)



app.post('/', (req, res) => {
  if (!req.body.name || !req.body.amount || !req.body.itype || !req.body.measurements) {
    res.status(422).send({ error: true, message: "Incomplete information" })
  }
  else {
    //Save Stock to Db

  }
})

app.post("/transaction", () => {
  if (!req.body.productid || !req.body.amount || !req.body.name || !req.body.time || !req.body.labourer) {
    res.status(422).send({ error: true, message: "Incomplete information" })
  }
  else {

  }
  //Add Transaction 
  //if Succesful update Stock

})

//app.put('/'()=>{
//})

app.get('/', (req, res) => {
  //Retreive the Stock and current amounnt
  res.status(200).send({ error: false, message: [] })
})

app.get('/transaction', (req, res) => {
  //Retreive  All transaction 

  res.status(200).send({ error: false, message: [] })
})



let myfunction = (req, res) => {
  if (!req.path) {
    req.path = '/'
    req.url = '/' + req.url
  }
  app(req, res)
}

// Expose Express API as a single Cloud Function:
module.exports = functions.https.onRequest(myfunction)