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
		// Connect to the provider
		this.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
		await this.runEvents('onConnect');
	}

	isConnected() {
		return !!this.provider;
	}

	async connectSigner() {
		// Connect to the provider
		if (!this.provider) {
			await this.connect();
		}

		// Prompt user for account connections
		this.provider.send("eth_requestAccounts", []);
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
		}

		return 'Unknown';
	}

	async getChainId() {
		if (!this.provider) {
			console.debug("Provider not configured.");
			return 'Not Connected';
		}

		let network = await this.provider.getNetwork();
		return network.chainId;
	}


	/**
	 * Contract Interactions
	 **/
	async getContractName(addr, callback) {
		try {
			let contract = new ethers.Contract(addr, contracts['erc721'].abi, this.provider);
			let name = await contract.name();
			callback(name);
		} catch (ex) {
			console.error("Error in getContractName:", ex);
		}

		return false;
	}

	async getMarketOrders(addr, callback) {
		let offers = [];

		try {
			let chainId = await this.getChainId();

			let contract = new ethers.Contract(
				contracts[this.MARKET_VERSION].address[String(chainId)],
				contracts[this.MARKET_VERSION].abi,
				this.provider
			);

			// Get the number of offers
			let length = await contract.getOffersByContractCount(addr);

			let limitSize = 5;
			for (let offsetIdx = 0; offsetIdx < length; offsetIdx+=limitSize) {
				let res = await contract.getOffersByContract(addr, limitSize, Math.ceil(offsetIdx / limitSize));

				for (let idx = 0; idx < res.length && res[idx]._value.toString() != 0; idx++) {
					offers.push({
						'offerer' : res[idx]._offerer,
						'value' : parseFloat(ethers.utils.formatEther(res[idx]._value))
					});
				}
			}

			// Now sort all orders
			offers.sort(this.sortValue);
		} catch (ex) {
			console.error("Error in getMarketOrders:", ex);
		}

		callback(offers);
	}

	async getBuyerOrders(addr, callback) {
		let offers = [];

		try {
			let chainId = await this.getChainId();

			let contract = new ethers.Contract(
				contracts[this.MARKET_VERSION].address[String(chainId)],
				contracts[this.MARKET_VERSION].abi,
				this.provider
			);

			// Get the number of offers
			let length = await contract.getOffersByOffererCount(addr);

			let limitSize = 5;
			for (let offsetIdx = 0; offsetIdx < length; offsetIdx+=limitSize) {
				let res = await contract.getOffersByOfferer(addr, limitSize, Math.ceil(offsetIdx / limitSize));

				for (let idx = 0; idx < res.length && res[idx]._value.toString() != 0; idx++) {
					offers.push({
						'offerId' : res[idx]._offerId,
						'contract' : res[idx]._contract,
						'offerer' : res[idx]._offerer,
						'value' : parseFloat(ethers.utils.formatEther(res[idx]._value))
					});
				}
			}

			// Now sort all orders
			offers.sort(this.sortValue);
		} catch (ex) {
			console.error("Error in getMarketOrders:", ex);
		}

		callback(offers);
	}

	sortValue(a, b) {
		if (a.value > b.value) {
			return 1;
		} else if (a.value < b.value) {
			return -1;
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
