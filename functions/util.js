//import { foremen, Orders } from './db';
const fore = require('./db')
const fetch = require('node-fetch');
const Orders = require('./db')
const admin = require('firebase-admin')
let db = admin.firestore();
const options = {
    apiKey: '8a405df281daf796bf3b8394c9addf67e113b3f9655040dd65652fb8aa3e963c',// use your sandbox app API key for development in the test environment
    username: 'sandbox',      // use 'sandbox' for development in the test environment
};
const AfricasTalking = require('africastalking')(options);
const sms = AfricasTalking.SMS;





var foremen = fore.foremen

var CheckUser = function (Phone) {
    console.log(Phone)
    var found
    for (var i = 0; i < foremen.length; i++) {
        if (foremen[i].msisdn === Phone) {
            console.log('true')
            found = true;
            //return foremen[i]
            break;
        }
    }
}

var Getuser = function (Phone) {
    return foremen.find(function (foreman) {
        return foreman.msisdn === Phone
    }
    )
}

var MapPin = function (Pin, Phone) {

    user = foremen.find((foreman) => foreman.msisdn === Phone)

    if (user.pin === Pin) {
        return true
    }
    else {
        return false
    }

}

var AddTransaction = function (trans) {
    db.collection("Disbursment")
        .add(trans)
        .then(p => console.log(p))
        .catch(e => console.log(e))
}


var UpdateTrans = function (id, data) {
    db.collection("Disbursment")
        .doc(id)
        .set(data)
        .then(p => console.log(p))
        .catch(e => console.log(e))
}

var GetStock = function () {
    return db.collection("Stock")
        .get()
        .then(p => console.log(p))
        .catch(e => console.log(e))
}
/* headers: new Headers({
            'Content-Type': 'application/json'
        })*/


var SendSms = function (phone) {
    // Initialize a service e.g. SMS
    console.log("Tried to send sms")
    //console.log(sms.send(options));

    const option = {
        to: ['+254726504619'],
        message: "Testing Confirm to inuua That  you are picking cement  20 replying with following code"
    }
    return new Promise(
        function (res, rej) {
            sms.send(option)
                .then(function (response) {
                    console.log(response)
                    res(response)
                })
                .catch(function (error) {
                    console.log(error);
                    rej(error)
                })
        }
    )

    // Send message and capture the response or error

}

var FindTrans = function (code, phone) {
    console.log(phone + "::" + code)
}



module.exports.CheckUser = CheckUser
module.exports.Getuser = Getuser
module.exports.MapPin = MapPin
module.exports.AddTransaction = AddTransaction
module.exports.UpdateTrans = UpdateTrans
module.exports.GetStock = GetStock
module.exports.SendSms = SendSms
module.exports.FindTrans = FindTrans