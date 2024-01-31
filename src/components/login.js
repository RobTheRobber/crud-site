import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';
import AuthContext from './userContex';
import '../App.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const validateLogin = async () => {
    // Set initial error values to empty
    setEmailError("");
    setPasswordError("");
    setLoginError("");

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

    try {
      // Fetch user data based on the provided email
      const response = await axios.get(`https://65b5b9af41db5efd2867d643.mockapi.io/User?email=${email}`);
      const user = response.data[0];

      // Validate password using bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (user && isPasswordValid) {
        // Successful login, you can redirect or perform other actions
        login(user.id);
        console.log('Login successful');
        console.log("Login User ID:", user.id);
        navigate('/itemInventory', { state: { loginID: user.id } });
      } else {
        // Invalid credentials
        console.log('Login failed');
        setLoginError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError('An error occurred during login');
    }
  };

  return (
    <div className="create-form">
      <form>
        <label className="errorLabel">{loginError}</label>
        <div>
          <label>Email</label>
          <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <span className="errorLabel">{emailError}</span>
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <span className="errorLabel">{passwordError}</span>
        </div>
        <button onClick={validateLogin} className="base-button" type="button">Login</button>
        <Link to='/create'><button className="create-button" type="button">Create User</button></Link>
      </form>
    </div>
  );
}
