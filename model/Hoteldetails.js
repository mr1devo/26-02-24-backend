const mongoose =require("mongoose")

let hd=mongoose.Schema;
const hotel = new hd(
    {
        hotelname:String,
        htsee:String,
        hlocation:String,
        hotelphoto:{
            contentType:String,
            data : Buffer,}
       
        
        }
);



var hotelmodel =mongoose.model("hotel",hotel)
module.exports=hotelmodel;