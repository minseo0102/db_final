// Copyright 2021 kms
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import express from "express";
import { selectSql, updateSql} from "../database/sql";
// TODO
// sql import

const router = express.Router();

router.get('/', async function (req, res) {
    const carInfo = await selectSql.getCar();
    const truckInfo = await selectSql.getTruck();
    const suvInfo = await selectSql.getSuv();
    const busInfo = await selectSql.getBus();

    if (req.cookies.user) {
        res.render('reserve', { user: req.cookies.user, 
            title: '구매 예약',
            carInfo,
            truckInfo,
            suvInfo,
            busInfo 
        });
    } else {
        res.render('/')
    }

});

router.post("/", async (req,res)=> {

    
    const data = {
        Ssn: req.cookies.user,
        Vin: req.body.reserveBtn,
    };

    await updateSql.updateReserve(data);
  
  
    res.redirect("/reserve"); 
  
  
})
  

module.exports = router;