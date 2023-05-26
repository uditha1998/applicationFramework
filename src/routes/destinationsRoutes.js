import express from "express";
import {
  createDestination,
  deleteDestination,
  getAllDestinations,
  getDestination,
  updateDestination,
} from "../controllers/index.js";

const router = express.Router();

router.route("/").get(getAllDestinations).post(createDestination);
router
  .route("/:destinationId")
  .get(getDestination)
  .put(updateDestination)
  .delete(deleteDestination);

export default router;
