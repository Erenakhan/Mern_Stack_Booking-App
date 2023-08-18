import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../Components/Image';

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/listPlaces').then((response) => setPlaces(response.data));
  }, []);

  console.log(import.meta.env.VITE_API_BASE_URL)

  return (
    <div className='mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8'>
      {places.map(item => (
        <Link to={item._id} key={item._id} className='w-[300px] h-[370px]'>
            {item.photo.length > 0 && (
              <div className='w-[300px] h-[300px]' key={item.photo[0]}>
                 <Image
                  className='w-full h-full object-cover rounded-lg '
                    key={item.photo[0]} 
                    src={item.photo[0]}
                    alt={`Photo of ${item.title}`}/>
              </div>
          )}
         <p className='font-semibold overflow-hidden whitespace-nowrap text-overflow-ellipsis'>{item.address}</p>
        <h2 className='text-gray-500 overflow-hidden whitespace-nowrap text-overflow-ellipsis'>{item.title}</h2>
        <p className='font-light'><span className='font-semibold'>{item.price}₺</span>gece</p>
        </Link>
      ))}
    </div>
  );
}
