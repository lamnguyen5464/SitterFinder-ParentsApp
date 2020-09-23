import React from "react";
import {
	Text, TouchableOpacity, View, StyleSheet
} from "react-native";
import {colors} from "../utils/colors/colors";

const IAText = ({isAbleToClick, text, onPress, style, numberOfLines = 1, shouldUnderline, multiLine = false}) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={isAbleToClick == undefined || !isAbleToClick}>
			<View>
				<Text style={[styles.text, style, shouldUnderline ? {
					textDecorationLine: "underline",
					textDecorationStyle: "solid",
					textDecorationColor: colors.white} : {}
				]}
				ellipsizeMode="tail"
				numberOfLines={numberOfLines} multiLine={multiLine}>{text}</Text>
			</View>
		</TouchableOpacity>
	);
};
export default IAText;
const styles = StyleSheet.create({
	text: {
		fontSize: 14,
		color: colors.black
	}
});