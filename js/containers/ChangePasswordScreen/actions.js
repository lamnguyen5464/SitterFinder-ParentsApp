import {createAction} from "../../shared/utils/action/action";
import * as constants from "./constants";

export const changePassword = createAction(constants.CHANGE_PASSWORD);
export const changePasswordSuccess = createAction(constants.CHANGE_PASSWORD_SUCCESS);
export const changePasswordFailure = createAction(constants.CHANGE_PASSWORD_FAILURE);

export const resetPasswordByToken = createAction(constants.RESET_PASSWORD_BY_TOKEN);
export const resetPasswordByTokenSuccess = createAction(constants.RESET_PASSWORD_BY_TOKEN_SUCCESS);
export const resetPasswordByTokenFailure = createAction(constants.RESET_PASSWORD_BY_TOKEN_FAILURE);
