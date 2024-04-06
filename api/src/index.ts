import express from "express";
import cors from "cors";
import mysqlDb from "./mysqlDb";
import newsRouter from "./routers/news";
import commentsRouter from "./routers/ comments";

const app = express();

const port = 8000;
const localhost = `http://localhost:${port}`;

app.use(cors());
app.use(express.json());
app.use(express.static("./src/public"));

app.use("/news", newsRouter);
app.use("/comments", commentsRouter);

const run = async () => {
  await mysqlDb.init();
  app.listen(port, () => {
    console.log(`Server running at ${localhost}`);
  });
};

void run();