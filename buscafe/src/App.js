import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from '../src/pages/Home.jsx'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
