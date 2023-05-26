import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema({
  destination: {
    name: {
      type: String,
    },

    price: {
      type: String,
    },
  },

  travelMethod: {
    name: {
      type: String,
    },

    price: {
      type: String,
    },
  },

  hotel: {
    name: {
      type: String,
    },

    price: {
      type: String,
    },
  },

  vehicle: {
    name: {
      type: String,
    },

    price: {
      type: String,
    },
  },

  user: {
    type: String,
  },
});

const Package = mongoose.model("Package", PackageSchema);

export default Package;
