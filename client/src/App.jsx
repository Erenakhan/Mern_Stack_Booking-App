import { Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './contex';
import LoginPage from './pages/LoginPage';
import Layout from './pages/Layout';
import IndexPage from './pages/IndexPage';
import RegisterPage from './pages/RegisterPage';
import Account from './pages/Account';
import axios from 'axios';
import FormPage from './pages/FormPage';
import SinglePlace from './pages/singlePlace';

function App() {

  axios.defaults.baseURL = 'http://localhost:5000';
  axios.defaults.withCredentials = true;


  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/:id' element={<SinglePlace />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='account' element={<Account />} />
          <Route path='account/:subpage' element={<Account />} />
          <Route path='account/:subpage/:actions' element={<FormPage />} />
          <Route path='account/:subpage/:id' element={<FormPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
