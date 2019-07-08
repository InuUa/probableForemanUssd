const functions = require('firebase-functions')
//var GuruvestMobileApi = require('guruvest_mobile_api')
const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')
//const validateFirebaseIdToken = require('../utils/auth.js')
const cookieParser = require('cookie-parser')()
//const app = express()
//import express from 'express';
const foremen =require('./db')
const Orders = require('./db')
//import {foremen ,Orders } from './db';

const app = express();
app.use(cookieParser)



app.post('/',()=>{

})

//app.put('/'()=>{
//})

app.get()



let myfunction = (req, res) => {
    if (!req.path) {
      req.path = '/'
      req.url = '/' + req.url
    }
    app(req, res)
  }
  
  // Expose Express API as a single Cloud Function:
  module.exports = functions.https.onRequest(myfunction)