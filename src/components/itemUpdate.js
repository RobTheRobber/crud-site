import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom';



export default function Update() {

    const con = "https://65b5b9af41db5efd2867d643.mockapi.io/Item"
    const [id, setID] = useState(null);
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setEmail] = useState('');

useEffect(() => {
        setID(localStorage.getItem(''))
        setDescription(localStorage.getItem('User ID'));
        setEmail(localStorage.getItem('Item Name'));
        setUsername(localStorage.getItem('Description'));
        setPassword(localStorage.getItem('Quantity'));
}, []);

const updateAPIData = () => {
    axios.put(con+ `/${id}`, {
        itemName,
         description,
         quantity,
	})
}

    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>Item Name</label>
                    <input placeholder='Item Name' value={itemName} onChange={(e) => setItemName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Description</label>
                    <input placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Quantity</label>
                    <input placeholder='Qauntity' value={quantity} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Field>
                <Link to='/read'><Button type='submit' onClick={updateAPIData}>Update</Button></Link>
            </Form>
        </div>
    )
}