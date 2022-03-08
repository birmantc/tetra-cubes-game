import React, { useState, useEffect, useCallback } from 'react';
import cn from 'bem-cn-lite';
import PropTypes from 'prop-types';

import Tetris from '../../components/Tetris';

import { CHOOSE_CUBE_PAGE } from '../../constants';
import { getImageColors } from '../../utils/colors';

import './GamePage.scss';

const b = cn('game-page');

GamePage.propTypes = {
	cube: PropTypes.objectOf({
		src: PropTypes.string,
		name: PropTypes.string,
	}),
	onChangePage: PropTypes.func,
	onChangeLoading: PropTypes.func,
};

export default function GamePage(props) {
	const { cube, onChangePage, onChangeLoading } = props;
	const [colors, setColors] = useState([]);

	const onChangeCube = useCallback(() => {
		onChangePage(CHOOSE_CUBE_PAGE);
	}, [onChangePage]);

	useEffect(() => {
		if (!cube || !cube.src) {
			return;
		}

		getImageColors(cube.src)
			.then((colors) => {
				onChangeLoading(false);
				setColors(colors);
			})
			.catch((e) => {
				console.error(e);
			});
	}, [cube, onChangeLoading]);

	return (
		<div className={b()}>
			<Tetris cube={cube} colors={colors} onChangeCube={onChangeCube} />
		</div>
	);
}
