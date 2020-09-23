import React from "react";
import {View, StyleSheet} from "react-native";
import {WaveIndicator} from "react-native-indicators";
import {colors} from "../utils/colors/colors";

const IAWavingView = ({color, size, style}) => {
	return (
		<View style={[styles.mainContainer, style]}>
			<WaveIndicator
				color={(color && color) || colors.yellow}
				count={3}
				size={(size && size) || 13}
			/>
		</View>
	);
};
export default IAWavingView;
const styles = StyleSheet.create({
	mainContainer: {
		height: 30,
		alignSelf: "center",
		marginBottom: 10
	}
});
