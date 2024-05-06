import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./style.css";
import Home from "./views/home";
import NotFound from "./views/not-found";
import login from "./views/login";
import register from "./views/ServiceProviderRegister";
import role from "./views/role";
import ServiceProviderRegister from "./views/ServiceProviderRegister";
import UserRegister from "./views/UserRegistration";
import ForgotPassword from "./views/ForgotPassword";
// import { UserTypeContext } from './constants/UserTypeContext';



const App = () => {
  return (
    <Router>
      <Switch>
       {/* <UserTypeContext.Provider value={'user'}> */}
        <Route component={Home} exact path="/" />
        <Route component={login} path="/login" />
        <Route component={role} path="/role" />
        <Route component={ServiceProviderRegister} path="/ServiceProviderRegister" />
        <Route component={UserRegister} path="/UserRegister" />
        <Route component={ForgotPassword} path="/ForgotPassword" />
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
        {/* </UserTypeContext.Provider> */}
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
