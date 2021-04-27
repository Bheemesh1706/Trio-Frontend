import {useState,useEffect} from "react";
import {
  Link,Redirect
} from "react-router-dom";

import {handleLogout} from '../BackendServices/services'

export default function Navbar({usernameProps}){
    const [username] = usernameProps
    const [redirect,setRedirect] = useState(null)

    if (redirect) return <Redirect to ={redirect}/>

    return (<div className ="navStyle">
            <nav>
                <ul>
                        <li >
                        {username? <p>{username}</p>:<Link exact to='/login'><p >Login</p></Link>}
                        </li>
                        <li >
                        {username? <p onClick = { ()=> handleLogout(setRedirect) }>Logout</p>:<Link exact to='/'><p >Register</p></Link>}
                        </li>
                </ul>
            </nav>
    </div>);
}