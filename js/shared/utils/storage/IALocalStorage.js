import IAStorageManager from "./IAStorageManager";
import Constant from "../constant/Constant";

class IALocalStorage {

  /**
   * Set/get user info
   */
  static setUserInfo = async (userInfo) => {
  	await IAStorageManager.setItem(Constant.USER.USER_INFO, userInfo);
  }

  static getUserInfo = async () => {
  	return await IAStorageManager.getItem(Constant.USER.USER_INFO);
  }
  
  /**
   * Set/get detail user info
   */
  static setUserDetailInfo = async (userInfo) => {
  	await IAStorageManager.setItem(Constant.USER.USER_DETAIL_INFO, userInfo);
  }

  static getUserDetailInfo = async () => {
  	return await IAStorageManager.getItem(Constant.USER.USER_DETAIL_INFO);
  }

  /**
   * Set/get user email
   */
  static setUserEmail = async (userInfo) => {
  	await IAStorageManager.setItem(Constant.USER.USER_EMAIL, userInfo);
  }

  static getUserEmail = async () => {
  	return await IAStorageManager.getItem(Constant.USER.USER_EMAIL);
  }

  /**
   * Set/get user email
   */
  static setIsParent = async (userInfo) => {
  	await IAStorageManager.setItem("parent", userInfo);
  }

  static getIsParent = async () => {
  	return await IAStorageManager.getItem("parent");
  }
  /**
   * Set/get user info token
   */
  static setUserToken = async (userInfo) => {
  	await IAStorageManager.setItem(Constant.USER.USER_TOKEN, userInfo);
  }

  static getUserToken = async () => {
  	return await IAStorageManager.getItem(Constant.USER.USER_TOKEN);
  }

  /**
   * Set/get user TOKEN FBSDK info
   */
  static setTokenUserInfoFacebook = async (tokenUserInfo) => {
  	await IAStorageManager.setItem(Constant.USER.TOKEN_INFO, tokenUserInfo);
  }

  static getTokenUserInfoFacebook = async () => {
  	return await IAStorageManager.getItem(Constant.USER.TOKEN_INFO);
  }

  /**
   * Set/get device TOKEN info
   */
  static setDeviceToken = async (deviceToken) => {
  	await IAStorageManager.setItem(Constant.USER.DEVICE_TOKEN, deviceToken);
  }

  static getDeviceToken = async () => {
  	return await IAStorageManager.getItem(Constant.USER.DEVICE_TOKEN);
  }

  /**
   * Set/get add
   */
  static setTempAdd = async (deviceToken) => {
  	await IAStorageManager.setItem("add", deviceToken);
  }

  static getTempAdd = async () => {
  	return await IAStorageManager.getItem("add");
  }

  /**
   * Set/get TouchID
   */
  static setTouchID = async (has) => {
  	await IAStorageManager.setItem(Constant.USER.TOUCH_ID, has);
  }

  static getTouchID = async () => {
  	return await IAStorageManager.getItem(Constant.USER.TOUCH_ID);
  }

  /**
   * Set/get FaceID
   */
  static setFaceID = async (has) => {
  	await IAStorageManager.setItem(Constant.USER.FACE_ID, has);
  }

  static getFaceID = async () => {
  	return await IAStorageManager.getItem(Constant.USER.FACE_ID);
  }



  /**
   * Reset all token and user info
   */
  static resetLocalStorage = async () => {
  	await IAStorageManager.removeItem(Constant.USER.TOKEN_INFO);
  	await IAStorageManager.removeItem(Constant.USER.USER_EMAIL);
  	await IAStorageManager.removeItem(Constant.USER.USER_INFO);
  	await IAStorageManager.removeItem(Constant.USER.DEVICE_TOKEN);
  	await IAStorageManager.removeItem(Constant.USER.USER_TOKEN);
  }

}

export default IALocalStorage;