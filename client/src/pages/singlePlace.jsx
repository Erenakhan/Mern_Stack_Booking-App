import axios from 'axios';
import { differenceInCalendarDays } from 'date-fns/fp';
import React, { useEffect, useState } from 'react';
import { Link, useParams,Navigate } from 'react-router-dom';
import { UserContext } from '../contex';
import { useContext } from 'react';
import Image from '../Components/Image';


export default function SinglePlace() {
    const { user } = useContext(UserContext);
    console.log(user)
    const params = useParams();
    const [place, setPlace] = useState({});
    const [checkIn, setCheckIn] = useState();
    const [checkOut, setCheckOut] = useState();
    const [guestCheck,setGuestCheck] = useState();
    const [name,setName] = useState();
    const [phone,setPhone] = useState();
    const [redirect,setRedirect] = useState('')
    const id = params.id
    const [allPhotos,setAllPhotos] = useState(false);

    useEffect(() => {
        axios.post('/singlePlace', params)
            .then((response) => setPlace(response.data))
            .catch((error) => console.error(error));
    }, [params]);

    const userBooked = user ? user._id : null;
        
      
    let days = 0;          
            if (checkIn && checkOut) {
                days =  differenceInCalendarDays(new Date (checkIn),new Date (checkOut));
            }
       async function bookingPlace  (){
        const response =await axios.post('/bookPlace',{
            checkIn,
            checkOut,
            guestCheck, 
            name,
            phone,
            place:place._id ,
            photo:place.photo?.[0],
            price:days*place.price, 
            title:place.title,
            user:userBooked,
        })
        
        const bookingId= response.data._id
        setRedirect(`/account/bookings/`)
    }
    
       
        if (redirect) {
            return <Navigate to={redirect} />
        }
        if (allPhotos) {
            return (
                <div className="absolute w-full px-5 md:px-[150px] bg-black text-white min-h-screen  ">
                <div className='fixed cursor-pointer mt-10 '>
                <button onClick={() => setAllPhotos(false)} 
                className=' bg-white px-3 py-2 md:px-4 md:py-3 text-black rounded-lg '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                </div>
               
                {place.photo?.length > 0 && (place.photo.map((photo) => (
                        <div className='flex  mx-auto my-8 '>
                            <Image
                        key={photo}
                        src={photo}
                        alt='Place Photo'
                        className=' w-full  object-cover  max-h-screen p-2'
                        />
                        </div>
                    )))}
                    </div>

            )
        } 
    
    
                    

    return (
        <div className='w-full mt-4 px-[20px] md:px-[180px] pb-10 '>
            <h1 className='w-full font-semibold text-2xl'>{place.title}</h1>
            <div className='text-[13px] mt-2 font-semibold'>
                <span>2 değerlendirme</span> .{' '}
                <a
                href={`https://www.google.com/maps/place/${encodeURIComponent(place.address)}`}
                className='underline'
                >
                {place.address}
                </a>
            </div>
            <div className='mt-6 grid gap-2 grid-cols-[2fr,1fr,1fr]  relative cursor-pointer' onClick={()=>setAllPhotos(true)}>
                <div className='flex ' >
                    {place.photo?.[0] && (
                        <Image src={place.photo[0]} alt='Place Photo' className='w-full h-full object-cover aspect-square rounded-l-lg ' />  
                    )}
                </div>
                <div className='grid gap-1'>{
                place.photo?.[1] && (
                        <Image src={place.photo[1]} alt='Place Photo' className='w-full h-full object-cover aspect-square' />  
                    )}
                    {place.photo?.[2] && (
                        <Image src={place.photo[2]} alt='Place Photo' className='w-full h-full object-cover aspect-square' />  
                    )}</div>
               
                <div className='grid gap-1 '>
                    { place.photo?.[3] && (
                        <Image src={place.photo[3]} alt='Place Photo' className='w-full h-full object-cover aspect-square rounded-tr-lg' />  
                    )}
                    {place.photo?.[4] && (
                        <Image src={place.photo[4]} alt='Place Photo' className='w-full h-full object-cover aspect-square  rounded-br-md' />  
                    )}

                </div>
                <button onClick={(()=>setAllPhotos(true))} className='flex absolute bottom-3 right-5 text-white border-2 rounded-md p-2 bg-gray-500 opacity-80 gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
                Daha Fazla </button>
            </div>
            
             <div className='grid lg:grid-cols-[2fr,1fr] grid-cols-1 mt-4 gap-4'>
                <div className='mt-3'>
                <p className=' text-lg lg:text-2xl font-semibold '>Açıklama</p>
                {place.desc}
                <p className='my-2 text-md lg:text-xl font-semibold mt-3'><span className='text-md lg:text-2xl font-semibold'>Check in : </span>{place.checkIn}:00  </p>
                <p className='my-2 text-md lg:text-xl font-semibold'><span className='text-md lg:text-2xl font-semibold'>Check out : </span>{place.checkIn}:00  </p>
                <p className='my-2 text-md lg:text-xl font-semibold'><span className='text-md lg:text-2xl font-semibold'>Maksimum Misafir sayısı : </span>{place.guest} </p>
                </div>
                <div>
                    <div className='border-2 rounded-md py-2 px-4 '>
                    <p className='font-semibold text-lg'>{place.price} <span className='font-normal'>₺ gece</span></p>
                    <div className='flex my-2'>
                    <span>
                    Giriş tarihi: 
                    <input type="date" value={checkIn} onChange={(e)=>setCheckIn(e.target.value)} name="checkIn" id="checkIn" className='w-full border-2 my-1 py-2 px-3 rounded-xl mb-2' />
                    </span>
                    <span>
                    Çıkış tarihi 
                    <input type="date" value={checkOut} onChange={(e)=>setCheckOut(e.target.value)} name="checkOut" id="checkOut" className='w-full border-2 my-1 py-2 px-3 rounded-xl mb-2' />
                    </span>
                    </div>
                    <span className='my-4'>
                        Misafir Sayısı: 
                        <input type='number' value={guestCheck} onChange={(e)=>setGuestCheck(e.target.value)} name ="guestCheck" id="guestCheck"  className=' border-2 w-full my-1 py-2 px-3 rounded-full text-xl '/>
                    </span>
                    {checkIn && checkOut && guestCheck && (
                    <div>
                        İsim Soyisim:
                       <input type="text" value={name} onChange={(e)=>setName(e.target.value)}  className=' border-2 w-full my-1 py-2 px-3 rounded-full text-xl '  />
                        Telefon numarası:
                       <input type="text"  value={phone} onChange={(e)=>setPhone(e.target.value)} className=' border-2 w-full my-1 py-2 px-3 rounded-full text-xl '  />
                    </div>)}
                    <button  onClick={bookingPlace}  className='bg-primary text-gray-100 w-full my-1 py-2 px-3 rounded-full text-xl'>Rezerve edin {days !== 0 && `${days * place.price} ₺`}
                    </button>
                    </div>
                </div>
                
            </div>               



        </div>
    );
}
