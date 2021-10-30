import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';
import Header from './components/header/Header.js';
import Market from './components/pages/Market.js';
import BuyOffers from './components/pages/BuyOffers.js';
import Activity from './components/pages/Activity.js';
import About from './components/pages/About.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Switch>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/buy-offers">
              <BuyOffers />
            </Route>
            <Route exact path="/activity">
              <Activity />
            </Route>
            <Route exact path="/">
              <Market />
            </Route>
            <Route path="/:contractAddress">
              <Market />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
