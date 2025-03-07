import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Banner() {
  const [banners, setBanners] = useState([]);
  const [newBanner, setNewBanner] = useState({ title: '', image: null, link: '' });
  const [editBanner, setEditBanner] = useState(null); // Tahrirlanayotgan banner
  const token = localStorage.getItem('accessToken');
  const imageUrl = "https://api.fruteacorp.uz/images";

  // Bannerlarni olish
  const getBanners = () => {
    axios({
      url: 'https://api.fruteacorp.uz/banner',
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setBanners(res.data.data))
    .catch(err => console.error("Xatolik yuz berdi:", err));
  };

 
  const addBanner = () => {
    if (!newBanner.title.trim() || !newBanner.image) {
      alert("Barcha maydonlarni to‘ldiring!");
      return;
    }

    const formData = new FormData();
    formData.append('title', newBanner.title);
    formData.append('image', newBanner.image);
    formData.append('link', newBanner.link);

    axios({
      url: 'https://api.fruteacorp.uz/banner',
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      data: formData
    })
    .then(res => {
      setNewBanner({ title: '', image: null, link: '' });
      setBanners(prev => [...prev, res.data.data]); 
    })
    .catch(err => console.error(err.response?.data || err.message));
  };

  const deleteBanner = (id) => {
    if (!window.confirm("Haqiqatan ham ushbu bannerni o‘chirmoqchimisiz?")) return;

    axios({
      url: `https://api.fruteacorp.uz/banner/${id}`,
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => setBanners(prev => prev.filter(banner => banner.id !== id)))
    .catch(err => console.error(err.response?.data || err.message));
  };


  const updateBanner = () => {
    if (!editBanner || !editBanner.title.trim()) {
      alert("Barcha maydonlarni to‘ldiring!");
      return;
    }

    const formData = new FormData();
    formData.append('title', editBanner.title);
    if (editBanner.image) {
      formData.append('image', editBanner.image);
    }
    formData.append('link', editBanner.link);

    axios({
      url: `https://api.fruteacorp.uz/banner/${editBanner.id}`,
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      data: formData
    })
    .then(res => {
      setBanners(prev => prev.map(b => (b.id === editBanner.id ? res.data.data : b)));
      setEditBanner(null);
    })
    .catch(err => console.error(err.response?.data || err.message));
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
          placeholder="Banner linkini kiriting" 
          value={newBanner.link}
          onChange={(e) => setNewBanner({ ...newBanner, link: e.target.value })}
          className="border px-3 py-2 rounded-lg w-full"
        />
        <input 
          type="file" 
          onChange={(e) => setNewBanner({ ...newBanner, image: e.target.files[0] })}
          className="border px-3 py-2 rounded-lg"
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
            <img 
              src={`${imageUrl}/${item.image}`}  
              alt={item.title} 
              className="w-full h-40 object-cover rounded-lg" 
            />
            <div className="mt-3 flex gap-2">
              <button 
                onClick={() => setEditBanner(item)} 
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg"
              >
                Tahrirlash
              </button>
              <button 
                onClick={() => deleteBanner(item.id)} 
                className="bg-red-500 text-white px-3 py-1 rounded-lg"
              >
                O‘chirish
              </button>
            </div>
          </div>
        ))}
      </div>

     
      {editBanner && (
        <div className="mt-5 p-5 border rounded-lg">
          <h2 className="text-lg font-bold">Bannerni tahrirlash</h2>
          <input 
            type="text" 
            placeholder="Banner nomini kiriting" 
            value={editBanner.title}
            onChange={(e) => setEditBanner({ ...editBanner, title: e.target.value })}
            className="border px-3 py-2 rounded-lg w-full mt-2"
          />
          <input 
            type="text" 
            placeholder="Banner linkini kiriting" 
            value={editBanner.link}
            onChange={(e) => setEditBanner({ ...editBanner, link: e.target.value })}
            className="border px-3 py-2 rounded-lg w-full mt-2"
          />
          <input 
            type="file" 
            onChange={(e) => setEditBanner({ ...editBanner, image: e.target.files[0] })}
            className="border px-3 py-2 rounded-lg mt-2"
          />
          <button 
            onClick={updateBanner} 
            className="bg-green-500 text-white px-4 py-2 rounded-lg mt-3"
          >
            Saqlash
          </button>
          <button 
            onClick={() => setEditBanner(null)} 
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mt-3 ml-2"
          >
            Bekor qilish
          </button>
        </div>
      )}
    </div>
  );
}

export default Banner;
