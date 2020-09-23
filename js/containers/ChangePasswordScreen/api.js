import Constant from "../../shared/utils/constant/Constant";
import {AxiosFetch} from "../../api/AxiosFetch";

export function changePassword({currentPassword, email, newPassword}) {
	return new Promise((rs, rj) => {
		try {
			AxiosFetch({
				method: "POST",
				url: Constant.URL.API_URL_PATH.change_password.url,
				data: {"currentPassword": currentPassword, "email": email, "newPassword": newPassword},
				contentType: "application/json",
				onSuccess: data => {
					rs(data.result);
				},
				onError: error => {
					rj(error);
				},
				hasToken: true
			});
		// eslint-disable-next-line no-empty
		} catch (error) {
		}
	});
}

export function resetPasswordByToken({token, email, newPassword}) {
	return new Promise((rs, rj) => {
		try {
			AxiosFetch({
				method: "POST",
				url: Constant.URL.API_URL_PATH.resetPasswordToken.url,
				data: {"token": token, "email": email, "newPassword": newPassword},
				contentType: "application/json",
				onSuccess: data => {
					rs(data.result);
				},
				onError: error => {
					rj(error);
				},
				hasToken: false
			});
		// eslint-disable-next-line no-empty
		} catch (error) {
		}
	});
}

export default {
	changePassword,
	resetPasswordByToken
};
