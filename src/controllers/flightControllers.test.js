import { Flight } from "../models/index.js";
import {
  getAllFlights,
  getFlights,
  getFlight,
  createFlight,
  deleteFlight,
  updateFlight,
} from "./your-file.js";

// Mocking the Flight model
jest.mock("../models/index.js");

describe("Flight Controller", () => {
  describe("getAllFlights", () => {
    it("should return all flights", () => {
      const mockJson = jest.fn();
      const mockRes = { json: mockJson };

      const mockFlights = [{ flightId: 1, name: "Flight 1" }, { flightId: 2, name: "Flight 2" }];
      Flight.find.mockImplementationOnce(({}, callback) => {
        callback(null, mockFlights);
      });

      getAllFlights(null, mockRes);

      expect(mockJson).toHaveBeenCalledWith({ flights: mockFlights });
    });

    it("should handle error and return status 500", () => {
      const mockStatus = jest.fn(() => ({ json: jest.fn() }));
      const mockRes = { status: mockStatus };

      const mockError = new Error("Internal server error");
      Flight.find.mockImplementationOnce(({}, callback) => {
        callback(mockError);
      });

      getAllFlights(null, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockStatus().json).toHaveBeenCalledWith({ error: mockError });
    });
  });

  // Similar tests can be written for other controller functions

  describe("createFlight", () => {
    it("should create a new flight", () => {
      const mockJson = jest.fn();
      const mockStatus = jest.fn(() => ({ json: mockJson }));
      const mockRes = { status: mockStatus };

      const mockFlightData = {
        travelMeth: "Air",
        from: "Airport A",
        fromDate: "2023-05-20",
        to: "Airport B",
        toDate: "2023-05-21",
        price: 100,
        toTime: "10:00",
        fromTime: "12:00",
        routNo: "123",
      };

      const mockCreatedFlight = {
        _id: "123456",
        ...mockFlightData,
      };

      const mockReq = {
        body: mockFlightData,
      };

      Flight.create.mockImplementationOnce((flight, callback) => {
        callback(null, mockCreatedFlight);
      });

      createFlight(mockReq, mockRes);

      expect(Flight.create).toHaveBeenCalledWith(expect.objectContaining(mockFlightData), expect.any(Function));
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(mockCreatedFlight);
    });

    it("should handle error and return status 500", () => {
      const mockStatus = jest.fn(() => ({ json: jest.fn() }));
      const mockRes = { status: mockStatus };

      const mockError = new Error("Internal server error");
      const mockReq = {
        body: {
          // Invalid flight data
        },
      };

      Flight.create.mockImplementationOnce((flight, callback) => {
        callback(mockError);
      });

      createFlight(mockReq, mockRes);

      expect(Flight.create).toHaveBeenCalledWith(expect.any(Object), expect.any(Function));
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockStatus().json).toHaveBeenCalledWith({ error: mockError });
    });
  });

  // Similar tests can be written for the remaining controller functions
});

