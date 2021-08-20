import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import BubblePage from "./components/BubblePage";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import axiosWithAuth from "./helpers/axiosWithAuth";
import "./styles.scss";

const App = () => {

  const handleLogout = e => {
    axiosWithAuth()
      .post('/logout')
      .then(res=> {
        localStorage.removeItem('token');
        window.location.href = ('http://localhost:3000/login')
      })
  }

  return (
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a onClick={handleLogout} data-testid="logoutButton" href="#">logout</a>
        </header>
        <Router>
          <Switch>
            <PrivateRoute path='/bubble' component={BubblePage} />
            <Route path='/login' component={Login} />
            <Route path='/' component={Login} />
          </Switch>
        </Router>
      </div>
  );
}
export default App;

//Task List:
//1. Add in two routes that link to the Login Component, one for the default path '/' and one for the '/login'.
//2. Render BubblePage as a PrivateRoute
//2. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.