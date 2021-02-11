import createAction from "../../../helpers/createAction.helper";
import * as actionTypes from "./actionTypes";

export const loadBooks = createAction<actionTypes.LoadBooks>(actionTypes.LOAD_BOOKS);
export const loadBooksSuccess = createAction<actionTypes.LoadBooksSuccess>(actionTypes.LOAD_BOOKS_SUCCESS);
export const setBooksFilter = createAction<actionTypes.SetBooksFilter>(actionTypes.SET_BOOKS_FILTER);
export const loadTagGroups = createAction(actionTypes.LOAD_TAG_GROUPS);
export const loadTagGroupsSuccess = createAction<actionTypes.LoadTagGroupsSuccess>(actionTypes.LOAD_TAG_GROUPS_SUCCESS);
export const loadAuthors = createAction(actionTypes.LOAD_AUTHORS);
export const loadAuthorsSuccess = createAction<actionTypes.LoadAuthorsSuccess>(actionTypes.LOAD_AUTHORS_SUCCESS);
export const loadStatuses = createAction(actionTypes.LOAD_STATUSES);
export const loadStatusesSuccess = createAction<actionTypes.LoadStatusesSuccess>(actionTypes.LOAD_STATUSES_SUCCESS);
export const loadRecommendations = createAction(actionTypes.LOAD_RECOMMENDATIONS);
export const loadPublishings = createAction(actionTypes.LOAD_PUBLISHINGS);

export const loadPublishingsSuccess = createAction<actionTypes.LoadPublishingsSuccess>(
    actionTypes.LOAD_PUBLISHINGS_SUCCESS,
);

export const loadRecommendationsSuccess = createAction<actionTypes.LoadRecommendationsSuccess>(
    actionTypes.LOAD_RECOMMENDATIONS_SUCCESS,
);
