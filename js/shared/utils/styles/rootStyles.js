import {StyleSheet} from "react-native";

const rootStyles = StyleSheet.create({
	shadowBox: {
		// ios
		shadowColor: "rgba(0, 0, 0, 0.11)",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowRadius: 9,
		shadowOpacity: 1,
		// android
		elevation: 4,
	},
});

export default rootStyles;
