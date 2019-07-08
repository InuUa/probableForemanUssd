//import { foremen, Orders } from './db';
const fore = require('./db')
const Orders = require('./db')

const admin = require('firebase-admin')
let db = admin.firestore();

var foremen = fore.foremen

var CheckUser = function (Phone)  {
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

var  Getuser =function (Phone)  {
    return foremen.find(function (foreman) {
        console.log(foreman.msisdn);
        console.log("bb"+Phone);
        
        return foreman.msisdn == Phone  
    }
        )
}

var MapPin = function(Pin, Phone)  {

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


var UpdateTrans = function (id,data) {
    db.collection("Disbursment")
    .doc(id)
    .set(data)
    .then(p => console.log(p))
    .catch(e => console.log(e))
}


module.exports.CheckUser=CheckUser
module.exports.Getuser=Getuser
module.exports.MapPin=MapPin 
module.exports.AddTransaction=AddTransaction
module.exports.UpdateTrans=UpdateTrans
