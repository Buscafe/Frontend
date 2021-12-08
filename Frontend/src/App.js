import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from '../src/pages/Home';
import { Login } from '../src/pages/Login';
import { Cadastro } from '../src/pages/Cadastro';
import { NewDevice } from '../src/pages/NewDevice';
import { Localizador } from '../src/pages/User/Localizador';
import { NewPassword } from './pages/NewPassword';

import { AuthContextProvider } from './contexts/AuthContext'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/Login" component={Login}/>
          <Route path="/Cadastro" component={Cadastro}/>
          <Route path="/Home/User" component={Localizador}/>
          <Route path="/NewDevice" component={NewDevice}/>
          <Route path="/NewPassword" component={NewPassword}/>
        </Switch>
      </AuthContextProvider>

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
