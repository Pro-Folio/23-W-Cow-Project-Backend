import { Router } from "express";
import { Posts } from "../../models";
const bodyParser = require("body-parser");
const app = Router();
app.use(bodyParser.urlencoded({ extended: true }));

//mysql 연동하기
const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "express_db",
});

//데이터베이스 생성 및 연결
con.connect(function (err) {
  if (err) throw err;
  console.log("연결되었습니다.");
  //   con.query("CREATE DATABASE express_db", function (err, result) {
  //     if (err) throw err;
  //     console.log("database 생성되었습니다.");
  //   });
  //주석 해제 후 실행 -> "database 생성되었습니다." 로그 확인 후
  //다시 주석 처리하기
  //왜냐하면, 데이터베이스는 하나 밖에 만들 수 없기 때문이다.
  //주석처리하지 않으면 이미 존재하는 DB를 또 생성하기에 ER_DB_CREATE_EXISTS 에러 발생한다.

  //  const sql =
  //  "CREATE TABLE posts (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, image VARCHAR(200) NOT NULL, title VARCHAR(200) NOT NULL, summary VARCHAR(200) NOT NULL, techStack VARCHAR(200) NOT NULL, detail VARCHAR(200) NOT NULL)";
  //   con.query(sql, function (err, result) {
  //     if (err) throw err;
  //     console.log("테이블 생성되었습니다.");
  //   });
  //테이블 생성 후 주석처리

  //  const sql = "select * from posts"; //모든 데이터를 검색
  //   con.query(sql, function (err, result, fields) {
  //     if (err) throw err;
  //     console.log(result); //sql 테이블의 모든 데이터 표시
  //     //console.log(result[0].title); //title만 조회
  //   });

  //작성 예시
  const sql =
    "INSERT INTO posts(image,title,summary,techStack,detail) VALUES('이미지.jpg','명지','명지대학교 포트폴리오입니다.','javascript','이 포트폴리오는 ~~')";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

//마의페이지 (나의 모든 포트폴리오) 조회
app.get("/", (req, res) => {
  const sql = "select * from posts";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    //console.log(result); //sql 테이블의 모든 데이터 표시
    console.log(result[0].title); //title만 조회
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

//포트폴리오 내용 입력 받기 (작성)
app.post("/write", (req, res) => {
  // res.send(req.body);
  const sql = "INSERT INTO posts SET ?";
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    //res.send("등록이 완료되었습니다.")
    res.redirect("/"); //나의 페이지로 이동
  });
});

//포트폴리오 수정
app.put("/write/:id", (req, res) => {});

export default app;
