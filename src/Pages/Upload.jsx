import axios from 'axios';
import React, { useState } from 'react';

function Upload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('accessToken');


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };


  const uploadImage = () => {
    if (!image) {
      alert("Iltimos, rasm tanlang!");
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    setLoading(true);
    
    axios({
      url: 'https://api.fruteacorp.uz/upload/images',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: formData
    }).then(res => {
      console.log( res.data);
      alert();
      setImage(null);
      setPreview('');
    }).catch(err => {
      console.error( err.response?.data || err.message);
      alert();
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className='p-5'>
      <h1 className='text-xl font-bold'>Rasm Yuklash</h1>

      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange}
        className="border px-3 py-2 rounded-lg w-full mt-2"
      />

      {preview && (
        <div className="mt-4">
          <h2 className='text-lg font-bold'>Tanlangan Rasm:</h2>
          <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded-lg mt-2" />
        </div>
      )}

      <button 
        onClick={uploadImage} 
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        disabled={loading}
      >
        {loading ? "Yuklanmoqda..." : "Yuklash"}
      </button>
    </div>
  );
}

export default Upload;
