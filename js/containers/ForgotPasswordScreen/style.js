import {StyleSheet, Platform} from "react-native";
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
		fontSize: Platform.OS === "ios" ? 28 : 26,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		color: colors.white
	},
	signInTitle: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 14,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		marginTop: 8,
		color: colors.white
	},
	mainContent: {
		marginStart: 32,
		marginEnd: 32,
		marginBottom: 38
	},
	headerLeft: {
		marginStart: 32
	},
	inputEmail: {
		marginTop: 34,
		marginBottom: 69
	},
	inputPass: {
		marginBottom: 9
	},
	formContainer: {
		marginBottom: 9,
		marginTop: 40
	},
	buttonView: {
		width: 200,
		height: 65,
		// backgroundColor: null
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
		color: colors.white
	},
	buttonSignInContainer: {
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		height: 53,
		borderColor: colors.blue,
		backgroundColor: colors.blue,
		borderWidth: 1,
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
