import { initialState ,AdresseState,MapState,defibMarkers,defib,ModalState,DefibPosted,accessibilite } from './initialState';
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


export const Fecth_Defib_in_100 = (state = defibMarkers , action) => {
  switch (action.type) {
    case t.FETCH_DEFIB_IN_100M:
      return {
        ...state,
        ...action.payload

      };
    default:
      return state;
  }
}

export const Get_Defib = (state = defib , action) => {
  switch (action.type) {
    case t.FETCH_DEFIB_DETAILS:
      return {
        ...state,
        ...action.payload

      };
    default:
      return state;
  }
}

export const Modal_State = (state = ModalState , action) => {
  switch (action.type) {
    case t.SET_MODEL_STATE:
      return {
        ...state,
        ...action.payload

      };
    default:
      return state;
  }
}

export const Add_Defib = (state = DefibPosted , action) => {
  switch (action.type) {
    case t.ADD_DEFIB:
      return {
        ...state,
        ...action.payload

      };
    default:
      return state;
  }
}


export const get_Accessibilite = (state = accessibilite , action) => {
  switch (action.type) {
    case t.SET_ACCESSIBILITE:
      return {
        ...state,
        ...action.payload

      };
    default:
      return state;
  }
}
