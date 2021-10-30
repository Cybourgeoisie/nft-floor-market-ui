import { useState, useEffect } from 'react';
import EvmWrapper from '../../classes/EvmWrapper.js';
import verifiedContractsCfg from '../../config/verified.js';

import './Activity.css';

function Activity() {
  const [currencyAbbr, setCurrencyAbbr] = useState('ETH');
  const [activityList, setActivityList] = useState([]);

  async function loadActivity() {
    console.log("loadActivity");

    if (!EvmWrapper.isConnected()) {
      return;
    }

    if (!currencyAbbr) {
      setCurrencyAbbr(await EvmWrapper.getCurrencyAbbr());
    }

    EvmWrapper.getActivity((activity) => {

      setActivityList(activity);

    });
  }

  function shortAddress(address) {
    if (address && address.length > 10) {
      return address.slice(0, 6) + '...' + address.substr(address.length - 4);
    }

    return address;
  }

  useEffect(() => {
    EvmWrapper.onConnect('activity', loadActivity);
    return function cleanup() {
      EvmWrapper.removeEvents('activity');
    };
  }, []);

  function renderActivityList() {
    let table = "There is no recent market activity.";
    
    console.log(activityList);

    if (activityList && activityList.length > 0) {
      let rows = []
      for (let event of activityList) {
        rows.push((
          <tr>
            <td>{event.event}</td>
            <td>{event.time}</td>
            <td>{event.offerId}</td>
            <td>{shortAddress(event.offerer)}</td>
            <td>{event.value ? event.value + " " + currencyAbbr : ""}</td>
            <td>{shortAddress(event.seller)}</td>
            <td>{event.tokenId}</td>
          </tr>
        ));
      }

      table = (
        <table>
          <tr>
            <th>Event</th>
            <th>Time</th>
            <th>Offer ID</th>
            <th>Offerer</th>
            <th>Value</th>
            <th>Seller</th>
            <th>Token ID</th>
          </tr>
          {rows}
        </table>
      );
    }

    return table;
  }

  return (
    <div className="activity-page">
      <h1>
        Market Activity
      </h1>

      <div className="activity-content">
        {renderActivityList()}
      </div>

    </div>
  );
}

export default Activity;
