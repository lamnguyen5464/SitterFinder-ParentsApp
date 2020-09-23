import React from "react";
import {TouchableOpacity, StyleSheet} from "react-native";
import {colors} from "../utils/colors/colors";
import Constant from "../utils/constant/Constant";
import Feather from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";

const IAPlusButton = ({
	onPress,
	// eslint-disable-next-line no-unused-vars
	style
}) => {
	return (
		<LinearGradient
			colors={Constant.COLOR_BACKGROUND_BTN}
			angle= {1}
			start={{x: 0, y: 0}}
			end={{x: 1, y: 0}}
			location={Constant.LOCATION_BACKGROUND_BTN}
			style={{width: 19, height: 19, borderRadius: 19, marginStart: 5}}>
			<TouchableOpacity onPress={onPress}>
				<Feather name={"plus"} size={17} color={colors.white} style={{alignContent: "flex-start", alignSelf: "center"}}/>
			</TouchableOpacity>
		</LinearGradient>
	);
};

export default IAPlusButton;
// eslint-disable-next-line no-unused-vars
const styles = StyleSheet.create({
	mainContainer: {
		justifyContent: "center",
		alignSelf: "center",
		alignItems: "center",
		alignContent: "center"
	},

	children: {
		alignSelf: "center",
		fontSize: 17
	},
	buttonText: {
		margin: 12,
		fontSize: 14,
		alignSelf: "center",
		flex: 1,
		fontFamily: "Helvetica",
		color: "#FFFFFF",
		letterSpacing: 0.38,
		textAlign: "center"
	},
	button: {
		borderRadius: 50,
		alignSelf: "center",
		// elevation: 2,
		// shadowColor: "#000000",
		// shadowOpacity: 0.4,
		// shadowRadius: 2,
		// shadowOffset: {
		//   height: 1
		// },
		// width: "100%",
		height: 45,
		marginTop: 0,
		marginBottom: 0,
		flexDirection: "row",
		justifyContent: "center",
	},
	indicatorWrap: {
		alignSelf: "center",
		position: "absolute",
		height: 45,
		justifyContent: "center"
	},
	iconContainer: {
		width: 40,
		justifyContent: "center",
		alignItems: "center"
	}
});
