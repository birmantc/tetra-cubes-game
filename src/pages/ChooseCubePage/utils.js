import { getParsedNftAccountsByOwner } from '@nfteyez/sol-rayz';
import axios from 'axios';

export const getCubesNft = async ({ connection, publicKey }) => {
	try {
		const nftData = await getParsedNftAccountsByOwner({
			publicAddress: publicKey,
			connection,
			serialization: true,
		});

		const nftTokens = Object.keys(nftData).map((key) => {
			return nftData[key];
		});

		const cubesTokens = nftTokens.filter((token) => {
			const {
				data: { name },
			} = token;

			return name.includes('Tetra Cubes');
		});

		return Promise.all(
			cubesTokens.map(async (token) => {
				const {
					data: { name, uri },
				} = token;
				const preparedName = name.replace('Tetra Cubes', '').trim();
				const {
					data: { image },
				} = await axios.get(uri);

				return { name: preparedName, src: image };
			})
		);
	} catch (e) {
		console.log(e);
		return [];
	}
};
