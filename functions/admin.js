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

let db = admin.firestore();
stockRef = db.collection('Stock')
TransactionRef = db.collection('Transaction')

const app = express();
app.use(cookieParser)

const CreateTransaction = async (Transaction) => {
  TransactionRef.doc().set(Transaction)
    .then((pr) => {
      //res.status(200).send({ error: false })
      return true
    })
    .catch((err) => {
      // res.status(500).send({ error: true, message: err })
      return false
    })
}


app.post('/', (req, res) => {
  if (!req.body.name || !req.body.amount || !req.body.itype || !req.body.measurements) {
    res.status(422).send({ error: true, message: "Incomplete information" })
  }
  else {
    //Save Stock to Db
    stockRef.doc().set({
      name: req.body.name,
      amount: req.body.amount,
      itype: req.body.itype,
      measurements: req.body.measurements
    })
      .then((pr) => {
        res.status(200).send({ error: false })
      })
      .catch((err) => {
        res.status(500).send({ error: true, message: err })
      })
  }
})

app.post("/transaction", () => {
  if (!req.body.productid || !req.body.amount || !req.body.name || !req.body.time || !req.body.labourer) {
    res.status(422).send({ error: true, message: "Incomplete information" })
  }
  else {
    let trans = { product: req.body.productid, amount: req.body.amount, name: req.body.name, time: req.body.time, labourer: req.body.labourer }
    if (await CreateTransaction(trans)) {
      //Transaction 
      DecreaseBy = firebase.firestore.FieldValue.increment(-req.body.amount);
      db.collection('Stock').doc(req.body.productid)
        .update({
          amount: DecreaseBy
        })
    }


  }
  //Add Transaction 

  //if Succesful update Stock

})

app.get('/', (req, res) => {
  //Retreive the Stock and current amounnt
  stockRef.get()
    .then((snapshot) => {
      //snapshot.forEach((doc) => {
      // console.log(doc.id, '=>', doc.data());
      // });
      res.status(200).send({ error: false, message: snapshot })
    })
    .catch((err) => {
      console.log('Error getting documents', err);
      res.status(500).send({ error: true, message: err })
    });

})

app.get('/transaction', (req, res) => {
  //Retreive  All transaction 
  TransactionRef.get()
    .then((snapshot) => {
      //snapshot.forEach((doc) => {
      // console.log(doc.id, '=>', doc.data());
      // });
      res.status(200).send({ error: false, message: snapshot })
    })
    .catch((err) => {
      console.log('Error getting documents', err);
      res.status(500).send({ error: true, message: err })
    });
  //res.status(200).send({ error: false, message: [] })
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