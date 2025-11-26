require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/database");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

connectDB()

// app.use(
//   cors({
//     origin: "http://localhost:8000",
//     credentials: true,
//   })
// );

const authRouter = require("./src/routes/auth");
const todoRouter = require("./src/routes/todo");

app.use("/", authRouter);
app.use("/", todoRouter);


app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

