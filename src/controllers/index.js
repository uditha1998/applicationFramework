import {
  getAllDestinations,
  getDestination,
  createDestination,
  updateDestination,
  deleteDestination,
} from "./destinationsControllers.js";
import {
  createPackage,
  getPackage,
  updatePackageFlight,
  updatePackageHotel,
  updatePackageVehicle,
  getPackagesUser,
} from "./packageController.js";

import {
  getFlights,
  createFlight,
  deleteFlight,
  updateFlight,
  getAllFlights,
  getFlight,
} from "./flightControllers.js";

export {
  getAllDestinations,
  getDestination,
  getAllFlights,
  getFlight,
  getPackage,
  createDestination,
  updateDestination,
  deleteDestination,
  getFlights,
  createFlight,
  deleteFlight,
  updateFlight,
  createPackage,
  updatePackageFlight,
  updatePackageHotel,
  updatePackageVehicle,
  getPackagesUser,
};
