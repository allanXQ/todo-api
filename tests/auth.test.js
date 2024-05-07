const request = require("supertest");
const app = require("../src/server");
const { User } = require("../src/models");
const { sequelize } = require("../src/config");
const { messages } = require("../src/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

describe("Auth Controller Integration Tests", () => {
  beforeAll(async () => {
    await sequelize.authenticate();
  });

  afterEach(async () => {
    await User.destroy({ where: {}, truncate: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  // Successful Registration Test
  test("POST /api/v1/auth/register should register a new user", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send({ email: "newuser@example.com", password: "ValidPass123!" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(messages.userCreatedSuccessfully);
  });

  // Invalid Email During Registration
  test("POST /api/v1/auth/register should return an error for an invalid email", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send({ email: "invalidemail", password: "SomePass123!" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(messages.invalidEmail);
  });

  // Missing Email During Registration
  test("POST /api/v1/auth/register should return an error for missing email", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send({ password: "Validpass123!" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(messages.emailRequired);
  });

  // Missing Password During Registration
  test("POST /api/v1/auth/register should return an error for missing password", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send({ email: "userwithoutpassword@example.com" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(messages.passwordRequired);
  });

  // Weak Password During Registration
  test("POST /api/v1/auth/register should return an error for a weak password", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send({ email: "weakpassword@gmail.com", password: "weakpass" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(messages.passwordRegex);
  });

  // Duplicate User Registration
  test("POST /api/v1/auth/register should return an error for an existing user", async () => {
    await User.create({
      email: "duplicate@example.com",
      password: await bcrypt.hash("SomePass123!", 10),
    });

    const response = await request(app)
      .post("/api/v1/auth/register")
      .send({ email: "duplicate@example.com", password: "AnotherPass123!" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(messages.userExists);
  });

  // Successful Login Test
  test("POST /api/v1/auth/login should log in a user successfully", async () => {
    await User.create({
      email: "loginuser@example.com",
      password: await bcrypt.hash("ValidPass123!", 10),
    });

    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "loginuser@example.com", password: "ValidPass123!" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(messages.loginSuccess);
  });

  // Missing Email During Login
  test("POST /api/v1/auth/login should return an error for missing email", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ password: "SomePass123!" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(messages.emailRequired);
  });

  // Missing Password During Login
  test("POST /api/v1/auth/login should return an error for missing password", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "loginuserexample@gmail.com" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(messages.passwordRequired);
  });

  // Invalid Credentials During Login
  test("POST /api/v1/auth/login should return an error for an incorrect password", async () => {
    await User.create({
      email: "incorrectpass@example.com",
      password: await bcrypt.hash("CorrectPass123!", 10),
    });

    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "incorrectpass@example.com", password: "WrongPass123!" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(messages.invalidCredentials);
  });

  // Nonexistent User Login Attempt
  test("POST /api/v1/auth/login should return an error for a nonexistent user", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "nonexistentuser@example.com", password: "SomePass123!" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(messages.invalidCredentials);
  });

  // Logout Test
  test("POST /api/v1/auth/logout should clear tokens and log out the user", async () => {
    const response = await request(app).post("/api/v1/auth/logout");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(messages.logOutSuccess);
  });

  // Forgot Password Test
  test("POST /api/v1/auth/forgot-password should send a password reset email", async () => {
    await User.create({
      email: "forgotpassuser@example.com",
      password: await bcrypt.hash("ForgotPass123!", 10),
    });

    const response = await request(app)
      .post("/api/v1/auth/forgot-password")
      .send({ email: "forgotpassuser@example.com" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(messages.passwordResetEmailSent);
  });

  // Invalid Email During Password Reset
  test("POST /api/v1/auth/forgot-password should return an error for an invalid email", async () => {
    const response = await request(app)
      .post("/api/v1/auth/forgot-password")
      .send({ email: "invalidemail" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(messages.invalidEmail);
  });

  // Missing Email During Password Reset
  test("POST /api/v1/auth/forgot-password should return an error for missing email", async () => {
    const response = await request(app).post("/api/v1/auth/forgot-password");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(messages.emailRequired);
  });

  // Nonexistent User Password Reset Attempt
  test("POST /api/v1/auth/forgot-password should return an error for a nonexistent user", async () => {
    const response = await request(app)
      .post("/api/v1/auth/forgot-password")
      .send({ email: "nonexistentuser@gmail.com" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(messages.userNotFound);
  });

  // Reset Password Test
  test("POST /api/v1/auth/reset-password/:token should reset the password successfully", async () => {
    const user = await User.create({
      email: "resetpassuser@example.com",
      password: await bcrypt.hash("OldPass123!", 10),
    });

    const validToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    user.passwordResetToken = validToken;
    await user.save();

    const response = await request(app)
      .post(`/api/v1/auth/reset-password/${validToken}`)
      .send({ password: "NewPass123!" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(messages.passwordResetSuccessful);

    const updatedUser = await User.findOne({
      where: { email: "resetpassuser@example.com" },
    });
    const isPasswordMatch = await bcrypt.compare(
      "NewPass123!",
      updatedUser.password
    );
    expect(isPasswordMatch).toBe(true);
  });

  // Test for missing token in password reset
  test("POST /api/v1/auth/reset-password should return error for missing token", async () => {
    const response = await request(app)
      .post("/api/v1/auth/reset-password")
      .send({ password: "NewPass123!" });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe(messages.urlNotFound);
  });

  // Test for an invalid token in password reset
  test("POST /api/v1/auth/reset-password/:token should return error for an invalid token", async () => {
    const user = await User.create({
      email: "resetpassinvalid@example.com",
      password: await bcrypt.hash("OldPass123!", 10),
    });

    const invalidToken = jwt.sign({ id: user.id }, "invalid_secret", {
      expiresIn: "15m",
    });

    const response = await request(app)
      .post(`/api/v1/auth/reset-password/${invalidToken}`)
      .send({ password: "NewPass123!" });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(messages.invalidToken);
  });
});
