import { FIGURES } from '../constants';
import _getImageColors from 'get-image-colors';

export async function getImageColors(imgSrc) {
	return _getImageColors(imgSrc, { count: 4 }).then((imgColors) =>
		generateTetrisColors(imgColors)
	);
}

function generateTetrisColors(colors) {
	let index = 0;

	return FIGURES.reduce((acc, figureName) => {
		const color = colors[index++].hex();
		acc[figureName] = [color, 'transparent'];

		if (index === colors.length) {
			index = 0;
		}

		return acc;
	}, {});
}
