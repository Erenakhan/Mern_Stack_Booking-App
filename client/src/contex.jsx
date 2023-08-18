import { createContext,useState,useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user,setUser]=useState(null);
  const [ready,setReady] = useState(false)
  
  useEffect(() => {
    if (!user) {
      axios.get('/profile')
        .then(response => {
          const userData = response.data;
          setUser(userData); 
           /* {name: 'ali', email: 'ali@mail.com', id: '64ccdeb507899c9a67b6a4c6'} */
          setReady(true);
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
          setReady(true);
        });
    }
  }, []);


  return (
    <UserContext.Provider value={{user,setUser,setReady,ready}}>
      {children}  
    </UserContext.Provider>
  );
}