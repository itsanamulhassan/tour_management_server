import request from "supertest";
import app from "../../../app";
import { StatusCodes } from "http-status-codes";

describe("User authentication", () => {
  // 🔹 Common user payload for testing authentication
  const payload = {
    email: "test@gmail.com",
    password: "Anamul2025!",
  };
  // 🔹 Tokens will be stored here after login
  let accessToken: string;
  let refreshToken: string;

  // ✅ Test: Successful sign-in of an existing user

  describe("POST /api/v1/auth/signin", () => {
    it("should sign in an existing user", async () => {
      const res = await request(app).post("/api/v1/auth/signin").send(payload);
      accessToken = res?.body?.data?.accessToken;
      refreshToken = res?.body?.data?.refreshToken;
      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body).toHaveProperty("success", true);
    });
    // ❌ Test: Should fail with wrong password

    it("should fail if password wrong", async () => {
      const res = await request(app).post("/api/v1/auth/signin").send({
        email: payload.email,
        password: "WringPassword1!",
      });
      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(res.body).toHaveProperty("success", false);
    });
    // 🔄 Test: Update access token using refresh token
    it("should update the access token via refresh token", async () => {
      const res = await request(app)
        .post("/api/v1/auth/refresh_access_token")
        .set("Cookie", [`tour_management_refresh_token=${refreshToken}`])
        .send();
      expect(res.statusCode).toBe(StatusCodes.CREATED);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body.data).toHaveProperty("accessToken");
    });

    // 🔐 Test: Revert password change to original for test consistency

    it("should update password via old password", async () => {
      const res = await request(app)
        .post("/api/v1/auth/reset_password")
        .set("Authorization", accessToken)
        .send({
          previousPassword: "Anamul2025!",
          latestPassword: "Anamul2026!",
        });

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body).toHaveProperty("success", true);
    });

    // 🔐 Test: Revert password change to original for test consistency
    it("should update password via old password for resetting the password", async () => {
      const res = await request(app)
        .post("/api/v1/auth/reset_password")
        .set("Authorization", accessToken)
        .send({
          previousPassword: "Anamul2026!",
          latestPassword: "Anamul2025!",
        });

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty(
        "message",
        "Password was successfully updated with the latest information."
      );
    });
  });
});
