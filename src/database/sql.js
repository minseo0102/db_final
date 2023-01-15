import mysql from "mysql2";

// 데이터베이스 연결
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root',
    database: 'Car_dealer',
    password: 'alstj123!',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);

// async / await 사용
const promisePool = pool.promise();

// selec query
export const selectSql = {
  getUsers: async () => {
    const [rows] = await promisePool.query(`select * from user`);

    return rows
  },
  getVehicle: async () => {
    const [rows] = await promisePool.query(`select * from vehicle`);

    return rows
  },
  getCar: async () => {//예약 가능한 차량 조회// view이용
    const [rows] = await promisePool.query(`select * from carinfo limit 3`);
    return rows;
  },
  getTruck: async () => {
    const [rows] = await promisePool.query(`select * from truckinfo limit 3`);
    return rows;
  },
  getSuv: async () => {
    const [rows] = await promisePool.query(`select * from suvinfo limit 3`);
    return rows;
  },
  getBus: async () => {
    const [rows] = await promisePool.query(`select * from businfo limit 3`);
    return rows;
  },
  getSalesperson: async () => {
    const [rows] = await promisePool.query(`select * from salesperson`);
    return rows;
  },
  getCustomer: async () => {
    const [rows] = await promisePool.query(`select * from customer`);
    return rows;
  },
  getreservCar: async()=>{//관리자 페이지에서 예약된 모든 차량 조회
    const [rows] = await promisePool.query(`select * from myCarinfo where sold_out is NULL`);
    return rows;
  },
  getreservTruck: async()=>{
    const [rows] = await promisePool.query(`select * from myTruckinfo where sold_out is NULL`);
    return rows;
  },
  getreservSuv: async()=>{
    const [rows] = await promisePool.query(`select * from mySuvinfo where sold_out is NULL`);
    return rows;
  },
  getreservBus: async(data)=>{
    const [rows] = await promisePool.query(`select * from myBusinfo where sold_out is NULL`);
    return rows;
  },
  getcarInfo: async()=>{//모든 차량 데이터의 정보를 조회
    const [rows] = await promisePool.query(`select * from vehicle, car where vehicle.vin=car.vin limit 3`);
    return rows;
  },
  gettruckInfo: async()=>{
    const [rows] = await promisePool.query(`select * from vehicle, truck where vehicle.vin=truck.vin limit 3`);
    return rows;
  },
  getsuvInfo: async()=>{
    const [rows] = await promisePool.query(`select * from vehicle, suv where vehicle.vin=suv.vin limit 3`);
    return rows;
  },
  getbusInfo: async()=>{
    const [rows] = await promisePool.query(`select * from vehicle, bus where vehicle.vin=bus.vin limit 3`);
    return rows;
  }

}

export const reservationSql = {//사용자 페이지의 예약 내역 조회를 위한 sql
  myCar: async(data)=>{
    const [rows] = await promisePool.query(`select * from myCarinfo where ssn="${data.Ssn}" and sold_out is NULL`);
    return rows;
  },
  myTruck: async(data)=>{
    const [rows] = await promisePool.query(`select * from myTruckinfo where ssn="${data.Ssn}" and sold_out is NULL`);
    return rows;
  },
  mySuv: async(data)=>{
    const [rows] = await promisePool.query(`select * from mySuvinfo where ssn="${data.Ssn}" and sold_out is NULL`);
    return rows;
  },
  myBus: async(data)=>{
    const [rows] = await promisePool.query(`select * from myBusinfo where ssn="${data.Ssn}" and sold_out is NULL`);
    return rows;
  }
}

export const updateSql = {
  updateReserve: async(data)=>{//예약 버튼 누르면 정보 수정
    const update1 = `update customer set Count = Count + 1 where Ssn = "${data.Ssn}"`;
    const update2 = `update vehicle set date = now(), Ssn = "${data.Ssn}" where Vin = "${data.Vin}"`;
    await promisePool.query(update1);
    await promisePool.query(update2);
  },
  cancelReserve: async(data)=>{//예약 취소시 정보 수정
    const update1 = `update customer set Count = Count - 1 where Ssn = "${data.Ssn}"`;
    const update2 = `update vehicle set date = null, Ssn = null where Vin = "${data.Vin}"`;
    await promisePool.query(update1);
    await promisePool.query(update2);
  },
  rsvUpdate: async (data) => {//예약 내역을 수정하는 sql, sid가 바뀌면 예약자가 바뀐것이므로 count개수를 조정하고 vehicle의 sid를 변경
    const ssnUpdate1 = `update customer set Count = Count -1 where ssn in(select ssn from vehicle where vin = "${data.Vin}")`;
    const ssnUpdate2 = `update vehicle set ssn = "${data.Ssn}" where vin = "${data.Vin}"`;
    const ssnUpdate3 = `update customer set Count = Count +1 where ssn = "${data.Ssn}"`;
    await promisePool.query(ssnUpdate1);
    await promisePool.query(ssnUpdate2);
    await promisePool.query(ssnUpdate3);

    const sidUpdate = `update vehicle set sid = "${data.Sid}" where vin="${data.Vin}"`;
    await promisePool.query(sidUpdate);

    const dateUpdate = `update vehicle set date = "${data.Date}" where vin="${data.Vin}"`;
    await promisePool.query(dateUpdate);
  },

  soldOut: async(data)=>{//판매 완료
    
    const update1 = `update customer set Count = Count - 1 where Ssn in(select Ssn from vehicle where Vin="${data.Vin}")`;
    const update2 = `update vehicle set Sold_out="Y" where Vin = "${data.Vin}"`;
    await promisePool.query(update1);
    await promisePool.query(update2);
  },
  saleFail: async(data)=>{//판매 실패
    
    const update1 = `update customer set Count = Count - 1 where Ssn in(select Ssn from vehicle where Vin="${data.Vin}")`;
    const update2 = `update vehicle set date = null, Ssn = null where Vin = "${data.Vin}"`;
    await promisePool.query(update1);
    await promisePool.query(update2);
  },
  updateCar: async(data)=>{//관리자 페이지에서 차량 정보 갱신 sql
    const update1 = `update vehicle set price = "${data.Price}", model = "${data.Model}", color = "${data.Color}", 
    fuel = "${data.Fuel}", brand = "${data.Brand}", fuel_efficiency = "${data.Fuel_efficiency}" where vin = "${data.Vin}"`;
    const update2 = `update car set no_seats = "${data.No_seats}", max_speed = "${data.Max_speed}", 
    engine_size = "${data.Engine_size}" where vin = "${data.Vin}"`;
    await promisePool.query(update1);
    await promisePool.query(update2);
  },
  updateTruck: async(data)=>{//관리자 페이지에서 차량 정보 갱신 sql
    const update1 = `update vehicle set price = "${data.Price}", model = "${data.Model}", color = "${data.Color}", fuel = "${data.Fuel}", brand = "${data.Brand}", fuel_efficiency = "${data.Fuel_efficiency}" where vin = "${data.Vin}"`;
    const update2 = `update truck set no_of_axles = "${data.No_of_axles}", tonnage = "${data.Tonnage}" where vin = "${data.Vin}"`;
    await promisePool.query(update1);
    await promisePool.query(update2);
  },
  updateSuv: async(data)=>{//관리자 페이지에서 차량 정보 갱신 sql
    const update1 = `update vehicle set price = "${data.Price}", model = "${data.Model}", color = "${data.Color}", fuel = "${data.Fuel}", brand = "${data.Brand}", fuel_efficiency = "${data.Fuel_efficiency}" where vin = "${data.Vin}"`;
    const update2 = `update suv set no_seats = "${data.No_seats}", size = "${data.Size}" where vin = "${data.Vin}"`;
    await promisePool.query(update1);
    await promisePool.query(update2);
  },
  updateBus: async(data)=>{//관리자 페이지에서 차량 정보 갱신 sql
    const update1 = `update vehicle set price = "${data.Price}", model = "${data.Model}", color = "${data.Color}", fuel = "${data.Fuel}", brand = "${data.Brand}", fuel_efficiency = "${data.Fuel_efficiency}" where vin = "${data.Vin}"`;
    const update2 = `update bus set no_seats = "${data.No_seats}", size = "${data.Size}", layer = "${data.Layer}" where vin = "${data.Vin}"`;
    await promisePool.query(update1);
    await promisePool.query(update2);
  }
}

export const insertSql = {//관리자 페이지에서 차량 데이터 삽입 sql
  insertCar: async(data)=>{
    const insert1 = `insert into vehicle (Vin, Price, Model, Color, Fuel, Brand, Fuel_efficiency, Sid) 
    VALUES ("${data.Vin}", "${data.Price}", "${data.Model}", "${data.Color}", "${data.Fuel}", "${data.Brand}", "${data.Fuel_efficiency}", "${data.Sid}")`;
    const insert2 = `insert into car (No_seats, Max_speed, Engine_size, Vin) 
    values ("${data.No_seats}", "${data.Max_speed}", "${data.Engine_size}", "${data.Vin}")`;
    await promisePool.query(insert1);
    await promisePool.query(insert2);
  },
  insertTruck: async(data)=>{
    const insert1 = `insert into vehicle (Vin, Price, Model, Color, Fuel, Brand, Fuel_efficiency, Sid) VALUES ("${data.Vin}", "${data.Price}", "${data.Model}", "${data.Color}", "${data.Fuel}", "${data.Brand}", "${data.Fuel_efficiency}", "${data.Sid}")`;
    const insert2 = `insert into truck (No_of_axles, Tonnage, Vin) values ("${data.No_of_axles}", "${data.Tonnage}", "${data.Vin}")`;
    await promisePool.query(insert1);
    await promisePool.query(insert2);
  },
  insertSuv: async(data)=>{
    const insert1 = `insert into vehicle (Vin, Price, Model, Color, Fuel, Brand, Fuel_efficiency, Sid) VALUES ("${data.Vin}", "${data.Price}", "${data.Model}", "${data.Color}", "${data.Fuel}", "${data.Brand}", "${data.Fuel_efficiency}", "${data.Sid}")`;
    const insert2 = `insert into suv (No_seats, Size, Vin) values ("${data.No_seats}", "${data.Size}", "${data.Vin}")`;
    await promisePool.query(insert1);
    await promisePool.query(insert2);
  },
  insertBus: async(data)=>{
    const insert1 = `insert into vehicle (Vin, Price, Model, Color, Fuel, Brand, Fuel_efficiency, Sid) VALUES ("${data.Vin}", "${data.Price}", "${data.Model}", "${data.Color}", "${data.Fuel}", "${data.Brand}", "${data.Fuel_efficiency}", "${data.Sid}")`;
    const insert2 = `insert into bus (No_seats, Size, Layer, Vin) values ("${data.No_seats}", "${data.Size}", "${data.Layer}", "${data.Vin}")`;
    await promisePool.query(insert1);
    await promisePool.query(insert2);
  }
}

export const deleteSql = {//차량 정보를 삭제하는 sql, subclass를 먼저 delete한 후 super class를 delete하여야 참조무결성이 성립함.
  deleteCar: async(data)=>{
    const delete3 = `update customer set Count = Count -1 where ssn in (select ssn from vehicle where vin = "${data.Vin}")`;//삭제하고자 하는 차량을 예약한 고객이 있을 경우 고객의 count속성 값을 1 빼도록 함
    const delete1 = `delete from car where vin = "${data.Vin}"`;
    const delete2 = `delete from vehicle where vin = "${data.Vin}"`;
    await promisePool.query(delete3);
    await promisePool.query(delete1);
    await promisePool.query(delete2);
  },
  deleteTruck: async(data)=>{
    const delete3 = `update customer set Count = Count -1 where ssn in (select ssn from vehicle where vin = "${data.Vin}")`;
    const delete1 = `delete from truck where vin = "${data.Vin}"`;
    const delete2 = `delete from vehicle where vin = "${data.Vin}"`;
    await promisePool.query(delete3);
    await promisePool.query(delete1);
    await promisePool.query(delete2);
  },
  deleteSuv: async(data)=>{
    const delete3 = `update customer set Count = Count -1 where ssn in (select ssn from vehicle where vin = "${data.Vin}")`;
    const delete1 = `delete from suv where vin = "${data.Vin}"`;
    const delete2 = `delete from vehicle where vin = "${data.Vin}"`;
    await promisePool.query(delete3);
    await promisePool.query(delete1);
    await promisePool.query(delete2);
  },
  deleteBus: async(data)=>{
    const delete3 = `update customer set Count = Count -1 where ssn in (select ssn from vehicle where vin = "${data.Vin}")`;
    const delete1 = `delete from bus where vin = "${data.Vin}"`;
    const delete2 = `delete from vehicle where vin = "${data.Vin}"`;
    await promisePool.query(delete3);
    await promisePool.query(delete1);
    await promisePool.query(delete2);
  }
}

