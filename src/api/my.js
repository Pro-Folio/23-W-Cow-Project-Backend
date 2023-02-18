import { Router } from "express";
import { Posts, User } from "../../models";
import { verifyToken } from "../auth/token";

const app = Router();



//마이페이지(나의 모든 포트폴리오) 조회
app.get("/", verifyToken, async (req, res) => {
    const userId = req.decoded.id;

    const portfolioList = await Posts.findAll({
        where: {
            userId: userId
        }
    });
    
    portfolioList.forEach((item) => {
        item.techStack = JSON.parse(item.techStack);
      });

    const userData = await User.findAll({
        where: {
            id: userId
        }
    })

    if(portfolioList.length != 0) {
        return res.status(200).json({
            "code": 200,
            "msg": "마이페이지 조회 성공",
            "userData": {
                "email": userData[0].email,
                "nickname": userData[0].nickname
            },
            "data": portfolioList
        });
    }
});


//상세 조회 
// app.get("/:id", async (req, res) => {
//     const id = req.params.id;
    
//     const portfolioDetail = await Posts.findAll({
//         where: {
//             id: id
//         }
//     });

//     const stackDetail = await TechStack.findAll({
//         attributes: ["techStack"],
//         where: {
//             portfolioId: id
//         }
//     })
//     //console.log(stackDetail)

//     let st = [];
//     let i = 0;
//     while(parseInt(i) < stackDetail.length) {
//         st.push(stackDetail[i].techStack)
//         i++;
//     }

    

//     if(portfolioDetail.length >= 1) {
//         return res.json({
//             "code": 200,
//             "msg": "상세페이지 조회 성공",
//             "data": {
//                 "id": portfolioDetail[0].id,
//                 "nickname": portfolioDetail[0].nickname,
//                 "title": portfolioDetail[0].title,
//                 "image": portfolioDetail[0].image,
//                 "summary": portfolioDetail[0].summary,
//                 "techStack": st, //!fix완완
//                 "startDate": portfolioDetail[0].startDate,
//                 "endDate": portfolioDetail[0].endDate,
//                 "date": portfolioDetail[0].date,
//                 "detail": portfolioDetail[0].detail
//                 }
//         });
//     }

//     return res.json({
//         "code": 500,
//         "msg": "상세페이지 조회를 실패하였습니다"
//     })

// });

export default app;