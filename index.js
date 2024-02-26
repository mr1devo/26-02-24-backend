//import express 
const express=require("express")
const cors=require("cors")

const Placeroute = require('./routes/Placeroute');
const Hotelroute = require('./routes/Hotelroute');
const Restraroute = require('./routes/Restraroute');
const Loginroute = require('./routes/Loginroute');
const Signuproute = require('./routes/Signuproute');
const Database = require("./Connection/Database");

//initializing
const app = new express();

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());


//api creation
app.get('/',(request,response)=>{
    response.send("hi")
})

app.use("/Placedetails", Placeroute);

app.use("/Hoteldetails", Hotelroute);

app.use("/Restradetails", Restraroute);

app.use("/Login", Loginroute);

app.use("/Signup", Signuproute);


//Port
app.listen(4005, (request, response) => { 
  console.log("Server is running on port 4005");
});