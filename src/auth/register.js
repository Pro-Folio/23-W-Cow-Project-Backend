import { Router } from "express";
import User from "../../models/user";

const app = Router();

//회원가입
app.post("/", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const nickname = req.body.nickname;


    const loginCheck = User.findAll({
        where: { email }
    });

    if(loginCheck === 1) {
        return res.json({
            "error": "이미 사용중인 이메일/이름 입니다."

    const stack = req.body.stack;

    const dbCheck = await User.findAll({
        where: {
            email: email
        }
    });

    if(dbCheck.length === 1) {
        return res.json({
            "result": "fail",
            "code": "409",
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
        "id": newUser.id,
        "email": email,
        "password": password,
        "nickname": nickname,
        "result": "success",
        "code": "200",
        "msg": "회원가입 성공",
        "data": {
            "id": newUser.id,
            "password": null,
            "email": null,
            "stack": newUser.stack,
        }
    })
})


export default app;