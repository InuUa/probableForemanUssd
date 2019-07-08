const functions = require('firebase-functions');
const admin = require('firebase-admin')

//var serviceAccount = require('./guruvest-website-firebase-adminsdk-fujoe-1082da4e47.json')
//admin.initializeApp({
//  credential: admin.credential.cert(serviceAccount),
//  storageBucket: 'guruvest-website.appspot.com/'
//})
admin.initializeApp(functions.config().firebase);


const verify = require('./serv')

exports.verify = verify
