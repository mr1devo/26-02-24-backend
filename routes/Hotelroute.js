const app = require('express').Router()
const multer = require('multer');
const hotelmodel = require('../model/Hoteldetails');

const hstorage = multer.memoryStorage(); // Store images in memory
const hupload = multer({ storage: hstorage });
//HOTEL.jsx

//delete
app.put('/hremove/:id',async(request,response)=>{
    let id = request.params.id
    await hotelmodel.findByIdAndDelete(id)
    response.send("Record deleted")
})

//edit
app.put('/hedit/:id', hupload.single('hotelphoto'), async (request, response) => {

    try {
        const id = request.params.id;
        const { hotelname, htsee, hlocation  } = request.body;
        let result = null;
        if (request.file) {
            console.log("sdjfbjs")
            const updatedData = {
                hotelname,
                htsee,
                hlocation,
                hotelphoto:{
                    contentType:request.file.mimetype,
                    data : request.file.buffer,}
  
            };
            result = await hotelmodel.findByIdAndUpdate(id, updatedData);
        }
        else {
            const updatedData = {
                hotelname,
                htsee,
                hlocation,
             
            }
            result = await hotelmodel.findByIdAndUpdate(id, updatedData);
        }
  
        if (!result) {
            return response.status(404).json({ message: 'Item not found' });
        }
  
        response.status(200).json({ message: 'Item updated successfully', data: result });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
  });

 //save


app.post('/hotelnew', hupload.single('hotelphoto'), async (request, response) => {
    // try {
                const { hotelname, htsee, hlocation } = request.body
                const hotels = new hotelmodel({
                    hotelname,
                    htsee,
                    hlocation,
                    hotelphoto: {
                      data: request.file.buffer,
                      contentType: request.file.mimetype,
                  },
                    
                    
                    
                })
                console.log(hotels)
                await hotels.save();
                response.status(200).json({ message: 'Hotel added successfully' });
    //     }
    // catch (error) 
    // {
    //             response.status(500).json({ error: 'Internal Server Error' });
    // }
}
)

//view
app.get('/hview', async (request, response) => {

  const result = await hotelmodel.aggregate([
    {
      $lookup: {
        from: 'Hoteldetails', // Name of the other collection
        localField: 'hotelname', // field of item
        foreignField: '_id', //field of category
        as: 'hotel',
      },
    },
  ]);

  response.send(result)
})

module.exports = app