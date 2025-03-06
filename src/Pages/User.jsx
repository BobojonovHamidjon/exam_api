import axios from 'axios';
import React, { useEffect, useState } from 'react';

function User() {
  const [employees, setEmployees] = useState([]);
  const [clients, setClients] = useState([]);

  const token = localStorage.getItem('accessToken'); 
  console.log("Access Token:", token);


  const getEmployees = () => {
    axios({
      url: 'https://api.fruteacorp.uz/users/employee',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setEmployees(res.data.data);
    }).catch(err => {
      console.error( err);
    });
  };

  const getClients = () => {
    axios({
      url: 'https://api.fruteacorp.uz/users/client',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setClients(res.data.data);
    }).catch(err => {
      console.error( err);
    });
  };

  const getUserById = (id) => {
    axios({
      url: `https://api.fruteacorp.uz/users/${id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log( res.data);
    }).catch(err => {
      console.error( err);
    });
  };

  const updateUser = (id, data) => {
    axios({
      url: `https://api.fruteacorp.uz/users/${id}`,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data
    }).then(res => {
      console.log( res.data);
    }).catch(err => {
      console.error( err.response?.data || err.message);
    });
  };

  const deleteUser = (id) => {
    axios({
      url: `https://api.fruteacorp.uz/users/${id}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log( res.data);
    }).catch(err => {
      console.error( err.response?.data || err.message);
    });
  };

  const selfUpdateUser = (data) => {
    axios({
      url: 'https://api.fruteacorp.uz/users/self',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data
    }).then(res => {
      console.log( res.data);
    }).catch(err => {
      console.error( err.response?.data || err.message);
    });
  };

  useEffect(() => {
    getEmployees();
    getClients();
  }, []);

  return (
    <div className='p-5'>
      <h1 className='text-xl font-bold'>Foydalanuvchilar</h1>
      
      <h2 className='text-lg font-bold mt-5'>Xodimlar</h2>
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>{emp.name}</li>
        ))}
      </ul>

      <h2 className='text-lg font-bold mt-5'>Mijozlar</h2>
      <ul>
        {clients.map(client => (
          <li key={client.id}>{client.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default User;