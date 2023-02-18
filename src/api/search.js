import { Router } from "express";
import { Posts, TechStack, User } from "../../models";
const sequelize = require("sequelize");
const Op = sequelize.Op;

const app = Router();

app.get("/", async (req, res, next) => {
  const queryWord = req.query.searchWord;
  const searchWord = queryWord.replace(" ", "%"); //띄어쓰기 사용하여 검색하였을 때.

  const searchTech = await TechStack.findAll({
    where: {
      techStack: { [Op.like]: `${searchWord}` },
    },
  });

  let portfolioId = [];
  let i = 0;
  while (parseInt(i) < searchTech.length) {
    portfolioId.push(searchTech[i].portfolioId);
    i++;
  }

  const searchPosts = await Posts.findAll({
    attributes: [
      "nickname",
      "title",
      "image",
      "summary",
      "startDate",
      "endDate",
      "date",
      "detail",
    ],
    where: { id: portfolioId },
  });

  return res.status(200).json({
    code: 200,
    msg: "기술 스택 검색 성공",
    data: searchPosts,
  });
});

export default app;