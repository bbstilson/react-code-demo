import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import finalCreateStore from './store/store';
import CodeDemo from './components/CodeDemo';
import rootReducer from './reducers/reducers';

const repo = ''; // Github repo link
const path = ''; // path/to/files

render(
	<Provider store={finalCreateStore(rootReducer)}>
		<CodeDemo 
			repo={repo}
			path={path} />
	</Provider>,
	document.getElementById('code')
);