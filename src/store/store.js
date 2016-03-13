import { createStore, applyMiddleware } from 'redux';
import thunkMiddlware from 'redux-thunk';

const finalCreateStore = applyMiddleware(thunkMiddlware)(createStore);

export default finalCreateStore;