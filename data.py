import random
import numpy as np

#Vin
one = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
two = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
three = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
four = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
five='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
six='1234567890'
seven='1234567890'
eight='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
nine='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
ten='1234567890'
eleven='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
twelve='1234567890'
thirteen='1234567890'
fourteen='1234567890'
fifteen='1234567890'
sixteen='1234567890'
seventeen='1234567890'

#brand
brand= ["HYUNDAI","GENESIS","Benz","Tesla","Jeep","VOLVO","Volkswagen","CHEVROLET","MINI","Lamborghini","RANDROVER","CADILLAC","BMW","AUDI"]

#model
model1='가나다라마바사아자차카타파하'
model2='가나다라마바사아자차카타파하'
model3='가나다라마바사아자차카타파하'

#color
color=["red","orange","yellow", "green", "blue", "indigo", "violet", "white", "black", "gray", "gold", "bronze", "wine", "sapphire", "silver"]

#fuel
fuel=["Gasoline", "Diesel", "LPG", "CNG", "Biodiesel"]

#no_seats_bus
no_seats_bus = [20, 25, 31, 35, 40, 45]

#no_of_axles
no_of_axles=[2, 3, 4, 5, 6]

#size
size=["S","M","L"]

#layer
layer=[1,2]

#sid
sid=["sp12345","sp23456","sp34567","sp45678","sp56789","sp67890","sp78901","sp89012","sp90123","sp01234"]

base_Vehicle = "INSERT INTO Vehicle (Vin, Price, Model, Color, Fuel, Brand, Fuel_efficiency, Sid, Ssn) VALUES "
base_Car = "INSERT INTO Car (Vin, No_seats, Max_speed, Engine_size) VALUES "
base_Truck = "INSERT INTO Truck (Vin, No_of_axles, Tonnage) VALUES "
base_Suv = "INSERT INTO Suv (Vin, No_seats, Size) VALUES "
base_Bus = "INSERT INTO Bus (Vin, No_seats, Size, Layer) VALUES "


sql = []
for i in range(100000):
    if i % 10000 == 0: print(i)

    #ssn, sid
    null="null"
    #vin
    o_idx = random.randint(0, len(one)-1)
    tw_idx = random.randint(0, len(two)-1)
    th_idx = random.randint(0, len(three)-1)
    fo_idx = random.randint(0,len(four)-1)
    fi_idx = random.randint(0,len(five)-1)
    si_idx = random.randint(0,len(six)-1)
    se_idx = random.randint(0,len(seven)-1)
    ei_idx = random.randint(0,len(eight)-1)
    ni_idx = random.randint(0,len(nine)-1)
    te_idx = random.randint(0,len(ten)-1)
    el_idx = random.randint(0,len(eleven)-1)
    twe_idx = random.randint(0,len(twelve)-1)
    thi_idx = random.randint(0,len(thirteen)-1)
    fou_idx = random.randint(0,len(fourteen)-1)
    fif_idx = random.randint(0,len(fifteen)-1)
    six_idx = random.randint(0,len(sixteen)-1)
    sev_idx = random.randint(0,len(seventeen)-1)
    
    #model
    md1_idx=random.randint(0,len(model1)-1)
    md2_idx=random.randint(0,len(model2)-1)
    md3_idx=random.randint(0,len(model3)-1)

    #price
    price = random.randint(10000,999999) * 1000

    #fuel efficiency
    fuel_eff=round(random.uniform(10, 30),2)

    #no_seats_car
    no_seats_car=random.randint(4,5)

    #max_speed
    max_speed=random.randint(200, 500)

    #engine_size
    engine_size=random.randint(1000,3500)

    #tonnage
    tonnage=random.randint(1,15)

    #no_seats_suv
    no_seats_suv=random.randint(4,11)

    #color
    color_idx=random.randint(0, 14)

    #fuel
    fuel_idx=random.randint(0, 4)

    #brand
    brand_idx=random.randint(0,13)

    #no_of_axles
    no_of_axles_idx = random.randint(0, 4)

    #size
    size_idx = random.randint(0,2)

    #no_seats_bus
    no_seats_bus_idx = random.randint(0, 5)

    #layer
    layer_idx = random.randint(0, 1)
    
    #sid
    sid_idx=random.randint(0,9)

    Vin = one[o_idx] + two[tw_idx] +three[th_idx] + four[fo_idx] + five[fi_idx] + six[si_idx] + seven[se_idx] + eight[ei_idx] + nine[ni_idx] + ten[te_idx] + eleven[el_idx] + twelve[twe_idx] + thirteen[thi_idx] + fourteen[fou_idx] + fifteen[fif_idx] + sixteen[six_idx] + seventeen[sev_idx]
    Price = price
    Model = model1[md1_idx] + model2[md2_idx] + model3[md3_idx]
    Color = color[color_idx]
    Fuel = fuel[fuel_idx]
    Brand = brand[brand_idx]
    Fuel_efficiency = fuel_eff
    No_seats_car = no_seats_car
    Max_speed = max_speed
    Engine_size = engine_size
    No_of_axles = no_of_axles[no_of_axles_idx]
    Tonnage = tonnage
    No_seats_suv = no_seats_suv
    Size_suv = size[size_idx]
    No_seats_bus = no_seats_bus[no_seats_bus_idx]
    Size_bus = size[size_idx]
    Layer = layer[layer_idx]
    Sid = sid[sid_idx]
    #sql
    query1 = base_Vehicle + '("' + Vin + '", ' + str(Price) + ', "' + Model + '", "' + Color + '", "' + Fuel + '", "' + Brand + '", ' + str(Fuel_efficiency) + ', "' + Sid + '", ' + null + ');\n'
    car_idx = random.randint(0, 3)
    if car_idx == 0:
        query2 = base_Car + '("' + Vin + '", ' + str(No_seats_car) + ', ' + str(Max_speed) + ', ' + str(Engine_size) + ');\n'
    elif car_idx == 1:
        query2 = base_Truck + '("' + Vin + '", ' + str(No_of_axles) + ', ' + str(Tonnage) + ');\n'
    elif car_idx == 2:
        query2 = base_Suv + '("' + Vin + '", ' + str(No_seats_suv) + ', "' + Size_suv + '");\n'
    else:
        query2 = base_Bus + '("' + Vin + '", ' + str(No_seats_bus) + ', "' + Size_bus + '", ' + str(Layer) + ');\n'
    query = query1 + query2
    sql.append(query);


f = open('Car_dealer_test.sql', 'w', encoding='utf-8')
for i, s in enumerate(sql):
    f.writelines(s)

f.close()