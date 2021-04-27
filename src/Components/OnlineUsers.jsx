import {getActive} from '../BackendServices/services'
import {useEffect,useState} from 'react'

export default function OnlineUsers ()
{   
    const [active,setActive]= useState([])

    useEffect(()=>{
        getActive()
    },[])

    return(<h1 styles="">Users</h1>);
}