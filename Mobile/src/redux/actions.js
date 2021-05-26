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
const Set_Date = (data)=> {
  return {
    type: t.FETCH_DATE_FORMATION,
    payload: data
 }
}

 const Set_Categories = (data) => {
  return {
    type: t.FETCH_CATEGORIES,
    payload: data
 }
 }
 const Set_Product_Categories = (data) => {
  return {
    type: t.FETCH_PRODUCT_CATEGORIES,
    payload: data
 }
 }
const Set_Product = (data) => {
  return {
    type: t.FETCH_PRODUCTS,
    payload: data
 }
}
const Set_User = (data) => {
  return {
    type: t.FETCH_USER,
    payload: data
 }
}
const Set_Formation = (data) => {
  return {
    type: t.FETCH_FORMATION,
    payload: data
 }
}

const Set_Formation_Details = (data) => {
  return {
    type: t.FETCH_FORMATION_DETAILS,
    payload: data
 }
}

const Set_Defib_user = (email) => {
  return {
    type: t.FETCH_DEFIB_USER,
    payload: email
 }
}


const Fetch_DefibIn100 = (coords) => {
  return {
    type: t.FETCH_DEFIB_IN_100M,
    payload: coords
 }
}

export const Fetch_defib_byId = (id) => {
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

const Set_Boundary = (boundary) => {
  return {
    type: t.FETCH_BOUNDARY,
    payload: boundary
 }
}

const Defib_stats_etat = (stats) => {
  return {
    type: t.FETCH_STATS_DEFIB,
    payload: stats,
  };
};

const Defib_stats_prov = (stats) => {
  return {
    type: t.FETCH_STATS_PROV_DEFIB,
    payload: stats,
  };
};


export const login = (loginInput,navigation) => {
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
       navigation.navigate('Home')
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


export const Fetch_User = (email) => {
  
  return (dispatch) => {
    return fetch(`${API_URI}/User/find/${email}`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              delete data.authorities
              console.log(data)
              dispatch(Set_User({user:data}))
            }
              
              )
           })
           .catch((err) => {
            Alert.alert("couldn't fetch user ,please retry");
            console.log(err);
          });
  }
}

export const Fetch_Defib_User = (email) => {
  
  return (dispatch) => {
    return fetch(`${API_URI}/Defibrillateur/find/user/${email}`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              console.log(data)
              dispatch(Set_Defib_user({Defibrilatteur_user:data}))
            }
              
              )
           })
           .catch((err) => {
            Alert.alert("couldn't fetch user ,please retry");
            console.log(err);
          });
  }
}
export const Singup = (SingupData) => {
 
  console.log(SingupData)
  return (dispatch) => {
    return fetch(`${API_URI}/api/v1/registration`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(SingupData)
    })
           .then((response) => {
            response.json().then((data) => {
              console.log(data)
              //dispatch(Set_Defib_user({Defibrilatteur_user:data}))
            }
              
              )
           })
           .catch((err) => {
            Alert.alert("couldn't subscribe user ,please retry");
            console.log(err);
          });
         
  }
  
}

export const Modify_defib = (defib) => {
  
  delete defib.user.authorities
  console.log(defib)
   return  fetch(`${API_URI}/Defibrillateur/update`, {
     method: 'PATCH', 
     headers: {  // these could be different for your API call
       Accept: 'application/json',
       'Content-Type': 'application/json'
 
     },
     body: JSON.stringify(defib),
     },
   )
   .then((response) => {
     response.text().then((data) => {
       console.log(data)
      }
      )
   })
  .catch((err) => {
    alert("defib not posted,please retry");
      console.log(err);
  });
}


export const Fetch_Formation = () => {
  
  return (dispatch) => {
    return fetch(`${API_URI}/Formation/find/all`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              dispatch(Set_Formation({formation:data}))
            }
              
              )
           })
           .catch((err) => {
            Alert.alert("couldn't fetch Formation ,please retry");
            console.log(err);
          });
  }
}


export const Fetch_Formation_Details = (id) => {
  
  return (dispatch) => {
    return fetch(`${API_URI}/Formation/find/${id}`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              dispatch(Set_Formation_Details({formationDetails:data}))
            }
              
              )
           })
           .catch((err) => {
            Alert.alert("couldn't fetch Formation Details ,please retry");
            console.log(err);
          });
  }
}

export const HelpAction = (obj) => {
    return  fetch(`${API_URI}/Boundary/add_Boundary`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(obj)
    })
  .then((responseData) => {
      console.log(
          "location Posted " + JSON.stringify(responseData)
      )
  })
  .done();
  }

export const Fetch_By_id = (id) => {
  return (dispatch) => {
    return fetch(`${API_URI}/Boundary/find/${id}`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              dispatch(Set_Boundary({Boundary:data}))
            }
              
              )
           })
           .catch((err) => {
            Alert.alert("couldn't fetch Boundary ,please retry");
            console.log(err);
          });
  }
}

export const Fetch_Products = () => {
  
  return (dispatch) => {
    return fetch(`${API_URI}/Product/find/all`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              dispatch(Set_Product({products:data}))
            }
              
              )
           })
           .catch((err) => {
            Alert.alert("couldn't fetch Products ,please retry");
            console.log(err);
          });
  }
}

export const Subscribe_To_Formation = (obj,formation) => { 
  return (dispatch) => {
    return fetch(`${API_URI}/Subscription/add`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify(obj)
  })
.then((responseData) => {
    formation.nbr_inscrit = formation.nbr_inscrit + 1
    Modify_formation(formation)
    console.log(formation)
    console.log(
        "rendez-vous Ajouter " + JSON.stringify(responseData)
    )
})
.done();
}
}


export const Fetch_Categories = () => {
  
  return (dispatch) => {
    return fetch(`${API_URI}/Categorie/find/all`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              dispatch(Set_Categories({categories:data}))
            }
              
              )
           })
           .catch((err) => {
            Alert.alert("couldn't fetch Categories of Formation ,please retry");
            console.log(err);
          });
  }
}

export const Fetch_ProductCategories = () => {
  
  return (dispatch) => {
    return fetch(`${API_URI}/ProductCategory/find/all`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              dispatch(Set_Product_Categories({product_categories:data}))
            }
              
              )
           })
           .catch((err) => {
            Alert.alert("couldn't fetch Categories of Formation ,please retry");
            console.log(err);
          });
  }
}


export const Subscribe_Entreprise = (obj,date,formation) => { 
  return (dispatch) => {
    return fetch(`${API_URI}/Entreprise/add`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify(obj)
  })
.then((responseData) =>{
  responseData.json().then((data) => {
    obj.id = data
    let object = {
      "entreprise":obj, ...date }
    formation.nbr_inscrit = formation.nbr_inscrit - 1
    formation.nbr_entreprise = formation.nbr_entreprise + 1
    dispatch(Subscribe_To_Formation(object,formation))
  })
 })
.done();
}
}

export const Fetch_Date = (id) => {
  return (dispatch) => {
    return fetch(`${API_URI}/DateFormation/find/${id}`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              dispatch(Set_Date({date_formation:data}))
            }
              
              )
           })
           .catch((err) => {
            Alert.alert("couldn't fetch Date Formation ,please retry");
            console.log(err);
          });
  }
}

export const Modify_formation = (formation) => {
  
  console.log(formation)
   return  fetch(`${API_URI}/Formation/update`, {
     method: 'PATCH', 
     headers: {  // these could be different for your API call
       Accept: 'application/json',
       'Content-Type': 'application/json'
 
     },
     body: JSON.stringify(formation),
     },
   )
   .then((response) => {
     response.text().then((data) => {
       console.log(data)
      }
      )
   })
  .catch((err) => {
    alert("formation not posted,please retry");
      console.log(err);
  });
}

export const Fetch_stats_etat = () =>{
  return (dispatch) => {
    return fetch(`${API_URI}/Defibrillateur/etat/Statistique`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              dispatch(Defib_stats_etat({stat_etat_defib : data}))
            }
              )
           })
           .catch((err) => {
            alert("couldn't fetch defib ,please retry");
            console.log(err);
          });
  }
}

export const Fetch_stats_prov = () =>{
  return (dispatch) => {
    return fetch(`${API_URI}/Defibrillateur/province/Statistique`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              dispatch(Defib_stats_prov({stat_prov_defib : data}))
            }
              )
           })
           .catch((err) => {
            alert("couldn't fetch defib ,please retry");
            console.log(err);
          });
  }
}