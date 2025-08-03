import request from "supertest";
import { StatusCodes } from "http-status-codes";
import app from "../../../app";

describe("User Authentication", () => {
  const userPayload = {
    name: "Anamul Hassan",
    email: "test@gmail.com",
    password: "Anamul2025!",
  };

  describe("POST /api/v1/users/register", () => {
    it("should register a new user", async () => {
      const res = await request(app)
        .post("/api/v1/users/register")
        .send(userPayload);

      expect(res.statusCode).toBe(StatusCodes.CREATED);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty(
        "message",
        "User was successfully created and is now available."
      );
    });

    it("should fail to register an existing user", async () => {
      const res = await request(app)
        .post("/api/v1/users/register")
        .send(userPayload);

      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body.message).toContain("already exists");
    });
  });

  describe("POST /api/v1/users/signin", () => {
    it("should sign in an existing user", async () => {
      const res = await request(app).post("/api/v1/users/signin").send({
        email: userPayload.email,
        password: userPayload.password,
      });

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("accessToken");
    });

    it("should reject invalid password", async () => {
      const res = await request(app).post("/api/v1/users/signin").send({
        email: userPayload.email,
        password: "WrongPassword!",
      });

      expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      expect(res.body).toHaveProperty("success", false);
    });
  });
});
