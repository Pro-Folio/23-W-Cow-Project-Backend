import { Router } from "express";
import { Posts } from "../../models";
const app = Router();

//마의페이지 (나의 모든 포트폴리오) 조회 read
app.get("/", async (req, res) => {
  const posts = await Posts.findAll({}).catch((err) => console.log(err));
  res.status(200).send(posts);
});

//상세 포트폴리오 조회
app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findOne({ where: { id: id } }).catch((err) =>
    console.log(err)
  );
  res.status(200).send(post);
});

export default app;
