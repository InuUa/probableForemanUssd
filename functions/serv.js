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
  apiKey: '8a405df281daf796bf3b8394c9addf67e113b3f9655040dd65652fb8aa3e963c',// use your sandbox app API key for development in the test environment
  username: 'sandbox',      // use 'sandbox' for development in the test environment
};
const AfricasTalking = require('africastalking')(options);
// Initialize a service e.g. SMS
sms = AfricasTalking.SMS

app.post('/', (req, res) => {
  if (!req.body.sessionId || !req.body.serviceCode || !req.body.phoneNumber || !req.body.text) {
    res.status(422).send({ "message": "Error in messages" })
  }

  let sessionId = req.body.sessionId;
  let serviceCode = req.body.serviceCode;
  let phoneNumber = req.body.phoneNumber;
  let text = req.body.text;

  var length = text.split("*").length
  var txt = text.split("*")
  console.log(text)
  console.log(length)
  let message = ""

  if (text === '') {
    //et check = CheckUser(phoneNumber)
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

    console.log("3::" + text[3])
    const options = {
      to: ['+254726504619'],
      message: "Confirm to inuua That  you are picking cement  20 replying with following code"
    }
    // Send message and capture the response or error
    sms.send(options)
      .then(function (response) {
        console.log(response)
        return response
      })
      .catch(function (error) {
        console.log(error);
        return error
      });

  }
  else if (length === 5 && txt[0] === '1') {
    console.log("4::" + text[4])

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


  console.log(message)


  res.status(200).send(message)
})


app.post('/sms', (req, res) => {

  if (!req.body.from || !req.body.text || !req.body.networkCode || !req.body.to) {
    res.status(422).send({ "message": "Error in the body" })
  }
  let date = req.body.date;
  let from = req.body.from;
  let linkId = req.body.linkId;
  let text = req.body.text;
  let to = req.body.to;
  let networkCode = req.body.networkCode;
  console.log(Getuser.Getuser)
  let user = Getuser.Getuser(from)

  if (user) {
    console.log(user);
    console.log(text);
    res.status(200).send(message)
  } else {
    console.log("message from non users");
    res.status(200).send(message)
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
