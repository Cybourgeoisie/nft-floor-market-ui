import {
  Link,
} from "react-router-dom";

import './Header.css';
import WalletConnect from '../evm/WalletConnect.js';

function Header() {
  return (
    <header className="header">
      <div className="header-title">
        NFT Floor Market
      </div>
      <div>
        <ul className="header-links">
          <li>
            <Link to="/">Market</Link>
          </li>
          <li>
            <Link to="/buy-offers">Buy Offers</Link>
          </li>
          <li>
            <Link to="/activity">Activity</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/terms-of-service">Terms of Service</Link>
          </li>
        </ul>
      </div>
      <div>
        <WalletConnect />
      </div>
    </header>
  );
}

export default Header;
