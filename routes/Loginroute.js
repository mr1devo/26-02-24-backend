const app = require('express').Router()
const loginmodel = require('../model/Login');


//LOGIN


app.post ('/loginview', async (request, response) => {
    const { email, password } = request.body;
    console.log(request.body)
    try {
      const user = await loginmodel.findOne({ email, password });
    
      if (user) {
        response.json({ success: true, message: 'Login successful' });
      }
       else {
        response.json({ success: false, message: 'Invalid Password and email' });
      }
    } catch (error) {
      response.status(500).json({ success: false, message: 'Error during login' });
    }
  });
  
//login retrieving

app.get('/Login',async(request,response)=>{
  var data = await loginmodel.find();
  response.send(data)
})


  module.exports = app