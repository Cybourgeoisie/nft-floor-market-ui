import './About.css';
import contracts from '../../config/contracts.js';
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about-page">
      <h1 id="about">Notice: Highly Experimental</h1>

      <p>
        NFT Floor Market is extremely new and unaudited. The contract code is publicly visible, and all deployments are listed
        in the FAQ. Exercise caution when using new contracts and software. Never connect your wallet to any website you are not
        confident is secure. NFT Floor Market will never, ever ask for your personal details or private key.
      </p>

      <h1 id="about">About</h1>
      <p>
        NFT Floor Market is a fully on-chain market for setting "buy offers" of any NFT within a given contract. NFM only 
        works for ERC-721 tokens, and works best for collections where all of the tokens are of the same type - for example, 
        pfp projects like <a href="https://boredapeyachtclub.com/" target="_blank" rel="noreferrer">Bored Ape Yacht Club</a>.
      </p>

      <p>
        NFM exists to solve one problem: providing base liquidity across all NFTs within a collection. With NFM, buyers can
        provide a floor price they're willing to pay for <em>any</em> NFT within a given collection, and any seller is able
        to accept the offer in exchange for one of their NFTs from that collection.
      </p>

      <p>
        The seller receives all of the buyer's ETH, minus our 0.5% fees (to maintain & build newer versions of the contract, 
        UI, and pay for security audits & bounties), and any royalties recognized by the EIP2981-compliant 
        <a href="https://royaltyregistry.xyz/lookup" target="_blank" rel="noreferrer"> Royalty Registry</a>.
      </p>

      <p>
        The NFM smart contracts are designed to work forever, regardless of whether a user interface exists or not. There are
        no external dependencies, only a connection with a blockchain. You can build your own UI or integrate the marketplace
        within other smart contracts.
      </p>

      <h1 id="about">How It Works</h1>

      <p>
        Buyers put up ETH at a given price for any NFT within a contract. Sellers can view all open "buy offers" and choose 
        to accept any of them in exchange for one of their NFTs.
      </p>

      <p>
        If a buyer wishes to remove their buy offer and reclaim their ETH, they can do so at any time. No fees are applied to cancelling
        an offer. Offers can be removed from the Buy Offers page.
      </p>

      <p>
        The owner of the smart contract has no authority to withdraw ETH from the contract other than the fees accumulated from sales.
      </p>

      <h1 id="faq">Caution: Shared / Multiple Collection Contracts</h1>

      <p>
        Certain NFT contracts will have different types of NFTs, which have different floors within the same contract. Unless you
        are explicitly looking for the cheapest floor asset within a given contract, exercise significant caution when making offers
        on NFTs in these collections.
      </p>

      <p>
        Examples include:
      </p>

      <ul>
        <li>Plasma Bears - Parts and Bears have different floors. A bid would likely be fulfilled with a part.</li>
        <li>Neon District In-Game Item - Shells have different rarities. A bid would likely be fulfilled with a Common Shell.</li>
        <li>Neon District Founders Keys - Founders Keys have different rarities. A bid will likely be fulfilled with a User Key.</li>
      </ul>

      <p>
        Marketplaces also allow anyone to mint a token within a shared, collective contract. Anyone can fulfill a floor order for
        with any token within these contracts, including one made specifically to accept a floor offer. These include, but are not
        limited to:
      </p>

      <ul>
        <li>SuperRare</li>
        <li>Rarible</li>
        <li>OpenSea Shared Contract</li>
        <li>Foundation</li>
      </ul>


      <h1 id="faq">FAQ</h1>

      <h2>What are your Terms of Service?</h2>

      <p>
        See the <Link to="/terms-of-service">Terms of Service</Link> for all details.
      </p>

      <h2>What is the contract address?</h2>

      <p>
        The contract address for each network is as follows:
      </p>

      <ul>
        <li>Ethereum: <a href={"https://etherscan.io/address/" + contracts["v.0.0"]["address"]["1"]} target="_blank">{contracts["v.0.0"]["address"]["1"]}</a></li>
        <li>Ethereum Rinkeby Testnet: <a href={"https://rinkeby.etherscan.io/address/" + contracts["v.0.0"]["address"]["4"]} target="_blank">{contracts["v.0.0"]["address"]["4"]}</a></li>
        <li>Matic Mainnet: <a href={"https://polygonscan.com/address/" + contracts["v.0.0"]["address"]["137"]} target="_blank">{contracts["v.0.0"]["address"]["137"]}</a></li>
        <li>Matic Mumbai Testnet: <a href={"https://mumbai.polygonscan.com/address/" + contracts["v.0.0"]["address"]["80001"]} target="_blank">{contracts["v.0.0"]["address"]["80001"]}</a></li>
      </ul>

      <h2>Do you take fees?</h2>

      <p>
        Yes. Currently each sale results in a 0.5% fee, or 1/200th of the sale price.
      </p>

      <h2>Do you recognize NFT royalties?</h2>

      <p>
        Yes. The NFM smart contracts implement the&nbsp;
        <a href="https://royaltyregistry.xyz/lookup" target="_blank" rel="noreferrer">Royalty Registry</a> by Manifold.xyz.
      </p>

      <h2>What are "Verified Contracts"?</h2>

      <p>
        These contracts are pre-loaded, popular ERC-721 contracts for ease of access and use.
      </p>

      <h2>How can I add my contract to the "Verified Contracts" list?</h2>

      <p>
        I'm not trying to make a business out of gatekeeping contracts. You can share your market link
        with everyone in your community by providing them with the URL for the market page for your contract - the contract address
        is stored in the URL. If you still really feel that you want to be included in the "Verified Contracts", contact me via
        Twitter: <a href="https://twitter.com/cybourgeoisie" target="_blank">@cybourgeoisie</a>
      </p>

      <h2>Who built this?</h2>

      <p>
        It doesn't matter, it belongs to the Ether now. Its corporeal presence is maintained by <a href="https://twitter.com/cybourgeoisie" target="_blank">@cybourgeoisie</a>.
      </p>

      <h2>Why does this look like ass?</h2>

      <p>
        It's called a minimum viable product.
      </p>

    </div>
  );
}

export default About;
