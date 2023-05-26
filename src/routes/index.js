import express from "express";
import destinationsRoutes from "./destinationsRoutes.js";
import vehiclesRoutes from "./vehicleRentRouts.js";
import hotelRoutes from "./hotelRoutes.js";
import tourRoutes from "./tourRoutes.js";
import flightRoutes from "./flightRoutes.js";
import packageRoutes from "./packageRoutes.js";
import bookingRoutes from "./bookingRoutes.js";

const router = express.Router();

router.use("/destinations", destinationsRoutes);
router.use("/vehicles", vehiclesRoutes);
router.use("/hotel", hotelRoutes);
router.use("/tour", tourRoutes);
router.use("/flights", flightRoutes);
router.use("/packages", packageRoutes);
router.use("/booking",bookingRoutes)


export default router;
