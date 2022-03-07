import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import cn from 'bem-cn-lite';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import { getCubesNft } from './utils';
import testGen0Img from '../../images/gen0.png';

import './ChooseCubePage.scss';

const b = cn('choose-cube-page');

const TEST_CUBES = [{ src: testGen0Img, name: 'Gen 0' }];

Cube.propTypes = {
	src: PropTypes.string,
	name: PropTypes.string,
	onClick: PropTypes.func,
};

export function Cube(props) {
	const { src, name, onClick } = props;
	const isAction = Boolean(onClick);

	return (
		<div className={b('cube', { action: isAction })} onClick={onClick}>
			<img className={b('cube-img')} src={src} alt='cube' />
			<span>{name}</span>
		</div>
	);
}

Cubes.propTypes = {
	cubes: PropTypes.arrayOf(
		PropTypes.objectOf({
			src: PropTypes.string,
			name: PropTypes.string,
		})
	),
	onClick: PropTypes.func,
};

function Cubes(props) {
	const { cubes = [], onClick } = props;

	useEffect(() => {}, []);

	return (
		<div className={b('cubes')}>
			<Row xs='auto' md='auto' lg='auto'>
				{_.map(cubes, (cube) => {
					const { src, name } = cube;

					return (
						<Col>
							<Cube
								key={name}
								src={src}
								name={name}
								onClick={() => onClick(cube)}
							/>
						</Col>
					);
				})}
			</Row>
		</div>
	);
}

ChooseCubePage.propTypes = {
	onChangeLoading: PropTypes.func,
};

export default function ChooseCubePage(props) {
	const { onChangeLoading } = props;
	const [cubes, setCubes] = useState([]);
	const { connection } = useConnection();
	const { publicKey } = useWallet();

	useEffect(() => {
		getCubesNft({ connection, publicKey }).then((nftCubes) => {
			onChangeLoading(false);
			setCubes(nftCubes);
		});
	}, [onChangeLoading, publicKey, connection]);

	return (
		<div className={b()}>
			<h4 className={b('section')}>
				The tetris game will be colored
				<br /> by chosen cube
			</h4>
			<div className={b('section')}>
				<h5 className={b('subtitle')}>
					My cubes
					<span className='text-secondary'>({cubes.length})</span>
				</h5>
				{!cubes.length && (
					<span className='text-secondary'>
						Connect a wallet to get information about your cubes
					</span>
				)}
				<Cubes {...props} cubes={cubes} />
			</div>
			{!cubes.length && (
				<div className={b('section')}>
					<h5 className={b('subtitle')}>
						Common cubes
						<span className='text-secondary'>({TEST_CUBES.length})</span>
					</h5>
					<span className='text-secondary'>
						You can play without even being the holder
					</span>
					<Cubes {...props} cubes={TEST_CUBES} />
				</div>
			)}
		</div>
	);
}
