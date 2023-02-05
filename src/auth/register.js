import { Router } from "express";
import User from "../../models/user";

const app = Router();

//회원가입
app.post("/", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const nickname = req.body.nickname;
    const stack = req.body.stack;

    const dbCheck = await User.findAll({
        where: {
            email: email
        }
    });

    if(dbCheck.length === 1) {
        return res.json({
            "code": 409,
            "msg": "이미 사용중인 이메일 입니다."
        });
    }

    //DB Create
    const newUser = await User.create({
        email: email,
        password: password,
        nickname: nickname,
        stack: stack,
    });


    return res.json({
        "code": 200,
        "msg": "회원가입 성공",
        "data": {
            "id": newUser.id
        }
    })
})




//유일한 닉네임 검사
app.get("/:nickname", async (req, res) => {
    const nickname = req.params.nickname;

    const dbCheck = await User.findAll({
        where: {
            nickname: nickname
        }
    });

    
    if(dbCheck.length === 1) {
        return res.json({
            "code": 409,
            "msg": "중복된 닉네임 입니다."
        });
    }

    return res.json({
        "code": 200,
        "data": "사용할 수 있는 닉네임입니다"
    })
})

export default app;