import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware ,compose} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'; // this is for debugging with React-Native-Debugger, you may leave it out
import { loginReducer,AdresseReducer,MapReducer,Fecth_Defib_in_100 } from './reducer';


const rootReducer = combineReducers({
  loginReducer: loginReducer,
  AdresseReducer:AdresseReducer,
  MapReducer:MapReducer,
  Fecth_Defib_in_100:Fecth_Defib_in_100
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);