import {from, of} from "rxjs";
import {map, catchError, mergeMap} from "rxjs/operators";
import {ofType} from "redux-observable";
import * as constants from "./constants";
import {resetPassword} from "./api";
import {resetPasswordSuccess, resetPasswordFailure} from "./actions";

export const loadingReset = () => ({type: constants.RESET_PASSWORD});

export const loadingResetEpic = action$ => {
	return action$.pipe(
		ofType(constants.RESET_PASSWORD),
		mergeMap(action =>
			from(resetPassword({email: action.payload.email})).pipe(
				map(result => resetPasswordSuccess({result})),
				catchError(error => of(resetPasswordFailure({error})))
			)
		)
	);
};
