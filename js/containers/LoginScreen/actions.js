import {createAction} from "../../shared/utils/action/action";
import * as constants from "./constants";

export const signIn = createAction(constants.SIGN_IN);
export const signInSuccess = createAction(constants.SIGN_IN_SUCCESS);
export const signInFailure = createAction(constants.SIGN_IN_FAILURE);
