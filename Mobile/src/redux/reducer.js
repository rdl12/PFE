import { initialState ,AdresseState,MapState } from './initialState';
import * as t from './actionTypes';

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.SET_LOGIN_STATE:
      return {
        ...state,
        ...action.payload, // this is what we expect to get back from API call and login page input
        isLoggedIn: true, // we set this as true on login
      };
    default:
      return state;
  }
};


export const AdresseReducer = (state = AdresseState , action) => {
  switch (action.type) {
    case t.FETCH_ADRESS:
      return {
        ...state,
        ...action.payload,

      };
    default:
      return state;
  }
};

export const MapReducer = (state = MapState , action) => {
  switch (action.type) {
    case t.SET_MAP_TYPE:
      return {
        ...state,
        ...action.payload

      };
    default:
      return state;
  }
};
