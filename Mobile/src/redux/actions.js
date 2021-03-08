import * as t from './actionTypes';
import { LoginUrl } from '../utils/constants/Api';
import { Alert } from 'react-native';

// this is what our action should look like which dispatches the "payload" to reducer
const setLoginState = (loginData) => {
  return {
    type: t.SET_LOGIN_STATE,
    payload: loginData,
  };
};

export const login = (loginInput) => {
  const { username, password } = loginInput;
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
    {if (response.url=== 'http://192.168.11.108:9090/success_login') { // response success checking logic could differ
      dispatch(setLoginState({ userId: username })); // our action is called here
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