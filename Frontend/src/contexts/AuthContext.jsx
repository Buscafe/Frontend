import { createContext, useState } from "react";
import { api } from '../services/api';

export const AuthContext = createContext({});

export function AuthContextProvider({ children }){
    const [user, setUser] = useState();

    async function LoginUser(userData) {
      const response = await api.post('/login/logar', userData);
  
      setUser(response.data);
      return response.data;
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