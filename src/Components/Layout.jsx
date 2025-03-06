import React from 'react';
import { AiOutlineProduct } from 'react-icons/ai';
import { FaBimobject, FaCar, FaCity, FaCloudUploadAlt, FaCubes, FaLayerGroup, FaListAlt, FaMapMarkerAlt, FaProductHunt, FaTags, FaUserAlt } from 'react-icons/fa';
import { GrTransaction } from 'react-icons/gr';
import { IoCardSharp } from 'react-icons/io5';
import { MdDisabledByDefault } from 'react-icons/md';
import { PiFlagBannerBold } from 'react-icons/pi';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

function Layout() {
    const navigate = useNavigate();

    const LogOut = () => {
      localStorage.removeItem('accessToken');
      navigate('/login');
    };


  return (
    <div>
      <header className='text-right text-3xl font-bold p-4  bg-blue-800'>
        <button onClick={LogOut} className="bg-blue-900 text-white px-4 py-2 rounded-md">Log Out</button>
      </header>
      <div className='grid grid-cols-12 gap-4'>
      <nav className="flex flex-col gap-4   col-span-3 p-4 bg-blue-900 min-h-screen">
      <NavLink to="/" className={({ isActive }) => `flex items-center gap-2 p-2 rounded-md  text-white font-bold ${isActive ? 'bg-blue-600'   : 'hover:bg-blue-700'}`}>
          <FaUserAlt />User
          </NavLink>
          <NavLink to="/catigories" className={({ isActive }) => `flex items-center gap-2 p-2 rounded-md  text-white font-bold ${isActive ? 'bg-blue-600'   : 'hover:bg-blue-700'}`}>
          <FaLayerGroup />Categories
          </NavLink>
         
          
          <NavLink to="/products" className={({ isActive }) => `flex items-center gap-2 p-2 rounded-md text-white font-bold ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
          <AiOutlineProduct /> Products
          </NavLink>
          <NavLink to="/orders" className={({ isActive }) => `flex items-center gap-2 p-2 rounded-md text-white font-bold ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
          <FaBimobject />Buyumlar
          </NavLink>
          <NavLink to="/promo" className={({ isActive }) => `flex items-center gap-2 p-2 rounded-md text-white font-bold ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
          <FaProductHunt /> Promo
          </NavLink>
          <NavLink to="/card" className={({ isActive }) => `flex items-center gap-2 p-2 rounded-md text-white font-bold ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
          <IoCardSharp /> Card
          </NavLink>
          <NavLink to="/wishlist" className={({ isActive }) => `flex items-center gap-2 p-2 rounded-md text-white font-bold ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
          <FaListAlt /> Wishlist
          </NavLink>
          <NavLink to="/transaction" className={({ isActive }) => `flex items-center gap-2 p-2 rounded-md text-white font-bold ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
          <GrTransaction /> Transaction
          </NavLink>
          <NavLink to="/upload" className={({ isActive }) => `flex items-center gap-2 p-2 rounded-md text-white font-bold ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
          <FaCloudUploadAlt />Upload
          </NavLink>
          <NavLink to="/default" className={({ isActive }) => `flex items-center gap-2 p-2 rounded-md text-white font-bold ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
          <MdDisabledByDefault />Default
          </NavLink>
          <NavLink to="/banner" className={({ isActive }) => `flex items-center gap-2 p-2 rounded-md text-white font-bold ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
          <PiFlagBannerBold /> Banner
          </NavLink>
          
        </nav>
        <div className='col-span-9 p-4  overflow-y-scroll h-[94vh]  '><Outlet/></div>
       
      </div>
    </div>
  );
}

export default Layout;
