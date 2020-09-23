import {from, of} from "rxjs";
import {map, catchError, mergeMap} from "rxjs/operators";
import {ofType} from "redux-observable";
import * as constants from "./constants";
import {signUp} from "./api";
import {signUpSuccess, signUpFailure} from "./actions";


export const loadingSignUp = () => ({type: constants.SIGN_UP});

export const loadingSignUpEpic = action$ => {
	return action$.pipe(
		ofType(constants.SIGN_UP),
		mergeMap(action => {
			return from(signUp(action.payload)).pipe(
				map(result => signUpSuccess({result})),
				catchError(error => of(signUpFailure({error})))
			);
		})
	);
};
