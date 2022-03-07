import React from 'react';
import cn from 'bem-cn-lite';
import PageRouter from './pages/PageRouter/PageRouter';
import { Buffer } from 'buffer';

import '@fontsource/press-start-2p';
import './App.scss';

const b = cn('App');

window.Buffer = window.Buffer || Buffer;

function App() {
	return (
		<div className={b()}>
			<PageRouter />
		</div>
	);
}

export default App;
