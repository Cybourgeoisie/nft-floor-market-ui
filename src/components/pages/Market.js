import { useState, useEffect } from 'react';
import EvmWrapper from '../../classes/EvmWrapper.js';
import verifiedContractsCfg from '../../config/verified.js';

import './Market.css';

function Market() {
  const [currentContract, setCurrentContract] = useState();
  const [contractErrorMessage, setContractErrorMessage] = useState();
  const [takeOfferErrorMessage, setTakeOfferErrorMessage] = useState();
  const [currencyAbbr, setCurrencyAbbr] = useState('ETH');
  const [signedIn, setSignedIn] = useState(false);
  const [currentContractName, setCurrentContractName] = useState('Unknown');
  const [marketOrders, setMarketOrders] = useState([]);
  const [verifiedContracts, setVerifiedContracts] = useState([]);

  const [ownedNftBalance, setOwnedNftBalance] = useState(0);
  const [ownedNfts, setOwnedNfts] = useState([]);

  async function takeOffer(offerId) {
    try {
      document.getElementById('market-offer-id').value = offerId;
      setTakeOfferErrorMessage('');
    } catch (ex) {

    }
  }

  async function setVerifiedContract() {
    var el = document.getElementById("market-contract-address-dropdown");
    var contractAddress = el.options[el.selectedIndex].value;
    document.getElementById('market-contract-address').value = contractAddress;
    changeContract();
  }

  async function takeOfferTx() {


    let offerId = document.getElementById('market-offer-id').value;
    let nftId = document.getElementById('market-nft-id').value;

    setTakeOfferErrorMessage('');

    EvmWrapper.checkOwnerOfNft(currentContract, nftId, async (success, err) => {

      if (err) {
        setTakeOfferErrorMessage(err);
        return;
      }

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

          loadMarketOrders();
        });
      });
    });
  }

  async function loadMarketOrders() {
    console.log("loadMarketOrders", currentContract);

    if (!EvmWrapper.isConnected()) {
      return;
    }

    if (!verifiedContracts || verifiedContracts.length === 0) {
      let chainId = await EvmWrapper.getChainId();
      if (chainId) {
        setVerifiedContracts(verifiedContractsCfg[String(chainId)]);
      }
    }

    if (!currencyAbbr) {
      setCurrencyAbbr(await EvmWrapper.getCurrencyAbbr());
    }

    if (!signedIn) {
      setSignedIn(await EvmWrapper.isSignedIn());
    }

    if (!currentContract) {
      return;
    }

    setContractErrorMessage('');

    EvmWrapper.getMarketOrders(currentContract, (orders) => {

      setMarketOrders(orders);
      loadOwnedNfts();

    });
  }

  async function loadOwnedNfts() {
    console.log("loadOwnedNfts", currentContract);

    if (!EvmWrapper.isConnected() || !currentContract) {
      return;
    }

    EvmWrapper.getOwnedNfts(currentContract, ({balance, nfts}) => {

      console.log(balance, nfts);

      setOwnedNftBalance(balance);
      setOwnedNfts(nfts);

    });
  }

  async function changeContract() {
    let contractAddress = document.getElementById('market-contract-address').value;

    // Validate the contract
    EvmWrapper.validateNftContract(contractAddress, async (success, err) => {

      if (err) {
        setContractErrorMessage(err);
        return;
      }

      setContractErrorMessage('');

      setCurrentContract(contractAddress);

      EvmWrapper.getContractName(contractAddress, (name) => {
        if (name) {
          setCurrentContractName(name);
        } else {
          setCurrentContractName('Unknown');
        }
      });

      setMarketOrders([]);
      loadMarketOrders();
      loadOwnedNfts();

    });
  }

  async function makeOffer() {
    let value = document.getElementById('market-offer-value').value;

    EvmWrapper.makeOffer(currentContract, value, async (tx) => {

      console.log("Waiting for transaction to be confirmed...");

      await tx.wait();

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
    EvmWrapper.onConnect('market', loadMarketOrders);
    EvmWrapper.onConnectSigner('market', loadMarketOrders);
    return function cleanup() {
      EvmWrapper.removeEvents('market');
    };
  }, [currentContract, JSON.stringify(marketOrders)]);

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
          <select id="market-contract-address-dropdown" onChange={setVerifiedContract}>
            <option value="0x0">-- Verified Contracts --</option>
            {verifiedContracts.map((x) => (<option value={x[0]}>{x[1]}</option>))}
          </select>
        </div>
        <div>
          <input type="text" id="market-contract-address" placeholder={'0x0'} />
        </div>
        <div>
          <button onClick={changeContract}>Set</button>
        </div>
      </div>

      <div className="market-contract-selection-error">
        {contractErrorMessage}
      </div>

      {currentContract ? (
        <>
          <h1>
            Orders for {currentContractName} <small>({shortAddress(currentContract)})</small>
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

              <div className="market-contract-selection-error">
                {takeOfferErrorMessage}
              </div>

              <h3>
                You own {ownedNftBalance} NFTs in this collection
              </h3>

              <div className="market-contract-selection">
                {ownedNfts && ownedNfts.length ? ownedNfts.map((x) => (<div>#ID: {x}</div>)) : (ownedNftBalance > 0 ? 'NFT Contract does not support looping through owned NFTs. View your owned NFTs on Etherscan or OpenSea.' : '')}
              </div>

                </>
          ) : (<></>)}

        </>

      ) : (<></>)}

    </div>
  );
}

export default Market;
