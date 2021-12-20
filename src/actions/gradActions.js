import axios from 'axios'

import {
    GRAD_LIST_REQUEST,
    GRAD_LIST_SUCCESS,
    GRAD_LIST_FAIL,
} from '../constants/gradConstants'


export const listaGradova = () => async (dispatch) => {

    try{
        dispatch({
            type:GRAD_LIST_REQUEST
        })

       const { data } = await axios.get('http://localhost:9001/grad/getAll')

       dispatch({
           type: GRAD_LIST_SUCCESS,
           payload: data
       })

    } catch(error) {
        dispatch({
            type: GRAD_LIST_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
         })
    }

}