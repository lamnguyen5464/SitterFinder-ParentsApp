import Constant from "../../shared/utils/constant/Constant";
import {AxiosFetch} from "../../api/AxiosFetch";

export function signUp({email, phoneNumber, password, name, loginType, authorities, dateOfBirth, invitationCode}) {
	return new Promise((rs, rj) => {
		try {
			AxiosFetch({
				method: "POST",
				url: Constant.URL.API_URL_PATH.signup.url,
				data: {"invitationCode": invitationCode, "authorities": authorities, "name": name, "loginType": loginType, "email": email, "phoneNumber": phoneNumber, "password": password, "dateOfBirth": dateOfBirth},
				onSuccess: data => {
					rs(data);
				},
				onError: error => {
					rj(error);
				}
			});
		// eslint-disable-next-line no-empty
		} catch (error) {
		}
	});
}

export default {
	signUp
};
