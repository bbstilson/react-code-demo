import React from 'react';
import extensions from './extensions';

const style = (active = false) => {
	return {
	    width: '100%',
	    display: active ? 'block' : 'none',
	    margin: '0 auto',
	};
};

const Code = ({ ext, content, active }) => {
	return (
		<article style={style(active)}>
			<pre>
				<code className={`language-${extensions[ext]}`}>
					{content}
				</code>
			</pre>
		</article>
	);
};

export default Code;