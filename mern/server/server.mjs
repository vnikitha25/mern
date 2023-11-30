import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/complaints.mjs";

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/complaint", records);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
