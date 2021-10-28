import { useState } from 'react';

import './WalletConnect.css';
import EvmWrapper from '../../classes/EvmWrapper.js';

function WalletConnect() {
	const [walletAddress, setWalletAddress] = useState();
	const [networkName, setNetworkName] = useState();
	const [attemptedConnection, setAttemptedConnection] = useState(false);

	async function handleConnection() {
		await EvmWrapper.connectSigner();

		let _walletAddress = await EvmWrapper.getSignerAddress();
		setWalletAddress(_walletAddress);

		let _networkName = await EvmWrapper.getNetworkName();
		setNetworkName(_networkName);
	}

	if (!attemptedConnection) {
		(async () => {
			EvmWrapper.connect();

			let _networkName = await EvmWrapper.getNetworkName();
			if (_networkName !== 'Not Connected') {
				setNetworkName(_networkName);
			}

			setAttemptedConnection(true);
		})();
	}

	function renderConnection() {
		if (walletAddress) {
			return (
				<div className="wallet-connect">
					Address: {walletAddress.slice(0, 6) + '...' + walletAddress.substr(walletAddress.length - 4)} <br />
					Connected to {networkName}
				</div>
			);
		} else {
			return (
				<div className="wallet-connect">
					<button onClick={handleConnection} className="connect-button">
						Connect Wallet
					</button>
					{networkName ? (
						<div>Connected to {networkName}</div>
					) : (
						<div>No Web3 Provider Detected</div>
					)}
				</div>
			);
		}
	}

	return (
		<div>
			{renderConnection()}
		</div>
	);
}

export default WalletConnect;
