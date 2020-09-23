import {createAction} from "../../shared/utils/action/action";
import * as constants from "./constants";

export const uploadImgGoogle = createAction(constants.UPLOAD_IMG_GOOGLE);
export const uploadImgGoogleSuccess = createAction(constants.UPLOAD_IMG_GOOGLE_SUCCESS);
export const uploadImgGoogleFailure = createAction(constants.UPLOAD_IMG_GOOGLE_FAILURE);

export const uploadUserProfilePicture = createAction(constants.UPLOAD_USER_PROFILE_PICTURE);
export const uploadUserProfilePictureSuccess = createAction(constants.UPLOAD_USER_PROFILE_PICTURE_SUCCESS);
export const uploadUserProfilePictureFailure = createAction(constants.UPLOAD_USER_PROFILE_PICTURE_FAILURE);

export const getUserProfile = createAction(constants.GET_USER_PROFILE);
export const getUserProfileSuccess = createAction(constants.GET_USER_PROFILE_SUCCESS);
export const getUserProfileFailure = createAction(constants.GET_USER_PROFILE_FAILURE);

export const updateUserProfile = createAction(constants.UPDATE_USER_PROFILE);
export const updateUserProfileSuccess = createAction(constants.UPDATE_USER_PROFILE_SUCCESS);
export const updateUserProfileFailure = createAction(constants.UPDATE_USER_PROFILE_FAILURE);

export const getVersion = createAction(constants.GET_VERSION);
export const getVersionSuccess = createAction(constants.GET_VERSION_SUCCESS);
export const getVersionFailure = createAction(constants.GET_VERSION_FAILURE);