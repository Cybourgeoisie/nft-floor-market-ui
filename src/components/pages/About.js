import './About.css';

function About() {
  return (
    <div className="about-page">
      <h1 id="about">About</h1>
      <p>
        NFT Floor Market is a fully on-chain market for setting "buy orders" of any NFT within a given contract. NFM only 
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
        no external dependencies. It is eternal. You can build your own UI or integrate the marketplace within other smart contracts.
      </p>

      <h1 id="about">How It Works</h1>

      <p>
        Buyers put up a ETH at a given price for any NFT within a contract. Sellers can view all open "buy orders" and choose 
        to accept any of them in exchange for one of their NFTs.
      </p>

      <p>
        If a buyer wishes to remove their order and reclaim their ETH, they can do so at any time. No fees are applied to cancelling
        an order.
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

      <h2>Why does this look like ass?</h2>

      <p>
        It's called a minimum viable product.
      </p>


    </div>
  );
}

export default About;
