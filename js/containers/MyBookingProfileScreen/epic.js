import {from, of} from "rxjs";
import {map, catchError, mergeMap, concatMap} from "rxjs/operators";
import {ofType} from "redux-observable";
import * as constants from "./constants";
import {getUserSitterProfileFunc, getUserSitterAvailableFunc, 
	uploadImgToGoogleStoreFunc, uploadUserProfilePicture, 
	updateUserProfileFunc, getVersionFunc,
	updateDescFunc, updateRatesFunc,
	updateYoeFunc, updatesSpecialYoeFunc,
	updatesCerFunc, updatesTimeFunc} from "./api";
import {updateUserProfileSuccess, 
	updateUserProfileFailure, 
	getUserAvailableSitterFailure,
	getUserAvailableSitterSuccess, 
	uploadUserProfilePictureFailure, 
	uploadUserProfilePictureSuccess,
	getVersionSuccess, getVersionFailure,
	updateDescSuccess, getUserSitterFailure, 
	updateDescFailure, getUserSitterSuccess,
	updateRatesFailure, updateRatesSuccess,
	updateYOESuccess, updateYOEFailure,
	updateSpecialYOESuccess, updateSpecialYOEFailure,
	updateTimeSuccess, updateTimeFailure,
	updateCerSuccess, updateCerFailure
} from "./actions";


export const loadingGetUserSitterProfile = () => ({type: constants.GET_USER_SITTER});

export const loadingGetUserSitterEpic = action$ => {
	return action$.pipe(
		ofType(constants.GET_USER_SITTER),
		// eslint-disable-next-line no-unused-vars
		mergeMap(action =>
			from(getUserSitterProfileFunc({id: action.payload.id})).pipe(
				map(result => getUserSitterSuccess({result})),
				catchError(error => of(getUserSitterFailure({error})))
			)
		)
	);
};

export const loadingGetUserAvailableSitterProfile = () => ({type: constants.GET_USER_AVAILABLE_SITTER});

export const loadingGetUserAvailableSitterProfileEpic = action$ => {
	return action$.pipe(
		ofType(constants.GET_USER_AVAILABLE_SITTER),
		// eslint-disable-next-line no-unused-vars
		mergeMap(action =>
			from(getUserSitterAvailableFunc({id: action.payload.id})).pipe(
				map(result => getUserAvailableSitterSuccess({result})),
				catchError(error => of(getUserAvailableSitterFailure({error})))
			)
		)
	);
};

export const loadingUpdateUserProfile = () => ({type: constants.UPDATE_USER_PROFILE});

export const loadingUpdateUserProfileEpic = action$ => {
	return action$.pipe(
		ofType(constants.UPDATE_USER_PROFILE),
		// eslint-disable-next-line no-unused-vars
		mergeMap(action =>
			from(updateUserProfileFunc(
				{email: action.payload.email,
					address: action.payload.address,
					authorities: action.payload.authorities, 
					avatar: action.payload.avatar, 
					createdOn: action.payload.createdOn,
					customId: action.payload.customId,				 
					emergencyContact: action.payload.emergencyContact, 
					firstName: action.payload.firstName, 
					id: action.payload.id,
					idPassport: action.payload.idPassport,
					joinedDate: action.payload.joinedDate, 
					lastName: action.payload.lastName, 
					modifiedBy: action.payload.modifiedBy, 
					modifiedOn: action.payload.modifiedOn, 
					partners: action.payload.partners,
					password: action.payload.password, 
					phoneNumber: action.payload.phoneNumber, 
					socialNetwork: action.payload.socialNetwork, 
					socialToken: action.payload.socialToken, 
					userName: action.payload.userName,
					dateOfBirth: action.payload.dateOfBirth,
					customToken: action.payload.customToken
				}
			)).pipe(
				map(result => updateUserProfileSuccess({result})),
				catchError(error => of(updateUserProfileFailure({error})))
			)
		)
	);
};

export const loadingUploadImgGoogle = () => ({type: constants.UPLOAD_IMG_GOOGLE});

export const loadingUploadImgGoogleEpic = action$ => {
	return action$.pipe(
		ofType(constants.UPLOAD_IMG_GOOGLE),
		// eslint-disable-next-line no-unused-vars
		concatMap(action => {
			return from(uploadImgToGoogleStoreFunc({
				filename: action.payload.filename,
				email: action.payload.email,
				address: action.payload.address,
				authorities: action.payload.authorities, 
				createdOn: action.payload.createdOn,
				customId: action.payload.customId,				 
				emergencyContact: action.payload.emergencyContact, 
				firstName: action.payload.firstName, 
				id: action.payload.id,
				idPassport: action.payload.idPassport,
				joinedDate: action.payload.joinedDate, 
				lastName: action.payload.lastName, 
				modifiedBy: action.payload.modifiedBy, 
				modifiedOn: action.payload.modifiedOn, 
				partners: action.payload.partners,
				password: action.payload.password, 
				phoneNumber: action.payload.phoneNumber, 
				socialNetwork: action.payload.socialNetwork, 
				socialToken: action.payload.socialToken, 
				userName: action.payload.userName,
				dateOfBirth: action.payload.dateOfBirth
			})).pipe(
				mergeMap(data => from(updateUserProfileFunc({
					avatar: data.data.data.url, 
					email: action.payload.email,
					address: action.payload.address,
					authorities: action.payload.authorities, 
					createdOn: action.payload.createdOn,
					customId: action.payload.customId,				 
					emergencyContact: action.payload.emergencyContact, 
					firstName: action.payload.firstName, 
					id: action.payload.id,
					idPassport: action.payload.idPassport,
					joinedDate: action.payload.joinedDate, 
					lastName: action.payload.lastName, 
					modifiedBy: action.payload.modifiedBy, 
					modifiedOn: action.payload.modifiedOn, 
					partners: action.payload.partners,
					password: action.payload.password, 
					phoneNumber: action.payload.phoneNumber, 
					dateOfBirth: action.payload.dateOfBirth,
					socialNetwork: action.payload.socialNetwork, 
					socialToken: action.payload.socialToken, 
					userName: action.payload.userName}
				)).pipe(
					map(result => updateUserProfileSuccess({result})),
					catchError(error => of(updateUserProfileFailure({error})))
				)));
		}));};
			
						
export const loadingUploadUserProfilePicture = () => ({type: constants.UPLOAD_USER_PROFILE_PICTURE});

export const loadingUploadUserProfilePictureEpic = action$ => {
	return action$.pipe(
		ofType(constants.UPLOAD_USER_PROFILE_PICTURE),
		// eslint-disable-next-line no-unused-vars
		mergeMap(action =>
			from(uploadUserProfilePicture({filename: action.payload.filename})).pipe(
				map(result => uploadUserProfilePictureSuccess({result})),
				catchError(error => of(uploadUserProfilePictureFailure({error})))
			)
		)
	);
};


export const loadingVersion = () => ({type: constants.GET_VERSION});

export const loadingVersionEpic = action$ => {
	return action$.pipe(
		ofType(constants.GET_VERSION),
		// eslint-disable-next-line no-unused-vars
		mergeMap(action =>
			from(getVersionFunc({})).pipe(
				map(result => getVersionSuccess({result})),
				catchError(error => of(getVersionFailure({error})))
			)
		)
	);
};


export const updateDescEpic = action$ => {
	return action$.pipe(
		ofType(constants.UPDATE_DESC),
		// eslint-disable-next-line no-unused-vars
		mergeMap(action =>
			from(updateDescFunc({id: action.payload.id, description: action.payload.description})).pipe(
				map(result => updateDescSuccess({result})),
				catchError(error => of(updateDescFailure({error})))
			)
		)
	);
};


export const updateRatesEpic = action$ => {
	return action$.pipe(
		ofType(constants.UPDATE_RATES),
		// eslint-disable-next-line no-unused-vars
		mergeMap(action =>
			from(updateRatesFunc({id: action.payload.id, ratePerHourForNumberOfChilds: action.payload.ratePerHourForNumberOfChilds})).pipe(
				map(result => updateRatesSuccess({result})),
				catchError(error => of(updateRatesFailure({error})))
			)
		)
	);
};


export const updateYoeEpic = action$ => {
	return action$.pipe(
		ofType(constants.UPDATE_YOE),
		// eslint-disable-next-line no-unused-vars
		mergeMap(action =>
			from(updateYoeFunc({id: action.payload.id, experiences: action.payload.experiences})).pipe(
				map(result => updateYOESuccess({result})),
				catchError(error => of(updateYOEFailure({error})))
			)
		)
	);
};


export const updateSpecialYoeEpic = action$ => {
	return action$.pipe(
		ofType(constants.UPDATE_SPECIAL_YOE),
		// eslint-disable-next-line no-unused-vars
		mergeMap(action =>
			from(updatesSpecialYoeFunc({id: action.payload.id, specialExperiences: action.payload.specialExperiences})).pipe(
				map(result => updateSpecialYOESuccess({result})),
				catchError(error => of(updateSpecialYOEFailure({error})))
			)
		)
	);
};

export const updateCerEpic = action$ => {
	return action$.pipe(
		ofType(constants.UPDATE_TIME),
		// eslint-disable-next-line no-unused-vars
		mergeMap(action =>
			from(updatesCerFunc({id: action.payload.id, recurringAvaibilities: action.payload.recurringAvaibilities})).pipe(
				map(result => updateCerSuccess({result})),
				catchError(error => of(updateCerFailure({error})))
			)
		)
	);
};


export const updateTimeEpic = action$ => {
	return action$.pipe(
		ofType(constants.UPDATE_TIME),
		// eslint-disable-next-line no-unused-vars
		mergeMap(action =>
			from(updatesTimeFunc({id: action.payload.id, recurringAvaibilities: action.payload.recurringAvaibilities})).pipe(
				map(result => updateTimeSuccess({result})),
				catchError(error => of(updateTimeFailure({error})))
			)
		)
	);
};
