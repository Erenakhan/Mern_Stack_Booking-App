import React,{useState} from 'react';
import { UserContext } from '../contex';
import { useContext } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import CreatePlace from './CreatePlace';
import BookingsPage from './BookingsPage';

export default function Account() {
  const { user, ready,setUser } = useContext(UserContext);
  const { subpage } = useParams(); 
  const [redirect,setRedirect]=useState(false);

  if (!ready) return 'loading...';

  if (!user && ready) return <Navigate to={'/login'} />;

  async function logout() {
    await axios.post('/logout',)
    setRedirect(true);
    setUser(null);
  }
  if(subpage === undefined) return <Navigate to={'/account/profile'}/>;
  

  if (redirect) return <Navigate to={'/'} />;
  return (
    <div className='mt-4 mb-2'>
      <nav className='flex w-full justify-center gap-5 md:gap-8 '>
        <Link
          to='/account/profile'
          className={`px-4 py-2 flex gap-2  rounded-full ${
            subpage === 'profile' ? 'bg-primary text-white' : 'bg-gray-300'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
          <span className='hidden md:block'>Profilim</span>
        </Link>
        <Link
          to='/account/bookings'
          className={`px-4 py-2 flex gap-2 rounded-full ${
            subpage === 'bookings' ? 'bg-primary  text-white' : 'bg-gray-300'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
        </svg>
        <span className='hidden md:block'>Seyahatlerim</span>
        </Link>
        <Link
          to='/account/accommodations'
          className={`px-4 py-2 flex gap-2 rounded-full ${
            subpage === 'accommodations' ? 'bg-primary text-white' : 'bg-gray-300'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>

        <span className='hidden md:block'>Evini Kirala</span>
        </Link>
      </nav>
      {subpage === 'profile' ? (
        <div className='w-sm md:w-lg  mx-auto text-center mt-8'>
          <span className='font-semibold'>Kullanıcı Adı: </span> {user.name}<br />
          <span className='font-semibold'>Kullanıcı Mail: </span>{user.email}<br />
          <button onClick={logout}  className="w-sm md:w-md py-2 mt-3 bg-primary rounded-full  text-white">Çıkış Yap</button>
        </div>
      ) : (
        ''
      )}
      {subpage ==='accommodations' ? (<CreatePlace />):('')}
      {subpage ==='bookings' ? (<BookingsPage />):('')}
    </div>
  );
}
