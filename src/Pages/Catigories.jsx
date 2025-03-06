import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Catigories() {
  const [category, setCategory] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  const token = localStorage.getItem('accessToken'); 

  const getCategory = () => {
    axios({
      url: 'https://api.fruteacorp.uz/categories',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setCategory(res.data.data);
    }).catch(err => {
      console.error("Xatolik yuz berdi:", err);
    });
  };

  const addCategory = () => {
    if (!newCategory.trim()) {
      alert("Kategoriya nomini kiriting!");
      return;
    }

    axios({
      url: 'https://api.fruteacorp.uz/categories',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: {
        title_uz: newCategory,
        title_en: newCategory,
        title_ru: newCategory,
        parentId: null 
      }
    }).then(res => {
      console.log("✅ Kategoriya qo‘shildi:", res.data);
      setNewCategory('');
      setCategory(prev => [...prev, res.data.data]); // UI ni yangilash
    }).catch(err => {
      console.error("❌ Xatolik yuz berdi:", err.response?.data || err.message);
    });
  };

  const deleteCategory = (id) => {
    if (!window.confirm("Haqiqatan ham ushbu kategoriyani o‘chirmoqchimisiz?")) {
      return;
    }

    axios({
      url: `https://api.fruteacorp.uz/categories/${id}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(() => {
      console.log(`✅ Kategoriya o‘chirildi: ${id}`);
      
      // UI dan kategoriya o‘chirish
      setCategory(prevCategories => prevCategories.filter(cat => cat.id !== id));
    }).catch(err => {
      console.error("❌ Xatolik yuz berdi:", err.response?.data || err.message);
    });
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className='p-5'>
      <div className="mb-5 flex gap-3">
        <input 
          type="text" 
          placeholder="Kategoriya nomini kiriting" 
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full"
        />
        <button 
          onClick={addCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Qo‘shish
        </button>
      </div>

      <div className='grid grid-cols-2 pt-5 gap-5'>
        {category.map(item => (
          <div className='grid grid-cols-1 gap-5 p-5 bg-[#939396] rounded-[20px]' key={item.id}>
            <div className='flex justify-between items-center'>
              <h1 className='text-white text-[24px]'>Name:</h1>
              <p className='text-white text-[24px]'>{item.title_uz}</p> 
              <button 
                onClick={() => deleteCategory(item.id)} 
                className="bg-red-500 text-white px-3 py-1 rounded-lg"
              >
                O‘chirish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catigories;
