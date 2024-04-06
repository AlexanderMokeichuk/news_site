import express from "express";
import {CommentFromFrontend} from "../type";
import mysqlDb from "../mysqlDb";
import {ResultSetHeader} from "mysql2";

const commentsRouter = express.Router();

commentsRouter.post("/", async (req, res, next) => {
  if (!req.body.comment || !req.body.newsId) {
    return res.status(400).json({error: "Incorrect data"});
  }
  if (req.body.comment.trim() === "") {
    return res.status(404).json({error: "Fill in comment"});
  }

  const postComment: CommentFromFrontend = {
    newsId: req.body.newsId,
    author: req.body.author ? req.body.author : "Anonymous",
    comment: req.body.comment,
  };

  try {
    const [result] = await mysqlDb.getConnection().query(
      "INSERT INTO comments (news_id, author, comment)" +
      "VALUES (?, ?, ?)",
      [postComment.newsId, postComment.author, postComment.comment],
    ) as ResultSetHeader[];

    return res.send({
      id: result.insertId,
      ...postComment,
    });
  } catch (e) {
    next(e);
  }
});

commentsRouter.get("/", async (req, res, next) => {
  try {
    const [result] = await mysqlDb.getConnection().query(`SELECT * FROM comments`);
    return res.send(result);
  } catch (e) {
    next(e);
  }
});

commentsRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const [result] = await mysqlDb.getConnection().query(`SELECT * FROM comments WHERE news_id = ${id}`);
    return res.send(result);
  } catch (e) {
    next(e);
  }
});

commentsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await mysqlDb.getConnection().execute(`DELETE FROM comments WHERE id = ${id}`);

    return res.send({ok: true});
  } catch (e) {
    return res.send({error: "You are breaking your link dependency"});
  }
});

export default commentsRouter;