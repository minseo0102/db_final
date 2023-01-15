import express from "express";
import { selectSql, updateSql} from "../database/sql";//예약 조회, 수정, 완료(판매완료, 판매실패)
// TODO
// sql import

const router = express.Router();

router.get('/', async function (req, res) {

    const reservCar = await selectSql.getreservCar();
    const reservTruck = await selectSql.getreservTruck();
    const reservSuv = await selectSql.getreservSuv();
    const reservBus = await selectSql.getreservBus();

    if (req.cookies.admin) {
        // TODO
        // 불러온 class 정보 같이 넘겨주기

        res.render('salesinfo', { admin: req.cookies.admin, 
            title: '예약 조회',
            reservCar,
            reservTruck,
            reservSuv,
            reservBus 
        });
    } else {
        res.render('/')
    }

});

router.post("/", async (req,res)=> {
    const vars = req.body;
    const data1 = {
        Sid: vars.sid,
        Ssn: vars.ssn,
        Date: vars.date,
        Vin: vars.rsvupdateBtn
    }   
    await updateSql.rsvUpdate(data1);
    const data2 = {
        Vin: req.body.soldoutBtn,
    };

    await updateSql.soldOut(data2);
  
    const data3 = {
        Vin: req.body.salefailBtn,
    };

    await updateSql.saleFail(data3);

    res.redirect("/salesinfo"); 
  
  
})
  
module.exports = router;