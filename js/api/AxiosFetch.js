/**
 * Author: UraNashel - tan.nguyen@inapp.net
 */

import Constant from "../shared/utils/constant/Constant";
import Axios from "axios";
import LogManager from "../shared/utils/logging/LogManager";
import IALocalStorage from "../shared/utils/storage/IALocalStorage";

export const APP_URL = Constant.URL.urls.staging;

const AxiosInstance = Axios.create({
	timeout: Constant.TIME_OUT_REQUEST
});

function methodGet({url, ...config}) {
	return AxiosInstance.get(url, {...config});
}

async function methodPost({url, data, ...config}) {
	return AxiosInstance.post(url, data, {...config});
}

function methodPut({url, data, ...config}) {
	return AxiosInstance.put(url, data, {...config});
}

function methodDelete({url, ...config}) {
	return AxiosInstance.delete(url, {...config});
}

const methodFunctions = {
	[Constant.METHOD.post]: methodPost,
	[Constant.METHOD.put]: methodPut,
	[Constant.METHOD.get]: methodGet,
	[Constant.METHOD.delete]: methodDelete
};

export async function AxiosFetch({
	method,
	data = undefined,
	url,
	onSuccess = () => {},
	onError = () => {},
	hasToken = false,
	customToken,
	contentType,
	customBaseUrl // custom url service
}) {
	//Set token for all request if needed
	const token = await IALocalStorage.getUserToken();

	// Set custom service url
	AxiosInstance.defaults.baseURL = (customBaseUrl && customBaseUrl) || APP_URL;

	console.log(`BabySiter - URL Fetching: ${AxiosInstance.defaults.baseURL + url}`);
	console.log(`BabySiter - Data and Method: ${LogManager.parseJsonObjectToJsonString(data? data : {})}, Method ${method}`);
	console.log(`BabySiter - Token: ${customToken? customToken:  token} and Content type: ${contentType}`);

	// get axios function by method
	methodFunctions[method]({url, data, headers: {
		"Accept":"application/json, text/plain, */*",
		"Content-Type": contentType ? contentType : "application/json",
		"Authorization":  hasToken ? (customToken ? customToken : token) : null
	}})
		.then(res => {
			console.log(`====> ${method} ,_ ${url}  SUCCESS: ${LogManager.parseJsonObjectToJsonString(res.data)}`);
			onSuccess(res);
		})
		.catch(error => {
			console.log(`====> ${method} _ ${url} ERROR:  ${LogManager.parseJsonObjectToJsonString(error.response ? error.response : error)}`);
			onError(error.response ? error.response : error);
		});
}

export default {
	AxiosFetch
};
