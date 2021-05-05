import * as actionTypes from './actionsTypes';
import {initialState} from './InitialState'



export const reducer = (state = initialState, action) => {
    let trigger = [];
    let open = [];

    switch (action.type) {
        case actionTypes.COLLAPSE_MENU:
            return {
                ...state,
                collapseMenu: !state.collapseMenu
            };
        case actionTypes.COLLAPSE_TOGGLE:
            if (action.menu.type === 'sub') {
                open = state.isOpen;
                trigger = state.isTrigger;

                const triggerIndex = trigger.indexOf(action.menu.id);
                if (triggerIndex > -1) {
                    open = open.filter(item => item !== action.menu.id);
                    trigger = trigger.filter(item => item !== action.menu.id);
                }

                if (triggerIndex === -1) {
                    open = [...open, action.menu.id];
                    trigger = [...trigger, action.menu.id];
                }
            } else {
                open = state.isOpen;
                const triggerIndex = (state.isTrigger).indexOf(action.menu.id);
                trigger = (triggerIndex === -1) ? [action.menu.id] : [];
                open = (triggerIndex === -1) ? [action.menu.id] : [];
            }

            return {
                ...state,
                isOpen: open,
                isTrigger: trigger
            };
        case actionTypes.NAV_CONTENT_LEAVE:
            return {
                ...state,
                isOpen: open,
                isTrigger: trigger,
            };
        case actionTypes.NAV_COLLAPSE_LEAVE:
            if (action.menu.type === 'sub') {
                open = state.isOpen;
                trigger = state.isTrigger;

                const triggerIndex = trigger.indexOf(action.menu.id);
                if (triggerIndex > -1) {
                    open = open.filter(item => item !== action.menu.id);
                    trigger = trigger.filter(item => item !== action.menu.id);
                }
                return {
                    ...state,
                    isOpen: open,
                    isTrigger: trigger,
                };
            }
            return {...state};
        case actionTypes.FULL_SCREEN :
            return {
                ...state,
                isFullScreen: !state.isFullScreen
            };
        case actionTypes.FULL_SCREEN_EXIT:
            return {
                ...state,
                isFullScreen: false
            };
        case actionTypes.CHANGE_LAYOUT:
            return {
                ...state,
                layout: action.layout
            };
        case actionTypes.SHOW_HEADER:
            return {
                ...state,
                showHeader: false
            };
      case actionTypes.SET_LOGIN_STATE:
        return {
          ...state,
          ...action.payload, // this is what we expect to get back from API call and login page input
          isLoggedIn: true, // we set this as true on login
        };

     case actionTypes.FETCH_DEFIB:
        return {
            ...state,
            ...action.payload

        };
    case actionTypes.FETCH_DEFIB_DETAILS:
        return {
            ...state,
            ...action.payload
    
        };
    case actionTypes.MODIFY_DEFIB:
        return {
            ...state,
            ...action.payload
    
        };
    case actionTypes.FETCH_ADRESS:
        return {
            ...state,
            ...action.payload,
         };

    case actionTypes.ADD_DEFIB:
    return {
        ...state,
        ...action.payload

    };
    case actionTypes.FIND_DEFIB_VALIDE:
        return {
            ...state,
            ...action.payload
    
        };
    case actionTypes.FETCH_STATS_DEFIB:
        return {
            ...state,
            ...action.payload
    
        };
    case actionTypes.FETCH_STATS_PROV_DEFIB:
            return {
                ...state,
                ...action.payload
        
            };
    case actionTypes.FETCH_SUBSCRIBED_PEOPLE:
        return {
            ...state,
            ...action.payload
    
        };
    case actionTypes.ADD_FORMATION:
        return {
            ...state,
            ...action.payload

        };
    case actionTypes.FETCH_CATEGORIES:
        return {
            ...state,
            ...action.payload

        };
    case actionTypes.FETCH_FORMATION:
        return {
            ...state,
            ...action.payload

        };
        default:
            return state;
    }
};

  