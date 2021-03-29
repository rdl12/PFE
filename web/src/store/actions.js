import {store} from './store'
import * as t from './actionsTypes';
import {API_URI} from '../utils/Api';

const setLoginState = (loginData) => {
    return {
      type: t.SET_LOGIN_STATE,
      payload: loginData,
    };
  };
const Set_Defib_State = (defib) => {
    return {
      type: t.FETCH_DEFIB,
      payload: defib,
    };
  };

const Fetch_defib_byId = (data) => {
  return {
    type: t.FETCH_DEFIB_DETAILS,
    payload: data
  }
}



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
    method: 'POST', 
    headers: {  // these could be different for your API call
        Accept: "application/json",
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody,
    },
  
    )
    .then((response) =>
    {  console.log(response)
      response.text().then((data) => {
        console.log(data)})
      //  if (response.url === `${API_URI}/success_login`) { // response success checking logic could differ
      //   dispatch(setLoginState({ userId: username }));
      //   console.log(store.getState()) // our action is called here
      //   alert('logged in', username);
      // } else {
      // alert('Login Failed', 'Username or Password is incorrect');
     
      // }
    })
      
      // .catch((err) => {
      // alert('Login Failed', 'Some error occured, please retry');
      // console.log(err);
      // });
};
};


export const Fetch_Defib = () =>{
  return (dispatch) => {
    return fetch(`${API_URI}/Defibrillateur/find/all`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              console.log(data)
              dispatch(Set_Defib_State({defib : data}))
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

export const Fecth_DefiById = (id) => {

  return (dispatch) => {
    return fetch(`${API_URI}/Defibrillateur/find/${id}`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              dispatch(Fetch_defib_byId({defibDetails : data}))
            }
              
              )

           })
           .catch((err) => {
          alert("couldn't fetch defib ,please retry");
            console.log(err);
          });
  }
}

export const Modify_defib = (defib) => {
   
  return (dispatch) => {
    return  fetch(`${API_URI}/Defibrillateur/update`, {
      method: 'PATCH', 
      headers: {  // these could be different for your API call
          Accept: "application/json",
          'Content-Type': 'application/json',
      },
      body: defib,
      },
    )
    .then((response) =>{
      console.log(response)
    })
    .catch((err) => {
      alert("defib not posted,please retry");
        console.log(err);
    });
  }
}


