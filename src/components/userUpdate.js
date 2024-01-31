import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom';



export default function Update() {

    const con = "https://65b5b9af41db5efd2867d643.mockapi.io/User"
    const [id, setID] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    
    

useEffect(() => {
        setID(localStorage.getItem('ID'))
        setFirstName(localStorage.getItem('First Name'));
        setLastName(localStorage.getItem('Last Name'));
        setEmail(localStorage.getItem('Email'));
        setUsername(localStorage.getItem('Username'));
        setPassword(localStorage.getItem('Password'));
}, []);

const updateAPIData = () => {
    axios.put(con+ `/${id}`, {
        firstName,
         lastName,
         email,
         username,
         password
	})
}

    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Username</label>
                    <input placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Field>
                <Link to='/read'><Button type='submit' onClick={updateAPIData}>Update</Button></Link>
            </Form>
        </div>
    )
}