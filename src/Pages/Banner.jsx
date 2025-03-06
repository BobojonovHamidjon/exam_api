import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Banner() {
  const [banners, setBanners] = useState([]);
  const [newBanner, setNewBanner] = useState({ title: '', image: '' });
  const token = localStorage.getItem('accessToken'); 

  // Bannerlarni olish
  const getBanners = () => {
    axios({
      url: 'https://api.fruteacorp.uz/banner',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setBanners(res.data.data);
    }).catch(err => {
      console.error("Xatolik yuz berdi:", err);
    });
  };

  // Banner qo‘shish
  const addBanner = () => {
    if (!newBanner.title.trim() || !newBanner.image.trim()) {
      alert("Barcha maydonlarni to‘ldiring!");
      return;
    }

    axios({
      url: 'https://api.fruteacorp.uz/banner',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: newBanner
    }).then(res => {
      console.log("✅ Banner qo‘shildi:", res.data);
      setNewBanner({ title: '', image: '' });
      setBanners(prev => [...prev, res.data.data]); // UI ni yangilash
    }).catch(err => {
      console.error("❌ Xatolik yuz berdi:", err.response?.data || err.message);
    });
  };

  // Bannerni o‘chirish
  const deleteBanner = (id) => {
    if (!window.confirm("Haqiqatan ham ushbu bannerni o‘chirmoqchimisiz?")) {
      return;
    }

    axios({
      url: `https://api.fruteacorp.uz/banner/${id}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(() => {
      console.log(`✅ Banner o‘chirildi: ${id}`);
      setBanners(prevBanners => prevBanners.filter(banner => banner.id !== id));
    }).catch(err => {
      console.error("❌ Xatolik yuz berdi:", err.response?.data || err.message);
    });
  };

  useEffect(() => {
    getBanners();
  }, []);

  return (
    <div className='p-5'>
      <h1 className='text-xl font-bold'>Bannerlar</h1>

      <div className="mb-5 flex gap-3">
        <input 
          type="text" 
          placeholder="Banner nomini kiriting" 
          value={newBanner.title}
          onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
          className="border px-3 py-2 rounded-lg w-full"
        />
        <input 
          type="text" 
          placeholder="Banner rasm URL" 
          value={newBanner.image}
          onChange={(e) => setNewBanner({ ...newBanner, image: e.target.value })}
          className="border px-3 py-2 rounded-lg w-full"
        />
        <button 
          onClick={addBanner}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Qo‘shish
        </button>
      </div>

      <div className='grid grid-cols-2 pt-5 gap-5'>
        {banners.map(item => (
          <div className='p-5 bg-gray-300 rounded-lg' key={item.id}>
            <h2 className='text-lg font-bold'>{item.title}</h2>
            <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-lg" />
            <button 
              onClick={() => deleteBanner(item.id)} 
              className="bg-red-500 text-white px-3 py-1 rounded-lg mt-3"
            >
              O‘chirish
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Banner;
