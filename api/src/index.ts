import express from "express";
import cors from "cors";
import mysqlDb from "./mysqlDb";

const app = express();

const port = 8000;
const localhost = `http://localhost:${port}`;

app.use(cors());
app.use(express.json());
app.use(express.static("./src/public"));


const run = async () => {
  await mysqlDb.init();
  app.listen(port, () => {
    console.log(`Server running at ${localhost}`);
  });
};

void run();