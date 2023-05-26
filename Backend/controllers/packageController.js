import { Package } from "../models/index.js";

const createPackage = (req, res) => {
  const { name, price } = req.body;

  let userId = req.session.getUserId();

  const packgage = new Package({
    destination: {
      name,
      price,
    },
    user: userId,
  });

  Package.create(packgage, (err, data) => {
    if (err) res.status(500).json({ error: err });
    res.status(201).json(data);
  });
};

const getPackage = (req, res) => {
  const { id } = req.params;

  Package.findById(id, (err, data) => {
    if (err) return res.status(404).json({ destination: "Pacakge not found" });
    res.status(200).json({ destination: data });
  });
};

const updatePackageFlight = (req, res) => {
  const { name, price } = req.body;

  Package.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { travelMethod: { name, price } } },
    function (err, success) {
      if (err) res.status(500).json({ error: err });
      res.status(201).json(success);
    }
  );
};

const updatePackageHotel = (req, res) => {
  const { name, price } = req.body;

  Package.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { hotel: { name, price } } },
    function (err, success) {
      if (err) res.status(500).json({ error: err });
      res.status(201).json(success);
    }
  );
};

const updatePackageVehicle = (req, res) => {
  const { name, price } = req.body;

  Package.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { vehicle: { name, price } } },
    function (err, success) {
      if (err) res.status(500).json({ error: err });
      res.status(201).json(success);
    }
  );
};

const getPackagesUser = (req, res) => {
  let user = req.session.getUserId();

  Package.find({ user }, (err, data) => {
    if (err) return res.status(404).json({ packages: "Pacakge not found" });
    res.status(200).json({ packages: data });
  });
};

export {
  createPackage,
  getPackage,
  updatePackageFlight,
  updatePackageHotel,
  updatePackageVehicle,
  getPackagesUser,
};
