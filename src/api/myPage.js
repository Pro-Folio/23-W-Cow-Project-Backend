import { Router } from "express";
import { Posts } from "../../models";
const app = Router();


//포트폴리오 수정 update
app.put("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.update(req.body, { where: { id: id } }).catch(
    (err) => console.log(err)

  );
  res.status(200).send(post);
});

export default app;
