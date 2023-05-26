import mongoose  from 'mongoose';

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
     place:{
        type: String
     },
     hotelName:{
        type: String
     },
     noRooms:{
        type: Number
     },
     noPerson:{
        type: Number
     },
     checkDate:{
        type: String
     },
     price:{
         type:String
     }, 
   //   facilities:{
   //      type: String
   //   },
   //   houseRules:{
   //       type: String
   //   },
     imgUrl:{
         type: String
     },
     description:{
      type: String
     },
     status:{
       type: String
     }

})

const Hotel = mongoose.model("Hotel",hotelSchema);

export default Hotel;