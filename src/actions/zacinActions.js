import axios from 'axios'

import {
    ZACIN_LIST_REQUEST,
    ZACIN_LIST_SUCCESS,
    ZACIN_LIST_FAIL,
} from '../constants/zacinConstants'


export const listaZacina = () => async (dispatch) => {

    try{
        dispatch({
            type:ZACIN_LIST_REQUEST
        })

       const { data } = await axios.get('http://localhost:9001/zacin/getAll')

       dispatch({
           type: ZACIN_LIST_SUCCESS,
           payload: data
       })

    } catch(error) {
        dispatch({
            type: ZACIN_LIST_FAIL,
            payload:error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
         })
    }

}