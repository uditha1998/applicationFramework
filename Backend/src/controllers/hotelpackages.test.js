import { createPackage, getPackage, updatePackageFlight, updatePackageHotel, updatePackageVehicle, getPackagesUser } from '../controllers/packageController';
import { Package } from '../models/index.js';

jest.mock('../models/index.js');

describe('Package Controller', () => {
  describe('createPackage', () => {
    it('should create a new package and return the created data', () => {
      const req = {
        body: {
          name: 'Destination Name',
          price: 100
        },
        session: {
          getUserId: jest.fn().mockReturnValue('user123')
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const expectedData = { _id: 'package123', destination: { name: 'Destination Name', price: 100 }, user: 'user123' };
      
      Package.create.mockImplementationOnce((packageData, callback) => {
        callback(null, expectedData);
      });

      createPackage(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expectedData);
    });

    it('should handle createPackage error and return error response', () => {
      const req = {
        body: {
          name: 'Destination Name',
          price: 100
        },
        session: {
          getUserId: jest.fn().mockReturnValue('user123')
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const expectedError = { message: 'Error creating package' };

      Package.create.mockImplementationOnce((packageData, callback) => {
        callback(expectedError, null);
      });

      createPackage(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: expectedError });
    });
  });

});
