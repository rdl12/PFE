import { createStore, combineReducers } from 'redux';
import DefibReducer from './reducers/DefibrilateurReducer';

const rootReducer = combineReducers({
    defibrilateur: DefibReducer
})

const configureStore = () => createStore(rootReducer);

export default configureStore;