import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { NewDevice } from './pages/NewDevice';
import { NewPassword } from './pages/NewPassword';

import { UserHome } from './pages/User/UserHome';
import { UserChurches } from './pages/User/UserChurches';
import { UserDetailChurch } from './pages/User/UserDetailChurch';
import { UserProfile } from './pages/User/UserProfile';
import { UserChats } from './pages/User/UserChats';
import { UserHelp } from "./pages/User/UserHelp"

import { AdminHome } from './pages/Admin/AdminHome';
import { AdminDashboard } from './pages/Admin/AdminDashboard'
import { AdminProfile } from './pages/Admin/AdminProfile';
import { AdminSocial } from './pages/Admin/AdminSocial';
import { AdminHelp } from './pages/Admin/AdminHelp';

import { AuthContextProvider } from './contexts/AuthContext'
import { ChurchesContextProvider } from './contexts/ChurchesContext';
import { ChatContextProvider } from './contexts/ChatContenxt';

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
            <ChatContextProvider>
              <Route path="/User/Home" component={UserHome}/>
              <Route path="/User/Igrejas" exact component={UserChurches}/>
              <Route path="/User/Igrejas/:name"  component={UserDetailChurch}/>
              <Route path="/User/Social" component={UserChats}/>
              <Route path="/User/Help" component={UserHelp}/>

              <Route path="/Admin/Home" component={AdminHome}/>
              <Route path="/Admin/Dashboard" component={AdminDashboard}/>
              <Route path="/Admin/Social" component={AdminSocial}/>
              <Route path="/Admin/Help" component={AdminHelp}/>
            </ChatContextProvider>

            <Route path="/User/Profile" component={UserProfile}/>
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
