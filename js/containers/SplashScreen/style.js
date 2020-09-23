import {StyleSheet} from "react-native";
import {colors} from "../../shared/utils/colors/colors";
import {ScreenWidth} from "../../shared/utils/dimension/Divices";

export const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		width: null,
		height: null,
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
	},
	logo: {
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		alignSelf: "center",
		width: ScreenWidth / 2,
		height: ScreenWidth / 2,
	},
	
});

export default {
	styles
};
