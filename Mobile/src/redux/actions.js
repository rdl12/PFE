import * as t from './actionTypes';
import { LoginUrl, LoginSuccess , Here_API_Key } from '../utils/constants/Api';
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



export const login = (loginInput) => {
  const { username, password } = loginInput;
  console.log(store.getState())
  let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
  return (dispatch) => {  
    //console.log(dispatch)// don't forget to use dispatch here!
    return fetch(LoginUrl, {
      method: 'POST',
      headers: {  // these could be different for your API call
        Accept: "application/json",
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
    .then((response) =>
    {if (response.url === LoginSuccess) { // response success checking logic could differ
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
  const {lat ,long} = coords
  return (dispatch) => {
    return fetch(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat}%2C${long}&lang=en-US&`+Here_API_Key , {
      method : 'GET'
    })
    .then ((response) =>{
     
      response.json().then((data) => {
        let arr = data.items[0].address
        let arr1 = data.items[0].position
        dispatch(Fetch_Adress({ addrese: arr.label , pays: arr.countryName , ville: arr.city , province: arr.state ,codePostal: arr.postalCode , lat:arr1.lat ,long:arr1.long  }))
    });
    })
    .catch((err) => {
      Alert.alert('Login Failed', 'Some error occured, please retry');
      console.log(err);
    });
  }
}