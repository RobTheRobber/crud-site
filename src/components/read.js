import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom';



export default function Read() {

    const [APIData, setAPIData] = useState([]);
    const con = "https://65b5b9af41db5efd2867d643.mockapi.io/User"
    useEffect(() => {
        axios.get(con)
            .then((response) => {
                console.log(response.data)
                setAPIData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const setData = (data) => {
        let {id, firstName, lastName,email, username,password } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('First Name', firstName);
        localStorage.setItem('Last Name', lastName);
        localStorage.setItem('Email', email);
        localStorage.setItem('Username', username);
        localStorage.setItem('Password', password);
     }



     const getData = () => {
        axios.get(con)
            .then((getData) => {
                 setAPIData(getData.data);
                 
             })
    }

    const onDelete = (id) => {
        axios.delete(`https://65b5b9af41db5efd2867d643.mockapi.io/User/${id}`)
     .then(() => {
        getData();
    }).catch((error) => {
        console.error("Error deleting data:", error);
    });
}

    return (      
        <div>
            <Table singleLine>
                
                <Table.Header>
                
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Username</Table.HeaderCell>
                        <Table.HeaderCell>Password</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
  {APIData.map((data) => {
     return (
        
       <Table.Row>

            <Table.HeaderCell>{data.id}</Table.HeaderCell>
          <Table.Cell>{data.firstName}</Table.Cell>
           <Table.Cell>{data.lastName}</Table.Cell>
           <Table.Cell>{data.email}</Table.Cell>
           <Table.Cell>{data.username}</Table.Cell>
           <Table.Cell>{data.password}</Table.Cell>
           <Table.Cell><Link to='/update'> <Button onClick={() => setData(data)}>Update</Button></Link></Table.Cell>
           <Table.Cell><Link to='/read'><Button onClick={() => onDelete(data.id)}>Delete</Button></Link></Table.Cell>
        </Table.Row>
   )})}
</Table.Body>
            </Table>
        </div>
    )
}