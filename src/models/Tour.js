import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tourSchema = new Schema({
  country: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: String,
  },
  hotel: {
    type: String,
  },
  url: {
    type: String,
  },
  flight: {
    type: String,
  },
  meal: {
    type: String,
  },
  visa: {
    type: String,
  },
  inclusion: {
    type: String,
  },
  day: {
    type: String,
  },
  night: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;
