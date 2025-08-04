import request from "supertest";
import { getToken } from "../../../../jest.setup";
import env from "../../../configurations/env";
import app from "../../../../app";
import { StatusCodes } from "http-status-codes";
import message from "../../../utils/message";
describe("Tour Type API Endpoints", () => {
  const payload = {
    name: "TEST TOUR TYPE" + new Date().toISOString(),
  };

  let accessToken: string;
  let tourTypeId: string;

  beforeAll(async () => {
    const tokens = await getToken({
      email: env.super_admin_email,
      password: env.super_admin_password,
    });
    accessToken = tokens.accessToken;
  });

  describe("Create Tour Type", () => {
    it("should create a new tour type", async () => {
      const res = await request(app)
        .post("/api/v1/tour_types/create")
        .set("Authorization", accessToken)
        .send(payload);

      tourTypeId = res?.body?.data?._id;
      expect(res.statusCode).toBe(StatusCodes.CREATED);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty(
        "message",
        message("create", "tour type")
      );
    });
  });

  describe("Get All Tour Types", () => {
    it("should return all tour types", async () => {
      const res = await request(app)
        .get("/api/v1/tour_types/all")
        .set("Authorization", accessToken);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body).toHaveProperty("success", true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe("Get Single Tour Type by ID", () => {
    it("should return tour type data for valid ID", async () => {
      const res = await request(app)
        .get(`/api/v1/tour_types/single/${tourTypeId}`)
        .set("Authorization", accessToken);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body.data).toHaveProperty("_id", tourTypeId);
      expect(res.body.data).toHaveProperty("name", payload.name);
    });

    it("should return 404 for non-existent ID", async () => {
      const fakeId = "607f1f77bcf86cd799439011";
      const res = await request(app)
        .get(`/api/v1/tour_types/single/${fakeId}`)
        .set("Authorization", accessToken);

      expect(res.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(res.body).toHaveProperty("success", false);
    });
  });

  describe("Update Tour Type", () => {
    it("should update tour type details", async () => {
      const updatedData = {
        name: "UPDATE TEST" + payload.name,
      };
      const res = await request(app)
        .patch(`/api/v1/tour_types/update/${tourTypeId}`)
        .set("Authorization", accessToken)
        .send(updatedData);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty(
        "message",
        message("update", "tour type")
      );
    });

    it("should return 404 when updating non-existent tour type", async () => {
      const fakeId = "607f1f77bcf86cd799439011";
      const res = await request(app)
        .patch(`/api/v1/tour_types/update/${fakeId}`)
        .set("Authorization", accessToken)
        .send({ name: "No Tour Type" });

      expect(res.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(res.body).toHaveProperty("success", false);
    });
  });

  describe("Delete Tour Type", () => {
    it("should delete tour type by ID", async () => {
      const res = await request(app)
        .delete(`/api/v1/tour_types/delete/${tourTypeId}`)
        .set("Authorization", accessToken);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty(
        "message",
        message("delete", "tour type")
      );
    });

    it("should return 404 when deleting already deleted or non-existent tour type", async () => {
      const res = await request(app)
        .delete(`/api/v1/tour_types/delete/${tourTypeId}`)
        .set("Authorization", accessToken);

      expect(res.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(res.body).toHaveProperty("success", false);
    });
  });
});
