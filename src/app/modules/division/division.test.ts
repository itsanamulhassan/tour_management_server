import request from "supertest";
import app from "../../../app";
import env from "../../configurations/env";
import { StatusCodes } from "http-status-codes";
import message from "../../utils/message";
import { getToken } from "../../../jest.setup";
describe("Division API Endpoints", () => {
  const payload = {
    name: "Barishal5 Decfff2332325" + new Date().toISOString(),
    description:
      "Known as the 'Venice of the East,' this division is famous for its intricate network of rivers and canals. It is a major agricultural hub, especially for rice production.",
  };

  let accessToken: string;
  let divisionId: string;

  beforeAll(async () => {
    const tokens = await getToken({
      email: env.super_admin_email,
      password: env.super_admin_password,
    });
    accessToken = tokens.accessToken;
  });

  describe("Create Division", () => {
    it("should create a new division", async () => {
      const res = await request(app)
        .post("/api/v1/divisions/create")
        .set("Authorization", accessToken)
        .send(payload);

      divisionId = res?.body?.data?._id;
      expect(res.statusCode).toBe(StatusCodes.CREATED);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("message", message("create", "division"));
    });
  });

  describe("Get All Divisions", () => {
    it("should return all divisions", async () => {
      const res = await request(app)
        .get("/api/v1/divisions/all")
        .set("Authorization", accessToken);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body).toHaveProperty("success", true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe("Get Single Division by ID", () => {
    it("should return division data for valid ID", async () => {
      const res = await request(app)
        .get(`/api/v1/divisions/single/${divisionId}`)
        .set("Authorization", accessToken);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body.data).toHaveProperty("_id", divisionId);
      expect(res.body.data).toHaveProperty("name", payload.name);
    });

    it("should return 404 for non-existent ID", async () => {
      const fakeId = "607f1f77bcf86cd799439011";
      const res = await request(app)
        .get(`/api/v1/divisions/single/${fakeId}`)
        .set("Authorization", accessToken);

      expect(res.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(res.body).toHaveProperty("success", false);
    });
  });

  describe("Update Division", () => {
    it("should update division details", async () => {
      const updatedData = {
        name: "Barishal Upda232ted" + payload.name,
        description: "Updated description",
      };
      const res = await request(app)
        .patch(`/api/v1/divisions/update/${divisionId}`)
        .set("Authorization", accessToken)
        .send(updatedData);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("message", message("update", "division"));
    });

    it("should return 404 when updating non-existent division", async () => {
      const fakeId = "607f1f77bcf86cd799439011";
      const res = await request(app)
        .patch(`/api/v1/divisions/update/${fakeId}`)
        .set("Authorization", accessToken)
        .send({ name: "No Division" });

      expect(res.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(res.body).toHaveProperty("success", false);
    });
  });

  describe("Delete Division", () => {
    it("should delete division by ID", async () => {
      const res = await request(app)
        .delete(`/api/v1/divisions/delete/${divisionId}`)
        .set("Authorization", accessToken);

      expect(res.statusCode).toBe(StatusCodes.OK);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("message", message("delete", "division"));
    });

    it("should return 404 when deleting already deleted or non-existent division", async () => {
      const res = await request(app)
        .delete(`/api/v1/divisions/delete/${divisionId}`)
        .set("Authorization", accessToken);

      expect(res.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(res.body).toHaveProperty("success", false);
    });
  });
});
