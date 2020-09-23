import {ofType} from "redux-observable";
import {delay, mapTo} from "rxjs/operators";
import {SPLASH_ANIM, SPLASH_COUNTER, SPLASH_ANIM_FINISH} from "./constants";

export const loadingAnimSplash = () => ({type: SPLASH_ANIM});

export const loadingAnimSplashEpic = action$ =>
	action$.pipe(
		ofType(SPLASH_ANIM),
		delay(1000),
		mapTo({type: SPLASH_COUNTER})
	);

export const loadingAnimSplashEpicSuccess = action$ =>
	action$.pipe(
		ofType(SPLASH_ANIM_FINISH),
		delay(500),
		mapTo({type: SPLASH_ANIM_FINISH})
	);
