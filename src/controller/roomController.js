import {findindex} from "../common/findindex.js";

const Rooms = [
    {
        room_id: 1,
        room_name: "room-1",
        booked_status: false,
        price_for_1_hour: 5000,
    },
    {
        room_id: 2,
        room_name: "room-2",
        booked_status: true,
        price_for_1_hour: 2000,
    },
    {
        room_id: 3,
        room_name: "room-3",
        booked_status: true,
        price_for_1_hour: 2500,
    },
    {
        room_id: 4,
        room_name: "room-4",
        booked_status: true,
        price_for_1_hour: 1000,
    },
    {
        room_id: 5,
        room_name: "room-5",
        booked_status: false,
        price_for_1_hour: 4500,
    },

]

const Customer = [
    {
        room_id: 3,
        customer_id: 1,
        name : "Raja",
        date: "2024/08/28",
        start_time: "09:00:00 am",
        end_time: "07:30:00 pm"
    },
    {
        room_id: 2,
        customer_id: 2,
        name : "Sasi kumar",
        date: "2024/08/26",
        start_time: "11:00:51 pm",
        end_time: "08:30:00 am"
    },
    {
        room_id: 4,
        customer_id: 3,
        name : "Ravi",
        date: "2024/08/29",
        start_time: "10.21:30 am",
        end_time: "04:15:29 pm"
    },
]

const BookedRooms = (req,res) => {
    try{
        let BookedRooms = [];
        for(let i=0; i<Rooms.length; i++){
            for (let y=0; y<Customer.length; y++){
                if(Rooms[i].room_id === Customer[y].room_id){
                    BookedRooms.push({
                        Room_Name: Rooms[i].room_name,
                        Booked_Status: Rooms[i].booked_status,
                        Customer: Customer[y],
                    });
                }
            }
            if(Rooms[i].booked_status === false){
                BookedRooms.push(Rooms[i]);
            }
        }
        res.status(200).send(BookedRooms);
    }
    catch(error){
        res.status(500).send({
            message : "Internal Server Error",
        });
    }
};
const allCustomer = (req,res) =>{
    try {
        let BookedRooms = [];
        for(let i=0; i<Rooms.length; i++){
            for(let y=0; y<Customer.length; y++){
                if(Rooms[i].room_id === Customer[y].room_id){
                    BookedRooms.push({
                        Customer: Customer[y].name,
                        Room_Name: Rooms[i].room_name,
                        Date: Customer[y].date,
                        Start_Time: Customer[y].start_time,
                        End_TIme: Customer[y].end_time,
                        Booked_Status: Rooms[i].booked_status
                    });
                }
            }
        }
        res.status(200).send(BookedRooms);
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
        });
    }
};

const CreateRoom = (req,res) =>{
    try {
        const id = Rooms.length ? Rooms[Rooms.length - 1].room_id+1 : 1;
        req.body.room_id = id;
        req.body.room_name = `room-${id}`;
        req.body.booked_status = false;

        Rooms.push(req.body);
        console.log(req.body);
        res.status(200).send({
            message : "Room Added Successfully",
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal Server Error",
        });
    }
};

const DeleteRoom = (req,res) => {
    try {
        const {id} = req.params;
        const index = findindex(Rooms,id);
        if(index !== -1){
            Rooms.splice(index,1);
            res.status(200).send({
                message : "Room Deleted Successfully",
            });
        }else{
            res.status(400).send({
                message: "Invalid Room Id ",
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
        });
    }
};

const Booking = (req,res) => {
    try {
        const {id} = req.params;
        const Room_id = +id
        const index = findindex(Rooms,id);
        const temp = {...Rooms[index]}
        temp.booked_status = true

        if(index !== -1 && Rooms[index].booked_status == false){
            Rooms.splice(index,1,temp)
            const {name, date, start_time, end_time} = req.body
            const id = Customer.length? Customer[Customer.length-1].Customer_id + 1 : 1;
            const newCustomer = {
                customer_id: id,
                name,
                date,
                start_time,
                end_time,
                room_id: Room_id
            }
            Customer.push(newCustomer)
            res.status(200).send({
                message: "Room Booking Successfully",
            });
        }else if(Rooms[index].booked_status == true){
            res.status(500).send({
                message:"This Room is already booked"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
        });
    }
};

export default {BookedRooms, allCustomer, CreateRoom, DeleteRoom, Booking}