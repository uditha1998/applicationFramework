import { Destination } from "../models/index.js";

const getAllDestinations = (req, res) => {
  Destination.find({}, (err, docs) => {
    if (!err) {
      res.json({ destinations: docs });
    } else {
      res.status(500).json({ error: err });
      throw err;
    }
  });
};

const getDestination = (req, res) => {
  const destinationId = req.params.destinationId;

  Destination.findById(destinationId, (err, data) => {
    if (err)
      return res.status(404).json({ destination: "Destination not found" });

    res.status(200).json({ destination: data });
  });
};

const createDestination = (req, res) => {
  const {
    destinationName,
    slogan,
    country,
    whenToVisit,
    iataCode,
    popularFor,
    estimatedBudget,
    image,
    description,
  } = req.body;

  const destination = new Destination({
    destinationName,
    slogan,
    country,
    iataCode,
    whenToVisit,
    popularFor,
    estimatedBudget,
    image,
    description,
  });

  Destination.create(destination, (err, data) => {
    if (err) res.status(500).json({ error: err });
    res.status(201).json(data);
  });
};

const deleteDestination = (req, res) => {
  const destinationId = req.params.destinationId;

  Destination.deleteOne({ _id: destinationId }, (err) => {
    if (err) res.status(500).json({ error: err });

    res.status(204).json({ status: "Destination deleted" });
  });
};

const updateDestination = async (req, res) => {
  const destinationId = req.params.destinationId;

  Destination.findByIdAndUpdate(
    destinationId,
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
  getAllDestinations,
  getDestination,
  createDestination,
  updateDestination,
  deleteDestination,
};
