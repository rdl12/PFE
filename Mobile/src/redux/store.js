import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware ,compose} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'; // this is for debugging with React-Native-Debugger, you may leave it out
import { loginReducer,AdresseReducer,MapReducer,Fecth_Defib_in_100 ,Get_Defib,Modal_State,Add_Defib,get_Accessibilite,Fetch_User,Fetch_Defib_User} from './reducer';


const rootReducer = combineReducers({
  loginReducer: loginReducer,
  AdresseReducer:AdresseReducer,
  MapReducer:MapReducer,
  Fecth_Defib_in_100:Fecth_Defib_in_100,
  Get_Defib : Get_Defib,
  Modal_State:Modal_State,
  Add_Defib:Add_Defib,
  get_Accessibilite:get_Accessibilite,
  Fetch_User:Fetch_User,
  Fetch_Defib_User:Fetch_Defib_User
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);