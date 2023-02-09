import { Router } from "express";
import { Posts } from "../../models";
import { User } from "../../models";

const app = Router();

//포트폴리오 내용 입력 받기 (작성) create
app.post("/", async (req, res) => {
  const image = req.body.image;
  const title = req.body.title;
  const summary = req.body.summary;
  const techStack = req.body.techStack;
  const period = req.body.period;
  const detail = req.body.detail;
  //const createUser = await User.findOne({ where: { UserId: id } });

  //로그인 후 발급 받은 토큰 검사
  const request = async (req, api) => {
    try {
      if (!req.session.jwt) {
        // 세션에 토큰이 없으면
        const tokenResult = await axios.post(`${URL}/token`, {
          clientSecret: process.env.CLIENT_SECRET,
        });
        req.session.jwt = tokenResult.data.token; // 세션에 토큰 저장
      }
      return await axios.get(`${URL}${api}`, {
        //토큰 발급 성공했으면 토큰 저장 후 원래 보내고 싶었던 api 주소로 요청을 보낸다.
        headers: { authorization: req.session.jwt },
      }); // API 요청
    } catch (error) {
      if (error.response.status === 419) {
        // 토큰 만료시 토큰 재발급 받기
        delete req.session.jwt;
        return request(req, api); //맨 위의 request 함수를 호출한거임 / 바로 위에서 토큰을 삭제해주었기 때문에 새로 발급됨
      } // 419(토큰 만료) 외의 다른 에러면
      return error.response;
    }
  };

  try {
    const post_list = await Posts.create({
      title: title,
      image: image,
      summary: summary,
      techStack: techStack,
      period: period,
      detail: detail,
      // include: [
      //   {
      //     model: User,
      //     attributes: ["nickname"],
      //     // where: {
      //     //   UserId: loginCheck[0].id, //로그인 한 사용자의 id
      //     // },
      //   },
      // ],
      //createUser: createUser,
    });
    return res.json({
      code: 200,
      msg: "포트폴리오 작성에 성공하였습니다.",
      data: post_list, //구현 완료 후, 삭제
    });
  } catch (error) {
    //Null Error
    if (error.name === "SequelizeValidationError") {
      console.error("Validation error: ", error.message);
      error.errors.forEach((err) => {
        console.error(`Validation error item: ${err.message}`);
      });
      return res.json({
        code: 400,
        msg: `${error.message}`, //"notNull Violation: title 입력되지 않았습니다."
      });
    } else {
      console.error("Error: ", error);
    }
  }
});

//마의페이지 (나의 모든 포트폴리오) 조회 read
app.get("/my", async (req, res) => {
  const posts = await Posts.findAll({
    include: [
      {
        model: User,
        // where: {
        //   UserId: loginCheck[0].id, //로그인 한 사용자의 id
        // },
      },
    ],
  }).catch((err) => console.log(err));

  // res.status(200).send(posts);
  return res.json({
    code: 200,
    msg: "마이페이지 조회 성공",
    data: posts,
  });
});

//상세 포트폴리오 조회 read
app.get("/:portfolioId", async (req, res) => {
  const id = req.params.portfolioId;
  const post = await Posts.findOne({ where: { id: id } }).catch((err) =>
    console.log(err)
  );
  res.status(200).send(post);
});

//포트폴리오 수정 update
app.put("/:portfolioId", async (req, res) => {
  //로그인 후 발급 받은 토큰 검사
  //creat 내용 복붙해오기

  const id = req.params.portfolioId;
  const post = await Posts.update(req.body, { where: { id: id } }).catch(
    (err) => console.log(err)
  );
  res.status(200).send(post);
});

//포트폴리오 삭제 delete
app.delete("/:portfolioId", async (req, res) => {
  const id = req.params.portfolioId;
  await Posts.destroy({ where: { id: id } }).then((deletedRows) => {
    if (deletedRows === 0) {
      console.log("삭제할 포트폴리오가 없습니다.");
      return res.json({
        code: 500,
        msg: "삭제할 포트폴리오가 없습니다.",
      });
    } else {
      console.log(`${deletedRows} rows were deleted`);
      return res.json({
        code: 200,
        msg: `${id}번 포트폴리오 삭제하였습니다.`,
      });
    }
  });
  //.catch((err) => console.log(err));
  //res.status(200).send("게시글이 삭제되었습니다.");
});

export default app;
