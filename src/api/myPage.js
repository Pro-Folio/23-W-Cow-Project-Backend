import { Router } from "express";
import { Posts } from "../../models";
const app = Router();

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
