import { useState, useEffect } from 'react';
import EvmWrapper from '../../classes/EvmWrapper.js';

import './Market.css';

let DEFAULT_CONTRACT_ADDRESS = '0x0';

function Market() {
  const [currentContract, setCurrentContract] = useState(DEFAULT_CONTRACT_ADDRESS);
  const [currentContractName, setCurrentContractName] = useState('Unknown');
  const [marketOrders, setMarketOrders] = useState([]);
  const [marketOrderbook, setMarketOrderbook] = useState('Loading...');

  async function loadMarketOrders() {
    if (!EvmWrapper.isConnected()) {
      setMarketOrderbook('Connect to a network to view your market orders.');
      return;
    }

    /*
    let signer = await EvmWrapper.getSignerAddress();

    if (!signer) {
      setMarketOrderbook('Connect your wallet to be able to view all open buy orders.');
      return;
    }
    */

    if (!currentContract) {
      setMarketOrderbook('Set a valid ERC-721 contract to view orders.');
      return;
    }

    setMarketOrderbook('Loading orders...');

    EvmWrapper.getMarketOrders(currentContract, (orders) => {
      
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
  }

  function shortAddress(address) {
    if (address.length > 10) {
      return address.slice(0, 6) + '...' + address.substr(address.length - 4);
    }

    return address;
  }

  useEffect(() => {
    EvmWrapper.onConnect('market', loadMarketOrders.bind(this));
    EvmWrapper.onConnectSigner('market', loadMarketOrders.bind(this));
    return function cleanup() {
      EvmWrapper.removeEvents('market');
    };
  });

  return (
    <div className="market-page">
      <h1>
        NFT Contract
      </h1>

      <div className="market-contract-selection">
        <div>
          <input type="text" id="market-contract-address" placeholder={DEFAULT_CONTRACT_ADDRESS} />
        </div>
        <div>
          <button onClick={changeContract}>Set</button>
        </div>
      </div>

      <h1>
        Orders for {shortAddress(currentContract)} - {currentContractName}
      </h1>

      <div className="market-content">
        {marketOrderbook}
      </div>
    </div>
  );
}

export default Market;
