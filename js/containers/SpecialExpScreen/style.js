import {StyleSheet} from "react-native";
import {colors} from "../../shared/utils/colors/colors";
import {ScreenWidth} from "../../shared/utils/dimension/Divices";
import fonts from "../../shared/utils/fonts/fonts";
export const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: colors.white,
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
	contentContainer: {
		paddingTop: 5, 
		paddingEnd: 32,				
		paddingLeft:32, 
		
	},
	img: {
		alignSelf: "center", 
		width:ScreenWidth / 3 + 50, 
		height: ScreenWidth / 3 + 20
	}
});

export default styles;
