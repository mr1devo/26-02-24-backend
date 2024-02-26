const app = require('express').Router()
const multer = require('multer');
const placemodel = require('../model/Restradetails');

const rstorage = multer.memoryStorage(); // Store images in memory

//RESTRA.jsx
const restramodel = require('../model/Restradetails')
const rupload = multer({ storage: rstorage });
//delete
app.put('/Rremove/:id',async(request,response)=>{
    let id = request.params.id
    await restramodel.findByIdAndDelete(id)
    response.send("Record deleted")
})

//edit
app.put('/redit/:id', rupload.single('restraphoto'), async (request, response) => {

    try {
        const id = request.params.id;
        const { restraname, rtsee, rlocation } = request.body;
        let result = null;
        if (request.file) {
            console.log("sdjfbjs")
            const updatedData = {
                restraname,
                rtsee,
                rlocation,
                restraphoto: {
                    data: request.file.buffer,
                    contentType: request.file.mimetype,
                }
                
  
            };
            result = await restramodel.findByIdAndUpdate(id, updatedData);
        }
        else {
            const updatedData = {
                restraname,
                rtsee,
                rlocation,
                
                    
            }
            result = await restramodel.findByIdAndUpdate(id, updatedData);
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


app.post('/restranew', rupload.single('restraphoto'), async (request, response) => {
    // try {
                const { restraname, rtsee, rlocation } = request.body
                const restras = new restramodel({
                    restraname,
                    rtsee,
                    rlocation,
                    restraphoto: {
                        data: request.file.buffer,
                        contentType: request.file.mimetype,
                    }
                    
                })
                console.log(restras)
                await restras.save();
                response.status(200).json({ message: 'Place added successfully' });
    //     }
    // catch (error) 
    // {
    //             response.status(500).json({ error: 'Internal Server Error' });
    // }
}
)


//view
app.get('/resview', async (request, response) => {

  const result = await restramodel.aggregate([
    {
      $lookup: {
        from: 'Restradetails', // Name of the other collection
        localField: 'restraname', // field of item
        foreignField: '_id', //field of category
        as: 'restra',
      },
    },
  ]);

  response.send(result)
})

module.exports = app

//edit
// app.put('/redit/:id',async(request,response)=>
//  {
//      let id = request.params.id;
//      await restramodel.findByIdAndUpdate(id,request.body)
//      response.send("Data updated")
//  })