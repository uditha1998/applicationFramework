import mongoose from "mongoose";

const DestinationSchema = new mongoose.Schema({
  destinationName: {
    type: String,
    required: true,
  },

  slogan: {
    type: String,
    required: true,
  },

  iataCode: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  whenToVisit: {
    type: String,
    required: true,
  },

  popularFor: {
    type: String,
    required: true,
  },

  estimatedBudget: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
});

const Destination = mongoose.model("Destination", DestinationSchema);

export default Destination;
