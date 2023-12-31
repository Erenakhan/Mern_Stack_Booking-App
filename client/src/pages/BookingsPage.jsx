import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from '../Components/Image';



export default function BookingsPage() {
  const [places, setPlaces] = useState([]);


  useEffect(() => {
    axios.get('/bookPlace').then((response) => {
      if (response.data && response.data.length > 0) {
        setPlaces(response.data);
      }
    });
  }, []);


  return (
    <div className='pt-6'>
      {places.length > 0 ? (
        places.map((place) => (
          <div className='w-full md:w-xl p-5 md:p-0 border-2 my-2 rounded-lg md:mx-auto flex flex-col md:flex-row' key={place.id}>
            <div className='flex  md:max-w-[230px] md:max-h-[230px]' key={place.id}>
              <Image className='object-cover rounded-l-lg' src={place.photo} alt='' />
            </div>
            <div className='flex flex-col md:grid md:grid-cols-[5fr,2fr] '>
            <div>
           <div className='flex md:px-2 pt-6 md:pb-4 pb-2 md:gap-x-6 gap-3 md:gap-0 '>
                    <div className='flex gap-1 md:gap-2 '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                  </svg>

                      <p className='font-semibold md:text-lg'>Check in:</p>
                      <p className='font-semibold '>{new Date(place.checkIn).toLocaleDateString("tr-TR")}</p>
                    </div>
                    <div className='flex gap-1 md:gap-2 '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                  </svg>

                      <p className='font-semibold  md:text-lg'>Check out:</p>
                      <p className='font-semibold '>{new Date(place.checkOut).toLocaleDateString("tr-TR")}</p>
                    </div>
                  </div>
            <p className='font-semibold md:ml-6 text-lg md:text-2xl mb-2  overflow-hidden'>{place.title}</p>
            <p className='md:ml-6 md:text-lg'>Misafir Sayısı: {place.guestCheck}</p>
            <p className='md:ml-6 md:text-lg'>İsim Soyisim: {place.name}</p>
            <p className='md:ml-6 md:text-lg'>Numara: {place.phone}</p>
            </div>
                <div className='flex my-2 md:my-0 px-2 justify-center items-center'>
                <div className='flex  justify-center items-center border-2 rounded-md w-[230px] h-[60px]  bg-primary text-white '>
                Ödenen Ücret: {place.price}₺
                </div>
              </div>
              
                
              </div>
            </div>
            
        ))
      ) : (
        <div className='w-screen h-[400px] flex justify-center items-center'>
          <div className='text-lg  lg:text-4xl text-gray-400'>Adınıza kayıttlı rezervasyon bulunamadı : /</div>
        </div>
      )}
    </div>
  );
}