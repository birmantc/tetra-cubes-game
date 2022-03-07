import React, { useMemo, useState } from 'react';
import { Spinner, Container, Row } from 'react-bootstrap';
import {
	ConnectionProvider,
	WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
	LedgerWalletAdapter,
	PhantomWalletAdapter,
	SlopeWalletAdapter,
	SolflareWalletAdapter,
	SolletExtensionWalletAdapter,
	SolletWalletAdapter,
	TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';

import GamePage from '../GamePage/GamePage';
import ChooseCubePage from '../ChooseCubePage/ChooseCubePage';

import { Wallet } from '../../components/Wallet/Wallet';
import Header from '../../components/Header/Header';

import { CHOOSE_CUBE_PAGE, GAME_PAGE } from '../../constants';
import { clusterApiUrl } from '@solana/web3.js';

export default function PageRouter() {
	const [page, onChangePage] = useState(null);
	const [loading, onChangeLoading] = useState(false);
	const [cube, setCube] = useState(null);

	// The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
	const network = WalletAdapterNetwork.Mainnet;

	// You can also provide a custom RPC endpoint.
	const endpoint = useMemo(() => clusterApiUrl(network), [network]);

	const wallets = useMemo(
		() => [
			new PhantomWalletAdapter(),
			new SlopeWalletAdapter(),
			new SolflareWalletAdapter({ network }),
			new TorusWalletAdapter(),
			new LedgerWalletAdapter(),
			new SolletWalletAdapter({ network }),
			new SolletExtensionWalletAdapter({ network }),
		],
		[network]
	);

	if (loading) {
		return (
			<div className='loader-wrapper'>
				<Spinner animation='border' role='status' />
			</div>
		);
	}

	let Page, data;
	switch (page) {
	case GAME_PAGE:
		Page = GamePage;
		data = {
			cube,
		};
		break;
	case CHOOSE_CUBE_PAGE:
	default:
		Page = ChooseCubePage;
		data = {
			onClick: (cube) => {
				setCube(cube);
				onChangePage(GAME_PAGE);
			},
		};
		break;
	}

	return (
		<Container>
			<ConnectionProvider endpoint={endpoint}>
				<WalletProvider wallets={wallets} autoConnect>
					<Header>
						<Wallet />
					</Header>
					<Row>
						<Page
							onChangePage={onChangePage}
							onChangeLoading={onChangeLoading}
							{...data}
						/>
					</Row>
				</WalletProvider>
			</ConnectionProvider>
		</Container>
	);
}
