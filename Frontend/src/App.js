import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from '../src/pages/Home';
import { Login } from '../src/pages/Login';
import { Cadastro } from '../src/pages/Cadastro';
import { NewDevice } from '../src/pages/NewDevice';
import { UserHome } from './pages/User/UserHome';
import { NewPassword } from './pages/NewPassword';
import { Profile } from './pages/User/Profile';

import { AuthContextProvider } from './contexts/AuthContext'
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
          <Route path="/User/Home" component={UserHome}/>
          <Route path="/User/Profile" component={Profile}/>
          <Route path="/NewDevice" component={NewDevice}/>
          <Route path="/NewPassword" component={NewPassword}/>
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
