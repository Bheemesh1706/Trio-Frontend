
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import OnlineUsers from './Components/OnlineUsers'
import Navbar from './Components/nav'
import { RegisterForm } from './LoginComponent/RegisterForm';
import {LoginForm} from './LoginComponent/LoginForm'
import Chat from './ChatComponents/Chat'
import useLocalStorage from './hooks/uselocalstorage'




function App() { 

  const usernameProps = useLocalStorage('username')
  const [username] = usernameProps


 
  return (
    <Router>
      <div className="App">
        <Navbar usernameProps={usernameProps} />
        <div className="main">
          <div className="left"></div>
          {username ? (
            <Switch>
              <Route path="/chatRoom">
                <Chat usernameProps={usernameProps} />
              </Route>
              <Route>
                <Redirect to="/chatRoom" />
              </Route>
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/login">
                <LoginForm usernameProps={usernameProps} />
              </Route>
              <Route exact path="/">
                <RegisterForm />
              </Route>
              <Route>
                <Redirect to="/" />
              </Route>
            </Switch>
          )}
        </div>
      </div>
    </Router>
  );
}




export default App;
