import { Router } from "express";
import User from "../../models/user";

const app = Router();

app.get("/", async (req, res) => {
    const nickname = req.body.nickname;

    const dbCheck = await User.findAll({
        where: {
            nickname: nickname
        }
    });


    
    if(dbCheck.length === 1) {
        return res.json({
            "result": "fail",
            "code": "409",
            "msg": "중복된 닉네임 입니다."
        });
    }

    return res.json({
        "result": "success",
        "code": "200",
        "data": "사용할 수 있는 닉네임입니다"
    })
})




export default app;