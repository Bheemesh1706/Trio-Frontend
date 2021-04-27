import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useEffect, useState}from "react";
import * as yup from "yup";
import {getRooms, sendRoomData} from  "../BackendServices/services"


export default function Rooms() 
{
    const room = yup.object().shape({roomname: yup.string().required()}) 
    
    const  {register,handleSubmit,reset,formState: { errors } } = useForm({ resolver: yupResolver(room) })
    
    const [roomlist,setRoomlist] = useState([])
   
    useEffect(()=>{reset()},[])

   function handleRoom(e)
   {
        sendRoomData(e)
        getRooms().then((e)=>{console.log(e.data) 
        setRoomlist(e.data) })
   }
    return( 

    
    <div className="roomname">
    <form onSubmit={handleSubmit(handleRoom)}>
            <label>Rooms</label>
            <input type="text" id="roomm" placeholder="Room name" name='roomname' {...register('roomname')}/>
            <p className="error2">{errors.roomname?.message}</p>  
           <button type='submit'>Create</button>
    </form>
    </div>

    );
}