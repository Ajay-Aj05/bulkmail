const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
app.use(cors())
app.use(express.json())

const nodemailer = require("nodemailer");
mongoose.connect("mongodb+srv://Ajay:ajayajay@cluster0.pujte3u.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0").then(function(){
  console.log('success to db')
})
const credential = mongoose.model("credential",{},"bulkmail")


// Create a test account or replace with real credentials.




app.post("/sendemail",function(req,res){
  var msg = req.body.msg
  var emaillist = req.body.emaillist
  console.log(msg)
 
  
 credential.find().then(function(data){
  console.log(data[0].toJSON().user)
  const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
  user:data[0].toJSON().user,
  pass:data[0].toJSON().pass,
  },tls:{
    rejectUnauthorized:false,
  },
});
new Promise(async function(resolve,reject){
  try{
   for(i=0;i<emaillist.length;i++){
   await transporter.sendMail({
    from:"ajay.namakkal@gmail.com",
    to:emaillist[i],
    subject:"message from ajay",
    text:msg,},
    )
    console.log("email send to :"+ emaillist[i])
  }
  resolve("success")
  
}
 catch(error){
  reject("fail")
 }

  }).then(function(){
    res.send(true)
  }).catch(function(){
    res.send(false)
  })
})





})




app.listen(4000,function(){
    console.log("started")
})