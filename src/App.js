import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { NewDevice } from './pages/NewDevice';
import { UserHome } from './pages/User/UserHome';
import { NewPassword } from './pages/NewPassword';
import { Profile } from './pages/User/Profile';
import { AdminHome } from './pages/Admin/AdminHome';

import { AuthContextProvider } from './contexts/AuthContext'
import { ChurchesContextProvider } from './contexts/ChurchesContext';

import { ToastContainer } from 'react-toastify';

import { GlobalStyle } from './styles/global'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/Login" component={Login}/>
          <Route path="/Cadastro" component={Cadastro}/>
          <Route path="/NewDevice" component={NewDevice}/>
          <Route path="/NewPassword" component={NewPassword}/>

          <ChurchesContextProvider>
            <Route path="/User/Home" component={UserHome}/>
            <Route path="/User/Profile" component={Profile}/>

            <Route path="/Admin/Home" component={AdminHome}/>
          </ChurchesContextProvider>
        </Switch>
      </AuthContextProvider>

      <GlobalStyle/>
      <ToastContainer
          position="top-center"
          theme="colored"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </BrowserRouter>
  );
}

export default App;
