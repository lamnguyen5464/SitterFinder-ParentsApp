import React from "react";
import {StyleSheet} from "react-native";
import {colors} from "../utils/colors/colors";
import LinearGradient from "react-native-linear-gradient";

const SNSShadow = ({color1, color2}) => {
	return (
		<LinearGradient
			colors={[color1 ? color1 : colors.black, color2 ? color2 : colors.black_five]}
			style={style.shadow}/>
	);
};
export default SNSShadow;
const style = StyleSheet.create({
	shadow: {
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: 7,
		opacity: 0.1,
	},
	absolute: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
});