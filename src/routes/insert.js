import express from 'express';
import {insertSql} from '../database/sql';

const router = express.Router();

router.get('/', async function (req, res) {

    if (req.cookies.admin) {
        res.render('insert',{ admin: req.cookies.admin});
    } else {
        res.render('/')
    }

});

router.post("/", async (req,res)=> {
    const vars = req.body;

    if(vars.Vin_car!=''){//각 Vin의 문자열이 빈문자가 아니면 해당 쿼리 실행하도록함
    const data1 = {//11
        Vin: vars.Vin_car,
        Price: vars.Price_car,
        Model: vars.Model_car,
        Color: vars.Color_car,
        Fuel: vars.Fuel_car,
        Brand: vars.Brand_car,
        Fuel_efficiency: vars.Fuel_efficiency_car,
        Sid: vars.Sid_car,
        No_seats: vars.No_seats_car,
        Max_speed: vars.Max_speed_car,
        Engine_size: vars.Engine_size_car
    };
    await insertSql.insertCar(data1);
    } else if(vars.Vin_truck!=''){
    const data2 = {//10
        Vin: vars.Vin_truck,
        Price: vars.Price_truck,
        Model: vars.Model_truck,
        Color: vars.Color_truck,
        Fuel: vars.Fuel_truck,
        Brand: vars.Brand_truck,
        Fuel_efficiency: vars.Fuel_efficiency_truck,
        Sid: vars.Sid_truck,
        No_of_axles: vars.No_of_axles_truck,
        Tonnage: vars.Tonnage_truck,
    };
    await insertSql.insertTruck(data2);
    }else if(vars.Vin_suv!=''){
    const data3 = {//10
        Vin: vars.Vin_suv,
        Price: vars.Price_suv,
        Model: vars.Model_suv,
        Color: vars.Color_suv,
        Fuel: vars.Fuel_suv,
        Brand: vars.Brand_suv,
        Fuel_efficiency: vars.Fuel_efficiency_suv,
        Sid: vars.Sid_suv,
        No_seats: vars.No_seats_suv,
        Size: vars.Size_suv,
    };
    await insertSql.insertSuv(data3);
    }else{
    const data4 = {//11
        Vin: vars.Vin_bus,
        Price: vars.Price_bus,
        Model: vars.Model_bus,
        Color: vars.Color_bus,
        Fuel: vars.Fuel_bus,
        Brand: vars.Brand_bus,
        Fuel_efficiency: vars.Fuel_efficiency_bus,
        Sid: vars.Sid_bus,
        No_seats: vars.No_seats_bus,
        Size: vars.Size_bus,
        Layer: vars.Layer_bus,
    };
    await insertSql.insertBus(data4);
    }
    res.redirect("/insert"); 
  
  
})

module.exports = router;