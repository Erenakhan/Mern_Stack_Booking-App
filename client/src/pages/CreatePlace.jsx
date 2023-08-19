import React,{useState,useEffect} from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Image from '../Components/Image';


export default function CreatePlace() {
  const params = useParams();
  const [redirect, setRedirect] = useState(false)
  const [places,setPlaces] = useState([])

  const navigate = useNavigate();
  if (redirect) {
    navigate('/account/accommodations');
  }

  
   useEffect(() => {
    axios.get('/listUserPlaces' ).then((response) => setPlaces(response.data))
   },[])

  return (
    <div className= '  flex-col-4 w-full mt-4  justify-center'>
      <Link to='/account/accommodations/new' className="w-sm mx-auto py-2 mt-3 bg-primary rounded-full text-white flex justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Evini Kirala
      </Link>
      {params.actions === 'new' ? 
        ""
      
       :  <div>
       {places.length > 0 ? places.map(place => (
       <Link to={place._id}  
        className='w-full mx-3 border-2  my-2 mt-4 flex flex-col md:flex-row p-4 rounded-md bg-gray-100'
        key={place.title}>

          {place.photo.length > 0 &&
          <div className='flex  md:max-w-[250px] md:max-h-[250px]' key={place.id}>
            <Image className='object-cover w-full ' src={place.photo[0]} alt="" />
          </div>
        }   
          <div className='flex flex-col gap-2  p-4'>
            <p className='text-xl'>{place.title}</p> 
            <p className='underline'>{place.address}</p> 

            <p className='mt-2 '>{place.desc}</p>
            <p className=''><span className='font-semibold text-lg'>Ücret </span><span>(gece) : </span><span className='text-lg'>{place.price}₺</span></p>
            </div>
          </Link>)) : null}

        </div>}
    </div>
  );
}
