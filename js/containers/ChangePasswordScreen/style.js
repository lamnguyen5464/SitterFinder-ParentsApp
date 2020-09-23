import {StyleSheet} from "react-native";
import {colors} from "../../shared/utils/colors/colors";
import {ScreenHeight, ScreenWidth} from "../../shared/utils/dimension/Divices";
import fonts from "../../shared/utils/fonts/fonts";

const HEADER_HEIGHT = ScreenHeight * 0.3;
const HEADER_WIDTH = ScreenWidth;

export const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: colors.white,
		flex: 1
	},
	headerBackground: {
		backgroundColor: colors.deluge,
		height: HEADER_HEIGHT,
		width: HEADER_WIDTH,
		borderBottomLeftRadius: 60
	},
	welcomeTitle: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 28,
		fontWeight: "normal",
		fontStyle: "normal",
		marginLeft: 30,
		letterSpacing: 0,
		color: colors.textDefault
	},
	btnLogout: {
		marginTop: 38,
		borderRadius: 26,
		height: 54,
		marginEnd: 10,
		marginLeft: 10,
		paddingVertical: 12,
		borderWidth: 1,
		borderColor: colors.blue,
		justifyContent: "center",
		alignItems: "center"
	},
	signInTitle: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 14,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		marginTop: 8,
		color: colors.textDefaultWithOpacity
	},
	mainContent: {
		marginLeft: 20,
		marginEnd: 20,
		padding: 20,
		marginBottom: 50,
		marginTop: 20,
		flex: 1,
		borderRadius: 10,
		elevation: 2,
		shadowColor: colors.black,
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowRadius: 10,
		shadowOpacity: 0.3
	},
	headerLeft: {
		marginStart: 32
	},
	inputEmail: {
		marginTop: 14,
		marginBottom: 29
	},
	inputPass: {
		marginBottom: 9,
		marginTop: 20,
	},
	formContainer: {
		backgroundColor: colors.white,
		marginBottom: 9,
		marginTop: 20,
		padding: 10,
		paddingStart: 20,
		paddingEnd: 20,
		borderRadius: 10,
	},
	buttonView: {
		width: 200,
		height: 65,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignContent: "center"
	},
	buttonText: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 16,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		color: colors.blue
	},
	buttonSignInContainer: {
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		height: 53,
		backgroundColor: colors.green,
		borderRadius: 26.5,
	},
	btnLogin: {
		marginTop: 22,
	},
	btnLoginContainer: {
		height: 70,
		marginBottom: 27
	},
	btnFBLoginContainer: {
		backgroundColor: colors.blue,
		height: 39,
		alignContent: "center",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 100,
		shadowColor: "#0000003a",
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowRadius: 7,
		shadowOpacity: 1
	},
	fbContainer: {
		marginTop: 27
	},
	btnGoogleLoginContainer: {
		backgroundColor: colors.white,
		height: 39,
		alignContent: "center",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 100,
		shadowColor: "#00000021",
		shadowOffset: {
			width: 1,
			height: 2
		},
		shadowRadius: 7,
		shadowOpacity: 1
	},
	googleContainer: {
		marginTop: 14
	},
	termAndCondition: {
		fontFamily: "Avenir",
		fontSize: 14,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		color: "#595959"
	}
});

export default styles;
