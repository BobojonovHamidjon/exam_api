import axios from 'axios';
import React, { useEffect, useState } from 'react';

function User() {


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