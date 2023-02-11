import { Router } from "express";
import User from "../../models/user";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

const app = Router();

//로그인
app.post('/', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const loginCheck = await User.findAll({
        where: {
            email
        }
    });
    
 //얼리리턴
    if(loginCheck.length != 1) {
        return res.status(401).json({
            "code": 401,
            "msg": "이메일 또는 비밀번호 오류가 틀렸습니다."
            });
    };

    const same = bcrypt.compareSync(password, loginCheck[0].password);
        if(same) {
            const token = sign({
                id: loginCheck[0].id,
                email: loginCheck[0].email,
                nickname: loginCheck[0].nickname
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
                issuer: "developer",
            }
        );
            return res.status(200).json({
                "code": 200,
                "msg": "로그인 되었습니다.(토큰 1시간 지속)",
                "data": {
                    "email": email,
                    "id": loginCheck[0].id,
                    "token": token
                }
            });
        }

});

export default app;