import { Router } from "express";
import { Posts } from "../../models";
const app = Router();

//포트폴리오 작성 페이지로 이동
app.get("/write", (req, res) => {
  //프론트 작성 페이지
  res.send();
});

//포트폴리오 내용 입력 받기 (작성) create
app.post("/write", async (req, res) => {
  const userId = req.body.userId;
  const image = req.body.image;
  const title = req.body.title;
  const summary = req.body.summary;
  const techStack = req.body.techStack;
  const period = req.body.period;
  const date = req.body.date;
  const detail = req.body.detail;

  const post_list = await Posts.create({
    userId: userId,
    title: title,
    image: image,
    summary: summary,
    techStack: techStack,
    period: period,
    date: date,
    detail: detail,
  });

  return res.json({
    msg: "create 성공",
  });
});

export default app;
