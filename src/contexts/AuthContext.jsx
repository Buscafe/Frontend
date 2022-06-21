import { createContext, useState } from "react";
import { api } from '../services/api';

import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext({});

export function AuthContextProvider({ children }){
  const history = useHistory();

  const [user, setUser] = useState(() => {
    if(localStorage.getItem('Token')){
      return jwt_decode(localStorage.getItem('Token'));
    } 

    return null;
  });
  
  async function LoginUser({ email, pass, ip }) {
    const { data } = await api.post('/login', {
      email : email,
      pass  : pass,
      ip    : ip
    });

    let user_data;
    if(data.token){
      user_data = jwt_decode(data.token);
      localStorage.setItem('Token', data.token)
      
      setUser(user_data);
    } 
    
    return {data, user_data};
  }

  function Logout(){
    localStorage.clear();
    setUser(null);
    document.body.style.setProperty('--admin-color', '#F3B72B');
    history.push('/');
  }

  async function UpdateUser({ email, pass, ip }){
    const { data } = await api.post('/user/update', {
      email : email,
      ip    : ip,
      pass  : pass
    });
    
    return data
  }

  return(
      <AuthContext.Provider value={ {signed: Boolean(user), user, setUser,LoginUser, Logout, UpdateUser} }>
          {children}
      </AuthContext.Provider>
  );
}