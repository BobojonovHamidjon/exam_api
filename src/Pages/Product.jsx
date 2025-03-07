import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Product() {
  const [products, setProducts] = useState([]);
  const [mostSold, setMostSold] = useState([]);
  const [adminProducts, setAdminProducts] = useState([]);
  const [newProduct, setNewProduct] = useState('');

  const token = localStorage.getItem('accessToken'); 

  const getProducts = () => {
    axios({
      url: 'https://api.fruteacorp.uz/products',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setProducts(res.data.data);
    }).catch(err => {
      console.error("Xatolik yuz berdi:", err);
    });
  };

  const getMostSoldProducts = () => {
    axios({
      url: 'https://api.fruteacorp.uz/products/most-sold',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setMostSold(res.data.data);
    }).catch(err => {
      console.error("Xatolik yuz berdi:", err);
    });
  };

  const getAdminProducts = () => {
    axios({
      url: 'https://api.fruteacorp.uz/products/admin',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setAdminProducts(res.data.data);
    }).catch(err => {
      console.error("Xatolik yuz berdi:", err);
    });
  };

  const addProduct = () => {
    if (!newProduct.trim()) {
      alert("Mahsulot nomini kiriting!");
      return;
    }

    axios({
      url: 'https://api.fruteacorp.uz/products',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: {
        title_uz: newProduct,
        title_en: newProduct,
        title_ru: newProduct,
        images: [] 
      }
    }).then(res => {
      console.log("✅ Mahsulot qo‘shildi:", res.data);
      setNewProduct('');
      getProducts(); 
    }).catch(err => {
      console.error("❌ Xatolik yuz berdi:", err.response?.data || err.message);
    });
  };

  const deleteProduct = (id) => {
    if (!window.confirm("Haqiqatan ham ushbu mahsulotni o‘chirmoqchimisiz?")) {
      return;
    }

    axios({
      url: `https://api.fruteacorp.uz/products/${id}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log( res.data);
      getProducts(); 
    }).catch(err => {
      console.error( err.response?.data || err.message);
    });
  };

  useEffect(() => {
    getProducts();
    getMostSoldProducts();
    getAdminProducts();
  }, []);

  return (
    <div className='p-5'>
      <div className="mb-5 flex gap-3">
        <input 
          type="text" 
          placeholder="Mahsulot nomini kiriting" 
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full"
        />
        <button 
          onClick={addProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Qo‘shish
        </button>
      </div>

      <div className='grid grid-cols-2 pt-5 gap-5'>
        {products.map(item => (
          <div className='grid grid-cols-1 gap-5 p-5 bg-[#939396] rounded-[20px]' key={item.id}>
            <div className='flex justify-between items-center'>
              <h1 className='text-white text-[24px]'>Name:</h1>
              <p className='text-white text-[24px]'>{item.title_uz}</p> 
            </div>
            {item.images?.length > 0 && (
              <img 
                src={`https://api.fruteacorp.uz/uploads/${item.images[0].name}`} 
                alt={item.title_uz} 
                className='w-full h-40 object-cover rounded-lg' 
              />
            )} 
            <button 
              onClick={() => deleteProduct(item.id)} 
              className="bg-red-500 text-white px-3 py-1 rounded-lg"
            >
               O‘chirish
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;