import axios from 'axios';
import React, { useState } from 'react';

function Default() {
  const [paymeData, setPaymeData] = useState('');
  const [clickData, setClickData] = useState('');

  const token = localStorage.getItem('accessToken');

  // Payme ma'lumot yuborish
  const sendPayme = () => {
    if (!paymeData.trim()) {
      alert("Payme ma'lumotlarini kiriting!");
      return;
    }

    axios({
      url: 'https://api.fruteacorp.uz/payme',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: { info: paymeData }
    }).then(res => {
      console.log( res.data);
      setPaymeData('');
    }).catch(err => {
      console.error( err.response?.data || err.message);
    });
  };

  const sendClick = () => {
    if (!clickData.trim()) {
      alert("Click ma'lumotlarini kiriting!");
      return;
    }

    axios({
      url: 'https://api.fruteacorp.uz/click',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: { info: clickData }
    }).then(res => {
      console.log( res.data);
      setClickData('');
    }).catch(err => {
      console.error( err.response?.data || err.message);
    });
  };

  return (
    <div className='p-5'>
      <h1 className='text-xl font-bold'>Default Bo‘lim</h1>

    
      <div className="mb-5">
        <h2 className='text-lg font-bold'>Payme ma'lumot yuborish</h2>
        <input 
          type="text" 
          placeholder="Payme ma'lumot kiriting" 
          value={paymeData}
          onChange={(e) => setPaymeData(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full"
        />
        <button 
          onClick={sendPayme}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
        >
          Yuborish
        </button>
      </div>

     
      <div className="mb-5">
        <h2 className='text-lg font-bold'>Click ma'lumot yuborish</h2>
        <input 
          type="text" 
          placeholder="Click ma'lumot kiriting" 
          value={clickData}
          onChange={(e) => setClickData(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full"
        />
        <button 
          onClick={sendClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
        >
          Yuborish
        </button>
      </div>
    </div>
  );
}

export default Default;
