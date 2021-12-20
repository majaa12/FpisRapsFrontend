import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { gradListReducer } from "./reducers/gradReducers";
import {
  kupacAddReducer,
  kupacGetAllReducer,
  kupacDeleteReducer,
  kupacPutReducer
} from "./reducers/kupacReducers";
import {
  racunGetAllReducer,
  racunUpdateReducer,
  racunDeleteReducer,
  racunAddReducer
} from "./reducers/racunReducers";
import { porudzbenicaListReducer } from "./reducers/porudzbenicaReducers";
import { zacinListReducer } from "./reducers/zacinReducers";

const reducer = combineReducers({
  gradLista: gradListReducer,
  kupacAdd: kupacAddReducer,
  kupacGetAll: kupacGetAllReducer,
  kupacDelete: kupacDeleteReducer,
  kupacPut: kupacPutReducer,
  racunGetAll: racunGetAllReducer,
  porudzbenicaLista: porudzbenicaListReducer,
  zacinLista: zacinListReducer,
  racunDelete: racunDeleteReducer,
  racunPut: racunUpdateReducer,
  racunAdd: racunAddReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
