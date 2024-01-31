import React, { useEffect, useState, useContext } from 'react';
import { Table, Button, Input, TextArea } from 'semantic-ui-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './userContex';


export default function ItemInventory() {
  const { userId } = useContext(AuthContext);
  console.log('itemInventory User ID:', userId);
  const [APIData, setAPIData] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [showAllItems, setShowAllItems] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [userId, showAllItems]);

  const setData = (id) => {
    setEditingId(id);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const updateItem = (id, updatedData) => {
    axios.put(`https://65b5b9af41db5efd2867d643.mockapi.io/Item/${id}`, updatedData)
      .then(() => {
        getData();
        cancelEdit();
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const getData = () => {
    //Checks for null values for userId
    let db = "https://65b5b9af41db5efd2867d643.mockapi.io/Item";
    if (userId && !showAllItems) {
      db += `?userId=${userId}`;
    }

    axios.get(db)
      .then((getData) => {
        setAPIData(getData.data);
        getUsername(getData.data.map(item => item.userId));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  //Gets Username from User table
  const getUsername = (userIds) => {
    userIds.forEach((id) => {
      axios.get(`https://65b5b9af41db5efd2867d643.mockapi.io/User/${id}`)
        .then((response) => {
          setUserDetails((details) => ({ ...details, [id]: response.data.username }));
        })
        .catch((error) => {
          console.error("Error fetching Usernnames:", error);
        });
    });
  };

  const onDelete = (id) => {
    axios.delete(`https://65b5b9af41db5efd2867d643.mockapi.io/Item/${id}`)
      .then(() => {
        getData();
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const handleAddNewItem = () => {
    navigate('/createItem', { state: { userId: userId } });
  };

  const handleUpdate = (id, updatedData) => {
    updateItem(id, updatedData);
  };

  const toggleItems = () => {
    setShowAllItems(!showAllItems);
  };

  return (
    <div>
      {userId && (
        <div>
          <Button onClick={handleAddNewItem} type='submit'>Add new item</Button>
          <Button onClick={toggleItems} type='submit'>
            {showAllItems ? 'Show My Items' : 'Show All Items'}
          </Button>
        </div>
      )}
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Item Name</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            {userId && <Table.HeaderCell>Update</Table.HeaderCell>}
            {userId && <Table.HeaderCell>Delete</Table.HeaderCell>}
            <Table.HeaderCell>View Item</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => (
            <Table.Row key={data.id}>
              <Table.Cell>{data.id}</Table.Cell>
              <Table.Cell>{userDetails[data.userId]}</Table.Cell>
              <Table.Cell>
                {editingId === data.id ? (
                  <Input
                    value={data.itemName}
                    onChange={(e) => setAPIData(APIData.map(item => item.id === data.id ? { ...item, itemName: e.target.value } : item))}
                  />
                ) : (
                  data.itemName
                )}
              </Table.Cell>
              <Table.Cell>
                {editingId === data.id ? (
                  <TextArea
                    value={data.description}
                    onChange={(e) => setAPIData(APIData.map(item => item.id === data.id ? { ...item, description: e.target.value } : item))}
                  />
                ) : (
                  data.description.length > 100 ?
                    `${data.description.slice(0, 100)}...` :
                    data.description
                )}
              </Table.Cell>
              <Table.Cell>
                {editingId === data.id ? (
                  <Input 
                    value={data.quantity} type="number"
                    onChange={(e) => setAPIData(APIData.map(item => item.id === data.id ? { ...item, quantity: e.target.value } : item))}
                  />
                ) : (
                  data.quantity
                )}
              </Table.Cell>
              {userId && (
                <Table.Cell>
                  {editingId === data.id ? (
                    <Button onClick={() => handleUpdate(data.id, data)}>Save</Button>
                  ) : (
                    <Button onClick={() => setData(data.id)}>Update</Button>
                  )}
                </Table.Cell>
              )}
              {userId && (
                <Table.Cell>
                  <Link to='/read'>
                    <Button onClick={() => onDelete(data.id)}>Delete</Button>
                  </Link>
                </Table.Cell>
              )}
              <Table.Cell>
                <Link to={`/itemDetails/${data.id}`}>
                  <Button>View Details</Button>
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
