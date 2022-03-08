import _getImageColors from 'get-image-colors';

export async function getImageColors(imgSrc) {
	return _getImageColors(imgSrc, { count: 4 }).then((imgColors) =>
		generateTetrisColors(imgColors)
	);
}

function generateTetrisColors(colors) {
	return colors.map((color) => {
		return [color.hex(), 'transparent'];
	});
}
