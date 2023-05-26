import { Flight } from "../models/index.js";

const getAllFlights = (req, res) => {
  Flight.find({}, (err, docs) => {
    if (!err) {
      res.json({ flights: docs });
    } else {
      res.status(500).json({ error: err });
      throw err;
    }
  });
};

const getFlights = (req, res) => {
  const { iataCode } = req.params;

  Flight.find({ iataCode }, (err, docs) => {
    if (!err) {
      res.json({ destinations: docs });
    } else {
      res.status(500).json({ error: err });
      throw err;
    }
  });
};

const getFlight = (req, res) => {
  const { flightId } = req.params;

  Flight.findById(flightId, (err, docs) => {
    if (!err) {
      res.json({ flight: docs });
    } else {
      res.status(500).json({ error: err });
      throw err;
    }
  });
};

const createFlight = (req, res) => {
  const {
    travelMeth,
    from,
    fromDate,
    to,
    toDate,
    price,
    toTime,
    fromTime,
    routNo,
  } = req.body;

  console.log(req.body);

  const flight = new Flight({
    travelMeth,
    from,
    fromDate,
    to,
    toDate,
    routNo,
    price,
    toTime,
    fromTime,
  });

  Flight.create(flight, (err, data) => {
    if (err) res.status(500).json({ error: err });
    res.status(201).json(data);
  });
};

const deleteFlight = (req, res) => {
  const flightId = req.params.flightId;

  Flight.deleteOne({ _id: flightId }, (err) => {
    if (err) res.status(500).json({ error: err });

    res.status(204).json({ status: "Destination deleted" });
  });
};

const updateFlight = async (req, res) => {
  const flightId = req.params.flightId;

  Flight.findByIdAndUpdate(
    flightId,
    {
      $set: req.body,
    },
    (err, updatedDestination) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(204).json({
        destination: updatedDestination,
      });
    }
  );
};

export {
  getAllFlights,
  getFlights,
  getFlight,
  createFlight,
  deleteFlight,
  updateFlight,
};
