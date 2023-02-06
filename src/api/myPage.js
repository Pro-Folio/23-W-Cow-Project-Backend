import { Router } from "express";
import { Posts } from "../../models";
const app = Router();

//포트폴리오 삭제 delete
app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Posts.destroy({ where: { id: id } }).catch((err) => console.log(err));
  res.status(200).send("게시글이 삭제되었습니다.");

});

export default app;
