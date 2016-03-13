import { POPULATE_NAVIGATION, NAVIGATE } from '../constants/actions';

const populateNavigation = (link) => {
	return {
		type: POPULATE_NAVIGATION,
		link
	};
};

const navigate = (link) => {
	return {
		type: NAVIGATE,
		link
	};
};

export {
	populateNavigation,
	navigate
}