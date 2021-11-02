import "@ethersproject/shims"
import { ethers } from "ethers";
import contracts from '../config/contracts.js';

class EvmWrapper {
	constructor() {
		this.provider = null;
		this.signer = null;
		this.events = {
			'onConnect' : {},
			'onConnectSigner' : {}
		};

		this.MARKET_VERSION = 'v.0.0';
	}

	async connect() {
		if (!window.ethereum) {
			console.log("window.ethereum not provided");
			return;
		}

		// Connect to the provider
		this.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
		await this.runEvents('onConnect');
	}

	isConnected() {
		return !!this.provider;
	}

	isSignedIn() {
		return !!this.signer;
	}

	async connectSigner() {
		// Connect to the provider
		if (!this.provider) {
			await this.connect();
			if (!this.provider) {
				console.log("Provider not available")
				return;
			}
		}

		// Prompt user for account connections
		await this.provider.send("eth_requestAccounts", []);
		this.signer = this.provider.getSigner();

		await this.runEvents('onConnectSigner');
	}

	async getSignerAddress() {
		if (!this.signer) {
			console.debug("Signer not configured.");
			return;
		}

		return this.signer.getAddress();
	}

	async getNetworkName() {
		if (!this.provider) {
			console.debug("Provider not configured.");
			return 'Not Connected';
		}

		let network = await this.provider.getNetwork();

		switch (network.chainId) {
			case 1:
				return 'Ethereum';
			case 4:
				return 'Rinkeby';
			case 5:
				return 'Goerli';
			case 137:
				return 'Matic';
			case 80001:
				return 'Mumbai';
			case 1337:
			case 31337:
				return 'Hardhat';
			default:
				return 'Unknown'
		}
	}

	async getChainId() {
		if (!this.provider) {
			console.debug("Provider not configured.");
			return false;
		}

		let network = await this.provider.getNetwork();
		return network.chainId;
	}

	async getCurrencyAbbr() {
		let chainId = await this.getChainId();

		switch (chainId) {
			case 1:
			case 4:
			case 5:
			case 1337:
			case 31337:
				return 'ETH';
			case 137:
			case 80001:
				return 'MATIC';
			default:
				return 'Unknown'
		}
	}


	/**
	 * Contract Interactions
	 **/

	async validateNftContract(addr, callback) {
		if (!addr || addr.length !== 42) {
			callback(false, 'Invalid Address Format');
			return;
		}

		try {
			let contract = new ethers.Contract(addr, contracts['erc721'].abi, this.provider);
			let supportsERC721 = await contract.supportsInterface('0x80ac58cd');
			callback(supportsERC721, supportsERC721 ? null : 'Not an ERC-721 contract');
			return;
		} catch (ex) {
			console.log("Error in validateNftContract:", ex);
		}

		callback(false, 'Not an ERC-721 contract');
	}

	async checkOwnerOfNft(addr, nftId, callback) {
		try {
			if (!this.signer) {
				console.log("Not signed in");
				callback(false, 'Not signed in.');
				return;
			}

			let signerAddress = await this.getSignerAddress();

			let contract = new ethers.Contract(addr, contracts['erc721'].abi, this.provider);
			let address = await contract.ownerOf(nftId);
			let success = address && signerAddress && address.toLowerCase() === signerAddress.toLowerCase() && signerAddress.length === 42;
			callback(success, success ? null : `Not owner of NFT. Owner is ${address}, logged in as ${signerAddress}.`);
			return;
		} catch (ex) {
			console.log("Error in checkOwnerOfNft:", ex);
		}

		// Edge-case: something goes wrong
		callback(true, null);
	}

	async getContractName(addr, callback) {
		let name;
		try {
			let contract = new ethers.Contract(addr, contracts['erc721'].abi, this.provider);
			name = await contract.name();
			callback(name);
		} catch (ex) {
			console.log("Error in getContractName:", ex);
		}

		return name;
	}

	async getOwnedNfts(addr, callback) {
		try {
			if (!this.signer) {
				callback(false, 'Not signed in.');
				return;
			}

			let signerAddress = await this.getSignerAddress();

			let contract = new ethers.Contract(addr, contracts['erc721'].abi, this.provider);
			let balance = await contract.balanceOf(signerAddress);

			if (balance) {
				balance = balance.toNumber();
			} else {
				balance = 0;
			}

			let nfts = [];
			try {
				for (let idx = 0; idx < balance; idx++) {
					let tokenId = await contract.tokenOfOwnerByIndex(signerAddress, idx);
					if (tokenId) {
						nfts.push(tokenId.toString());
					}
				}
			} catch (ex) {
				console.log("Unable to get tokens by index");
			}

			callback({balance, nfts});
			return;
		} catch (ex) {
			console.log("Error in getContractName:", ex);
		}

		callback({balance: 0, nfts: []});
	}

	async makeOffer(addr, value, callback) {
		if (!this.signer) {
			console.log("Not signed in");
			return;
		}

		try {
			let chainId = await this.getChainId();

			let contract = new ethers.Contract(
				contracts[this.MARKET_VERSION].address[String(chainId)],
				contracts[this.MARKET_VERSION].abi,
				this.signer
			);

			// Get the number of offers
			callback(await contract.makeOffer(addr, {
				value : ethers.utils.parseEther(value).toHexString()
			}));
		} catch (ex) {
			console.log("Error in makeOffer:", ex);
		}

		//callback(offers);
	}

	async withdrawOffer(offerId, callback) {
		if (!this.signer) {
			console.log("Not signed in");
			return;
		}

		try {
			let chainId = await this.getChainId();

			let contract = new ethers.Contract(
				contracts[this.MARKET_VERSION].address[String(chainId)],
				contracts[this.MARKET_VERSION].abi,
				this.signer
			);

			// Get the number of offers
			callback(await contract.withdrawOffer(offerId));
		} catch (ex) {
			console.log("Error in withdrawOffer:", ex);
		}
	}

	async approveTransfer(addr, nftId, callback) {
		if (!this.signer) {
			console.log("Not signed in");
			return;
		}

		try {
			let chainId = await this.getChainId();

			let marketContractAddress = contracts[this.MARKET_VERSION].address[String(chainId)];

			let contract = new ethers.Contract(
				addr,
				contracts['erc721'].abi,
				this.signer
			);

			// Check if approval is already granted
			let approvalFor = await contract.getApproved(nftId);
			if (approvalFor && approvalFor.toLowerCase() === marketContractAddress.toLowerCase()) {
				callback(true);
				return;
			}

			// Get the number of offers
			callback(await contract.approve(marketContractAddress, nftId));
		} catch (ex) {
			console.log("Error in approveTransfer:", ex);
		}
	}

	async takeOffer(offerId, nftId, callback) {
		if (!this.signer) {
			console.log("Not signed in");
			return;
		}

		try {
			let chainId = await this.getChainId();

			let contract = new ethers.Contract(
				contracts[this.MARKET_VERSION].address[String(chainId)],
				contracts[this.MARKET_VERSION].abi,
				this.signer
			);

			// Get the number of offers
			callback(await contract.takeOffer(offerId, nftId));
		} catch (ex) {
			console.log("Error in takeOffer:", ex);
		}
	}

	async getMarketOffers(addr, callback) {
		let offers = [];

		try {
			let chainId = await this.getChainId();

			let contract = new ethers.Contract(
				contracts[this.MARKET_VERSION].address[String(chainId)],
				contracts[this.MARKET_VERSION].abi,
				this.provider
			);

			// Get the number of offers
			let length = (await contract.getOffersByContractCount(addr)).toNumber();

			let limitSize = 5;
			for (let offsetIdx = 0; offsetIdx < length; offsetIdx+=limitSize) {
				let res = await contract.getOffersByContract(addr, limitSize, Math.ceil(offsetIdx / limitSize));

				for (let idx = 0; idx < res.length && parseInt(res[idx]._value.toString(), 10) !== 0; idx++) {
					offers.push({
						'offerId' : res[idx]._offerId.toString(),
						'offerer' : res[idx]._offerer,
						'value' : parseFloat(ethers.utils.formatEther(res[idx]._value))
					});
				}
			}

			// Now sort all offers
			offers.sort(this.sortValue);
		} catch (ex) {
			console.log("Error in getMarketOffers:", ex);
		}

		callback(offers);
	}

	async getBuyerOffers(addr, callback) {
		let offers = [];

		try {
			let chainId = await this.getChainId();

			let contract = new ethers.Contract(
				contracts[this.MARKET_VERSION].address[String(chainId)],
				contracts[this.MARKET_VERSION].abi,
				this.provider
			);

			// Get the number of offers
			let length = (await contract.getOffersByOffererCount(addr)).toNumber();

			let limitSize = 5;
			for (let offsetIdx = 0; offsetIdx < length; offsetIdx+=limitSize) {
				let res = await contract.getOffersByOfferer(addr, limitSize, Math.ceil(offsetIdx / limitSize));

				for (let idx = 0; idx < res.length && parseInt(res[idx]._value.toString(), 10) !== 0; idx++) {
					offers.push({
						'offerId' : res[idx]._offerId.toString(),
						'contract' : res[idx]._contract,
						'offerer' : res[idx]._offerer,
						'value' : parseFloat(ethers.utils.formatEther(res[idx]._value))
					});
				}
			}

			// Now sort all offers
			offers.sort(this.sortValue);
		} catch (ex) {
			console.log("Error in getBuyerOffers:", ex);
		}

		callback(offers);
	}

	async getActivity(callback) {
		let activity = [];

		try {
			let chainId = await this.getChainId();

			let contract = new ethers.Contract(
				contracts[this.MARKET_VERSION].address[String(chainId)],
				contracts[this.MARKET_VERSION].abi,
				this.provider
			);

			let abiInterface = new ethers.utils.Interface(contracts[this.MARKET_VERSION].abi);

			// Get all recent events
			let logs = await contract.queryFilter(
				{
					address: contracts[this.MARKET_VERSION].address[String(chainId)],
					topics: []
				},
				// Get the last 50k blocks, about 1 week on ETH, much less on Polygon
				parseInt(await this.provider.getBlockNumber(), 10) - 50000,
				"latest"
			);

			// Remove all logs that aren't events we care about
			logs = logs.filter(log => log.event === "OfferAccepted" || log.event === "OfferPlaced" || log.event === "OfferWithdrawn");

			// Now sort all logs
			logs.sort(this.sortBlockNumber);

			// Only get the last N activity items
			logs = logs.slice(0, 10);

			// Organize
			for (let log of logs) {
				let event = abiInterface.parseLog(log);

				activity.push({
					"blockNumber" : parseInt(log.blockNumber, 10),
					"time"        : (new Date((await log.getBlock()).timestamp * 1000)).toLocaleString(),
					//"getTime"     : async () => { try { return new Date((await log.getBlock()).timestamp * 1000); } catch (ex) { return; } },
					"event"       : event.name,
					"offerId"     : event.args._offerId.toString(),
					"contract"    : event.args._contract,
					"offerer"     : event.args._offerer,
					"value"       : ethers.utils.formatEther(event.args._value).toString(),
					"seller"      : event.args._seller,
					"tokenId"     : event.args._tokenId ? event.args._tokenId.toString() : ""
				});
			}
		} catch (ex) {
			console.log("Error in getActivity:", ex);
		}

		// For each contract in the logs, get the name if possible
		let contractToName = {};
		for (let item of activity) {
			if (contractToName.hasOwnProperty(item.contract)) {
				item.contractName = contractToName[item.contract];
			} else {
				item.contractName = await this.getContractName(item.contract, () => {});
				contractToName[item.contract] = item.contractName;
			}
		}

		callback(activity);
	}

	sortValue(a, b) {
		if (a.value > b.value) {
			return -1;
		} else if (a.value < b.value) {
			return 1;
		} else {
			return 0;
		}
	}

	sortBlockNumber(a, b) {
		if (a.blockNumber > b.blockNumber) {
			return -1;
		} else if (a.blockNumber < b.blockNumber) {
			return 1;
		} else {
			return 0;
		}
	}


	/**
	 * Events
	 **/

	async onConnect(identifier, callback) {
		this.events['onConnect'][identifier] = callback;

		// Run it
		if (!!this.provider) {
			await callback();
		}
	}

	async onConnectSigner(identifier, callback) {
		this.events['onConnectSigner'][identifier] = callback;

		// Run it
		if (!!this.signer) {
			await callback();
		}
	}

	async runEvents(type) {
		for (let identifier in this.events[type]) {
			if (this.events[type].hasOwnProperty(identifier)) {
				await this.events[type][identifier]();
			}
		}
	}

	async removeEvents(identifier) {
		for (let type in this.events) {
			for (let identifier in this.events[type]) {
				if (this.events[type].hasOwnProperty(identifier)) {
					delete this.events[type][identifier];
				}
			}
		}
	}
}

if (!window.EvmWrapper) {
	window.EvmWrapper = new EvmWrapper();
}

export default window.EvmWrapper;
