import express from 'express';
import {selectSql, updateSql, deleteSql} from '../database/sql';

const router = express.Router();

router.get('/', async function (req, res) {
    const carInfo = await selectSql.getcarInfo();
    const truckInfo = await selectSql.gettruckInfo();
    const suvInfo = await selectSql.getsuvInfo();
    const busInfo = await selectSql.getbusInfo();

    if (req.cookies.admin) {
        // TODO
        // 불러온 class 정보 같이 넘겨주기

        res.render('update', { admin: req.cookies.admin, 
            title: '차량 조회',
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
    const vars = req.body;
    //const var_length = Object.keys(req.body).length;

    //if(vars.Vin_car!=''){//각 Vin의 문자열이 빈문자가 아니면 해당 쿼리 실행하도록함
    const data1 = {//11
        Vin: vars.carupdateBtn,
        Price: vars.Price_car,
        Model: vars.Model_car,
        Color: vars.Color_car,
        Fuel: vars.Fuel_car,
        Brand: vars.Brand_car,
        Fuel_efficiency: vars.Fuel_efficiency_car,
        No_seats: vars.No_seats_car,
        Max_speed: vars.Max_speed_car,
        Engine_size: vars.Engine_size_car
    };
    await updateSql.updateCar(data1);
    //} else if(vars.Vin_truck!=''){
    const data2 = {//10
        Vin: vars.truckupdateBtn,
        Price: vars.Price_truck,
        Model: vars.Model_truck,
        Color: vars.Color_truck,
        Fuel: vars.Fuel_truck,
        Brand: vars.Brand_truck,
        Fuel_efficiency: vars.Fuel_efficiency_truck,
        No_of_axles: vars.No_of_axles_truck,
        Tonnage: vars.Tonnage_truck,
    };
    await updateSql.updateTruck(data2);
    //}else if(vars.Vin_suv!=''){
    const data3 = {//10
        Vin: vars.suvupdateBtn,
        Price: vars.Price_suv,
        Model: vars.Model_suv,
        Color: vars.Color_suv,
        Fuel: vars.Fuel_suv,
        Brand: vars.Brand_suv,
        Fuel_efficiency: vars.Fuel_efficiency_suv,
        No_seats: vars.No_seats_suv,
        Size: vars.Size_suv,
    };
    await updateSql.updateSuv(data3);
    //}else{
    const data4 = {//11
        Vin: vars.busupdateBtn,
        Price: vars.Price_bus,
        Model: vars.Model_bus,
        Color: vars.Color_bus,
        Fuel: vars.Fuel_bus,
        Brand: vars.Brand_bus,
        Fuel_efficiency: vars.Fuel_efficiency_bus,
        No_seats: vars.No_seats_bus,
        Size: vars.Size_bus,
        Layer: vars.Layer_bus,
    };
    await updateSql.updateBus(data4);
    //}

    const data5 = {
        Vin: vars.cardeleteBtn
    }
    await deleteSql.deleteCar(data5);

    const data6 = {
        Vin: vars.truckdeleteBtn
    }
    await deleteSql.deleteTruck(data6);

    const data7 = {
        Vin: vars.suvdeleteBtn
    }
    await deleteSql.deleteSuv(data7);

    const data8 = {
        Vin: vars.busdeleteBtn
    }
    await deleteSql.deleteBus(data8);
    
    res.redirect("/update"); 
  
  
})

module.exports = router;