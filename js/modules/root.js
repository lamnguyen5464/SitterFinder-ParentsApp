import {combineEpics} from "redux-observable";
import {combineReducers} from "redux";

import {
	loadingAnimSplashEpic,
	loadingAnimSplashEpicSuccess
} from "../containers/SplashScreen/epic";

import {loadingSignInEpic} from "../containers/LoginScreen/epic";
import {loadingSignUpEpic} from "../containers/SignUpScreen/epic";
import {loadingResetEpic} from "../containers/ForgotPasswordScreen/epic";
import {loadingChangePasswordEpic, loadingResetPasswordEpic} from "../containers/ChangePasswordScreen/epic";
import {loadingGetUserProfileEpic, loadingUpdateUserProfileEpic, loadingUploadImgGoogleEpic, loadingVersionEpic} from "../containers/ProfileScreen/epic";
import {loadingGetUserSitterEpic, loadingGetUserAvailableSitterProfileEpic,
	updateDescEpic, updateRatesEpic, updateYoeEpic, updateSpecialYoeEpic,
	updateCerEpic, updateTimeEpic} from "../containers/MyBookingProfileScreen/epic";

import loginReducer from "../containers/LoginScreen/reducer";
import signUpReducer from "../containers/SignUpScreen/reducer";
import splashReducer from "../containers/SplashScreen/reducer";
import resetPasswordReducer from "../containers/ForgotPasswordScreen/reducer";
import changePasswordReducer from "../containers/ChangePasswordScreen/reducer";
import userProfileReducer from "../containers/ProfileScreen/reducer";
import homeReducer from "../containers/HomeScreen/reducer";
import userProfileSitterReducer from "../containers/MyBookingProfileScreen/reducer";


/**
 * Combine all the epics into root
 */
export const rootEpic = combineEpics(
	loadingAnimSplashEpic,
	loadingAnimSplashEpicSuccess,
	loadingSignInEpic,
	loadingSignUpEpic,
	loadingResetEpic,
	loadingChangePasswordEpic,
	loadingGetUserProfileEpic,
	loadingUpdateUserProfileEpic,
	loadingUploadImgGoogleEpic,
	loadingVersionEpic,
	loadingResetPasswordEpic,
	loadingGetUserSitterEpic,
	loadingGetUserAvailableSitterProfileEpic,
	updateDescEpic,
	updateRatesEpic,
	updateYoeEpic,
	updateSpecialYoeEpic,
	updateCerEpic,
	updateTimeEpic
);

/**
 * Combine all the reducers into root
 */
export const rootReducer = combineReducers({
	loginReducer,
	splashReducer,
	signUpReducer,
	resetPasswordReducer,
	changePasswordReducer,
	userProfileReducer,
	homeReducer,
	userProfileSitterReducer
});
