import React from 'react';
import Radium from 'radium';

const style = (active = false) => {
	return {
	    height: '40px',
	    width: 'auto',
	    minWidth: '100px',
	    padding: '0 10px',
	    lineHeight: '40px',
	    textAlign: 'center',
	    textDecoration: 'none',
	    border: '1px solid lightgray',
	    marginRight: '2px',
	    marginBottom: '2px',
	    borderRadius: '3px',
	    transition: 'background 0.1s ease-in-out',
	    background: active ? 'hsla(208, 66%, 60%, 1)' : '#fff',
	    color: active ? '#fff' : '#444',
	    ':hover': {
	    	background: 'hsla(208, 66%, 60%, 1)',
	    	color: 'white'
	    }
	};
};

const Link = ({
	file,
	active,
	onClick
}) => {
	return (
		<a 
			href='#'
			style={style(active)}
			onClick={(e) => {
				e.preventDefault();
				onClick();
			}}>{file}</a>
	);
}

export default Radium(Link);