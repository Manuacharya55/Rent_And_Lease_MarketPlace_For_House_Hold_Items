
import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import cookieParser from 'cookie-parser';
import authRouter from '../routers/Auth.router.js';
import { User } from '../models/User.model.js';
import { GlobalError } from '../utils/GlobalError.js';

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use('/api/v2/auth', authRouter);
  app.use(GlobalError);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Auth Integration Test', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should reject login with wrong password', async () => {
    // Create a user
    const password = 'CorrectPassword123';
    await User.create({
      name: 'Test User',
      email: 'test@example.com',
      phonenumber: '1234567890',
      password: password,
    });

    // Attempt login with wrong password
    const res = await request(app)
      .post('/api/v2/auth/login')
      .send({
        email: 'test@example.com',
        password: 'WrongPassword'
      });

    // Expect failure
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy(); // ApiSuccess sets success=true, ApiError doesn't? Or GlobalError returns structured error?
    // GlobalError returns { status, message, error }. status is usually "error" or "fail".
    // If it was success, it would return ApiSuccess json.

    // Check message
    expect(res.body.message).toBe("Invalid credentials");
  });

  it('should allow login with correct password', async () => {
     const password = 'CorrectPassword123';
    await User.create({
      name: 'Test User',
      email: 'test@example.com',
      phonenumber: '1234567890',
      password: password,
    });

    const res = await request(app)
      .post('/api/v2/auth/login')
      .send({
        email: 'test@example.com',
        password: password
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.headers['set-cookie']).toBeDefined();
    // Check for HttpOnly and Secure
    const cookies = res.headers['set-cookie'][0];
    expect(cookies).toContain('HttpOnly');
    // Secure depends on NODE_ENV. In test defaults to development so maybe not secure?
    // But I can check logic.
  });
});
