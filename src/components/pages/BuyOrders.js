import { useState, useEffect } from 'react';
import EvmWrapper from '../../classes/EvmWrapper.js';

import './BuyOrders.css';

function BuyOrders() {
  const [openBuyOrders, setOpenBuyOrders] = useState('Loading...');

  async function loadBuyOrders() {
    if (!EvmWrapper.isConnected()) {
      setOpenBuyOrders('Connect to a network to view your buy orders.');
      return;
    }

    let signer = await EvmWrapper.getSignerAddress();

    if (!signer) {
      setOpenBuyOrders('Connect your wallet to be able to view all open buy orders.');
      return;
    }

    setOpenBuyOrders('Buy orders for ' + signer);
  }

  useEffect(() => {
    EvmWrapper.onConnect('buyorders', loadBuyOrders.bind(this));
    EvmWrapper.onConnectSigner('buyorders', loadBuyOrders.bind(this));
    return function cleanup() {
      EvmWrapper.removeEvents('buyorders');
    };
  });

  return (
    <div className="buy-orders-page">
      <h1>
        Buy Orders
      </h1>

      <div className="buy-orders-content">
        {openBuyOrders}
      </div>
    </div>
  );
}

export default BuyOrders;
