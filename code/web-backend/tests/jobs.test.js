const mongoose = require('mongoose');
const { createJob, getOfflineJobs, getAllJobs, getJobsById, deleteJob } = require('../controllers/jobsController');
const Jobs = require('../models/jobsModel');

require('dotenv').config();

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Jobs.insertMany([
    {
      postedBy: {
        uid: "test-uid-1",
        role: "Contractor"
      },
      address: {
        unit: "1",
        street: "Street",
        city: "City",
        state: "State",
        country: "Australia",
        pin: "0000"
      },
      budget: {
        min: "10",
        max: "1000",
        negotiable: true
      },
      title: "Test Job 1",
      description: "Test Description",
      jobType: "Full-time",
      image: "image",
      date: "2024-11-14T01:52:48.150Z",
      time: "10:00",
      spamCounter: 0,
      createdAt: "2024-11-14T01:53:03.284Z"
    },
    {
      postedBy: {
        uid: "test-uid-2",
        role: "Contractor"
      },
      address: {
        unit: "1",
        street: "Street",
        city: "City",
        state: "State",
        country: "Australia",
        pin: "0000"
      },
      budget: {
        min: "10",
        max: "1000",
        negotiable: true
      },
      title: "Test Job 2",
      description: "Test Description",
      jobType: "Full-time",
      image: "image",
      date: "2024-11-14T01:52:48.150Z",
      time: "10:00",
      spamCounter: 0,
      createdAt: "2024-11-14T01:53:03.284Z"
    },
  ]);
});

afterEach(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('POST /api/jobs', () => {
  it('should create a new job successfully', async () => {
    const req = {
      body: {
        postedBy: {
          uid: "test-uid",
          role: "Contractor"
        },
        address: {
          unit: "1",
          street: "Street",
          city: "City",
          state: "State",
          country: "Australia",
          pin: "0000"
        },
        budget: {
          min: "10",
          max: "1000",
          negotiable: true
        },
        title: "Test",
        description: "Test Description",
        jobType: "Full-time",
        image: "image",
        date: "2024-11-14T01:52:48.150Z",
        time: "10:00",
        spamCounter: 0,
        createdAt: "2024-11-14T01:53:03.284Z"
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await createJob(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Job added successfully',
        data: expect.objectContaining({
          title: 'Test',
          description: 'Test Description',
        }),
      })
    );

    const addedJob = await Jobs.findOne({ title: 'Test' });
    expect(addedJob).not.toBeNull();
    expect(addedJob.description).toBe('Test Description');
  });

  it('should return a 500 error if required fields are missing', async () => {
    const req = {
      body: {
        description: 'Missing fields',
        postedBy: { uid: 'test-uid', role: 'Contractor' },
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createJob(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Error adding job'
      })
    );
  });
});

describe('GET /api/offlinejobs', () => {
  it('should retrieve offline jobs successfully', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getOfflineJobs(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Offline Jobs'
      })
    );
  });
});

describe('GET /api/jobs/:postedBy', () => {
  it('should retrieve jobs for a given role successfully', async () => {
    const req = {
      params: { postedBy: 'Contractor' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAllJobs(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Jobs posted by Contractor'
      })
    );
    expect(res.json.mock.calls[0][0].data.length).toBe(2)
  });

});

describe('GET /api/jobs/:postedById', () => {
  it('should retrieve posted jobs by a user', async () => {
    const req = {
      params: { postedById: 'test-uid-2' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getJobsById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Jobs posted by test-uid-2',
        data: expect.arrayContaining([
          expect.objectContaining({
            title: 'Test Job 2'
          })
        ]),
      })
    );
  })
})
