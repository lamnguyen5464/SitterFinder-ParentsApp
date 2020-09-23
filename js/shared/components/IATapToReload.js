import React from "react";
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import {colors} from "../colors/colors";

const SNSTapToReload = ({color, size, onPress, titleReload}) => {
	return (
		<TouchableOpacity onPress = {onPress}>
			<View style={style.mainContainer}>
				<Feather
					name={"refresh-ccw"}
					color={color ? color : colors.pink}
					size={size ? size : 16}/>
				<Text style={style.text}>Tap here to reload {titleReload}</Text>
			</View>
		</TouchableOpacity>
	);
};
export default SNSTapToReload;
const style = StyleSheet.create({
	mainContainer: {
		height: 30,
		marginTop: 5,
		alignSelf: "center",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	},
	text: {
		fontSize: 12,
		textAlign: "center",
		color: colors.black
	}
});