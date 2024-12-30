const mongoose = require('mongoose');
const { createUser, getUserById, updateUser } = require('../controllers/userController');
const User = require('../models/userModel');

require('dotenv').config();

beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    const user = new User({
        uid: "test-uid-7",
        firstName: "First",
        lastName: "User",
        email: "testuser4@demo.com",
        role: "Contractor",
        password: "123456",
      });

      await user.save();
  });
  

describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const req = {
        body: {
          uid: "test-uid-2",
          firstName: "Second",
          lastName: "User",
          email: "testuser2@demo.com",
          role: "Customer",
          password: "123456",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createUser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
 
      const addedUser = await User.findOne({ email: 'testuser2@demo.com' });
      expect(addedUser.firstName).toBe('Second');
    });
});

describe('GET /api/users/:id', () => {
    it('should retrieve a user by email address', async () => {
      const req = {
        params: { id: 'testuser4@demo.com' },  
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await getUserById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'User retrieved successfully',
          data: expect.arrayContaining([
            expect.objectContaining({
              email: 'testuser4@demo.com'
            }),
          ]),
        })
      );
    });
});


describe('PUT /api/users/:id', () => {
    it('should update user details successfully', async () => {
      const req = {
        params: { id: 'testuser4@demo.com' }, 
        body: {
          firstName: 'NewFirstName',
          lastName: 'NewLastName'
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await updateUser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
     
      const updatedUser = await User.findOne({ email: 'testuser4@demo.com' });
      expect(updatedUser).not.toBeNull();
      expect(updatedUser.firstName).toBe('NewFirstName');
      expect(updatedUser.lastName).toBe('NewLastName');
    });
  
 
});  