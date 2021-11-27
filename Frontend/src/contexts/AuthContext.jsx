import { createContext, useState } from "react";
import { api } from '../services/api';

import jwt_decode from "jwt-decode";

export const AuthContext = createContext({});

export function AuthContextProvider({ children }){
  let user_JWT = null;
  if(localStorage.getItem('Token')){
    user_JWT = jwt_decode(localStorage.getItem('Token'));
  } 
  const [user, setUser] = useState(user_JWT);

  async function LoginUser({ email, pass, ip }) {
    const { data } = await api.post('/login/logar', {
      email : email,
      pass  : pass,
      ip    : ip
    });
    const user_data = jwt_decode(data.token);

    localStorage.setItem('Token', data.token)
    
    setUser(user_data);
    return data;
  }

  function Logout(){
      setUser(null)
  }

  return(
      <AuthContext.Provider value={ {signed: Boolean(user), user, LoginUser, Logout} }>
          {children}
      </AuthContext.Provider>
  );
}