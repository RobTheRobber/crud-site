import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";


const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState('');

  const validateLogin = async () => {
    // Set initial error values to empty
    setEmailError("");
    setPasswordError("");
    setLoginError("")
  
    // Check if the user has entered both fields correctly
    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }
  
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }
  
    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }
  
    if (password.length < 7) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }
  
    
      // Validation
      const response = await axios.get("https://65b5b9af41db5efd2867d643.mockapi.io/User");
      const userData = response.data;
      console.log("User Data:", userData);
  
      // Validate email and password
      const user = userData.find((user) => user.email === email && user.password === password);
      console.log("Found User:", user);
  
      if (user) {
        // Successful login, you can redirect or perform other actions
        console.log('Login successful');
        onLogin(user.id)
      } else {
        // Invalid credentials
        console.log('Login failed');
        setLoginError('Invalid email or password');
      }
   
  };

  return (
    
    
    <div>
            <Form className="create-form">
            <label className="errorLabel">{loginError}</label>
                <Form.Field>
                    <label>Username</label>
                    <input placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
                    <label className="errorLabel">{emailError}</label>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                    <label className="errorLabel">{passwordError}</label>
                </Form.Field>
                <Link to='/read'><Button onClick={validateLogin} type='submit'>Login</Button></Link>
                <Link to='/create'><Button type='submit'>Create User</Button></Link>
            </Form>
        </div>

    
  );
};

export default Login;