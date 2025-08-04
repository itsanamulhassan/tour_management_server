import request from "supertest";
import { StatusCodes } from "http-status-codes";
import app from "../../../app";

describe("User Authentication", () => {
  const payload = {
    name: "Anamul Hassan",
    email: "test1111@gmail.com",
    password: "Anamul2025!",
  };
  let accessToken: string;
  let userId: string;
  // ✅ Register as regular user
  describe("POST /api/v1/users/register", () => {
    it("should register a new user", async () => {
      const res = await request(app)
        .post("/api/v1/users/register")
        .send(payload);

      userId = res?.body?.data?._id;

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
        .send(payload);

      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(res.body).toHaveProperty("success", false);
      expect(res.body.message).toContain(
        "User already exists. Please use a different one or log in."
      );
    });

    it("should sign in an existing user", async () => {
      const res = await request(app).post("/api/v1/auth/signin").send({
        email: payload.email,
        password: payload.password,
      });
      accessToken = res?.body?.data?.accessToken;
      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body).toHaveProperty("success", true);
    });

    it("should update user information by id", async () => {
      const res = await request(app)
        .patch("/api/v1/users/update/" + userId)
        .set("Authorization", accessToken)
        .send({
          name: "Anamul Hassan Update",
        });

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty(
        "message",
        "User was successfully updated with the latest information."
      );
    });
  });
});
