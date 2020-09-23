import {createAction} from "../../shared/utils/action/action";
import * as constants from "./constants";

export const resetPassword = createAction(constants.RESET_PASSWORD);
export const resetPasswordSuccess = createAction(constants.RESET_PASSWORD_SUCCESS);
export const resetPasswordFailure = createAction(constants.RESET_PASSWORD_FAILURE);
