import Constant from "../../shared/utils/constant/Constant";
import {AxiosFetch} from "../../api/AxiosFetch";

export function signIn({email, password, loginType = Constant.LOGIN_TYPE.original}) {
	return new Promise((rs, rj) => {
		try {
			AxiosFetch({
				method: "POST",
				url: Constant.URL.API_URL_PATH.login.url,
				data: {
					"email": email,
					"loginType": loginType,
					"password": password,
				  },
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
	signIn
};
