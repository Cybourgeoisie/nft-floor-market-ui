import { useState, useEffect } from 'react';
import EvmWrapper from '../../classes/EvmWrapper.js';

import './BuyOffers.css';

function BuyOffers() {
  const [currencyAbbr, setCurrencyAbbr] = useState('ETH');
  const [openBuyOffers, setOpenBuyOffers] = useState([]);
  const [signerAddress, setSignerAddress] = useState(false);

  async function cancelOffer(offerId) {
    EvmWrapper.withdrawOffer(offerId, async (tx) => {

      console.log("Waiting for transaction to be confirmed...");

      await tx.wait();

      loadBuyOffers();

    });
  }

  async function loadBuyOffers() {
    if (!EvmWrapper.isConnected()) {
      return;
    }

    setCurrencyAbbr(await EvmWrapper.getCurrencyAbbr());

    let signer = await EvmWrapper.getSignerAddress();
    setSignerAddress(signer);

    if (!signer) {
      return;
    }

    EvmWrapper.getBuyerOffers(signer, (offers) => {

      setOpenBuyOffers(offers);

    });
  }

  function renderOfferbook() {
    let table;
    if (openBuyOffers && openBuyOffers.length === 0) {
      table = "There are no buy offers for " + signerAddress;
    } else {
      let offerRows = [];
      for (let offer of openBuyOffers) {
        offerRows.push((
          <tr>
            <td>{offer.offerId}</td>
            <td>{offer.contract}</td>
            <td>{offer.value} {currencyAbbr}</td>
            <td>
              <button onClick={cancelOffer.bind(this, offer.offerId)}>
                Cancel
              </button>
            </td>
          </tr>
        ));
      }

      table = (
        <table>
          <tr>
            <th>Offer ID</th>
            <th>Contract</th>
            <th>Value</th>
            <th>Cancel</th>
          </tr>
          {offerRows}
        </table>
      );
    }

    return table;
  }

  useEffect(() => {
    EvmWrapper.onConnect('buyoffers', loadBuyOffers.bind(this));
    EvmWrapper.onConnectSigner('buyoffers', loadBuyOffers.bind(this));
    return function cleanup() {
      EvmWrapper.removeEvents('buyoffers');
    };
  }, []);

  return (
    <div className="buy-offers-page">
      <h1>
        Buy Offers
      </h1>

      <div className="buy-offers-content">
        {renderOfferbook()}
      </div>
    </div>
  );
}

export default BuyOffers;
