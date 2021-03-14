import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware ,compose} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'; // this is for debugging with React-Native-Debugger, you may leave it out
import { loginReducer,AdresseReducer,MapReducer } from './reducer';


const rootReducer = combineReducers({
  loginReducer: loginReducer,
  AdresseReducer:AdresseReducer,
  MapReducer:MapReducer
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);