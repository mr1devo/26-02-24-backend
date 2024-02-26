const mongoose =require("mongoose")

let rd=mongoose.Schema;
const restra = new rd(
    {
        restraname:String,
        rtsee:String,
        rlocation:String,
        restraphoto:{
            data : Buffer,
            contentType:String,}
       
        
        }
);


var restramodel =mongoose.model("restra",restra)
module.exports=restramodel;