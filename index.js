import express from 'express';
import {foremen ,Orders } from './db';


const app = express();

app.post('/', (req, res) => {
  console.log("Stk Request Found here");
    console.log(req.params);
  console.log(req.body);


  let sessionId = req.body.sessionId;
  let serviceCode = req.body.serviceCode;
  let phoneNumber = req.body.phoneNumber;
  let text  = req.body.text;

  var length = text.split("*").length
  var txt = req.body.split("*")

  if(text === ""){
      message  = "Welcome to Inuua Diburse "
  }
  else if ( text === "1" ){
    message = "Choose which item you want to Disburse"
  }
  else if ( text === "2"){

  }
  else if (text === "3"){

  }
  else {
     message = "END = Wrong input"
  }
  res.send(message,200)
})

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
