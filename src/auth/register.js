import { Router } from "express";
import User from "../../models/user";

const app = Router();

//회원가입
app.post("/", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const nickname = req.body.nickname;
    const stack = req.body.stack;

    const loginCheck = User.findAll({
        where: { email }
    });

    if(loginCheck === 1) {
        return res.json({
            "statusCode": 400,
            "errorCode": "USER_ALREADY_EXISTS",
            "errorMessage": "이미 사용중인 이메일/이름 입니다."
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
        "id": newUser.id,
        "email": email,
        "password": password,
        "nickname": nickname,
        "stack": stack,
    })
})


export default app;