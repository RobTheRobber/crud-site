import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './userContex';
import '../App.css';

export default function CreateItem() {
  const con = "https://65b5b9af41db5efd2867d643.mockapi.io/Item";
  const { userId } = useContext(AuthContext);
  console.log('itemInventory User ID:', userId);
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [itemNameError, setItemNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const navigate = useNavigate()

  const validateCreation = () => {
    setItemNameError('');
    setDescriptionError('');
    setQuantityError('');

    if (itemName === '') {
      setItemNameError('Please enter Item Name');
      return;
    }

    if (description === '') {
      setDescriptionError('Please enter Description');
      return;
    }

    if (quantity === '') {
      setQuantityError('Please enter Quantity');
      return;
    }

    postData();
    navigate('/itemInventory', { state: { loginID: userId } });
  };

  const postData = () => {
    axios.post(con, {
      userId,
      itemName,
      description,
      quantity
    });
  };

  return (
    <div className="create-form">
      <form>
        <div>
          <label className="form-label">Item Name</label>
          <input type="text" placeholder="Item Name" onChange={(e) => setItemName(e.target.value)} />
          <span className="errorLabel">{itemNameError}</span>
        </div>
        <div>
          <label className="form-label">Description</label>
          <textarea placeholder="Description" className='description' onChange={(e) => setDescription(e.target.value)} />
          <span className="errorLabel">{descriptionError}</span>
        </div>
        <div>
          <label className="form-label">Quantity</label>
          <input type="number" placeholder="Amount of Items" onChange={(e) => setQuantity(e.target.value)} />
          <span className="errorLabel">{quantityError}</span>
        </div>
        <button onClick={validateCreation} className="base-button" type="button">Submit</button>
        <Link to='/itemInventory'><button className="cancel-button" type="button">Cancel</button></Link>
      </form>
    </div>
  );
}