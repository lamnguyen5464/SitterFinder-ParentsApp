import {createAction} from "../../shared/utils/action/action";
import * as constants from "./constants";

export const signUp = createAction(constants.SIGN_UP);
export const signUpSuccess = createAction(constants.SIGN_UP_SUCCESS);
export const signUpFailure = createAction(constants.SIGN_UP_FAILURE);
