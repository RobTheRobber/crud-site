import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

const ItemDetails = () => {
  const { itemId } = useParams();
  const [itemData, setItemData] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Fetch the details of the specific item using the itemId
    axios.get(`https://65b5b9af41db5efd2867d643.mockapi.io/Item/${itemId}`)
      .then((response) => {
        setItemData(response.data);

        // Fetch the username based on the userID
        axios.get(`https://65b5b9af41db5efd2867d643.mockapi.io/User/${response.data.userId}`)
          .then((userResponse) => {
            setUsername(userResponse.data.username);
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
      });
  }, [itemId]);
  return (
    <div>
      <h2>Item Details</h2>
      {itemData ? (
        <>
       <Table celled definition>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Username</Table.HeaderCell>
          <Table.HeaderCell>Item Name</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>{itemData.id}</Table.Cell>
          <Table.Cell>{username}</Table.Cell>
          <Table.Cell>{itemData.itemName}</Table.Cell>
          <Table.Cell>{itemData.description}</Table.Cell>
          <Table.Cell>{itemData.quantity}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ItemDetails;