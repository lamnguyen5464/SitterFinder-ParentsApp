import {StyleSheet, Platform} from "react-native";
import {colors} from "../../shared/utils/colors/colors";
import fonts from "../../shared/utils/fonts/fonts";

export const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: colors.white,
		flex: 1,
	},
	welcomeTitle: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: Platform.OS === "ios" ? 26 : 24,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		color: colors.white,
		marginBottom: 22,
		marginTop: 11
	},
	mainContent: {
		paddingBottom: 20
	},
	phoneInput: {
		fontSize: 18,
		color: colors.white,
		width: "100%"
	},
	btnLoginContainer: {
		height: 70,
		marginBottom: 27
	},
	btnLogin: {
		marginTop: 38,
	},
	buttonText: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 16,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		color: colors.white
	},
	buttonSignInContainer: {
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		height: 53,
		backgroundColor: colors.blue,
		borderRadius: 26.5,
	},
});

export default styles;
