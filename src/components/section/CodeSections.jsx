import React from 'react';
import { connect } from 'react-redux';
import Code from './Code';
import Loading from '../Loading';

const mapStateToProps = (state) => {
	const { files, isFetching } = state.repo;
	return {
		isFetching,
		files,
		navState: state.navigation
	};
};

const getActiveState = (navState, name) => {
	return navState.find(navObj => navObj.link === name).active;
}

const CodeSections = ({ isFetching, files, navState }) => {
	let codeSections;
	if (!isFetching) {
		codeSections = files.map(file => {
			return (
				<Code 
					key={file.name}
					active={getActiveState(navState, file.name)}
					ext={file.extension}
					content={file.content} />
			);
		});
	}

	return (
		<section>
			{
				!isFetching 
				? codeSections
				: <Loading />
			}
		</section>
	)
}

export default connect(mapStateToProps)(CodeSections);