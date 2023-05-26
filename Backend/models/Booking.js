import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  date: {
    type: String,
  },
  pname: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  contact: {
    type: String,
  },
  price: {
    type: Number,
  },
  adult: {
    type: String,
  },
  children: {
    type: String,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
