import {from, of} from "rxjs";
import {map, catchError, mergeMap} from "rxjs/operators";
import {ofType} from "redux-observable";
import * as constants from "./constants";
import {changePassword, resetPasswordByToken} from "./api";
import {changePasswordSuccess, changePasswordFailure, resetPasswordByTokenFailure, resetPasswordByTokenSuccess} from "./actions";

export const loadingChangePassword = () => ({type: constants.CHANGE_PASSWORD});

export const loadingChangePasswordEpic = action$ => {
	return action$.pipe(
		ofType(constants.CHANGE_PASSWORD),
		mergeMap(action =>
			from(changePassword({currentPassword: action.payload.currentPassword, email: action.payload.email, newPassword: action.payload.newPassword})).pipe(
				map(result => changePasswordSuccess({result})),
				catchError(error => of(changePasswordFailure({error})))
			)
		)
	);
};



export const loadingResetPassword = () => ({type: constants.RESET_PASSWORD});

export const loadingResetPasswordEpic = action$ => {
	return action$.pipe(
		ofType(constants.RESET_PASSWORD_BY_TOKEN),
		mergeMap(action =>
			from(resetPasswordByToken({token: action.payload.token, email: action.payload.email, newPassword: action.payload.newPassword})).pipe(
				map(result => resetPasswordByTokenSuccess({result})),
				catchError(error => of(resetPasswordByTokenFailure({error})))
			)
		)
	);
};
