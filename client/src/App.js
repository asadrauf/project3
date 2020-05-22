import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Nav from "./components/Nav";
import Main from './pages/Main';
import Appointment from "./pages/Appointment";
import Message from "./pages/Message";
import Results from "./pages/Results";
import Summary from "./pages/Summary";
import Doctors from "./pages/Doctors";
import Detail from "./pages/Detail";
import Home from "./pages/Auth/Home";
import NoMatch from "./pages/NoMatch";
import AUTH from './utils/AUTH';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    AUTH.getUser().then(response => {
        // console.log(response.data);
        if (!!response.data.user) {
          setLoggedIn(true);
          setUser(response.data.user);
        } else {
          setLoggedIn(false);
          setUser(null);
        }
      });

      return () => {
        setLoggedIn(false);
        setUser(null);
      };
  }, []);

	const logout = (event) => {
    event.preventDefault();
    
		AUTH.logout().then(response => {
			// console.log(response.data);
			if (response.status === 200) {
				setLoggedIn(false);
        setUser(null);
			}
		});
	};

	const login = (username, password) => {
		AUTH.login(username, password).then(response => {
      console.log(response.data);
      if (response.status === 200) {
        // update the state
        setLoggedIn(true);
        setUser(response.data.user);
      }
    });
	};

  return (
    <div className="App">
      { loggedIn && (
        <div>
          <Nav user={user} logout={logout}/>
          <div className="main-view">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/main" component={Main} />
              <Route exact path="/doctors" component={Doctors} />
              <Route exact path="/appointment" component={Appointment} />
              <Route exact path="/message" component={Message} />
              <Route exact path="/results" component={Results} />
             
              <Route exact path="/summary" component={Summary} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      )}
      { !loggedIn && (
        <div className="auth-wrapper" style={{paddingTop:40}}>
          <Route exact path="/" component={Home} />
          <Route exact path="/main" component={Home} />
          <Route exact path="/doctors" component={Home} />
          <Route exact path="/appointment" component={Home} />
          <Route exact path="/message" component={Home} />
          <Route exact path="/results" component={Home} />
          <Route exact path="/summary" component={Home} />
          <Route exact path="/login" component={() => <LoginForm login={login}/>} />
          <Route exact path="/signup" component={SignupForm} />
        </div>
      )}
    </div>
  );
}

export default App;