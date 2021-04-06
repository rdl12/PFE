import * as t from './actionTypes';
import {  Here_API_Key ,API_URI} from '../utils/constants/Api';
import { Alert } from 'react-native';
import {store} from './store'
// this is what our action should look like which dispatches the "payload" to reducer
const setLoginState = (loginData) => {
  return {
    type: t.SET_LOGIN_STATE,
    payload: loginData,
  };
};

const Fetch_Adress = (coords) => {
  return {
    type: t.FETCH_ADRESS,
    payload: coords
 }
}

const Fetch_DefibIn100 = (coords) => {
  return {
    type: t.FETCH_DEFIB_IN_100M,
    payload: coords
 }
}

const Fetch_defib_byId = (id) => {
  return {
    type: t.FETCH_DEFIB_DETAILS,
    payload: id
 }
}

const SetMapState = (maptype) => {
  return {
    type: t.SET_MAP_TYPE,
    payload: maptype
 }
}

const SetModalState = (modalState) => {
  return {
    type: t.SET_MODEL_STATE,
    payload: modalState
 }
}
const AccessibilityState = (state) => {
  return {
    type: t.SET_ACCESSIBILITE,
    payload: state
 }
}
const AddDefibPosted = (defib) => {
  return {
    type: t.ADD_DEFIB,
    payload: defib
 }
}



export const login = (loginInput) => {
  const { username, password } = loginInput;
  console.log(store.getState())
  let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
  return (dispatch) => {  
    //console.log(dispatch)// don't forget to use dispatch here!
    return fetch(`${API_URI}/login`, {
      method: 'POST',
      headers: {  // these could be different for your API call
        Accept: "application/json",
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
    .then((response) =>
    {if (response.url === `${API_URI}/success_login`) { // response success checking logic could differ
      dispatch(setLoginState({ userId: username }));
      console.log(store.getState()) // our action is called here
      Alert.alert('logged in', username);
    } else {
      Alert.alert('Login Failed', 'Username or Password is incorrect');
    }})
   
    .catch((err) => {
      Alert.alert('Login Failed', 'Some error occured, please retry');
      console.log(err);
    });
  };
};

export const Adress = (coords) =>{
  const {latitude ,longitude} = coords
  return (dispatch) => {
    return fetch(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=en-US&`+Here_API_Key , {
      method : 'GET'
    })
    .then ((response) =>{
     
      response.json().then((data) => {
        let arr = data.items[0].address
        let arr1 = data.items[0].position
        console.log(arr1)
        dispatch(Fetch_Adress({ addrese: arr.label , pays: arr.countryName , ville: arr.city , province: arr.state ,codePostal: arr.postalCode , lat:arr1.lat ,long:arr1.lng  }))
    });
    })
    .catch((err) => {
      Alert.alert('Some error occured, please retry');
      console.log(err);
    });
  }
}


export const MapState = (mapstate) =>{
  return (dispatch) => {
    return dispatch(SetMapState(mapstate))
  }
}

export const Fecth_Defib = (coords,rayon) => {
  const {latitude ,longitude} = coords
  return (dispatch) => {
    return fetch(`${API_URI}/Defibrillateur/findDefibIn100/lat=${latitude}&lng=${longitude}&d=${rayon}`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              console.log(data)
              dispatch(Fetch_DefibIn100({markers:data}))}
              
              )
             //dispatch(FecthDefib({markers:['hello mother fucker']}))
           })
           .catch((err) => {
            Alert.alert("couldn't fetch defib ,please retry");
            console.log(err);
          });
  }
}



export const Fecth_DefiById = (id) => {

  return (dispatch) => {
    return fetch(`${API_URI}/Defibrillateur/find/${id}`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              console.log(data)
              dispatch(Fetch_defib_byId({Defibrilatteur : data}))
            }
              
              )
             //dispatch(FecthDefib({markers:['hello mother fucker']}))
           })
           .catch((err) => {
            Alert.alert("couldn't fetch defib ,please retry");
            console.log(err);
          });
  }
}

export const ModalState = (modalstate) =>{
  return (dispatch) => {
    return dispatch(SetModalState(modalstate))
  }
}

export const Add_Defib_Posted = (defib) => {

  return (dispatch) => {
    return  fetch(`${API_URI}/Defibrillateur/add`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(defib)
    })
  .then((response) => response.text())
  .then((responseData) => {
      console.log(
          "POST Response",
          "Response Body -> " + JSON.stringify(responseData)
      )
      dispatch(AddDefibPosted(defib))
  })
  .done();
  }
}

export const AccessibiliteState = (state) =>{
  return (dispatch) => {
    return dispatch(AccessibilityState(state))
  }
}