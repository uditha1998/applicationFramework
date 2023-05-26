import express from 'express';
import Vehicles from '../models/vehicles.js';
 

const router = express.Router();

//add vehicals
router.post('/add',(req, res)=>{
    let newVehicle = new Vehicles(req.body);

    newVehicle.save((err) => {
        if (err) {
          return res.status(400).json({
            error:err,
          });
        }
        return res.status(200).json({
          success: "Vehicle Added Successfully",
        });
      });
})

//get vehical
router.get('/get',(req, res)=>{
  Vehicles.find().exec((err,posts) =>{
    if(err){
      return res.status(400).json({
        error:err
      });
    }
    return res.status(200).json({
      success:true,
      existingPosts:posts
    });
  });
});

//Update Vehical
router.put("/update/:id", (req, res) => {
  Vehicles.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, vehicle) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Updated Successfully",
        vehicle
      });
    }
  );
});

//Delete vehicel
router.delete("/delete/:id", (req, res) => {
  Vehicles.findByIdAndRemove(req.params.id).exec((err, deleteVehicle) => {
    if (err)
      return res.status(400).json({
        message: "Delete Unsuccessful",
        err,
      });
    return res.json({
      message: "Delete successful",
      deleteVehicle,
    });
  });
});

//Get a specific report
router.get("/oneV/:id", (req, res) => {
  let VehicleId = req.params.id;
  Vehicles.findById(VehicleId, (err, vehicle) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      vehicle,
    });
  });
});


export default router;