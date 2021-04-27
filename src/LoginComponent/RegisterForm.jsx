import React,{useEffect}from "react";
import {sendDataRegister} from '../BackendServices/services';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {registerSchema} from "../LoginComponent/Schema"

function RegisterForm ()
{
   
   const  {register,handleSubmit,reset,formState: { errors } } = useForm({
       resolver: yupResolver(registerSchema)
   })
   
   useEffect(()=>{console.log('reset')
       reset()},[])

   const handleRegister = (e) =>
    {
     
       console.log(e)
       console.log('register')   

       // sendData(e)   
    }

    return(<div className="right">
        <form onSubmit={handleSubmit(handleRegister) }>
            <label>Register</label>
            <input type='email' id='email' placeholder="Email" name='Email' {...register('Email')}/>
                <p className="error1">{errors.Email?.message}</p>
            
            <input type="text" id="uname" placeholder="UserName" name='Username' {...register('Username')}/>
            <p className="error2">{errors.Username?.message}</p>  
            
            <input type="password" id="password" placeholder="Password" name='Password' {...register('Password')}/>
             <p className="error3">{errors.Password?.message}</p>   
            <button type='submit'>Register</button>
        </form>
    </div>
    );
}

export {RegisterForm};