import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';



export default function RegisterPage() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [direction,setDirection] = useState(false);
  const navigate = useNavigate();

    
  const handleSubmit = (e) => {
    e.preventDefault();  
    axios.post('/register', { name: name, email: email, password: password })
      .then((response) => {
        console.log('Registration successful:', response.data);
        toast.success("Kayıt Başarılı")
        setDirection(true);
      })
      .catch((error) => {
        console.error('Registration failed:', error);
          toast.error("Hata", )
      });
  };

  useEffect(() => {
    if (direction) {
      const redirectTimeout = setTimeout(() => {
        navigate('/login');
      }, 1200);

      return () => clearTimeout(redirectTimeout);
    }
  }, [direction, navigate]);

  
  return (
    <div className='grow flex items-center justify-center'>
      <ToastContainer />
      <div className='mb-60'>
        <h1 className='text-2xl font-semibold text-center mb-4'>Kayıt ol</h1>
        <form className='max-w-md  mx-5 md:mx-auto' onSubmit={handleSubmit}>
          <input
            value={name}
            type='name'
            className='w-full border-2 my-1 py-2 px-3 rounded-xl'
            placeholder='isim soyisim'
            onChange={(e) => setName(e.target.value)}
          />
          <input
          value={email}
            type='email'
            className='w-full  border-2 my-1 py-2 px-3 rounded-xl'
            placeholder='your@email.com'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            value={password}
            type='password'
            className='w-full  border-2 my-1 py-2 px-3 rounded-xl'
            placeholder='Şifre'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='bg-primary text-gray-100 w-full my-1 py-2 px-3 rounded-xl'>Kayıt ol</button>
        </form>
        <div className='w-full text-center mt-1'>
          Zaten üye misin? <Link className='font-semibold underline' to={'/login'}>Giriş Yap</Link>
        </div>
      </div>
    </div>
  );
}
