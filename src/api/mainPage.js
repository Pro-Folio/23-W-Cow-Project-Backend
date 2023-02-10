import { query, Router } from "express";
import { Posts } from "../../models";
//techStack 모델 추가
const sequelize = require("sequelize");
const Op = sequelize.Op;

const app = Router();

app.get("/", async (req, res, next) => {
  const searchWord = req.query.techStack; //querystring으로 techStack 받아오기
  console.log("검색 단어는", searchWord);

  const searchQuery = {
    where: {
      techStack: {
        [Op.like]: "%" + searchWord + "%",
      },
    },
  };

  const techStackSearch = await Posts.findAll(searchQuery)
    .then((result) => res.json(result))
    .catch((err) => {
      res.status(500).send(err);
    });
});
export default app;
