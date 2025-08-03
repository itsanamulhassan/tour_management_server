// import request from "supertest";
// import { StatusCodes } from "http-status-codes";
// import app from "../../../app";

// describe("User Authentication", () => {
//   const payload = {
//     name: "Anamul Hassan",
//     email: "test@gmail.com",
//     password: "Anamul2025!",
//   };
//   let accessToken: string;
//   // ✅ Register as regular user
//   describe("POST /api/v1/users/register", () => {
//     it("should register a new user", async () => {
//       const res = await request(app)
//         .post("/api/v1/users/register")
//         .send(payload);

//       expect(res.statusCode).toBe(StatusCodes.CREATED);
//       expect(res.body).toHaveProperty("success", true);
//       expect(res.body).toHaveProperty(
//         "message",
//         "User was successfully created and is now available."
//       );
//     });

//     it("should fail to register an existing user", async () => {
//       const res = await request(app)
//         .post("/api/v1/users/register")
//         .send(payload);

//       expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
//       expect(res.body).toHaveProperty("success", false);
//       expect(res.body.message).toContain(
//         "User already exists. Please use a different one or log in."
//       );
//     });
//   });
// });
