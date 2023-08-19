import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contex';
import { useContext } from 'react';

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <div className=' flex justify-center gap-[150px] items-center h-[100px] w-full border-gray-100 border-b-2 '>
      <Link to={'/'}>
        <div className='flex gap-1 items-center '>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-primary">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
      </svg>

          <span className='text-primary font-bold text-xl'>Booking</span>
        </div>
      </Link>
      <div className=' gap-3 hidden md:flex px-5 py-2 ml-[110px] items-center rounded-3xl border-2 shadow-sm'>
        <span className='font-semibold'>Herhangi bir yer</span>
        <div><span className='border-r-2'></span></div>
        <span className='font-semibold'>Herhangi bir hafta</span>
        <div><span className='border-l-2'></span></div>
        <span className='text-gray-400'>misafir ekleyin</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-white p-1 border-2 rounded-full bg-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
      <div className='flex gap-1 items-center'>
        <span className='font-semibold hidden md:block'>Evinizi Booking'e taşıyın</span>
        <Link to={user ? 'account':'/login'} className='border-2 shadow-sm flex  rounded-2xl gap-2 p-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 rounded-full relative  bg-gray-500 text-white h-6">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
          </svg>
          {!!user && (
            <div>
              {user.name}
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}
