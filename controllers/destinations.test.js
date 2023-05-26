import sinon from "sinon";
import { expect } from "chai";
import {
  createDestination,
  deleteDestination,
  getAllDestinations,
  getDestination,
  updateDestination,
} from "./destinationsControllers";

jest.useFakeTimers();

describe("Destination Controller", () => {
  describe("getAllDestinations", () => {
    it("should return all destinations", () => {
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const Destination = {
        find: jest.fn().mockImplementationOnce((_, callback) => {
          callback(null, ["destination1", "destination2"]);
        }),
      };

      getAllDestinations(req, res);

      expect(res.json).toHaveBeenCalledWith({
        destinations: ["destination1", "destination2"],
      });
    });

    it("should handle error and return status 500", () => {
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const Destination = {
        find: jest.fn().mockImplementationOnce((_, callback) => {
          callback("error");
        }),
      };

      getAllDestinations(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "error" });
    });
  });

  describe("getDestination", () => {
    it("should return the specified destination", () => {
      const req = {
        params: {
          destinationId: "123",
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const Destination = {
        findById: jest.fn().mockImplementationOnce((_, __, callback) => {
          callback(null, "destinationData");
        }),
      };

      getDestination(req, res);

      expect(res.json).toHaveBeenCalledWith({ destination: "destinationData" });
    });

    it("should handle destination not found and return status 404", () => {
      const req = {
        params: {
          destinationId: "123",
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const Destination = {
        findById: jest.fn().mockImplementationOnce((_, __, callback) => {
          callback("error");
        }),
      };

      getDestination(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        destination: "Destination not found",
      });
    });
  });

  describe("createDestination", () => {
    it("should create a new destination", () => {
      const req = {
        body: {
          destinationName: "Destination 1",
          slogan: "Explore the beauty",
          country: "Country 1",
          whenToVisit: "Anytime",
          iataCode: "ABC",
          popularFor: "Scenic views",
          estimatedBudget: 1000,
          image: "image.jpg",
          description: "Lorem ipsum",
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const destinationMock = {
        save: jest.fn().mockImplementationOnce((callback) => {
          callback(null, "createdDestination");
        }),
      };
      const Destination = jest.fn().mockImplementation(() => destinationMock);

      createDestination(req, res);

      expect(Destination).toHaveBeenCalledWith(req.body);
      expect(destinationMock.save).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith("createdDestination");
    });

    it("should handle error and return status 500", () => {
      const req = {
        body: {
          // Missing required properties
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      createDestination(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: expect.anything() });
    });
  });

  describe("deleteDestination", () => {
    it("should delete the specified destination", () => {
      const req = {
        params: {
          destinationId: "123",
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const Destination = {
        deleteOne: jest.fn().mockImplementationOnce((_, callback) => {
          callback(null);
        }),
      };

      deleteDestination(req, res);

      expect(Destination.deleteOne).toHaveBeenCalledWith(
        { _id: "123" },
        expect.anything()
      );
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith({ status: "Destination deleted" });
    });

    it("should handle error and return status 500", () => {
      const req = {
        params: {
          destinationId: "123",
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const Destination = {
        deleteOne: jest.fn().mockImplementationOnce((_, callback) => {
          callback("error");
        }),
      };

      deleteDestination(req, res);

      expect(Destination.deleteOne).toHaveBeenCalledWith(
        { _id: "123" },
        expect.anything()
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "error" });
    });
  });

  describe("updateDestination", () => {
    it("should update the specified destination", () => {
      const req = {
        params: {
          destinationId: "123",
        },
        body: {
          destinationName: "Updated Destination",
          // Add other updated properties as needed
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const updatedDestination = {
        destinationName: "Updated Destination",
        // Add other updated properties as needed
      };
      const Destination = {
        findByIdAndUpdate: jest
          .fn()
          .mockImplementationOnce((_, __, ___, callback) => {
            callback(null, updatedDestination);
          }),
      };

      updateDestination(req, res);

      expect(Destination.findByIdAndUpdate).toHaveBeenCalledWith(
        "123",
        { $set: req.body },
        expect.anything(),
        expect.anything()
      );
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith({
        destination: updatedDestination,
      });
    });

    it("should handle error and return status 400", () => {
      const req = {
        params: {
          destinationId: "123",
        },
        body: {
          // Invalid properties
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const Destination = {
        findByIdAndUpdate: jest
          .fn()
          .mockImplementationOnce((_, __, ___, callback) => {
            callback("error");
          }),
      };

      updateDestination(req, res);

      expect(Destination.findByIdAndUpdate).toHaveBeenCalledWith(
        "123",
        { $set: req.body },
        expect.anything(),
        expect.anything()
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "error" });
    });
  });
});
