const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')
//const validateFirebaseIdToken = require('../utils/auth.js')
const cookieParser = require('cookie-parser')()


const foremen = require('./db')
const Orders = require('./db')
const Getuser = require('./util')
const MapPin = require('./util')
const app = express();
app.use(cookieParser)
let db = admin.firestore();
const options = {
  apiKey: '080101f8341ad3185d5ffb60989270c61b1b4fc4b29a372a36fe0e9e76f73a76',// use your sandbox app API key for development in the test environment
  username: 'sandbox',      // use 'sandbox' for development in the test environment
};
//const options = {
//  apiKey: '6ce00c96f9141b6d84b23d316a7d9ef3686873dc866aba12cc043d082cd998ac',// use your sandbox app API key for development in the test environment
//  username: 'Inuua Tujenge',      // use 'sandbox' for development in the test environment
//};
const AfricasTalking = require('africastalking')(options);
const sms = AfricasTalking.SMS;


app.post('/', (req, res) => {
  if (!req.body.sessionId || !req.body.serviceCode || !req.body.phoneNumber) {
    res.status(422).send({ "message": "Error in messages" })
  }

  let sessionId = req.body.sessionId;
  let serviceCode = req.body.serviceCode;
  let phoneNumber = req.body.phoneNumber;
  let text = req.body.text;

  Getuser.SendSms("PHONE")

  var length = text.split("*").length
  var txt = text.split("*")

  let message = ""

  if (text === '') {

    let user = Getuser.Getuser(phoneNumber)


    if (user) {

      message = `CON Hi ${user.name} Welcome to Inuua Diburse.   \n`
      message += '1: Disburse Stock\n';
      message += '2: Verify Delivery\n';

    }
    else {
      message = `END We dont seem to have your number with us . Kindly contact us `
    }

  }

  else if (length === 1 && txt[0] === '1') {
    message = 'CON Choose for  what part of the building  \n';
    message += '1: Walling \n';
    message += '2: Roofing\n';
    message += '3: Excavation\n';
    // message += '4: Mark device as sold';;
  }
  else if (length === 2 && txt[0] === '1') {

    var tt = Getuser.GetStock()
    //console.log(tt)

    message = 'CON Choose the Stock you want to disburse  \n';
    message += '1: Cement Bag \n';
    message += '2: Window Panes\n';
    message += '3: Sand\n';


    // message += '4: Mark device as sold';;
  }
  else if (length === 3 && txt[0] === '1') {

    message = 'CON Enter the Amount you want to disburse   \n';
  }
  else if (length === 4 && txt[0] === '1') {
    message = 'CON Enter the Phone of the Labourer you want to disburse to  \n';



  }
  else if (length === 5 && txt[0] === '1') {
    //console.log("4::" + text[4])

    message = 'CON Confirm disburse by Entering Pin \n';
  }
  else if (length === 6 && txt[0] === '1') {
    message = 'END Disbursed using Inuua .Should receive a confirmation text in minutes \n';
  }

  else if (length === 9) {

    check = MapPin(text, phoneNumber)

    if (check) {
      message = 'CON Choose the Stock you want to disburse  \n';
      message += '1: Enter new device \n';
      message += '2: Enter sales person\n';
      message += '3: Check status of mobile device\n';
      message += '4: Mark device as sold';

    } else {
      message = `END Wrong Pin Entered `
    }



  }
  else {
    message = "END = Wrong input"
  }


  //console.log(message)



  res.status(200).send(message)
})


app.post('/sms', (req, res) => {

  console.log(JSON.stringify(req.body))
  if (!req.body.from || !req.body.text || !req.body.linkId || !req.body.to) {
    res.status(422).send({ "message": "Error in the body" })
  }
  let date = req.body.date;
  let from = req.body.from;
  let linkId = req.body.linkId;
  let text = req.body.text;
  let to = req.body.to;
  let networkCode = req.body.networkCode;
  //console.log(Getuser.Getuser)
  let user = Getuser.Getuser(from)

  if (user) {

    Getuser.FindTrans(text, user.msisdn)

    res.status(200).send("")
  } else {
    //console.log("message from non users");
    res.status(200).send("we good hommie,  i will take from here")
  }


})




let myfunction = (req, res) => {
  if (!req.path) {
    req.path = '/'
    req.url = '/' + req.url
  }
  app(req, res)
}


module.exports = functions.https.onRequest(myfunction)
