import {StyleSheet, Platform} from "react-native";
import {colors} from "../../shared/utils/colors/colors";
import {ScreenHeight, ScreenWidth} from "../../shared/utils/dimension/Divices";
import fonts from "../../shared/utils/fonts/fonts";

const HEADER_HEIGHT = ScreenHeight * 0.3;
const HEADER_WIDTH = ScreenWidth;

export const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: colors.white,
		flex: 1,
	},
	content: {
		paddingStart: 27,
		paddingEnd: 20
	},
	drawer: {
		marginStart: 10
	},
	title: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 22,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "left",
		color: colors.black,
	},
	request: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 17,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "left",
		color: colors.black,
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
		color: colors.black,
		marginBottom: 22,
		marginTop: 11,
		marginLeft: 25
	},
	motto: {
		fontFamily: fonts.family.nunito.bold,
		fontSize: 16,
		fontWeight: "600",
		fontStyle: "normal",
		letterSpacing: 0,
		color: colors.black,
		marginTop: 30,
		marginLeft: 25
	},
	next: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 16,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		color: colors.white,
		marginLeft: 25,
		marginRight: 10
	},
	mainContent: {
		// marginStart: 32,
		// marginEnd: 32,
		// flex: 1,
		marginBottom: 0
	},
	sitter: {
		borderColor: colors.white, 
		borderRadius: 20, 
		width: "48%", 
		height: 40, 
		justifyContent: "center", 
		alignItems: "center",
	},
	parent: {
		borderColor: colors.white, 
		borderRadius: 20, 
		width: "48%", 
		height: 40, 
		justifyContent: "center", 
		alignItems: "center",
	},
	headerLeft: {
		marginStart: 32
	}
});

export default styles;
