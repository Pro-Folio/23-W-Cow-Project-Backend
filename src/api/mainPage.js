import { query, Router } from "express";
import { Posts } from "../../models";
import { User } from "../../models";

//techStack 모델 추가
const sequelize = require("sequelize");
const Op = sequelize.Op;

const app = Router();

app.get("/", async (req, res, next) => {
  //   const techStack = req.query.techStack; //querystring으로 techStack 받아오기
  //   console.log("검색 테크스택은", techStack);

  const queryWord = req.query.searchWord;
  const searchWord = queryWord.replace(" ", "%"); //띄어쓰기 사용하여 검색하였을 때.
  console.log("검색 단어는", searchWord);
  const searchQuery = {
    where: {
      techStack: { [Op.like]: `%${searchWord}%` },
    },
  };
  const techStackSearch = await Posts.findAll(searchQuery)
    .then((result) => res.json(result))
    .catch((err) => {
      res.status(500).send(err);
    });

  //   const type = req.query.type;
  //   console.log("타입은", type);
  //   const query = req.query.query;
  //   console.log("검색 단어는", query);

  //   if (type == "techStack") {
  //     console.log("타입은 테크스택으로 확인됨.");
  //     const searchQuery = {
  //       where: {
  //         techStack: {
  //           [Op.like]: "%" + query + "%",
  //         },
  //       },
  //     };
  //     const techStackSearch = await Posts.findAll(searchQuery)
  //       .then((result) => res.json(result))
  //       .catch((err) => {
  //         res.status(500).send(err);
  //       });
  //   } else if (type == "nickname") {
  //     const searchQuery = {
  //       include: [
  //         {
  //           model: User,
  //           where: {
  //             nickname: {
  //               [Op.like]: "%" + query + "%",
  //             },
  //           },
  //         },
  //       ],
  //     };
  //     const techStackSearch = await Posts.findAll(searchQuery)
  //       .then((result) => res.json(result))
  //       .catch((err) => {
  //         res.status(500).send(err);
  //       });
  //   }
});
export default app;
