import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRepo } from '../actions/repo';
import Nav from './nav/Nav';
import CodeSections from './section/CodeSections';
import Loading from './Loading';

const mapStateToProps = (state) => {
	const { isFetching, error } = state.repo;

	return {
		isFetching,
		error
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchRepo: (repo, path) => {
			dispatch(fetchRepo(repo, path));
		}
	}
};

const highlight = () => {
	var script = document.createElement('script');
		script.type = 'text/javascript'; 
		script.src = '../../../../js/prism.js'; // need a better solution
	document.getElementById('code').appendChild(script);
}

class CodeDemo extends Component {
	style() {
		return {
		    width: '100%',
		    margin: '0 auto',
		    display: 'block',
		    height: '100%',
		    position: 'relative',
		};
	}

	componentWillMount() {
		const { repo, path, fetchRepo } = this.props;
		fetchRepo(repo, path);
	}

	render() {
		const { isFetching, error } = this.props;
		return (
			<div style={this.style()}>
				<Nav />
				<CodeSections />
				{
					error
					? <h2>Something went wrong. Check the repo link and path to the folder you want to display.</h2>
					: isFetching 
					? <Loading />
					: highlight()
				}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeDemo);