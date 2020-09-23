import React from "react";
import {
	Text, TouchableOpacity, StyleSheet
} from "react-native";
import {colors} from "../colors/colors";
import Ant from "react-native-vector-icons/AntDesign";
import *  as Animatable from "react-native-animatable";

// eslint-disable-next-line no-unused-vars
const SNSScrollToTop = ({shouldShowScrollToTop, isAbleToClick, text, onPress, style}) => {
	return (
		shouldShowScrollToTop ?
			<TouchableOpacity onPress={onPress}
				style={styles.containerScrollToTop}>
				<Animatable.View style={styles.scrollToTop} animation="fadeIn" duration={200}>
					<Ant name="totop" size={20} color={colors.white}/>
					<Text style={styles.textScroll}>Scroll to top</Text>
				</Animatable.View>
			</TouchableOpacity> : null
	);
};
export default SNSScrollToTop;
const styles = StyleSheet.create({
	text: {
		fontSize: 14,
		color: colors.black
	},
	scrollToTop: {
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: colors.orange,
		flexDirection: "row",
		justifyContent: "center",
		alignContent: "center",
		borderRadius: 8,
	},
	containerScrollToTop: {
		zIndex: 10,
		alignSelf: "center",
		position:"absolute"
	},
	textScroll: {
		marginLeft: 5,
		fontSize: 14,
		color: colors.white,
		textAlign: "center",
		alignSelf: "center"
	}
});