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
		color: colors.white,
		marginBottom: 22,
		marginTop: 11,
		marginLeft: 25
	},
	motto: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 16,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		color: colors.white,
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
		marginStart: 32,
		marginEnd: 32,
		flex: 1,
		marginTop: 40,
		marginBottom: 38
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
