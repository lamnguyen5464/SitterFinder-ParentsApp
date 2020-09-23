import Constant from "../../shared/utils/constant/Constant";
import {AxiosFetch} from "../../api/AxiosFetch";
const FormData = require("form-data");


String.prototype.format = function () {
	var args = [].slice.call(arguments);
	return this.replace(/(\{\d+\})/g, function (a){
		return args[+(a.substr(1,a.length-2))||0];
	});
};

// Get user profile
// eslint-disable-next-line no-empty-pattern
export function getUserSitterProfileFunc({id}) {
	// eslint-disable-next-line no-unused-vars
	return new Promise((rs, rj) => {
		AxiosFetch({
			method: "GET",
			url: Constant.URL.API_URL_PATH.sitter.getDetailProfile.url + id,
			data: null,
			contentType: "application/json",
			onSuccess: data => {
				rs(data);
			},
			onError: error => {
				rj(error);
			},
			hasToken: true
		});
	});
}

// Get user profile
// eslint-disable-next-line no-empty-pattern
export function getUserSitterAvailableFunc({id}) {
	// eslint-disable-next-line no-unused-vars
	return new Promise((rs, rj) => {
		AxiosFetch({
			method: "GET",
			url: Constant.URL.API_URL_PATH.sitter.getDetailAvailable.url + id,
			data: null,
			contentType: "application/json",
			onSuccess: data => {
				rs(data);
			},
			onError: error => {
				rj(error);
			},
			hasToken: true
		});
	});
}

// Get user profile
// eslint-disable-next-line no-empty-pattern
export function updateUserProfileFunc({address, email, authorities, avatar, createdOn, 
	customId, emergencyContact, firstName, id, idPassport, modifiedBy, modifiedOn, lastName, joinedDate, 
	partners, socialToken, userName, socialNetwork, phoneNumber, password, dateOfBirth, customToken}) {
	// eslint-disable-next-line no-unused-vars
	return new Promise((rs, rj) => {
		AxiosFetch({
			method: "POST",
			url: Constant.URL.API_URL_PATH.user.updateProfile.url,
			data: {"dateOfBirth": dateOfBirth, "address": address, "authorities": authorities, "avatar": avatar, "createdOn": createdOn, "customId": customId,
				"email": email, "emergencyContact": emergencyContact, "firstName": firstName, "id": id, "idPassport": idPassport,
				"joinedDate": joinedDate, "lastName": lastName, "modifiedBy": modifiedBy, "modifiedOn": modifiedOn, "partners": partners,
				"password": password, "phoneNumber": phoneNumber, "socialNetwork": socialNetwork, "socialToken": socialToken, "name": userName},
			contentType: "application/json",
			onSuccess: data => {
				rs(data);
			},
			onError: error => {
				rj(error);
			},
			hasToken: true,
			customToken: customToken
		});
	});
}

// Get url img uploaded
export function uploadUserProfilePicture({filename}) {
	return new Promise((rs, rj) => {
		AxiosFetch({
			method: "PUT",
			url: Constant.URL.API_URL_PATH.user.updateProfilePicture.url,
			contentType: "application/json",
		  	data: {"avatar": filename},
			onSuccess: data => {
				rs(data);
			},
			onError: error => {
				rj(error);
			},
			hasToken: true
		});
	});
}

// Img uploading
export async function uploadImgToGoogleStoreFunc({filename}) {
	var form = new FormData();
	form.append("file", {
		name: new Date().getTime() + ".PNG",
		type: "image/png",
		uri: filename.image,
	});
	return new Promise((rs, rj) => {
		AxiosFetch({
			url: Constant.URL.API_URL_PATH.league.getUrlImageUploaded.url,
			method: "POST",
			customBaseUrl: "https://staging-fanathon.inapps.technology:8443/api",
			data: form,
			contentType: "multipart/form-data",
			onSuccess: data => {
				rs(data);
			},
			onError: error => {
				rj(error);
			},
			hasToken: true
		});
	});
}

// Get version
// eslint-disable-next-line no-empty-pattern
export function getVersionFunc({ }) {
	return new Promise((rs, rj) => {
		AxiosFetch({
			method: "GET",
			url: Constant.URL.API_URL_PATH.user.getVersion.url,
			contentType: "application/json",
		  	data: null,
			onSuccess: data => {
				rs(data);
			},
			onError: error => {
				rj(error);
			},
			hasToken: true
		});
	});
}

// Update desc
export function updateDescFunc({id, description}) {
	return new Promise((rs, rj) => {
		AxiosFetch({
			method: "PUT",
			url: Constant.URL.API_URL_PATH.sitter.updateDesc.url.format(id),
			contentType: "application/json",
		  	data: {"id": id, "description": description},
			onSuccess: data => {
				rs(data);
			},
			onError: error => {
				rj(error);
			},
			hasToken: true
		});
	});
}

//Update rates
export function updateRatesFunc({id, ratePerHourForNumberOfChilds}) {
	return new Promise((rs, rj) => {
		AxiosFetch({
			method: "PUT",
			url: Constant.URL.API_URL_PATH.sitter.updateRates.url.format(id),
			contentType: "application/json",
		  	data: {"id": id, "ratePerHourForNumberOfChilds": ratePerHourForNumberOfChilds},
			onSuccess: data => {
				rs(data);
			},
			onError: error => {
				rj(error);
			},
			hasToken: true
		});
	});
}


//Update rates
export function updateYoeFunc({id, experiences}) {
	return new Promise((rs, rj) => {
		AxiosFetch({
			method: "PUT",
			url: Constant.URL.API_URL_PATH.sitter.updateYoe.url.format(id),
			contentType: "application/json",
		  	data: {"id": id, "experiences": experiences},
			onSuccess: data => {
				rs(data);
			},
			onError: error => {
				rj(error);
			},
			hasToken: true
		});
	});
}

//Update rates
export function updatesSpecialYoeFunc({id, specialExperiences}) {
	return new Promise((rs, rj) => {
		AxiosFetch({
			method: "PUT",
			url: Constant.URL.API_URL_PATH.sitter.updateSpecialYoe.url.format(id),
			contentType: "application/json",
		  	data: {"id": id, "specialExperiences": specialExperiences},
			onSuccess: data => {
				rs(data);
			},
			onError: error => {
				rj(error);
			},
			hasToken: true
		});
	});
}


//Update rates
export function updatesCerFunc({id, certificates}) {
	return new Promise((rs, rj) => {
		AxiosFetch({
			method: "PUT",
			url: Constant.URL.API_URL_PATH.sitter.updateCer.url.format(id),
			contentType: "application/json",
		  	data: {"id": id, "certificates": certificates},
			onSuccess: data => {
				rs(data);
			},
			onError: error => {
				rj(error);
			},
			hasToken: true
		});
	});
}


//Update rates
export function updatesTimeFunc({id, recurringAvaibilities}) {
	return new Promise((rs, rj) => {
		AxiosFetch({
			method: "PUT",
			url: Constant.URL.API_URL_PATH.sitter.updateTime.url.format(id),
			contentType: "application/json",
		  	data: {"id": id, "recurringAvaibilities": recurringAvaibilities},
			onSuccess: data => {
				rs(data);
			},
			onError: error => {
				rj(error);
			},
			hasToken: true
		});
	});
}


export default {
	uploadUserProfilePicture,
	uploadImgToGoogleStoreFunc,
	getUserSitterProfileFunc,
	updateUserProfileFunc,
	getVersionFunc,
	updateDescFunc,
	updateRatesFunc,
	updateYoeFunc,
	updatesSpecialYoeFunc,
	updatesCerFunc,
	updatesTimeFunc
};
