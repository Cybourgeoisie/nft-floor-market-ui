import { useState, useEffect } from 'react';
import EvmWrapper from '../../classes/EvmWrapper.js';

import './Market.css';

//let DEFAULT_CONTRACT_ADDRESS = '0x0';

function Market() {
  const [currentContract, setCurrentContract] = useState();
  const [currencyAbbr, setCurrencyAbbr] = useState('ETH');
  const [signedIn, setSignedIn] = useState(false);
  const [currentContractName, setCurrentContractName] = useState('Unknown');
  const [marketOrderbook, setMarketOrderbook] = useState('Loading...');
  const [marketOrders, setMarketOrders] = useState([]);

  const [loadedMarketOrders, setLoadedMarketOrders] = useState(false);

  async function takeOffer(offerId) {
    document.getElementById('market-offer-id').value = offerId;
  }

  async function takeOfferTx() {
    let offerId = document.getElementById('market-offer-id').value;
    let nftId = document.getElementById('market-nft-id').value;

    EvmWrapper.approveTransfer(currentContract, nftId, async (tx) => {

      if (tx.hasOwnProperty('wait')) {
        console.log("Waiting for transaction to be confirmed...");
        await tx.wait();
      } else if (tx !== true) {
        console.log("Unable to approve");
        return;
      }

      EvmWrapper.takeOffer(offerId, nftId, async (tx) => {
        console.log("Waiting for transaction to be confirmed...");

        await tx.wait();

        setLoadedMarketOrders(false);
        loadMarketOrders();
      });
    });
  }

  async function loadMarketOrders(forceReload = false) {
    if (loadedMarketOrders && !forceReload) {
      return;
    }

    if (!EvmWrapper.isConnected()) {
      setMarketOrderbook('Connect to a network to view your market orders.');
      return;
    }

    setCurrencyAbbr(await EvmWrapper.getCurrencyAbbr());

    setSignedIn(await EvmWrapper.isSignedIn());

    if (!currentContract) {
      setMarketOrderbook('Set a valid ERC-721 contract to view orders.');
      return;
    }

    setMarketOrderbook('Loading orders...');

    EvmWrapper.getMarketOrders(currentContract, (orders) => {

      setLoadedMarketOrders(true);
      setMarketOrders(orders);

    });
  }

  async function changeContract() {
    let contractAddress = document.getElementById('market-contract-address').value;
    setCurrentContract(contractAddress);

    EvmWrapper.getContractName(contractAddress, (name) => {
      if (name) {
        setCurrentContractName(name);
      } else {
        setCurrentContractName('Unknown');
      }
    });

    setLoadedMarketOrders(false);
    loadMarketOrders();
  }

  async function makeOffer() {
    let value = document.getElementById('market-offer-value').value;

    EvmWrapper.makeOffer(currentContract, value, async (tx) => {

      console.log("Waiting for transaction to be confirmed...");

      await tx.wait();

      setLoadedMarketOrders(false);
      loadMarketOrders();

    });
  }

  function shortAddress(address) {
    if (address.length > 10) {
      return address.slice(0, 6) + '...' + address.substr(address.length - 4);
    }

    return address;
  }

  useEffect(() => {
    EvmWrapper.onConnect('market', loadMarketOrders.bind(this, true));
    EvmWrapper.onConnectSigner('market', loadMarketOrders.bind(this, true));
    return function cleanup() {
      EvmWrapper.removeEvents('market');
    };
  });

  function renderOrderbook() {
    let table;
    if (marketOrders && marketOrders.length == 0) {
      table = "There are no market orders for " + currentContract;
    } else {
      let orderRows = []
      for (let order of marketOrders) {
        orderRows.push((
          <tr>
            <td>{order.offerId}</td>
            <td>{order.offerer}</td>
            <td>{order.value} {currencyAbbr}</td>
            <td>
              <button onClick={takeOffer.bind(this, order.offerId)}>
                Take Offer
              </button>
            </td>
          </tr>
        ));
      }

      table = (
        <table>
          <tr>
            <th>Offer ID</th>
            <th>Offerer</th>
            <th>Value</th>
            <th>Take Offer</th>
          </tr>
          {orderRows}
        </table>
      );
    }

    return table;
  }

  return (
    <div className="market-page">
      <h1>
        NFT Contract
      </h1>

      <div className="market-contract-selection">
        <div>
          <input type="text" id="market-contract-address" placeholder={'0x0'} />
        </div>
        <div>
          <button onClick={changeContract}>Set</button>
        </div>
      </div>

      {currentContract ? (
        <>
          <h1>
            Orders for {shortAddress(currentContract)} - {currentContractName}
          </h1>

          <div className="market-content">
            {renderOrderbook()}
          </div>


          {signedIn ? (
            <>
              <h2>
                Make Offer
              </h2>

              <div className="market-contract-selection">
                <div>
                  {currencyAbbr} Offer: <input type="text" id="market-offer-value" placeholder={0.01} />
                </div>
                <div>
                  <button onClick={makeOffer}>Make Offer</button>
                </div>
              </div>

              <h2>
                Take Offer
              </h2>

              <div className="market-contract-selection">
                <div>
                  Offer ID: <input type="text" id="market-offer-id" />
                </div>
                <div>
                  NFT ID: <input type="text" id="market-nft-id" />
                </div>
                <div>
                  <button onClick={takeOfferTx}>Take Offer</button>
                </div>
              </div>
                </>
          ) : (<></>)}

        </>

      ) : (<></>)}

    </div>
  );
}

export default Market;
