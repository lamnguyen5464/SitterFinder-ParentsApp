import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {colors} from "../utils/colors/colors";
import fonts from "../utils/fonts/fonts";

// eslint-disable-next-line no-empty-pattern
const IADeveloping = ({}) => {
	return (
		<View style={styles.textContainer}>
			<Text style={styles.title}>We are developing this feature!</Text>
			<Text style={styles.title}>Will coming soon!</Text>
		</View>
	);
};
export default IADeveloping;

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
	},
	textContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 17,
		color: colors.black,
		fontFamily: fonts.family.nunito.regular,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		textAlign: "center"
	},
	shadow: {
		justifyContent: "center",
		alignItems: "center",
		padding: 5,
		width: "100%",
		height: 10
	},
});