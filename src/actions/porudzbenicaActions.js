import axios from "axios";

import {
  PORUDZBENICA_LIST_REQUEST,
  PORUDZBENICA_LIST_SUCCESS,
  PORUDZBENICA_LIST_FAIL
} from "../constants/porudzbenicaConstants";

export const listaPorudzbenica = id => async dispatch => {
  try {
    dispatch({
      type: PORUDZBENICA_LIST_REQUEST
    });

    const { data } = await axios.get(
      `http://localhost:9001/porudzbenica/getAll/${id}`
    );

    dispatch({
      type: PORUDZBENICA_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PORUDZBENICA_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    });
  }
};
