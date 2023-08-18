import React, { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contex';
import { useContext } from 'react';



const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [direction,setDirection] = useState(false);
  const navigate = useNavigate();


  const { user, setUser } = useContext(UserContext);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', { email, password });
      const receivedToken = response.data.token;
      const userDoc = response.data.userDoc;

      setUser(userDoc)
      const expirationDate = new Date(Date.now() + 3600 * 1000);
      setCookie('my_token', receivedToken, expirationDate.toUTCString());
      console.log(response.data);

      if (receivedToken) {
        toast.success('Giriş Başarılı');
        setDirection(true);
      } else {
        toast.error('Giriş yapılamadı..');
      }
    } catch (error) {
      console.error('Giriş yapılamadı..', error);
      toast.error('Giriş yapılamadı..');
    }
  };

  const setCookie = (name, value, expires) => {
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  };
  

  useEffect(() => {
    if (direction) {
      const redirectTimeout = setTimeout(() => {
        navigate('/');
      }, 1200);

      return () => clearTimeout(redirectTimeout);
    }
  }, [direction, navigate]);


  return (
    <div className='grow flex items-center justify-center'>
      <ToastContainer />
      <div className='mb-60'>
        <h1 className='text-2xl font-semibold text-center mb-4'>Giriş Yap</h1>
        <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
          <input
            type='email'
            className='w-full border-2 my-1 py-2 px-3 rounded-xl '
            placeholder='your@email.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            value={password}
            className='w-full border-2 my-1 py-2 px-3 rounded-xl '
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='bg-primary text-gray-100 w-full my-1 py-2 px-3 rounded-xl'>Giriş Yap</button>
        </form>
        <div className='w-full text-center mt-1'>
          Henüz hesabın yok mu? <Link className='font-semibold underline' to={'/register'}>Kayıt ol</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
