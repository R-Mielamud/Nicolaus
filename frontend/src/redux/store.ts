import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const saga = createSagaMiddleware();
const middleware = [saga];

const enchancer = applyMiddleware(...middleware);
const store = createStore(rootReducer, enchancer);

saga.run(rootSaga);

export default store;
