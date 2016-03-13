import fetch from 'isomorphic-fetch';
import { REQUEST_REPO, RECEIVE_REPO, REQUEST_FILE, RECEIVE_FILE, FETCH_COMPLETE, ERROR } from '../constants/actions';
import { populateNavigation } from './navigation';

const requestRepo = () => {
	return {
		type: REQUEST_REPO
	};
};

const requestFile = (name) => {
	return {
		type: REQUEST_FILE,
		name
	};
};

const receiveRepo = (files) => {
	return {
		type: RECEIVE_REPO,
		files
	};
};

const receiveFile = (name, extension, content) => {
	return {
		type: RECEIVE_FILE,
		name,
		extension,
		content
	};
};

const fetchComplete = () => {
	return {
		type: FETCH_COMPLETE
	};
};

const error = () => {
	return {
		type: ERROR
	};
};

const fetchFiles = (files, user, repo, branch, path) => {
	return (dispatch) => {
		Promise.all(
			files.map(file => dispatch(fetchFile(file.name, user, repo, branch, path))))
		.then(() => dispatch(fetchComplete()))
		.catch(err => console.error(err.message));
	}
}

const fetchFile = (file, user, repo, branch, path) => {
	return (dispatch) => {
		dispatch(requestFile(file));
		const url = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path}/${file}`;
		const ext = file.substring(file.lastIndexOf('.')).substring(1);

		return fetch(url)
			.then(res => res.text())
			.then(text => {
				dispatch(receiveFile(file, ext, text));
				dispatch(populateNavigation(file));
			});
	};
};

export const fetchRepo = (
	repo,
	path,
	branch = 'master', 
) => {
	return (dispatch) => {
		dispatch(requestRepo());
		const splitUrl = repo.split('/');
		const repoName = splitUrl.pop().split('.')[0];
		const user = splitUrl.pop();
		const url = `https://api.github.com/repos/${user}/${repoName}/contents/${path}`;

		return fetch(url)
			.then(res => res.json())
			.then(json => {
				const files = json
					.filter(file => ~file.name.indexOf('.')) // filter out results without extensions
					.reduce((files, file) => {
						return [
							...files,
							{ name: file.name }
						]
					}, []);
				dispatch(receiveRepo(files));
				dispatch(fetchFiles(files, user, repoName, branch, path));
			})
			.catch(err => {
				dispatch(error())
			});
	};
}