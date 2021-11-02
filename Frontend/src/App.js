import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from '../src/pages/Home.jsx'
import { Login } from '../src/pages/Login.jsx'
import { Cadastro } from '../src/pages/Cadastro.jsx'
import { Teste } from '../src/pages/Teste.jsx'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Login"  component={Login} />
        <Route path="/Cadastro"  component={Cadastro} />
        <Route path="/Teste"  component={Teste} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
