import request from "supertest";
import app from "../../../app";
import { StatusCodes } from "http-status-codes";

describe("User registration", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/v1/users/register")
      .send({
        name: "Anamul Hassan",
        email: new Date().toISOString() + "test@gmail.com",
      });

    expect(res.statusCode).toBe(StatusCodes.CREATED);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("message", "User created successfully.");
  });
});
