import thunk from 'redux-thunk';
import { createStore,applyMiddleware} from 'redux';
import { reducer} from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';




export const store = createStore(
  reducer,composeWithDevTools(applyMiddleware(thunk))
);