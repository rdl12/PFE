import { API_URI } from '../utils/constants/Api'




 const getBoundaryData =  () => {
  return  fetch(`${API_URI}`+'/Boundary/find/all',{method: 'GET'})
        .then((response) => {
          response.json().then((data) => {
            return data
          })
        })
        .catch((error) => warn(error));
 }

export default getBoundaryData
