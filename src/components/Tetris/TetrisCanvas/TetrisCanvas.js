import React from 'react';
import PropTypes from 'prop-types';

TetrisCanvas.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
};

export default function TetrisCanvas(props) {
	const { width = 640, height = 600 } = props;

	return <canvas id='canvas' width={width} height={height} />;
}
