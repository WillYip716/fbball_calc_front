import { COMPILE, GET_ERRORS, LOADING} from './types';
import axios from "axios";



export const compile = (info) => dispatch => {
    console.log("compile called");
    dispatch({type: LOADING});
    //axios.post('https://fantasybballcalculator.herokuapp.com/api/compile',info) http://127.0.0.1:8000/api/compile
    axios.post('http://127.0.0.1:8000/api/compile',info)
     .then(res => {
        dispatch({
           type: COMPILE,
           payload: res.data
        });
     })
     .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.data
      })
     });
}


export const error = () => {
    return {
        type: GET_ERRORS,
     };
}
