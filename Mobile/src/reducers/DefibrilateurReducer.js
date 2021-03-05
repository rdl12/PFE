import {ADD_DEFIB} from '../actions/types'


const initialState = {
    DefibListe: []
}

const DefibReducer = (state = initialState,action) => {
   switch(action.type){
       case ADD_DEFIB :
           return { ...state,DefibListe: state.DefibListe.concat({
               Key:Math.random(),
               name:action.data
           })}
           return;
        default:
            return state;
   }
}


export default DefibReducer;