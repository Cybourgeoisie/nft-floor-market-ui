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
            <Link to="/buy-orders">Buy Orders</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
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
