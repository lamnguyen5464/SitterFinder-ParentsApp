import {StyleSheet, Platform} from "react-native";
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
	title: {
		// fontFamily: fonts.family.nunito.regular,
		fontSize: Platform.OS === "ios" ? 26 : 22,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "left",
		color: colors.black,
	},
	noData: {
		textAlign: "center",
		// fontFamily: fonts.family.nunito.regular,
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
	},
	container: {
		backgroundColor: '#fff',
		width: "100%",
		marginLeft: 20,
		marginRight: 20,
		marginTop: 20,
		marginBottom: 0,
		opacity: 0.9,
		borderRadius: 8
	},
	description: {
		fontWeight: 'bold',
		color: "#007",
		borderTopWidth: 0,
		borderBottomWidth: 0,
		opacity: 0.9,
	},
	predefinedPlacesDescription: {
		color: '#355',
	},
	textInputContainer: {
		height: 50,

	},
		textInput: {
		height: 33,
		fontSize: 16
	}
});

export default styles;
