import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoroutes from "./routes/todoroutes.js"

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use("/api/todos",todoroutes)

app.listen(PORT, () => {
  console.log(`Server running on :${PORT}`);
});
