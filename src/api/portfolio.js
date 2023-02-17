import { Router } from "express";
import { Posts, TechStack, User } from "../../models";
import { verifyToken } from "../auth/token";
import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";


const app = Router();



aws.config.update({
    "accessKeyId": process.env.S3KEY,
    "secretAccessKey": process.env.S3SECRETKEY,
    "region": "ap-northeast-2"
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'profolios3',
        acl: 'public-read-write',
        key: (req, file, callback) => {
            callback(null, Date.now() + '.' + file.originalname.split('.').pop());
        }
    }),
    // limits: {
    //     fileSize: 5 * 400 * 250
    // }
})


//메인페이지 조회. 전체 포트폴리오 확인(12개 씩) 페이지 이동 없이
app.get("/", async (req, res) => {

    let offset = 0;
    const portfolioList = await Posts.findAll({
        attributes: ["id", "nickname", "title", "image", "summary", "startDate", "endDate", "date", "detail"],
        include: {
            model: TechStack,
            required: true,
            attributes: ["techStack"]
        },
        order: [['id', 'DESC']],
        offset: offset,
        limit: 12
    });

    

    

    if(portfolioList.length === 0) {
        return res.json({
            "data": []
        })
    }


    return res.json({
        "data": portfolioList,
        
    })

})


//상세 조회 
app.get("/:id", async (req, res) => {
    const id = req.params.id;
    
    const portfolioDetail = await Posts.findAll({
        where: {
            id: id
        }
    });

    const stackDetail = await TechStack.findAll({
        attributes: ["techStack"],
        where: {
            portfolioId: id
        }
    })
    //console.log(stackDetail)

    let st = [];
    let i = 0;
    while(parseInt(i) < stackDetail.length) {
        st.push(stackDetail[i].techStack)
        i++;
    }

    

    if(portfolioDetail.length >= 1) {
        return res.status(200).json({
            "code": 200,
            "msg": "상세페이지 조회 성공",
            "data": {
                "id": portfolioDetail[0].id,
                "nickname": portfolioDetail[0].nickname,
                "title": portfolioDetail[0].title,
                "image": portfolioDetail[0].image,
                "summary": portfolioDetail[0].summary,
                "techStack": st, //!fix완완
                "startDate": portfolioDetail[0].startDate,
                "endDate": portfolioDetail[0].endDate,
                "date": portfolioDetail[0].date,
                "detail": portfolioDetail[0].detail
                }
        });
    }

    return res.status(500).json({
        "code": 500,
        "msg": "상세페이지 조회를 실패하였습니다"
    })

});







//포트폴리오 작성
app.post("/write", verifyToken, upload.single("portfolioimg"), async (req, res) => {


    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var dateString = year + '-' + month  + '-' + day;

    const title = req.body.title;
    const image = req.file == undefined ? "": req.file.location; //업로드 된 이미지 경로
    const summary = req.body.summary;
    let techStack = req.body.techStack;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const date = dateString;
    const detail = req.body.detail;
    const userId = req.decoded.id;



    const userIdCheck = await User.findAll({
        where: {
            id: userId
        }
    });

    if(userIdCheck.length != 0) {
        const newPortfolio = await Posts.create({
            nickname: userIdCheck[0].nickname,
            title: title,
            image: image,
            summary: summary,
            startDate: startDate,
            endDate: endDate,
            date: date,
            detail: detail,
            userId: userId
        });

        while(techStack.length) {
            let st = techStack.pop()
            const newTechStack = TechStack.create({
                portfolioId: newPortfolio.id,
                techStack: st
            })
        }


        return res.status(200).json({
            "code": 200,
            "msg": "포트폴리오 작성에 성공하였습니다."
        })
    }

    return res.status(500).json({
        "code": 500,
        "msg": "포트폴리오 작성에 실패하였습니다."
    })


});


//포트폴리오 수정
app.put("/:portfolioId", verifyToken, async (req, res) => {

    try {
        const { portfolioId } = req.params;
        const title = req.body.title;
        const image = req.body.image;
        const summary = req.body.summary;
        let techStack = req.body.techStack;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const detail = req.body.detail;
        const date = req.body.date;
        



        const portfolioIdCheck = await Posts.findAll({
            where: {
                id: portfolioId
            }
        });

        if(portfolioIdCheck.length != 0) {
            const newPost = await Posts.update({
                title: title,
                image: image,
                summary: summary,
                startDate: startDate,
                endDate: endDate,
                date: date,
                detail: detail
            }, {
                where: {
                    id: parseInt(portfolioId)
                }
            });
            return res.status(200).json({
                "code": 200,
                "msg": "포트폴리오를 수정하였습니다."
            })
        }


    }
    catch(error) {
        return res.status(409).json({
            "code": 409,
            "msg": "수정 오류"
        })
    }




});




//포트폴리오 정보 삭제

app.delete("/:portfolioId", verifyToken, async (req, res) => {
    try {
        const { portfolioId } = req.params;
        const userId = req.body.id;

        const IdCheck = await Posts.findAll({
            where: {
                id: portfolioId
            }
        });

        if(IdCheck.length != 0) {
            const newPortfolio = await Posts.destroy({
                where: {
                    id: parseInt(portfolioId)
                }
            });
            return res.status(200).json({
                "code": 200,
                "msg": "포트폴리오 정보가 삭제되었습니다."
            })
        }

    }
    catch(error) {
        return res.status(500).json({
            "code": 500,
            "msg": "삭제 오류."
        });
    }
});



export default app;
