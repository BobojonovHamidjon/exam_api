import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [productId, setProductId] = useState('');

  const token = localStorage.getItem('accessToken');

  const getWishlist = () => {
    axios({
      url: 'https://api.fruteacorp.uz/wishlist',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setWishlist(res.data.data);
      })
      .catch(err => {
        console.error("", err.response?.data || err.message);
      });
  };

  const toggleWishlist = () => {
    if (!productId.trim()) {
      alert("Mahsulot ID kiriting!");
      return;
    }

    axios({
      url: 'https://api.fruteacorp.uz/wishlist',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: { productId }
    })
      .then(res => {
        
        alert("");
        setProductId('');
        getWishlist();
      })
      .catch(err => {
        console.error( err.response?.data || err.message);
      });
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <div className='p-5'>
      <h1 className='text-xl font-bold'>Xohishlar ro‘yxati</h1>

      <div className="mb-5 flex gap-3">
        <input 
          type="text" 
          placeholder="Mahsulot ID kiriting" 
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full"
        />
        <button 
          onClick={toggleWishlist}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Qo‘shish/O‘chirish
        </button>
      </div>

      <div className='grid grid-cols-1 gap-5'>
        {wishlist.key > 0 ? wishlist.map(item => (
          <div key={item.id} className='flex justify-between items-center p-3 bg-gray-200 rounded-lg'>
            <p className='text-lg'>{item.productName}</p>
          </div>
        )) : <p className="text-gray-500">Xohishlar ro‘yxati bo‘sh</p>}
      </div>
    </div>
  );
}

export default Wishlist;
