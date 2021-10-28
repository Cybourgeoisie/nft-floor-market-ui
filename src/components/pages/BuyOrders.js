import { useState, useEffect } from 'react';
import EvmWrapper from '../../classes/EvmWrapper.js';

import './BuyOrders.css';

function BuyOrders() {
  const [openBuyOrderbook, setOpenBuyOrderbook] = useState('Loading...');
  const [currencyAbbr, setCurrencyAbbr] = useState('ETH');
  const [openBuyOrders, setOpenBuyOrders] = useState([]);
  const [signerAddress, setSignerAddress] = useState(false);
  const [loadedBuyOrders, setLoadedBuyOrders] = useState(false);

  let orderList = [];

  async function cancelOrder(offerId) {
    EvmWrapper.withdrawOffer(offerId, async (tx) => {

      console.log("Waiting for transaction to be confirmed...");

      await tx.wait();

      setLoadedBuyOrders(false);
      loadBuyOrders();

    });
  }

  async function loadBuyOrders() {
    if (loadedBuyOrders) {
      return;
    }

    if (!EvmWrapper.isConnected()) {
      setOpenBuyOrderbook('Connect to a network to view your buy orders.');
      return;
    }

    setCurrencyAbbr(await EvmWrapper.getCurrencyAbbr());

    let signer = await EvmWrapper.getSignerAddress();
    setSignerAddress(signer);

    if (!signer) {
      setOpenBuyOrderbook('Connect your wallet to be able to view all open buy orders.');
      return;
    }

    setOpenBuyOrderbook('Loading buy orders...');

    EvmWrapper.getBuyerOrders(signer, (orders) => {

      setLoadedBuyOrders(true);
      setOpenBuyOrders(orders);

    });
  }

  function renderOrderbook() {
    let table;
    if (openBuyOrders && openBuyOrders.length == 0) {
      table = "There are no buy orders for " + signerAddress;
    } else {
      let orderRows = [];
      for (let order of openBuyOrders) {
        orderRows.push((
          <tr>
            <td>{order.offerId}</td>
            <td>{order.contract}</td>
            <td>{order.value} {currencyAbbr}</td>
            <td>
              <button onClick={cancelOrder.bind(this, order.offerId)}>
                Cancel
              </button>
            </td>
          </tr>
        ));
      }

      table = (
        <table>
          <tr>
            <th>Order ID</th>
            <th>Contract</th>
            <th>Value</th>
            <th>Cancel</th>
          </tr>
          {orderRows}
        </table>
      );
    }

    return table;
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
        {renderOrderbook()}
      </div>
    </div>
  );
}

export default BuyOrders;
