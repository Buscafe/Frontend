import { createContext, useState } from "react";
import { api } from '../services/api';

export const AuthContext = createContext({});

export function AuthContextProvider({ children }){
    const [user, setUser] = useState();

    async function LoginUser({ email, pass, ip }) {
      const { data } = await api.post('/login/logar', {
        email : email,
        pass  : pass,
        ip    : ip
      });

      localStorage.setItem('Token', data.token)

      // api.defaults.headers['Authorization'] = `Bearer ${data.token}`;

      setUser(data);
      
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