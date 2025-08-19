import request from "supertest";
import { getToken } from "../../../jest.setup";
import env from "../../configurations/env";
import app from "../../../app";
import { StatusCodes } from "http-status-codes";
import message from "../../utils/message";

describe("Tour API Endpoints", () => {
  let accessToken: string;
  let tourId: string;
  let tourTypeId: string;
  let divisionId: string;

  const payload = {
    title: "TEST TOUR" + new Date().toISOString(),
  };

  beforeAll(async () => {
    const tokens = await getToken({
      email: env.super_admin_email,
      password: env.super_admin_password,
    });
    accessToken = tokens.accessToken;
  });

  describe("Create the new division & tour type before creating new tour", () => {
    it("should create a new division", async () => {
      const res = await request(app)
        .post("/api/v1/divisions/create")
        .set("Authorization", accessToken)
        .send({
          name: "Barishal5 Decfff2332325" + new Date().toISOString(),
          description:
            "Known as the 'Venice of the East,' this division is famous for its intricate network of rivers and canals. It is a major agricultural hub, especially for rice production.",
        });

      divisionId = res?.body?.data?._id;
      expect(res.statusCode).toBe(StatusCodes.CREATED);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("message", message("create", "division"));
    });
    it("should create a new tour type", async () => {
      const res = await request(app)
        .post("/api/v1/tour_types/create")
        .set("Authorization", accessToken)
        .send({
          name: "TEST TOUR TYPE" + new Date().toISOString(),
        });

      tourTypeId = res?.body?.data?._id;
      expect(res.statusCode).toBe(StatusCodes.CREATED);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty(
        "message",
        message("create", "tour type")
      );
    });
  });

  describe("Create Tour", () => {
    it("should create a new tour", async () => {
      const res = await request(app)
        .post("/api/v1/tours/create")
        .set("Authorization", accessToken)
        .send({
          ...payload,
          division: divisionId,
          tourType: tourTypeId,
        });

      tourId = res?.body?.data?._id;
      expect(res.statusCode).toBe(StatusCodes.CREATED);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("message", message("create", "tour"));
    });
  });

  describe("Get All Tours", () => {
    it("should return all tours", async () => {
      const res = await request(app)
        .get("/api/v1/tours/all")
        .set("Authorization", accessToken);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body).toHaveProperty("success", true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe("Get Single Tour by ID", () => {
    it("should return tour data for valid ID", async () => {
      const res = await request(app)
        .get(`/api/v1/tours/single/${tourId}`)
        .set("Authorization", accessToken);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body.data).toHaveProperty("_id", tourId);
      expect(res.body.data).toHaveProperty("title", payload.title);
    });

    it("should return 404 for non-existent ID", async () => {
      const fakeId = "607f1f77bcf86cd799439011";
      const res = await request(app)
        .get(`/api/v1/tours/single/${fakeId}`)
        .set("Authorization", accessToken);

      expect(res.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(res.body).toHaveProperty("success", false);
    });
  });

  describe("Update Tour", () => {
    it("should update tour details", async () => {
      const updatedData = {
        title: "UPDATE TEST" + payload.title,
      };
      const res = await request(app)
        .patch(`/api/v1/tours/update/${tourId}`)
        .set("Authorization", accessToken)
        .send(updatedData);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("message", message("update", "tour"));
    });

    it("should return 404 when updating non-existent tour", async () => {
      const fakeId = "607f1f77bcf86cd799439011";
      const res = await request(app)
        .patch(`/api/v1/tours/update/${fakeId}`)
        .set("Authorization", accessToken)
        .send({ title: "No Tour" });

      expect(res.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(res.body).toHaveProperty("success", false);
    });
  });

  describe("Delete Tour", () => {
    it("should delete tour by ID", async () => {
      const res = await request(app)
        .delete(`/api/v1/tours/delete/${tourId}`)
        .set("Authorization", accessToken);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("message", message("delete", "tour"));
    });

    it("should return 404 when deleting already deleted or non-existent tour", async () => {
      const res = await request(app)
        .delete(`/api/v1/tours/delete/${tourId}`)
        .set("Authorization", accessToken);

      expect(res.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(res.body).toHaveProperty("success", false);
    });
  });
});
