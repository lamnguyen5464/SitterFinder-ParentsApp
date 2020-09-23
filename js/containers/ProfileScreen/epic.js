import {from, of} from "rxjs";
import {map, catchError, mergeMap, concatMap} from "rxjs/operators";
import {ofType} from "redux-observable";
import * as constants from "./constants";
import {getUserProfileFunc, uploadImgToGoogleStoreFunc, uploadUserProfilePicture, updateUserProfileFunc, getVersionFunc} from "./api";
import {updateUserProfileSuccess, updateUserProfileFailure, getUserProfileFailure,
	getUserProfileSuccess, uploadUserProfilePictureFailure, uploadUserProfilePictureSuccess,
	getVersionSuccess, getVersionFailure} from "./actions";
// import { concatMapTo } from "rxjs-compat/operator/concatMapTo";

export const loadingGetUserProfile = () => ({type: constants.GET_USER_PROFILE});

export const loadingGetUserProfileEpic = action$ => {
	return action$.pipe(
		ofType(constants.GET_USER_PROFILE),
		// eslint-disable-next-line no-unused-vars
		mergeMap(action =>
			from(getUserProfileFunc({email: action.payload.email})).pipe(
				map(result => getUserProfileSuccess({result})),
				catchError(error => of(getUserProfileFailure({error})))
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
