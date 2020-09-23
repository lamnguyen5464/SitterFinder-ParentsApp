import {StyleSheet, Platform} from "react-native";
import {colors} from "../../shared/utils/colors/colors";
import {ScreenWidth} from "../../shared/utils/dimension/Divices";
import fonts from "../../shared/utils/fonts/fonts";
export const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: "#fafafb",
		flex: 1,
	},
	content: {
		paddingStart: 27,
		paddingEnd: 20
	},
	noData: {
		textAlign: "center",
		fontFamily: fonts.family.nunito.regular,
		fontSize: 15
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
	motto: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 14,
		opacity: 0.7,
		fontWeight: "normal",
		fontStyle: "normal",
		marginBottom: 10,
		letterSpacing: 0,
		textAlign: "center",
		color: colors.black,
	},
	contentContainer: {
		paddingTop: 5, 
		paddingEnd: 32,				
		paddingLeft:32, 
		justifyContent: "center", 
		alignContent: "center", 
		alignItems: "center", 
		alignSelf: "center"
	},
	img: {
		alignSelf: "center", 
		width:ScreenWidth / 3 + 50, 
		height: ScreenWidth / 3 + 20
	}
});

export default styles;
