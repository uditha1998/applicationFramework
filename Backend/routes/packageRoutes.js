import express from "express";
import {
  createPackage,
  getPackage,
  getPackagesUser,
  updatePackageFlight,
  updatePackageHotel,
  updatePackageVehicle,
} from "../controllers/index.js";
import { verifySession } from "supertokens-node/recipe/session/framework/express/index.js";

const router = express.Router();

router.post("/", verifySession(), createPackage);
router.get("/user", verifySession(), getPackagesUser);
// router.get("/:id", getPackage);
router.put("/:id", updatePackageFlight);
router.put("/hotel/:id", updatePackageHotel);
router.put("/vehicle/:id", updatePackageVehicle);

export default router;
