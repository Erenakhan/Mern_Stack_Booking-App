import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Image from '../Components/Image';

export default function FromPage() {
    const [title,setTitle] = useState();
    const [address,setAddress] = useState();
    const [email,setEmail] = useState();
    const [desc,setDesc] = useState();
    const [photo,setPhoto] = useState([]);
    const [photoLink,setPhotoLink] = useState([]);
    const [checkIn,setCheckIn] = useState();
    const [checkOut,setCheckOut] = useState();
    const [guest ,setGuest] = useState();
    const [price ,setPrice] = useState();
    const [selected, setSelected] = useState([]);

    const {actions} = useParams();
    const [place, setPlace] = useState({});
    console.log(actions)

    const requestData = {
      actions: actions 
  };

 const [redirect, setRedirect] = useState(false)
 
  const navigate = useNavigate();
  if (redirect) {
    navigate('/account/accommodations'); // Yönlendirme işlemi
  }
  

    useEffect(() => {
      if (actions === "new"){
        return;
      }
        axios.post('/FormPage', requestData)
            .then((response) =>  
            {
              setPlace(response.data);
              setTitle(response.data.title);
              setAddress(response.data.address);
              setEmail(response.data.email);
              setDesc(response.data.desc);
              setPhoto(response.data.photo);
              setCheckIn(response.data.checkIn);
              setCheckOut(response.data.checkOut);
              setGuest(response.data.guest);
              setPrice(response.data.price);
              setSelected(response.data.selected);
           })
    }, [actions]);
    

    async function addLink (e){
      e.preventDefault();
      const {data} =  await  axios.post('/photosWithLink', {link:photoLink})
      setPhoto( e=>{ return [...e ,data]});
      setPhotoLink('')
    }
  
    function onChange(newSelected) {
      setSelected(newSelected);
    }
  
  
    
    useEffect(() => {
    }, [selected]); 
  
    function handleCheck(e) {
      const { checked, name } = e.target;
      let newSelected;
      if (checked) {
        newSelected = [...selected, name];
      } else {
        newSelected = selected.filter(selectedName => selectedName !== name);
      }
      setSelected(newSelected);
    }
  
    function uploadPhotos(e) {
      const files = e.target.files;
      const data = new FormData();
    
      for (let i = 0; i < files.length; i++) {
        data.append('photos', files[i]);
      }
    
      axios.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(response => {
        const fileNames = response.data;
        setPhoto(e => {
          return [...e, ...fileNames];
        });
      }).catch(error => {
        console.error('Error uploading photos:', error);
      });
    }
    
    
  
    async function savePlace  (e){
    e.preventDefault();
    if (actions === "new"){
      const {data} = await axios.post('/addPlace', {title, address,email,desc,photo,checkIn,checkOut,guest,selected,price});
    }else{
      const {data} = await axios.put('/addPlace', {actions,title, address,email,desc,photo,checkIn,checkOut,guest,selected,price});
    }
    
    
    setRedirect(true);
   }

   
   function removePhoto(e,fileName) {
    e.preventDefault();
    const updatedPhoto = photo.filter(photoItem => photoItem !== fileName);
    setPhoto(updatedPhoto);
  }

  function coverPhoto(e, fileName) {
    e.preventDefault();
    const updatedPhoto = photo.filter(photoItem => photoItem !== fileName);
    const newPhotos = [fileName, ...updatedPhoto];
    setPhoto(newPhotos);
  }

   

  
  return (
    <div className='mx-2'>
        <form className='' onSubmit={savePlace}> 
            <span className='font-semibold text-xl'>Başlık</span>
            <p className='text-gray-500'>Başlık kısa ve açıklayıcı olmalı</p>
            <input type="text" className='w-full border-2 my-1 py-2 px-3 rounded-xl mb-2'  placeholder='başlık ,örneğin: Göl Manzaralı Dağ Evi' value={title} onChange={e=>setTitle(e.target.value)}/>

            <span className='font-semibold text-xl'>Adres</span>
            <p className='text-gray-500'>Evinizin adresini giriniz</p>
            <input type="text" className='w-full border-2 my-1 py-2 px-3 rounded-xl mb-2'  placeholder='Sakarya Sapanca'value={address} onChange={e=>setAddress(e.target.value)}/>

            <span className='font-semibold text-xl'>Fotoğraflar</span>
            <p className='text-gray-500'>Çok ve detaylı fotoğraflar daha çok ilgi çeker</p>
            <div className='flex'>
            <input type="text" className='w-full border-2 my-1 py-2 px-3 rounded-xl'  placeholder='Link ile yükleyin....jpg' value={photoLink} onChange={e=>setPhotoLink(e.target.value)}/>   
            <button className='mx-3 px-4 rounded-xl text-white bg-gray-400'  onClick={addLink}>yükle</button>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3'>
            {photo.length > 0 && photo.map(link=>(
              <div className='relative' key={photo.id}>
                <Image className='h-[216px] w-[225px] object-cover border-2 rounded-xl ' src={link} key={link} />
                
                <div  className='absolute bottom-4 right-5  bg-black bg-opacity-50 rounded-xl px-3 py-2 md:px-4 md:py-2 '>
                <button onClick={(e)=>removePhoto(e,link)}>
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=" hover:text-primary text-white w-5 h-5 md:w-6 md:h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              </button>
                </div>
                <div  className='absolute bottom-4 left-5  bg-black bg-opacity-50 rounded-xl px-3 py-2 md:px-4 md:py-2 '>
                <button onClick={(e)=>coverPhoto(e,link)}>
                {link === photo[0] && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="hover:text-primary text-white w-5 h-5 md:w-6 md:h-6">
                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
              </svg>
              )}
              {link !== photo[0] && (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=" hover:text-primary text-white w-6 h-6">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
               </svg>
              )}
               

              </button>
                </div>
                
                </div>
                
              
            ))}
            <label className='cursor-pointer h-[216px] flex items-center justify-center border-2 rounded-xl bg-transparent mb-2 '>
              <input type="file" className='hidden' onChange={uploadPhotos} />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
            </svg> 
            <p className='text-gray-400 text-lg'>YÜKLE</p>
            </label>


            </div>
            <span className='font-semibold text-xl my-8'>Açıklama</span>
            <p className='text-gray-500'>Detaylı açıklama dikkat güven sağlar</p>
            <textarea type="text" className='w-full h-[140px] border-2 my-1 py-2 px-3 rounded-xl'  placeholder='Kiralayacağınız yerle ile ilgili detaylı açıklama' value={desc} onChange={e=>setDesc(e.target.value)}/>

            <span className='font-semibold text-xl my-4'>Ekstra </span>
            <p className='text-gray-500'>Ekstra avantajlar</p>

            <div className='grid grid-col-2 md:grid-cols-4 lg:grid-cols-6 mb-6'  >
                    <label className='flex  border-2 py-8 rounded-xl  justify-center gap-2'>
                    <input type="checkbox" checked={selected.includes('wifi')} name="wifi" onChange={handleCheck} />
                    <span className='flex gap-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                    </svg>
                    Wifi</span>
                    </label>
                    <label className='flex  border-2 py-8 rounded-xl  justify-center gap-2'>
                    <input type="checkbox" checked={selected.includes('parking')} name="parking" onChange={handleCheck} />
                    <span className='flex gap-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>Park alanı</span>
                    </label>
                    <label className='flex  border-2 py-8 rounded-xl  justify-center gap-2'>
                    <input type="checkbox" checked={selected.includes('tv')} name="tv" onChange={handleCheck} />
                    <span className='flex gap-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    Tv</span>
                    </label>
                    <label className='flex  border-2 py-8 rounded-xl  justify-center gap-2'>
                    <input type="checkbox" checked={selected.includes('radio')} name="radio" onChange={handleCheck} />
                    <span className='flex gap-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                    radio</span>
                    </label>
                    <label className='flex  border-2 py-8 rounded-xl  justify-center gap-2'>
                    <input type="checkbox" checked={selected.includes('pet')} name="pet" onChange={handleCheck} />
                    <span className='flex gap-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Evcil hayvan izni</span></label>
                    <label className='flex  border-2 py-8 rounded-xl  justify-center gap-2'>
                    <input type="checkbox" checked={selected.includes('door')} name="door" onChange={handleCheck} />
                    <span className='flex gap-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                    Şahsi giriş</span>
                </label>
            </div>
            <div className='grid grid-col-1 md:grid-col-2 lg:grid-cols-4 my-2'>
                <div>
                    <label className='font-semibold md:text-lg'>Check In</label> <br />
                    <input  className='border-2 my-1 py-2 px-3 rounded-xl' type="text"  placeholder='10:00' value={checkIn} onChange={e=>setCheckIn(e.target.value)}/>
                </div>
                <div>
                    <label  className='font-semibold md:text-lg'>Check Out</label> <br/>
                    <input  className='border-2 my-1 py-2 px-3 rounded-xl' type="text" placeholder='10:00'  value={checkOut} onChange={e=>setCheckOut(e.target.value)}/>
                </div>
                <div className='my-2'>
                    <label  className='font-semibold md:text-lg'>Maksimum Misafir Sayısı: </label> <br />
                    <input  className='border-2 my-1 py-2 px-3 rounded-xl' type="text" value={guest} onChange={e=>setGuest(e.target.value)} />
                </div>
                <div className='my-2'>
                    <label  className='font-semibold md:text-lg'>Ücret: </label> <br />
                    <input  className='border-2 my-1 py-2 px-3 rounded-xl' type="text" value={price} onChange={e=>setPrice(e.target.value)} />
                </div>
            </div>
            <button className='bg-primary text-gray-100 w-full my-1 py-2 px-3 rounded-full text-xl'>save</button>
        </form>
      </div>
  )
}
