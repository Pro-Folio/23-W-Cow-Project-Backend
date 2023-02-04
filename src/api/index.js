import { Router } from "express";
import MainPage from "./mainPage";
import MyPage from "./myPage";
const bodyParser = require("body-parser");

const app = Router();

app.use("/mainPage", MainPage);
app.use("/myPage", MyPage);
app.use(bodyParser.urlencoded({ extended: true }));

// //포트폴리오 작성하는 함수
// const addWrite = function (
//   title,
//   image,
//   summary,
//   techStack,
//   period,
//   date,
//   detail,
//   callback
// ) {
//   console.log("write 호출됨.");

//   //커넥션 풀에서 연결 객체를 가져온다.
//   pool.getConnection(function (err, conn) {
//     if (err) {
//       if (conn) {
//         conn.release(); // 반드시 해제해야한다.
//       }

//       callback(err, null);
//       return;
//     }
//     console.log("데이터베이스 연결 스레드 아이디 : " + conn.threadId);

//     // 데이터를 객체로 만든다.
//     const data = {
//       title: title,
//       image: image,
//       summary: summary,
//       techStack: techStack,
//       period: period,
//       date: date,
//       detail: detail,
//     };

//     // SQL 문을 실행한다.
//     var exec = conn.query(
//       "insert into write set ?",
//       data,
//       function (err, result) {
//         conn.release(); // 반드시 해제해야한다.
//         console.log("실행 대상 SQL : " + exec.sql);

//         if (err) {
//           console.log("SQL 실행 시 오류 발생함.");
//           console.dir(err);

//           callback(err, null);
//           return;
//         }
//         callback(null, result);
//       }
//     );
//   });
// };
export default app;
