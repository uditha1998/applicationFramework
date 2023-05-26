import express from "express";
import {
  getFlights,
  createFlight,
  deleteFlight,
  updateFlight,
  getAllFlights,
  getFlight,
} from "../controllers/index.js";

const router = express.Router();

router.route("/get/:iataCode").get(getFlights);
router.route("/").post(createFlight).get(getAllFlights);
router
  .route("/:flightId")
  .put(updateFlight)
  .delete(deleteFlight)
  .get(getFlight);

export default router;
