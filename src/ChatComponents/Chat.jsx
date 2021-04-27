import {useEffect,useState} from 'react'
import { getMessages } from '../BackendServices/services';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {getUserid,sendMessage} from '../BackendServices/services'
import {createConsumer} from '@rails/actioncable'

export default function Chat({usernameProps}) {

    const URL = 'ws://localhost:3001/cable'
    const consumer = createConsumer(URL)

    const messageschema = yup.object().shape({body: yup.string().required(),
    user_id: yup.string()})

    const  {register,handleSubmit,reset,formState: { errors } } = useForm({ resolver: yupResolver(messageschema) })
    const [username] = usernameProps
    const [messages,setMessages] = useState([])
    const [message,setMessage] = useState('')
    const [Id,setId] = useState('')
    

    useEffect(()=>
    {   reset()
        addSubscribers()
        getMessages().then((e)=>{setMessages(e) 
            console.log(e) })
    },[])

    useEffect(()=>{reset()
    getUserid(username).then((e) =>{setId(e)})},[message])

      

    function handleMessage(e){
        console.log(e)
        
        sendMessage(e)
        console.log(message)
        messages.push({body: message})
        console.log(messages)
   
    }

    function addSubscribers() {
        consumer.subscriptions.create(
            {
                channel: 'ChatroomChannel',
                username: username,
            },
            {
                connected: () => console.log('connected'),
                disconnected: () => console.log('disconnected'),
                received: data => {if(data) setMessage(data)},

            }
        )
    }

    // function removeSubscriber()
    // {
    //     consumer.disconnect()
    // }

    return(
    <div className="right">
        <div className="chat">
        <h1 >ChatRoom</h1>
        </div>

        <div className="chatbox">

            <div className="Scroll">
                {messages?.map((d,index)=> (<p className="text" key={index}>{username}:{d.body}</p>))}
            </div>
            
            <form className="formMessage"  onSubmit= {handleSubmit(handleMessage)} >
             <input type="text"  placeholder="Text" name='body'  {...register('body')}/>
                <p className="error3">{errors.email?.message}</p> 
             <input type="hidden" name="user_id" value={Id} {...register('user_id')}></input>
                <p className="error3">{errors.user_id?.message}</p> 
             <button type="submit" className ="enter">Enter</button>
            </form>

        </div>
    </div>
    );
} 