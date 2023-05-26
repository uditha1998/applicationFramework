import express from "express";
const router = express.Router();
import { Tour } from "../models/index.js";

//Add Tour Package
router.post("/add", (req, res) => {
  let newPost = new Tour(req.body);
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
  Tour.find()
    .then((tours) => {
      res.json(tours);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/filter/:country").get((req, res) => {
  const country = req.params.country;

  Tour.find({ country: { $regex: new RegExp(country, "i") } })
    .then((tours) => {
      res.json(tours);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Update Tour package
router.put("/update/:id", (req, res) => {
  Tour.findByIdAndUpdate(
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
  Tour.findByIdAndRemove(req.params.id).exec((err, deleteTour) => {
    if (err)
      return res.status(400).json({
        message: "Error with deleting Tour Package",
        err,
      });
    return res.json({
      message: "Tour Package Deleted",
      deleteTour,
    });
  });
});

//Fetch one record
router.get("/get/:id", (req, res) => {
  let tourId = req.params.id;
  Tour.findById(tourId, (err, tours) => {
    if (err) {
      return res.status(400).json({
        success: "Error with fetching Tour Package",
        err,
      });
    }
    return res.status(200).json({
      success: "Tour Package fetched",
      tours,
    });
  });
});

export default router;
