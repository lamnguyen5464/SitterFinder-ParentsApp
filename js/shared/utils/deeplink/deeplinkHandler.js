import {Linking} from "react-native";
import NavigationService from "../navigation/NavigationService";
import {ScreenNames} from "../../../route/ScreenNames";

const getUrlParameter = (url, name) => {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
	var results = regex.exec(url);
	return results === null
		? ""
		: decodeURIComponent(results[1].replace(/\+/g, " "));
};

export function deeplinkHandler({url}) {
	console.log(url);
	if (url.includes("resetPassword")) {
		let email = getUrlParameter(url, "email");
		const token = email.split("amp;token=")[1] || "";
		email = email.split("amp;token=")[0] || "";
		console.log(token);
		console.log(email);
		return NavigationService.navigate(ScreenNames.ChangePasswordScreen, {
			token, email
		});
	}
	if (url.includes("league")) {
		const id = getUrlParameter(url, "id");
		const invitedBy = getUrlParameter(url, "invitedBy");
		return NavigationService.navigate(ScreenNames.LeagueDetailScreen, {
			invitedBy,
			item: {id},
		});
	}
}
