import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';
import Header from './components/header/Header.js';
import Market from './components/pages/Market.js';
import BuyOrders from './components/pages/BuyOrders.js';
import About from './components/pages/About.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/buy-orders">
              <BuyOrders />
            </Route>
            <Route path="/">
              <Market />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
