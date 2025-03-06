import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [productId, setProductId] = useState('');

  const token = localStorage.getItem('accessToken');

  // Savatni olish funksiyasi
  const getCart = () => {
    axios({
      url: 'https://api.fruteacorp.uz/cart',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setCartItems(res.data.data);
      })
      .catch(err => {
        console.error("❌ Xatolik yuz berdi:", err.response?.data || err.message);
      });
  };

  // Savatga mahsulot qo‘shish
  const addToCart = () => {
    if (!productId.trim()) {
      alert("Mahsulot ID kiriting!");
      return;
    }

    axios({
      url: 'https://api.fruteacorp.uz/cart/add',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: { productId }
    })
      .then(res => {
        console.log("✅ Mahsulot savatga qo‘shildi:", res.data);
        alert("✅ Mahsulot qo‘shildi!");
        setProductId('');
        getCart();
      })
      .catch(err => {
        console.error("❌ Xatolik yuz berdi:", err.response?.data || err.message);
      });
  };

  // Savatdan mahsulot olib tashlash
  const removeFromCart = (id) => {
    axios({
      url: 'https://api.fruteacorp.uz/cart/remove',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: { productId: id }
    })
      .then(res => {
        console.log("✅ Mahsulot o‘chirildi:", res.data);
        alert("✅ Mahsulot olib tashlandi!");
        getCart();
      })
      .catch(err => {
        console.error("❌ Xatolik yuz berdi:", err.response?.data || err.message);
      });
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className='p-5'>
      <h1 className='text-xl font-bold'>Savat</h1>

      <div className="mb-5 flex gap-3">
        <input 
          type="text" 
          placeholder="Mahsulot ID kiriting" 
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full"
        />
        <button 
          onClick={addToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Qo‘shish
        </button>
      </div>

      <div className='grid grid-cols-1 gap-5'>
        {cartItems.length > 0 ? cartItems.map(item => (
          <div key={item.id} className='flex justify-between items-center p-3 bg-gray-200 rounded-lg'>
            <p className='text-lg'>{item.productName} - {item.quantity} ta</p>
            <button 
              onClick={() => removeFromCart(item.productId)} 
              className="bg-red-500 text-white px-3 py-1 rounded-lg"
            >
              O‘chirish
            </button>
          </div>
        )) : <p className="text-gray-500">Savat bo‘sh</p>}
      </div>
    </div>
  );
}

export default Cart;
