import axios from "axios";
import React, { useState } from "react";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const { push } = props.history

  const initialCredentials = {
    username: '',
    password: ''
  };
  const initialError = "";
  
  const [credentials, setCredentials] = useState(initialCredentials);
  const [error, setError] = useState(initialError);

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  };

  const login = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', credentials)
      .then(res=> {
        localStorage.setItem('token', res.data.payload);
        setError(initialError);
        setCredentials(initialCredentials);
        push('/bubble');
      })
      .catch(err=> {
        setError('Username or Password not valid');
        console.log(err);
        setCredentials(initialCredentials);
      })
  };

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={login}>
          <label>Username</label>
          <br/>
          <input
            type='text'
            name='username'
            value={credentials.username}
            onChange={handleChange}
            id='username'
          />
          <br/>
          <br/>
          <label>Password</label>
          <br/>
          <input
            type='password'
            name='password'
            value={credentials.password}
            onChange={handleChange}
            id='password'
          />
          <br/>
          <button id='submit'>Log In</button>
        </form>
      </div>

      <p id="error" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"