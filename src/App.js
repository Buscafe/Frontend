import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { NewDevice } from './pages/NewDevice';
import { UserHome } from './pages/User/UserHome';
import { NewPassword } from './pages/NewPassword';
import { UserProfile } from './pages/User/UserProfile';
import { AdminHome } from './pages/Admin/AdminHome';
import { AdminProfile } from './pages/Admin/AdminProfile';

import { AuthContextProvider } from './contexts/AuthContext'
import { ChurchesContextProvider } from './contexts/ChurchesContext';

import { ToastContainer } from 'react-toastify';

import { GlobalStyle } from './styles/global'
import { UserChats } from './pages/User/UserChats';

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
            <Route path="/User/Social" component={UserChats}/>
            <Route path="/User/Profile" component={UserProfile}/>

            <Route path="/Admin/Home" component={AdminHome}/>
            <Route path="/Admin/Profile" component={AdminProfile}/>
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
