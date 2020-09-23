import {from, of} from "rxjs";
import {map, catchError, mergeMap} from "rxjs/operators";
import {ofType} from "redux-observable";
import * as constants from "./constants";
import {signIn} from "./api";
import {signInSuccess, signInFailure} from "./actions";

export const loadingSignIn = () => ({type: constants.SIGN_IN});

export const loadingSignInEpic = action$ => {
	return action$.pipe(
		ofType(constants.SIGN_IN),
		mergeMap(action =>
			from(signIn({
				email: action.payload.email, 
				password: action.payload.password, 
				loginType: action.payload.loginType
			})).pipe(
				map(result => signInSuccess({result})),
				catchError(error => of(signInFailure({error})))
			)
		)
	);
};