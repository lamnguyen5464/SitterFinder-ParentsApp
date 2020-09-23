import Constant from "../../shared/utils/constant/Constant";
import {AxiosFetch} from "../../api/AxiosFetch";

export function resetPassword({email}) {
	return new Promise((rs, rj) => {
		try {
			AxiosFetch({
				method: "POST",
				url: Constant.URL.API_URL_PATH.reset_password.url + "?email=" + email,
				data: {"email": email},
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
	resetPassword
};
