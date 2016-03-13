import React from 'react';
import Link from './Link';
import { connect } from 'react-redux';
import { navigate } from '../../actions/navigation';

const style = () => {
	return {
		display: 'flex',
		flexFlow: 'row wrap',
		justifyContent: 'flex-start',
		alignItems: 'center',
	}
};

const mapStateToProps = (state) => {
	return {
		navState: state.navigation
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		navigate: (link) => {
			dispatch(navigate(link));
		}
	}
}

const Nav = ({
	navState,
	navigate
}) => {
	const links = navState.map(file => {
		return (
			<Link 
				key={file.link} 
				active={file.active}
				onClick={() => navigate(file.link)}
				file={file.link} />
		);
	})
	return (
		<nav style={style()}>{links}</nav>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);