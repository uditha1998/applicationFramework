import mongoose from "mongoose";

const FlightSchema = new mongoose.Schema({
  travelMeth: {
    type: String,
    required: true,
  },

  from: {
    type: String,
    required: true,
  },

  fromDate: {
    type: String,
    required: true,
  },

  to: {
    type: String,
    required: true,
  },

  toDate: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  toTime:{
    type: String,
    required: true,
  },
  fromTime:{
    type: String,
    required: true,
  },
  
  routNo: {
    type: String,
    required: true,
  },
});

const Flight = mongoose.model("Flight", FlightSchema);

export default Flight;
