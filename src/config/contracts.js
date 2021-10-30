function contracts() {
	return {
		"erc721" : {
			"abi" : [
				{
					"inputs": [
						{
							"internalType": "string",
							"name": "name",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "symbol",
							"type": "string"
						}
					],
					"stateMutability": "nonpayable",
					"type": "constructor"
				},
				{
					"anonymous": false,
					"inputs": [
						{
							"indexed": true,
							"internalType": "address",
							"name": "owner",
							"type": "address"
						},
						{
							"indexed": true,
							"internalType": "address",
							"name": "approved",
							"type": "address"
						},
						{
							"indexed": true,
							"internalType": "uint256",
							"name": "tokenId",
							"type": "uint256"
						}
					],
					"name": "Approval",
					"type": "event"
				},
				{
					"anonymous": false,
					"inputs": [
						{
							"indexed": true,
							"internalType": "address",
							"name": "owner",
							"type": "address"
						},
						{
							"indexed": true,
							"internalType": "address",
							"name": "operator",
							"type": "address"
						},
						{
							"indexed": false,
							"internalType": "bool",
							"name": "approved",
							"type": "bool"
						}
					],
					"name": "ApprovalForAll",
					"type": "event"
				},
				{
					"anonymous": false,
					"inputs": [
						{
							"indexed": true,
							"internalType": "address",
							"name": "from",
							"type": "address"
						},
						{
							"indexed": true,
							"internalType": "address",
							"name": "to",
							"type": "address"
						},
						{
							"indexed": true,
							"internalType": "uint256",
							"name": "tokenId",
							"type": "uint256"
						}
					],
					"name": "Transfer",
					"type": "event"
				},
				{
					"inputs": [
						{
							"internalType": "bytes4",
							"name": "interfaceId",
							"type": "bytes4"
						}
					],
					"name": "supportsInterface",
					"outputs": [
						{
							"internalType": "bool",
							"name": "",
							"type": "bool"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "owner",
							"type": "address"
						}
					],
					"name": "balanceOf",
					"outputs": [
						{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "uint256",
							"name": "tokenId",
							"type": "uint256"
						}
					],
					"name": "ownerOf",
					"outputs": [
						{
							"internalType": "address",
							"name": "",
							"type": "address"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "name",
					"outputs": [
						{
							"internalType": "string",
							"name": "",
							"type": "string"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "symbol",
					"outputs": [
						{
							"internalType": "string",
							"name": "",
							"type": "string"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "uint256",
							"name": "tokenId",
							"type": "uint256"
						}
					],
					"name": "tokenURI",
					"outputs": [
						{
							"internalType": "string",
							"name": "",
							"type": "string"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "baseURI",
					"outputs": [
						{
							"internalType": "string",
							"name": "",
							"type": "string"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "owner",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "index",
							"type": "uint256"
						}
					],
					"name": "tokenOfOwnerByIndex",
					"outputs": [
						{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "totalSupply",
					"outputs": [
						{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "uint256",
							"name": "index",
							"type": "uint256"
						}
					],
					"name": "tokenByIndex",
					"outputs": [
						{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "to",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "tokenId",
							"type": "uint256"
						}
					],
					"name": "approve",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "uint256",
							"name": "tokenId",
							"type": "uint256"
						}
					],
					"name": "getApproved",
					"outputs": [
						{
							"internalType": "address",
							"name": "",
							"type": "address"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "operator",
							"type": "address"
						},
						{
							"internalType": "bool",
							"name": "approved",
							"type": "bool"
						}
					],
					"name": "setApprovalForAll",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "owner",
							"type": "address"
						},
						{
							"internalType": "address",
							"name": "operator",
							"type": "address"
						}
					],
					"name": "isApprovedForAll",
					"outputs": [
						{
							"internalType": "bool",
							"name": "",
							"type": "bool"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "from",
							"type": "address"
						},
						{
							"internalType": "address",
							"name": "to",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "tokenId",
							"type": "uint256"
						}
					],
					"name": "transferFrom",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "from",
							"type": "address"
						},
						{
							"internalType": "address",
							"name": "to",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "tokenId",
							"type": "uint256"
						}
					],
					"name": "safeTransferFrom",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "from",
							"type": "address"
						},
						{
							"internalType": "address",
							"name": "to",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "tokenId",
							"type": "uint256"
						},
						{
							"internalType": "bytes",
							"name": "_data",
							"type": "bytes"
						}
					],
					"name": "safeTransferFrom",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				}
			]
		},
		"v.0.0" : {
			"address" : {
				"1"     : '0x0000000000000000000000000000000000000000',
				"4"     : '0x0000000000000000000000000000000000000000',
				"5"     : '0x0000000000000000000000000000000000000000',
				"137"   : '0x0000000000000000000000000000000000000000',
				"80001" : '0x0000000000000000000000000000000000000000',
				"1337"  : '0xc0F115A19107322cFBf1cDBC7ea011C19EbDB4F8',
				"31337" : '0xc0F115A19107322cFBf1cDBC7ea011C19EbDB4F8'
			},
			"abi" : [
				{
					"anonymous": false,
					"inputs": [
						{
							"indexed": false,
							"internalType": "uint256",
							"name": "_offerId",
							"type": "uint256"
						},
						{
							"indexed": true,
							"internalType": "address",
							"name": "_contract",
							"type": "address"
						},
						{
							"indexed": false,
							"internalType": "address",
							"name": "_offerer",
							"type": "address"
						},
						{
							"indexed": false,
							"internalType": "address",
							"name": "_seller",
							"type": "address"
						},
						{
							"indexed": false,
							"internalType": "uint256",
							"name": "_tokenId",
							"type": "uint256"
						},
						{
							"indexed": false,
							"internalType": "uint256",
							"name": "_value",
							"type": "uint256"
						}
					],
					"name": "OfferAccepted",
					"type": "event"
				},
				{
					"anonymous": false,
					"inputs": [
						{
							"indexed": false,
							"internalType": "uint256",
							"name": "_offerId",
							"type": "uint256"
						},
						{
							"indexed": true,
							"internalType": "address",
							"name": "_contract",
							"type": "address"
						},
						{
							"indexed": false,
							"internalType": "address",
							"name": "_offerer",
							"type": "address"
						},
						{
							"indexed": false,
							"internalType": "uint256",
							"name": "_value",
							"type": "uint256"
						}
					],
					"name": "OfferPlaced",
					"type": "event"
				},
				{
					"anonymous": false,
					"inputs": [
						{
							"indexed": false,
							"internalType": "uint256",
							"name": "_offerId",
							"type": "uint256"
						},
						{
							"indexed": true,
							"internalType": "address",
							"name": "_contract",
							"type": "address"
						},
						{
							"indexed": false,
							"internalType": "address",
							"name": "_offerer",
							"type": "address"
						},
						{
							"indexed": false,
							"internalType": "uint256",
							"name": "_value",
							"type": "uint256"
						}
					],
					"name": "OfferWithdrawn",
					"type": "event"
				},
				{
					"anonymous": false,
					"inputs": [
						{
							"indexed": true,
							"internalType": "address",
							"name": "previousOwner",
							"type": "address"
						},
						{
							"indexed": true,
							"internalType": "address",
							"name": "newOwner",
							"type": "address"
						}
					],
					"name": "OwnershipTransferred",
					"type": "event"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "_contract",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "_limit",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "_offset",
							"type": "uint256"
						}
					],
					"name": "getOffersByContract",
					"outputs": [
						{
							"components": [
								{
									"internalType": "uint256",
									"name": "_offerId",
									"type": "uint256"
								},
								{
									"internalType": "address",
									"name": "_contract",
									"type": "address"
								},
								{
									"internalType": "address",
									"name": "_offerer",
									"type": "address"
								},
								{
									"internalType": "uint256",
									"name": "_value",
									"type": "uint256"
								}
							],
							"internalType": "struct NFTFloorMarket.OfferDetails[]",
							"name": "_offers",
							"type": "tuple[]"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "_contract",
							"type": "address"
						}
					],
					"name": "getOffersByContractCount",
					"outputs": [
						{
							"internalType": "uint256",
							"name": "_length",
							"type": "uint256"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "_offerer",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "_limit",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "_offset",
							"type": "uint256"
						}
					],
					"name": "getOffersByOfferer",
					"outputs": [
						{
							"components": [
								{
									"internalType": "uint256",
									"name": "_offerId",
									"type": "uint256"
								},
								{
									"internalType": "address",
									"name": "_contract",
									"type": "address"
								},
								{
									"internalType": "address",
									"name": "_offerer",
									"type": "address"
								},
								{
									"internalType": "uint256",
									"name": "_value",
									"type": "uint256"
								}
							],
							"internalType": "struct NFTFloorMarket.OfferDetails[]",
							"name": "_offers",
							"type": "tuple[]"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "_offerer",
							"type": "address"
						}
					],
					"name": "getOffersByOffererCount",
					"outputs": [
						{
							"internalType": "uint256",
							"name": "_length",
							"type": "uint256"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "lastOfferId",
					"outputs": [
						{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "_contract",
							"type": "address"
						}
					],
					"name": "makeOffer",
					"outputs": [],
					"stateMutability": "payable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}
					],
					"name": "offers",
					"outputs": [
						{
							"internalType": "address",
							"name": "_contract",
							"type": "address"
						},
						{
							"internalType": "address",
							"name": "_offerer",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "_value",
							"type": "uint256"
						},
						{
							"internalType": "uint128",
							"name": "_contractListIndex",
							"type": "uint128"
						},
						{
							"internalType": "uint128",
							"name": "_offererListIndex",
							"type": "uint128"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}
					],
					"name": "offersByContract",
					"outputs": [
						{
							"internalType": "uint128",
							"name": "",
							"type": "uint128"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}
					],
					"name": "offersByOfferer",
					"outputs": [
						{
							"internalType": "uint128",
							"name": "",
							"type": "uint128"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "owner",
					"outputs": [
						{
							"internalType": "address",
							"name": "",
							"type": "address"
						}
					],
					"stateMutability": "view",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "renounceOwnership",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "uint256",
							"name": "_offerId",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "_tokenId",
							"type": "uint256"
						}
					],
					"name": "takeOffer",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "newOwner",
							"type": "address"
						}
					],
					"name": "transferOwnership",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "withdrawMarketFees",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "uint256",
							"name": "_offerId",
							"type": "uint256"
						}
					],
					"name": "withdrawOffer",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"stateMutability": "payable",
					"type": "receive"
				}
			]
		}
	};
}

export default contracts();
