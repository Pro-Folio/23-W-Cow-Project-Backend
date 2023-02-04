import { Router } from "express";
import User from "../../models/user";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

const app = Router();

app.post('/', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const loginCheck = await User.findAll({
        where: {
            email: email
        }
    });

    if(loginCheck.length === 1) {
        let same = 0
        //const same = bcrypt.compareSync(password, loginCheck[0].password);
        if(password === loginCheck[0].password) {
            same = 1
        } 
        console.log(same)
        if(same) {
            const token = sign({
                id: loginCheck[0].id,
                email: loginCheck[0].email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
                issuer: "developer",
            }
        );
            return res.json({
                "result": "success",
                "code": 200,
                "msg": "로그인 되었습니다.(토큰 1시간 지속)",
                "token": token,
                "data": {
                    "email": email,
                    "password": null,
                }
            });
        }
    
    else if (same === false) {
        return res.json({
            "result": "fail",
            "code": 401,
            "msg": "이메일 또는 비밀번호 오류가 틀렸습니다."
        })
    };
    };


    //등록되지 않은 이메일일 경우
    return res.json({
        "result": "fail",
        "code": 409,
        "msg": "등록되지 않은 이메일입니다."
    })
});

export default app;