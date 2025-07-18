/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";
import env from "./app/configurations/env";

let server: Server;

const main = async () => {
  try {
    await mongoose.connect(env.db_url);
    console.log("✅ Server has been connected successfully with Database");

    server = app.listen(env.port, () =>
      console.log("Server has been connected with the port of ", env.port)
    );
  } catch (error) {
    console.error(error);
  }
};
main();

// Catch unhandled promise rejections that were never .catch()-ed
// This ensures the server shuts down gracefully instead of crashing unpredictably
process.on("unhandledRejection", (error) => {
  console.log("Unhandled rejection detected ... Server shutting down", error);

  if (server) {
    // Close the server first so it stops accepting new connections
    server.close(() => {
      process.exit(1); // Exit the process with failure code
    });
  } else {
    // If server wasn't initialized yet
    process.exit(1);
  }
});

// Catch exceptions that weren't caught anywhere in the app
// Prevents the Node process from crashing suddenly with unhandled errors
process.on("uncaughtException", (error) => {
  console.log("Uncaught exception error... Server shutting down", error);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle SIGTERM signal (sent by systems to tell process to shut down)
// For example, in production, a container orchestrator or server manager
// might send SIGTERM when stopping or redeploying the app
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received... server shutting down");

  if (server) {
    // Graceful shutdown: finish existing connections
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Understand how the SIGTERM signal response
// process.on("SIGINT", () => {
//   console.log("SIGINT signal received... server shutting down");
//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }
//   process.exit(1);
// });

// Unhandled rejection error
// Promise.reject(new Error("I forgot to catch this promise error"));

// Uncaught exception error
// throw new Error("I forgot to handle local error");

/**
 * unhandled rejection error
 * uncaught rejection error
 * signal termination sigterm
 *
 */
