import express from "express";
const router = express.Router();
import { Booking } from "../models/index.js";

//Add Tour Package
router.post("/add", (req, res) => {
  let newPost = new Booking(req.body);
  console.log(newPost);
  newPost.save((err) => {
    if (err) {
      return res.status(400).json({
        error: "Error in Adding Tour Package",
      });
    }
    return res.status(200).json({
      success: "Tour Package Added Successfully",
    });
  });
});

//Fetch all Tour packages
router.route("/").get((req, res) => {
  Booking.find()
    .then((bookings) => {
      res.json(bookings);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Update Tour package
router.put("/update/:id", (req, res) => {
  Booking.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err) => {
      if (err) {
        return res.status(400).json({
          error: "Error in updating tour package",
        });
      }
      return res.status(200).json({
        success: "Tour Package Updated",
      });
    }
  );
});

//Delete Tour package
router.delete("/delete/:id", (req, res) => {
  Booking.findByIdAndRemove(req.params.id).exec((err, deleteBooking) => {
    if (err)
      return res.status(400).json({
        message: "Error with deleting Tour Package",
        err,
      });
    return res.json({
      message: "Tour Package Deleted",
      deleteBooking,
    });
  });
});

//Fetch one record
router.get("/get/:id", (req, res) => {
  let bookingId = req.params.id;
  Booking.findById(bookingId, (err, bookings) => {
    if (err) {
      return res.status(400).json({
        success: "Error with fetching Tour Package",
        err,
      });
    }
    return res.status(200).json({
      success: "Tour Package fetched",
      bookings,
    });
  });
});

export default router;
