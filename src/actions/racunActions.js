import axios from "axios";

import {
  RACUN_LIST_REQUEST,
  RACUN_LIST_SUCCESS,
  RACUN_LIST_FAIL,
  RACUN_GET_REQUEST,
  RACUN_GET_SUCCESS,
  RACUN_GET_FAIL,
  RACUN_ADD_REQUEST,
  RACUN_ADD_SUCCESS,
  RACUN_ADD_FAIL,
  RACUN_DELETE_REQUEST,
  RACUN_DELETE_SUCCESS,
  RACUN_DELETE_FAIL,
  RACUN_UPDATE_REQUEST,
  RACUN_UPDATE_SUCCESS,
  RACUN_UPDATE_FAIL
} from "../constants/racunConstants";

const config = {
  headers: {
    "Content-type": "application/json"
  }
};

export const getAllRacuni = () => async dispatch => {
  try {
    dispatch({
      type: RACUN_LIST_REQUEST
    });

    const { data } = await axios.get("http://localhost:9001/racun/getAll");

    dispatch({
      type: RACUN_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: RACUN_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    });
  }
};

export const getById = id => async dispatch => {
  try {
    dispatch({
      type: RACUN_GET_REQUEST
    });

    const { data } = await axios.get(`http://localhost:9001/racun/get/${id}`);

    dispatch({
      type: RACUN_GET_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: RACUN_GET_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    });
  }
};

export const add = (
  datumPrometa,
  kupac,
  porudzbenica,
  uslovPlacanja,
  PDVOsnova,
  iznosPDV,
  racunIznos,
  stavke
) => async dispatch => {
  try {
    dispatch({
      type: RACUN_ADD_REQUEST
    });

    const { data } = await axios.post(
      "http://localhost:9001/racun/add",
      {
        datumPrometa: datumPrometa,
        pdvosnova: PDVOsnova,
        iznosPDV: iznosPDV,
        racunIznos: racunIznos,
        uslovPlacanja: uslovPlacanja,
        porudzbenicaId: porudzbenica.idpor,
        stavkeRac: stavke
      },
      config
    );

    dispatch({
      type: RACUN_ADD_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: RACUN_ADD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    });
  }
};

export const deleteRacun = id => async dispatch => {
  try {
    dispatch({
      type: RACUN_DELETE_REQUEST
    });

    const { data } = await axios.delete(
      `http://localhost:9001/racun/delete/${id}`,
      config
    );

    dispatch({
      type: RACUN_DELETE_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: RACUN_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    });
  }
};

export const updateRacun = (
  idracuna,
  datumPrometa,
  kupac,
  porudzbenica,
  uslovPlacanja,
  PDVOsnova,
  iznosPDV,
  racunIznos,
  stavke
) => async dispatch => {
  try {
    dispatch({
      type: RACUN_UPDATE_REQUEST
    });

    const { data } = await axios.put(
      `http://localhost:9001/racun/update/${idracuna}`,
      {
        idracuna: idracuna,
        datumPrometa: datumPrometa,
        pdvosnova: PDVOsnova,
        iznosPDV: iznosPDV,
        racunIznos: racunIznos,
        uslovPlacanja: uslovPlacanja,
        porudzbenicaId: porudzbenica.idpor,
        stavkeRac: stavke
      },
      config
    );

    dispatch({
      type: RACUN_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: RACUN_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    });
  }
};
