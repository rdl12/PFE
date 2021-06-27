import {store} from './store'
import * as t from './actionsTypes';
import {API_URI,Here_API_Key} from '../utils/Api';
import firebase from '../firebase'
import {NavLink,useHistory} from 'react-router-dom';




const setLoginState = (loginData) => {
    return {
      type: t.SET_LOGIN_STATE,
      payload: loginData,
    };
  };
const setFilteredFor = (loginData) => {
  return {
    type: t.SET_FILTERD_FORMATION,
    payload: loginData,
  };
};

const date_formation = (data) => {
  return {
    type: t.FETCH_DATE_FORMATION,
    payload: data,
  };
};
const Set_Defib_State = (defib) => {
    return {
      type: t.FETCH_DEFIB,
      payload: defib,
    };
  };
  const Set_Chat_State = (data) => {
    return {
      type: t.FETCH_USER_CHAT,
      payload: data,
    };
  };
const Set_Product_Categories = (data) => {
  return {
    type: t.FETCH_PRODUCT_CATEGORIES,
    payload: data,
  };
};
  const Set_Produits = (data) => {
    return {
      type: t.FETCH_PRODUCTS,
      payload: data,
    };
  };
 const Set_Product_ById = (data) => {
  return {
    type: t.FETCH_PRODUCT_BYID,
    payload: data,
  };
 }
  const Formation_stats = (data) => {
    return {
      type: t.FETCH_STATS_FORMATION,
      payload: data,
    };
  };
  export const Set_Formation_byId = (Formation) => {
    return {
      type: t.FETCH_FORMATION_BYID,
      payload: Formation,
    };
  };
  const Set_Subscribed_State = (sub) => {
    return {
      type: t.FETCH_SUBSCRIBED_PEOPLE,
      payload: sub,
    };
  };
  const Set_Formation = (formation) => {
    return {
      type: t.FETCH_FORMATION,
      payload: formation,
    };
  };
  const Set_Categories = (categorie) => {
    return {
      type: t.FETCH_CATEGORIES,
      payload: categorie,
    };
  };

const Defib_valide = (defib) => {
  return {
    type: t.FETCH_DEFIB,
    payload: defib,
  };
};
const Defib_byVille = (ville) => {
  return {
    type: t.FIND_DEFIB_ByVille,
    payload: ville,
  };
};

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

const Fetch_defib_byId = (data) => {
  return {
    type: t.FETCH_DEFIB_DETAILS,
    payload: data
  }
}
const Fetch_Adress = (coords) => {
  return {
    type: t.FETCH_ADRESS,
    payload: coords
 }
}
const AddDefibPosted = (defib) => {
  return {
    type: t.ADD_DEFIB,
    payload: defib
 }
}


export const login = (loginInput,history) => {
const { username ,password} = loginInput;

var formBody = [];
for (var property in loginInput) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(loginInput[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");
return  (dispatch) => {  
    
    return  fetch(`${API_URI}/login`, {
    method: 'POST', 
    headers: {  // these could be different for your API call
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody,
    },
  
    )
    .then((response) =>
    { 
      response.text().then((data) => {
        })
       if (response.url === `${API_URI}/success_login`) { // response success checking logic could differ
           fetch(`${API_URI}/User/find/${username}`,{method: 'GET'}) .then((response) => {
            response.json().then((data1) => {
              
              if(data1.appUserRole === "ADMIN")
                    {
                    dispatch(setLoginState({ userId: username })); // our action is called here
                    //alert('logged in', username);
                    localStorage.setItem('username',username)
                    window.location.reload()}
              else{ alert('Login Failed, Vous etes pas un administrateur');}})})
      } else {
         alert('Login Failed', 'Username or Password is incorrect');
      }
    })
      
      .catch((err) => {
      alert('Login Failed', 'Some error occured, please retry');
      
      });
};
};


export const Fetch_Defib = () =>{
  return (dispatch) => {
    return fetch(`${API_URI}/Defibrillateur/find/all`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              
              dispatch(Set_Defib_State({defib : data}))
            }
              )
             //dispatch(FecthDefib({markers:['hello mother fucker']}))
           })
           .catch((err) => {
            alert("couldn't fetch defib ,please retry");
           
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
            
          });
  }
}

export const Modify_defib = (defib) => {
  if (defib.user.authorities){
    delete defib.user.authorities
  }
 
 return (dispatch) => {
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
    
       //dispatch(Set_Defib_State({defib : data}))
      }
      )
     //dispatch(FecthDefib({markers:['hello mother fucker']}))
   })
  .catch((err) => {
    alert("defib not posted,please retry");
      
  });
}
}


export const Adress = (coords) =>{
  const {lat ,lng} = coords
  return (dispatch) => {
    return fetch(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat}%2C${lng}&lang=en-US&`+Here_API_Key , {
      method : 'GET',
    })
    .then ((response) =>{
     
      response.json().then((data) => {
        let arr = data.items[0].address
        let arr1 = data.items[0].position
       
        dispatch(Fetch_Adress({ addrese: arr.label , pays: arr.countryName , ville: arr.city , province: arr.state ,codePostal: arr.postalCode , lat:arr1.lat ,long:arr1.lng  }))
    });
    })
    .catch((err) => {
      alert('Some error occured, please retry');
      
    });
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
  .then((responseData) => {
      
      dispatch(AddDefibPosted({defibPosted : defib}))
  })
  }
}

export const Fetch_Defib_Valide = (id) =>{
  return (dispatch) => {
    return fetch(`${API_URI}/Defibrillateur/find/etat/${id}`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
           
              dispatch(Defib_valide({defib : data}))
            }
              )
           })
           .catch((err) => {
            alert("couldn't fetch defib ,please retry");
           
          });
  }
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
            
          });
  }
}

export const Fetch_Subscribed_people = () =>{
  return (dispatch) => {
    return fetch(`${API_URI}/Subscription/find/all`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              dispatch(Set_Subscribed_State({personnes_inscrites : data}))
            }
              )
           })
           .catch((err) => {
            alert("couldn't fetch subscribed people ,please retry to refresh the page");
           
          });
  }
}

export const Add_Formation = (formation,arrDate) => {
    return (dispatch) => {
      return fetch(`${API_URI}/Formation/add`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        
      },
      body:  JSON.stringify(formation)
    })
    .then((response) => {
      response.json().then((data) => {
        arrDate.map(item =>{
          formation.id = data
          let object = {
             "date":item,
             "formation":formation
               
          }
          dispatch(Add_Date(object))
        })
       
      }
        )
     })
}
}

export const Fetch_Categories = () =>{
  return (dispatch) => {
    return fetch(`${API_URI}/Categorie/find/all`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              dispatch(Set_Categories({categories : data}))
            }
              )
           })
           .catch((err) => {
            alert("couldn't fetch categories ,please retry to refresh the page");
            
          });
  }
}

export const Fetch_Formations = () =>{
  return (dispatch) => {
    return fetch(`${API_URI}/Formation/find/all`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              dispatch(Set_Formation({formations : data}))
            }
              )
           })
           .catch((err) => {
            alert("couldn't fetch formation ,please retry to refresh the page");
           
          });
  }
}

export const Fetch_Formation_ById = (id) =>{
  return (dispatch) => {
    return fetch(`${API_URI}/Formation/find/${id}`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              dispatch(Set_Formation_byId({formationDetail : data}))
            }
              )
           })
           .catch((err) => {
            alert("couldn't fetch Formation ,please retry");
            
          });
  }
}

export const add_Category = (category) => {
  return (dispatch) => {
    return fetch(`${API_URI}/Categorie/add_Categorie`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify(category)
  })


}
}

export const Fetch_stats_formation = () =>{
  return (dispatch) => {
    return fetch(`${API_URI}/Formation/Statistique`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              dispatch(Formation_stats({nbr_inscrit_formation : data}))
            }
              )
           })
           .catch((err) => {
            alert("couldn't fetch defib ,please retry");
           
          });
  }
}
export const Fetch_Produits = () =>{
  return (dispatch) => {
    return fetch(`${API_URI}/Product/find/all`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              dispatch(Set_Produits({produits : data}))
            }
              )
           })
           .catch((err) => {
            alert("couldn't fetch products ,please retry");
            
          });
  }
}

export const Fetch_Produit_ById = (id) =>{
  return (dispatch) => {
    return fetch(`${API_URI}/Product/find/${id}`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              dispatch(Set_Product_ById({product_detail : data}))
            }
              )
           })
           .catch((err) => {
            alert("couldn't fetch Product detail ,please retry");
            
          });
  }
}
export const FetchProductsByCategorie = (category) =>{
  return (dispatch) => {
    return fetch(`${API_URI}/Product/find/categorie/${category.id}`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              dispatch(Set_Product_ById({produits : data}))
            }
              )
           })
           .catch((err) => {
            alert("couldn't fetch Product detail ,please retry");
            
          });
  }
}
export const FetchFormationByCategorie = (category) =>{
  return (dispatch) => {
    return fetch(`${API_URI}/Formation/find/Categorie/${category.id}`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              dispatch(Set_Formation({formations : data}))
            }
              )
           })
           .catch((err) => {
            alert("couldn't fetch Product detail ,please retry");
            
          });
  }
}

export const Fetch_Product_Categories = () =>{
  return (dispatch) => {
    return fetch(`${API_URI}/ProductCategory/find/all`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              dispatch(Set_Product_Categories({product_categories : data}))
            }
              )
           })
           .catch((err) => {
            alert("couldn't fetch categories ,please retry to refresh the page");
           
          });
  }
}

export const Add_Product = (product) =>{
  return (dispatch) => {
    return fetch(`${API_URI}/Product/add`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify(product)
  })


}
}

export const Fetch_user_chat = () =>{
  return (dispatch) => {
    const ref = firebase.firestore().collection("userChat")
    const users = []
    ref.onSnapshot((querySnapShot) => {
        users.length = 0
        querySnapShot.forEach((doc) =>{
            users.push(doc.data())
        })
    })
    return dispatch(Set_Chat_State({user_chat:users}))
}
}
 export const Send_Notif = (sub) =>{

  return (dispatch) => {
    return dispatch(setFilteredFor({filtered:sub}))
  }
 }

 export const Fetch_Defib_ByVille = (ville) =>{
  return (dispatch) => {
    return fetch(`${API_URI}/Defibrillateur/find/ville/${ville}`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              dispatch(Defib_byVille({defib : data}))
            }
              )
           })
           .catch((err) => {
            alert("couldn't fetch defib ,please retry");
            
          });
  }
}

export const add_CategoryProduct = (category) => {
  return (dispatch) => {
    return fetch(`${API_URI}/ProductCategory/add_Categorie`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify(category)
  })


}
}

export const Delete_Product = (id) => {
    return fetch(`${API_URI}/Product/delete/${id}`, {
    method: 'DELETE',
    
  }).then((response) => { window.location.href = "/Produit/list"})

}

export const Delete_Formation = (id) => {
  return (dispatch) => {
    return fetch(`${API_URI}/Formation/delete/${id}`, {
    method: 'DELETE',
    
  }).then(()=>{window.location.href = "/Formation/list"})

}
}

export const Add_Date = (date) => {
  
  return (dispatch) => {
    return fetch(`${API_URI}/DateFormation/addDate`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify(date)
  })


}
}


export const Fetch_date_Formation = (id) =>{
  return (dispatch) => {
    return fetch(`${API_URI}/DateFormation/find/${id}`,{method: 'GET'})
           .then((response) => {
            response.json().then((data) => {
              dispatch(date_formation({date_formation : data}))
            }
              )
           })
           .catch((err) => {
            alert("couldn't fetch date formation ,please retry");
            
          });
  }
}

export const Delete_DateFormation = (id) => {
  return (dispatch) => {
    return fetch(`${API_URI}/DateFormation/delete/${id}`, {
    method: 'DELETE',
    
  })


}
}

export const upload_csv = (object) => {
  return (dispatch) => {
    return fetch(`${API_URI}/Defibrillateur/upload`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      
    },
    body:  JSON.stringify(object)
  })
 
   .catch((err) => {
    alert("couldn't post data defib ,please retry");
    
  });
}
}


export const Delete_Subscription = (id) => {
  return (dispatch) => {
    return fetch(`${API_URI}/Subscription/delete/${id}`, {
    method: 'DELETE',
    
  })


}
}

export const Modify_subs = (subs) => {
  if (subs.user.authorities){
    delete subs.user.authorities
  }
  
   return  fetch(`${API_URI}/Subscription/update`, {
     method: 'PATCH', 
     headers: {  // these could be different for your API call
       Accept: 'application/json',
       'Content-Type': 'application/json'
 
     },
     body: JSON.stringify(subs),
     },
   )
   .then((response) => {
     response.text().then((data) => {
       
      }
      )
   })
  .catch((err) => {
    alert("formation not posted,please retry");
      
  });
}

export const Reset_Password = (email) =>{
  
  return (dispatch) => {
    return fetch(`${API_URI}/User/forgot-password/${email}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(email)
    }).then((response)=>{
      window.location.href='Home/auth/signin-1'
    })
    .catch((err) => {
      alert("couldn't subscribe user ,please retry");
      
    });
    
  }
  
}

export const modifier_Password = (password,ancpassword,email,navigation) =>{
  let data = {
     "email":email,
     "password": password,
     "ancienpassword":ancpassword
  }
  return (dispatch) => {
    return fetch(`${API_URI}/User/Modify_Password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(data)
    })
    .then((response) => {
      response.text().then((data) => {
      if(data === 'true'){
        alert("votre mot de passe a été changé");
        localStorage.clear()
        window.location.href='Home/auth/signin-1'
      }
      else {
      alert("mot de passe entré faux");
      }
      }
        )
     })

      .catch((err) => {
      alert("couldn't post modify user ,please retry");
     
    });
    
  }
  
}