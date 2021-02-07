import createAction from "../../../helpers/createAction.helper";
import * as actionTypes from "./actionTypes";

export const loadBooks = createAction<actionTypes.LoadBooks>(actionTypes.LOAD_BOOKS);
export const loadBooksSuccess = createAction<actionTypes.LoadBooksSuccess>(actionTypes.LOAD_BOOKS_SUCCESS);
export const setBooksFilter = createAction<actionTypes.SetBooksFilter>(actionTypes.SET_BOOKS_FILTER);
