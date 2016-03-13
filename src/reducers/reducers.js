import { combineReducers } from 'redux';
import * as ACT from '../constants/actions';

const repo = (
	state = {
		isFetching: true,
		files: [],
		error: false,
	},
	action
) => {
	switch (action.type) {
		case ACT.REQUEST_REPO:
			return {
				...state,
				isFetching: true,
			};
		case ACT.RECEIVE_REPO:
			return {
				...state,
				files: [...action.files]
			};
		case ACT.REQUEST_FILE:
		case ACT.RECEIVE_FILE:
			return {
				isFetching: state.isFetching,
				files: state.files.map(file => file.name === action.name ? handleFile(file, action) : file)
			};
		case ACT.FETCH_COMPLETE:
			return {
				...state,
				isFetching: false
			};
		case ACT.ERROR:
			return {
				...state,
				isFetching: false,
				error: true
			};
		default:
			return state;
	}
};

const handleFile = (state = {},	action) => {
	switch (action.type) {
		case ACT.REQUEST_FILE:
			return {
				name: state.name,
				isFetching: true
			};
		case ACT.RECEIVE_FILE:
			return {
				name: state.name,
				isFetching: false,
				extension: action.extension,
				content: action.content
			};
		default:
			return state;
	}
};

const navigation = (
	state = [], 
	action
) => {
	switch(action.type) {
		case ACT.POPULATE_NAVIGATION:
			return [
				...state,
				{
					link: action.link,
					active: false
				}
			];
		case ACT.NAVIGATE:
			return state.map(linkObj => { 
				return linkObj.link === action.link 
				? { link: linkObj.link, active: true } 
				: { link: linkObj.link, active : false } 
			});
		case ACT.FETCH_COMPLETE:
			return state.map((l, idx) => {
				return idx === 0 ? { link: l.link, active: true } : l;
			});
		default:
			return state;
	}
};


const rootReducer = combineReducers({
	repo,
	navigation
});

export default rootReducer;