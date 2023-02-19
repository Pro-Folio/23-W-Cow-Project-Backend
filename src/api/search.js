import { Router } from "express";
import { Posts, TechStack, User } from "../../models";
const sequelize = require("sequelize");
const Op = sequelize.Op;

const app = Router();

app.get("/", async (req, res, next) => {
  let searchWord = req.query.searchWord;

  //const searchWord = queryWord.replaceAll(" ", " . "); //띄어쓰기 사용하여 검색하였을 때.
  console.log(searchWord);

  let techStackSearch = await Posts.findAll({
    attributes: [
      "id",
      "nickname",
      "title",
      "image",
      "summary",
      "startDate",
      "endDate",
      "date",
      "detail",
      "techStack",
    ],
    where: {
      techStack: { [Op.like]: "%" + searchWord + "%" },
    },
  });

  return res.status(200).json({
    code: 200,
    msg: "기술 스택 검색 성공",
    data: techStackSearch,
  });
});

export default app;
