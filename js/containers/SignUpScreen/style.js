import {StyleSheet} from "react-native";
import {colors} from "../../shared/utils/colors/colors";
import {ScreenHeight, ScreenWidth} from "../../shared/utils/dimension/Divices";
import fonts from "../../shared/utils/fonts/fonts";

const HEADER_HEIGHT = ScreenHeight * 0.3;
const HEADER_WIDTH = ScreenWidth;

export const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		paddingBottom: 34
	},
	headerBackground: {
		backgroundColor: colors.deluge,
		height: HEADER_HEIGHT,
		width: HEADER_WIDTH,
		borderBottomLeftRadius: 60
	},
	welcomeTitle: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 26,
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
		marginBottom: 38,
		// flex: 12,
	},
	headerLeft: {
		marginStart: 32
	},
	inputEmail: {
		marginTop: 0,
		marginBottom: 10
	},
	inputPass: {
		marginTop: 10,
		marginBottom: 10
	},
	formContainer: {
		backgroundColor: colors.white,
		borderRadius: 20,
		paddingVertical: 10
	},
	buttonView: {
		width: 200,
		height: 65,
		// backgroundColor: null
	},
	checkBox: {
		height: 23,
		width: 23,
		borderStyle: "solid",
		borderWidth: 0.5,
		borderColor: "#808080"
	},
	checkBoxContainer: {
		flex: 1,
		padding: 1,
		borderColor: colors.yellow
	},
	termConditionContainer: {
		flexDirection: "row"
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
		backgroundColor: colors.blue,
		borderRadius: 26.5,
	},
	btnLogin: {
		marginTop: 38,
	},
	btnLoginContainer: {
		height: 70,
		marginBottom: 27
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
		width: ScreenWidth / 2 - 40,
		height: 45,
		marginStart: 5
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
	phoneEmergency: {
		flex: 1,
		width: "100%",
		// maxWidth: 315,
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: colors.input_underline,
	},
	labelPhoneEmergency: {
		fontSize: 14,
		fontFamily: fonts.family.nunito.regular,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: -0.7,
		opacity: 0.5,
		color: colors.white							
	},
	forgotPassword: {
		alignItems: "center",
		marginBottom: 5,
		marginTop: 10,
	},
	textPhoneEmergency: {
		fontFamily: fonts.family.montserrat.regular,
		fontSize: 17,
		color: colors.white,
		letterSpacing: 0.38,
		flex: 1,
		width: "100%"
	},
	inputPhoneEmergency: {
		fontFamily: fonts.family.nunito.regular,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: -0.7,
		opacity: 0.5,
		color: colors.white,
	},
	googleContainer: {
		width: ScreenWidth / 2 - 40,
		height: 45,
		marginStart: 5
	},
	termAndCondition: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 14,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		color: "#595959"
	},
	iconBack:{
		color: colors.white
	},
	sitter: {
		borderColor: colors.white, 
		borderRadius: 10, 
		width: "48%", 
		height: 40, 
		justifyContent: "center", 
		alignItems: "center",
	},
	parent: {
		borderColor: colors.white, 
		borderRadius: 10, 
		width: "48%", 
		height: 40, 
		justifyContent: "center", 
		alignItems: "center",
	},
	fbText: {
		fontWeight: "bold",
		fontSize: 20,
		color: colors.white,
		fontFamily: fonts.family.nunito.bold,
	},
	containerLoginSocial: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignContent: "center",
		alignItems: "center",
		marginTop: 20,
	}
});

export default styles;
