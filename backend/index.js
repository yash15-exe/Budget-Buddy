import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userAuthRoutes from "./Routes/userAuthRoutes.js";
import dataRoutes from "./Routes/dataRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

mongoose
  .connect(process.env.MONGO_URL || "mongodb://localhost:27017/BUDGET-BUDDY")
  .then(console.log("Database connected"))
  .catch((error) =>
    console.log(`Something went wronng in db connection. Error: ${error}`)
  );

app.use("/auth", userAuthRoutes);
app.use("/data", dataRoutes);

const server = app.listen(process.env.SERVER_PORT || 5000, () => {
  console.log(`Server listening on port ${process.env.SERVER_PORT}`);
});

// // Graceful server shutdown
// process.on("SIGINT", () => {
//   console.log("Received SIGINT signal. Server shutting down...");

//   // Perform cleanup tasks
//   // For example, close database connections

//   server.close(() => {
//     console.log("Server shutdown complete");
//     process.exit(0); // Exit process with success status code
//   });
// });

// process.on("SIGTERM", () => {
//   console.log("Received SIGTERM signal. Server shutting down...");

//   // Perform cleanup tasks
//   // For example, close database connections

//   server.close(() => {
//     console.log("Server shutdown complete");
//     process.exit(0); // Exit process with success status code
//   });
// });
