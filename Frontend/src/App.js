import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from '../src/pages/Home';
import { Login } from '../src/pages/Login';
import { Cadastro } from '../src/pages/Cadastro';
import { NewDevice } from '../src/pages/NewDevice';
import { Localizador } from '../src/pages/User/Localizador';

import { AuthContextProvider } from './contexts/AuthContext'

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
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
