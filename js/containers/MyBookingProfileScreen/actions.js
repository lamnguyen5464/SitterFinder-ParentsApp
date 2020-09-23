import {createAction} from "../../shared/utils/action/action";
import * as constants from "./constants";

export const getUserSitterProfile = createAction(constants.GET_USER_SITTER);
export const getUserSitterSuccess = createAction(constants.GET_USER_SITTER_SUCCESS);
export const getUserSitterFailure = createAction(constants.GET_USER_SITTER_FAILURE);

export const getUserAvailableSitterProfile = createAction(constants.GET_USER_AVAILABLE_SITTER);
export const getUserAvailableSitterSuccess = createAction(constants.GET_USER_AVAILABLE_SITTER_SUCCESS);
export const getUserAvailableSitterFailure = createAction(constants.GET_USER_AVAILABLE_SITTER_FAILURE);

export const updateDesc = createAction(constants.UPDATE_DESC);
export const updateDescSuccess = createAction(constants.UPDATE_DESC_SUCCESS);
export const updateDescFailure = createAction(constants.UPDATE_DESC_FAILURE);

export const updateRates = createAction(constants.UPDATE_RATES);
export const updateRatesSuccess = createAction(constants.UPDATE_RATES_SUCCESS);
export const updateRatesFailure = createAction(constants.UPDATE_RATES_FAILURE);


export const updateYOE = createAction(constants.UPDATE_YOE);
export const updateYOESuccess = createAction(constants.UPDATE_YOE_SUCCESS);
export const updateYOEFailure = createAction(constants.UPDATE_YOE_FAILURE);

export const updateSpecialYOE = createAction(constants.UPDATE_SPECIAL_YOE);
export const updateSpecialYOESuccess = createAction(constants.UPDATE_SPECIAL_YOE_SUCCESS);
export const updateSpecialYOEFailure = createAction(constants.UPDATE_SPECIAL_YOE_FAILURE);

export const updateCer = createAction(constants.UPDATE_CER);
export const updateCerSuccess = createAction(constants.UPDATE_CER_SUCCESS);
export const updateCerFailure = createAction(constants.UPDATE_CER_FAILURE);

export const updateTime = createAction(constants.UPDATE_TIME);
export const updateTimeSuccess = createAction(constants.UPDATE_TIME_SUCCESS);
export const updateTimeFailure = createAction(constants.UPDATE_TIME_FAILURE);
