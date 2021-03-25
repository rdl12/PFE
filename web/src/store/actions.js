import {store} from './store'
import * as t from './actionsTypes';
import {API_URI} from '../utils/Api';

const setLoginState = (loginData) => {
    return {
      type: t.SET_LOGIN_STATE,
      payload: loginData,
    };
  };

export const login = (loginInput) => {
const { username ,password} = loginInput;
console.log(loginInput)
var formBody = [];
for (var property in loginInput) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(loginInput[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");
return  (dispatch) => {  
    //console.log(dispatch)// don't forget to use dispatch here!
    return  fetch(`${API_URI}/login`, {
    method: 'POST', mode: 'no-cors', 
    headers: {  // these could be different for your API call
        Accept: "application/json",
        'Content-Type': 'application/x-www-form-urlencoded',
        'Keep-Alive': 'timeout=600'
    },
    body: formBody,
    },
  
    )
    .then((response) =>
    {   
      //     if (response.url === `${API_URI}/success_login`) { // response success checking logic could differ
      //   dispatch(setLoginState({ userId: username }));
      //   console.log(store.getState()) // our action is called here
      //   alert('logged in', username);
      // } else {
      // alert('Login Failed', 'Username or Password is incorrect');
      console.log(response)
      // }
    })
      
      // .catch((err) => {
      // alert('Login Failed', 'Some error occured, please retry');
      // console.log(err);
      // });
};
};


export const FectchDefb = () =>{
  return (dispatch) => {
    return fetch(`${API_URI}/Defibrillateur/find/all`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              console.log(data)
             // dispatch(Fetch_defib_byId({Defibrilatteur : data}))
            }
              )
             //dispatch(FecthDefib({markers:['hello mother fucker']}))
           })
           .catch((err) => {
            alert("couldn't fetch defib ,please retry");
            console.log(err);
          });
  }
}