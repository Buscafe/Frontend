import { createContext, useState } from "react";
import { api } from '../services/api';

import jwt_decode from "jwt-decode";

export const AuthContext = createContext({});

export function AuthContextProvider({ children }){
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
    if(data.token){
      const user_data = jwt_decode(data.token);
      localStorage.setItem('Token', data.token)
      
      setUser(user_data);
    } 
    
    return data;
  }

  function Logout(){
      localStorage.removeItem('Token');
      setUser(null)
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
      <AuthContext.Provider value={ {signed: Boolean(user), user, LoginUser, Logout, UpdateUser} }>
          {children}
      </AuthContext.Provider>
  );
}