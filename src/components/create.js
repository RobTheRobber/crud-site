import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

export default function Create() {
  const navigate = useNavigate();
  const db = 'https://65b5b9af41db5efd2867d643.mockapi.io/User';
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateCreation = async () => {
    // Set initial error values to empty
    setFirstNameError('');
    setLastNameError('');
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    const isUsernameTaken = await checkUsername(username);
    const isEmailTaken = await checkEmail(email);

    // Check if the user has entered all fields correctly
    if (firstName === '') {
      setFirstNameError('Please enter your First Name');
      return;
    }
    if (lastName === '') {
      setLastNameError('Please enter your Last Name');
      return;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    if (username === '') {
      setUsernameError('Please enter your Username');
      return;
    }

    if (password === '') {
      setPasswordError('Please enter a password');
      return;
    }

    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer');
      return;
    }

    if (isEmailTaken) {
      setEmailError('Email is already taken');
      return;
    }
    if (isUsernameTaken) {
      setUsernameError('Username is already taken');
      return;
    }

    // If everything is valid, proceed with account creation
    postData();
    navigate('/');
  };

  const checkUsername = async (username) => {
    try {
      const response = await axios.get(`${db}?username=${username}`);
      return response.data.length > 0;
    } catch (error) {
      console.error('Error checking username:', error);
      return false;
    }
  };

  const checkEmail = async (email) => {
    try {
      const response = await axios.get(`${db}?username=${email}`);
      return response.data.length > 0;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  const postData = async () => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      axios.post(db, {
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword,
      });
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div className="create-form">
      <form>
        <div>
          <label className="form-label">First Name</label>
          <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
          <span className="errorLabel">{firstNameError}</span>
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
          <span className="errorLabel">{lastNameError}</span>
        </div>
        <div>
          <label>Email</label>
          <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <span className="errorLabel">{emailError}</span>
        </div>
        <div>
          <label>Username</label>
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <span className="errorLabel">{usernameError}</span>
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <span className="errorLabel">{passwordError}</span>
        </div>
        <button onClick={validateCreation} className="base-button" type="button">Submit</button>
        <Link to="/"><button className="cancel-button" type="button">Cancel</button></Link>
      </form>
    </div>
  );
}
