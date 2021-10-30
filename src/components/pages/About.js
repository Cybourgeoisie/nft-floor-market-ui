import './About.css';

function About() {
  return (
    <div className="about-page">
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

      <h1 id="faq">FAQ</h1>

      <h2>What is the contract address?</h2>

      <p>
        The contract address for each network is as follows:
      </p>

      <ul>
        <li>Ethereum: TBD</li>
        <li>Rinkeby: TBD</li>
        <li>Goerli: TBD</li>
        <li>Matic Mainnet: TBD</li>
        <li>Matic Testnet: TBD</li>
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
        Twitter: @cybourgeoisie
      </p>

      <h2>Who built this?</h2>

      <p>
        It doesn't matter, it belongs to the Ether now. Its corporeal presence is maintained by @cybourgeoisie.
      </p>

      <h2>Why does this look like ass?</h2>

      <p>
        It's called a minimum viable product.
      </p>


    </div>
  );
}

export default About;
