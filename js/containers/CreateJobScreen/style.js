import {StyleSheet, Platform} from "react-native";
import {colors} from "../../shared/utils/colors/colors";
import {ScreenHeight, ScreenWidth} from "../../shared/utils/dimension/Divices";
import fonts from "../../shared/utils/fonts/fonts";

const HEADER_HEIGHT = ScreenHeight * 0.3;
const HEADER_WIDTH = ScreenWidth;

export const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: "#fafafb",
		flex: 1,
	},
	content: {
		marginTop: 14,
		paddingBottom: 20,
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
	scrollContainer: {
		marginStart: 8,
		marginEnd: 1
	},
	itemUserDisable: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 16,
		letterSpacing: 0,
		paddingLeft: 5,
		textAlign: "left",
		color: colors.black,
		opacity: 0.5,
		marginLeft: 15,
	},
	itemUserContainer: {
		height: 50, 
		alignItems: "center", alignContent: "center", alignSelf: "center", justifyContent: "center",
		width: ScreenWidth, 
		borderEndColor: colors.white,
		borderLeftColor: colors.white,
		borderTopColor: colors.black_lightly,
		borderBottomColor: colors.black_lightly,
		borderWidth: 1,
		backgroundColor: "#ffffff",
		flexDirection: "row"
	},
});

export default styles;
