import { Router } from "express";
import { Posts } from "../../models";
const app = Router();

//마의페이지 (나의 모든 포트폴리오) 조회
app.get("/", (req, res) => {
  const sql = "select * from posts";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result); //sql 테이블의 모든 데이터 표시
    //console.log(result[0].title); //title만 조회
    res.send(result);
  });
});

//상세 포트폴리오 조회
app.get("/:id", (req, res) => {});

//포트폴리오 삭제
//app.delete("/:id", (req, res) => {});
app.get("/delete/:id", (req, res) => {
  const sql = "DELETE FROM posts WHERE id = ?";
  con.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect("/"); //삭제 후, mypage로 이동
  });
});

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

//포트폴리오 수정
//app.put("/write/:id", (req, res) => {});
app.post("update/:id", (req, res) => {
  const sql = "UPDATE posts SET ? WHERE id = " + req.params.id;
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect("/"); //나의 페이지로 이동
  });
});
//수정 전 데이터 불러오기
app.get("edit/:id", (req, res) => {
  const sql = "SELECT * FROM posts WHERE id = ?";
  con.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    res.render("edit", { posts: result });
  });
});
export default app;
