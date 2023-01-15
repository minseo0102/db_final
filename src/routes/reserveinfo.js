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
import {reservationSql, updateSql} from "../database/sql";

const router = express.Router();

router.get("/", async function (req, res) {
   
    const data = {
        Ssn: req.cookies.user
    }

    const myCarInfo = await reservationSql.myCar(data);
    const myTruckInfo = await reservationSql.myTruck(data);
    const mySuvInfo = await reservationSql.mySuv(data);
    const myBusInfo = await reservationSql.myBus(data);

    if (req.cookies.user) {

        res.render('reserveinfo', { user: req.cookies.user, 
            myCarInfo,
            myTruckInfo,
            mySuvInfo,
            myBusInfo
        });
    } else {
        res.render('/')
    }

});

router.post('/', async (req, res) => {
    //console.log('delete router:', req.body.delBtn);
    
    const data = {
        Ssn: req.cookies.user,
        Vin: req.body.cancelBtn,
    };

    await updateSql.cancelReserve(data);

    res.redirect('/reserveinfo');
});

module.exports = router;

