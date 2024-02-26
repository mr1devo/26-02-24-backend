const app = require('express').Router()
const placemodel = require('../model/Placedetails');
const multer = require('multer');
const pstorage = multer.memoryStorage();
//PLACE.jsx

const upload = multer({ storage: pstorage });


//delete
app.put('/remove/:id',async(request,response)=>{
    let id = request.params.id
    await placemodel.findByIdAndDelete(id)
    response.send("Record deleted")
})

//edit
app.put('/pedit/:id', upload.single('placephoto'), async (request, response) => {

  try {
      const id = request.params.id;
      const { placename, tsee, location  } = request.body;
      let result = null;
      if (request.file) {
          console.log("sdjfbjs")
          const updatedData = {
            placename,
            tsee,
            location,
            placephoto: {
                data: request.file.buffer,
                contentType: request.file.mimetype,
            }

          };
          result = await placemodel.findByIdAndUpdate(id, updatedData);
      }
      else {
          const updatedData = {
            placename,
            tsee,
            location,
           
          }
          result = await placemodel.findByIdAndUpdate(id, updatedData);
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


 //SAVE
app.post('/photonew', upload.single('placephoto'), async (request, response) => {
    // try {
                const { placename, tsee, location } = request.body
                const places = new placemodel({
                    placename,
                    tsee,
                    location,
                    placephoto: {
                        data: request.file.buffer,
                        contentType: request.file.mimetype,
                    }
                    
                })
                console.log(places)
                await places.save();
                response.status(200).json({ message: 'Place added successfully' });
        // }
    // catch (error) 
    // {
    //             response.status(500).json({ error: 'Internal Server Error' });
    // }
}
)


//view
app.get('/photoview', async (request, response) => {

    const result = await placemodel.aggregate([
      {
        $lookup: {
          from: 'Placedetails', // Name of the other collection
          localField: 'placename', // field of item
          foreignField: '_id', //field of category
          as: 'place',
        },
      },
    ]);
  
    response.send(result)
  })


  module.exports = app

  // //for Submit button
// app.post('/new',(request,response)=>{
//     console.log(request.body)
//     new placemodel(request.body).save();
//     response.send("Record saved ")
// })


// //view
// app.get('/view',async(request,response)=>{
//     var data = await placemodel.find();
//     response.send(data)
// })

