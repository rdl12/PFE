import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware ,compose} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'; // this is for debugging with React-Native-Debugger, you may leave it out
import { loginReducer,AdresseReducer,MapReducer,Fecth_Defib_in_100 ,
  Get_Defib,Modal_State,Add_Defib,get_Accessibilite,Fetch_User,
  Fetch_Defib_User, Register,Modify_defib, Formation_Reducer,
   Formation_Details_Reducer,Boundary_Reducer,Products_Reducer,Categories_Reducer,Product_Category_Reducer,Fetch_Date_formation,Fetch_stats_prov,Fetch_stats_etat} from './reducer';


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
  Fetch_Defib_User:Fetch_Defib_User,
  Register:Register,
  Modify_defib:Modify_defib,
  Formation_Reducer:Formation_Reducer,
  Formation_Details_Reducer:Formation_Details_Reducer,
  Boundary_Reducer:Boundary_Reducer,
  Products_Reducer:Products_Reducer,
  Categories_Reducer:Categories_Reducer,
  Product_Category_Reducer:Product_Category_Reducer,
  Fetch_Date_formation:Fetch_Date_formation,
  Fetch_stats_prov:Fetch_stats_prov,
  Fetch_stats_etat:Fetch_stats_etat,
 

  
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);