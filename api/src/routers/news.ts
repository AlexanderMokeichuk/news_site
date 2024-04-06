import express from "express";
import {imagesUpload} from "../multer";
import {NewsFromFrontend} from "../type";
import {ResultSetHeader, RowDataPacket} from "mysql2";
import mysqlDb from "../mysqlDb";

const newsRouter = express.Router();

newsRouter.post("/", imagesUpload.single("image"), async (req, res, next) => {
  if (!req.body.title || !req.body.description) {
    return res.status(400).json({error: "Incorrect data"});
  }
  if (req.body.title.trim() === "" || req.body.description.trim() === "") {
    return res.status(404).json({error: "Fill in title or description"});
  }

  const postNews: NewsFromFrontend = {
    title: req.body.title,
    description: req.body.description.trim() === "" ? null : req.body.description,
    image: req.file ? req.file.filename : null,
    datetime: new Date().toISOString(),
  };

  try {
    const [result] = await mysqlDb.getConnection().query(
      'INSERT INTO news (title, description, image, datetime)' +
      'VALUES (?, ?, ?, ?)',
      [postNews.title, postNews.description, postNews.image, postNews.datetime],
    ) as ResultSetHeader[];

    return res.send({
      id: result.insertId,
      ...postNews,
    });
  } catch (e) {
    next(e);
  }
});

newsRouter.get("/", async (req, res, next) => {
  try {
    const [result] = await mysqlDb.getConnection().query(`SELECT  news.id, news.title, news.image, news.datetime FROM news`);
    return res.send(result);
  } catch (e) {
    next(e);
  }
});

newsRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const [result] = await mysqlDb.getConnection().query(`SELECT * FROM news WHERE id = ${id}`) as RowDataPacket[];

    const news = result[0];
    if (!news) {
      return res.status(404).send({error: "Not Found!!"});
    }

    return res.send(news);
  } catch (e) {
    next(e);
  }
});

newsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await mysqlDb.getConnection().execute(`DELETE FROM news WHERE id = ${id}`);

    return res.send({ok: true});
  } catch (e) {
    return res.send({error: "You are breaking your link dependency"});
  }
});

export default newsRouter;