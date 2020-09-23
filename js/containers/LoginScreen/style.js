import {StyleSheet} from "react-native";
import {colors} from "../../shared/utils/colors/colors";
import {ScreenHeight, ScreenWidth} from "../../shared/utils/dimension/Divices";
import fonts from "../../shared/utils/fonts/fonts";

const HEADER_HEIGHT = ScreenHeight * 0.3;
const HEADER_WIDTH = ScreenWidth;

export const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		paddingBottom: 10,
		paddingTop: 10,
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
		letterSpacing: 0,
		color: colors.textDefault
	},
	signInTitle: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 13.5,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		marginTop: 8,
		color: colors.white
	},
	mainContent: {
		marginStart: 20,
		marginEnd: 20,
		flex: 1,
		marginTop: 20,
		justifyContent: "center",
		alignContent: "center",
	},
	headerLeft: {
		marginStart: 32
	},
	inputEmail: {
		marginTop: 14,
		marginBottom: 29
	},
	inputPass: {
		marginBottom: 1
	},
	formContainer: {
		marginBottom: 5,
		marginTop: 5
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
		fontSize: 20,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		color: colors.whiteWithOpacity
	},
	buttonSignInContainer: {
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		height: 53,
		backgroundColor: colors.blue,
		borderRadius: 26.5,
	},
	btnLogin: {
		marginTop: 18,
	},
	btnLoginContainer: {
		height: 70,
		marginBottom: 37
	},
	btnFBLoginContainer: {
		backgroundColor: colors.blue,
		height: 45,	
		alignContent: "center",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 20,
		shadowColor: "#0000003a",
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowRadius: 7,
		shadowOpacity: 1
	},
	fbContainer: {
		marginTop: 27,
		width: ScreenWidth / 2 - 40,
		height: 45,
		marginEnd: 5
	},
	forgotPassword: {
		alignItems: "center",
		marginBottom: 5,
		marginTop: 15,
	},
	btnGoogleLoginContainer: {
		backgroundColor: colors.orange,
		height: 45,	
		alignContent: "center",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 20,
		shadowColor: "#0000003a",
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowRadius: 7,
		shadowOpacity: 1
	},
	googleContainer: {
		marginTop: 27,
		width: ScreenWidth / 2 - 40,
		height: 45,
		marginStart: 5
	},
	fbText: {
		fontWeight: "bold",
		fontSize: 16,
		color: colors.white,
		fontFamily: fonts.family.nunito.bold,
	},
	containerLoginSocial: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignContent: "center",
		alignItems: "center",
	}
});

export default styles;
