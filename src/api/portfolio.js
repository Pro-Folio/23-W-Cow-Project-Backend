import { Router } from "express";
import { Posts, User } from "../../models";
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
});


//메인페이지 조회. 전체 포트폴리오 확인(12개 씩) 페이지 이동 없이
app.get("/", async (req, res) => {

    const portfolioList = await Posts.findAll({
        attributes: ["id", "nickname", "title", "image", "techStack", "summary", "startDate", "endDate", "date", "detail"],
        order: [['id', 'DESC']],
        offset: 0,
        limit: 12
    });

    portfolioList.forEach((item) => {
        item.techStack = JSON.parse(item.techStack);
      });


    return res.json({
        "data": portfolioList,
    })

});


//상세 조회 
app.get("/:id", async (req, res) => {
    const id = req.params.id;
    
    const portfolioDetail = await Posts.findOne({
        where: {
            id
        }
    });

    if(portfolioDetail == null) {
        return res.status(500).json({
            "code": 500,
            "msg": "상세페이지 조회를 실패하였습니다"
        })
    }


        return res.status(200).json({
            "code": 200,
            "msg": "상세페이지 조회 성공",
            "data": {
                "id": portfolioDetail.id,
                "nickname": portfolioDetail.nickname,
                "title": portfolioDetail.title,
                "image": portfolioDetail.image,
                "summary": portfolioDetail.summary,
                "techStack": JSON.parse(portfolioDetail.techStack), //!fix완완
                "startDate": portfolioDetail.startDate,
                "endDate": portfolioDetail.endDate,
                "date": portfolioDetail.date,
                "detail": portfolioDetail.detail
                }
        });

});







//포트폴리오 작성
app.post("/write", verifyToken, upload.single("portfolioimg"), async (req, res) => {


    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var dateString = year + '-' + month  + '-' + day;

    const { title, summary, startDate, endDate, detail} = req.body;
    const image = req.file == undefined ? "": req.file.location; //업로드 된 이미지 경로
    const techStack = JSON.stringify(req.body.techStack);
    const date = dateString;
    const userId = req.decoded.id;



    const userIdCheck = await User.findOne({
        where: {
            id: userId
        }
    });

    
    if(userIdCheck == null) {
        return res.status(500).json({
            "code": 500,
            "msg": "포트폴리오 작성에 실패하였습니다."
        })
    }

        const newPortfolio = await Posts.create({
            nickname: userIdCheck.nickname,
            title,
            image,
            techStack,
            summary,
            startDate,
            endDate,
            date,
            detail,
            userId
        });

        return res.status(200).json({
            "code": 200,
            "msg": "포트폴리오 작성에 성공하였습니다."
        })

});



//포트폴리오 수정
app.put("/:portfolioId", verifyToken, async (req, res) => {

        const { portfolioId } = req.params;
        const { title, image, summary, startDate, endDate, detail } = req.body;
        const techStack = JSON.stringify(req.body.techStack);



        const portfolioIdCheck = await Posts.findOne({
            where: {
                id: portfolioId
            }
        });

        if(portfolioIdCheck == null) {
            return res.status(409).json({
                "code": 409,
                "msg": "수정 오류"
            })
        }


            const newPost = await Posts.update({
                title: title,
                image: image,
                summary: summary,
                techStack: techStack,
                startDate: startDate,
                endDate: endDate,
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
        

});




//포트폴리오 정보 삭제

app.delete("/:portfolioId", verifyToken, async (req, res) => {

        const { portfolioId } = req.params;
        const userId = req.body.id;

        const IdCheck = await Posts.findOne({
            where: {
                id: portfolioId
            }
        });

        if(IdCheck == null) {
            return res.status(500).json({
                "code": 500,
                "msg": "삭제 오류."
            });
        }


        const newPortfolio = await Posts.destroy({
            where: {
                id: parseInt(portfolioId)
            }
        });

        return res.status(200).json({
            "code": 200,
            "msg": "포트폴리오 정보가 삭제되었습니다."
        });
        
});



export default app;
