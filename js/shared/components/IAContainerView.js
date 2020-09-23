import React, {Component} from "react";
import {View, StyleSheet} from "react-native";
import {colors} from "../utils/colors/colors";

class IAContainerView extends Component {
	render() {
		const style = this.props.style;
		return (
			<View style={[styles.mainContainer, style ? style : {}]}>
				{this.props.children}
			</View>
		);
	}
}
export default IAContainerView;
const styles = StyleSheet.create({
	mainContainer: {
		paddingBottom: 10,
		paddingTop: 14,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 8,
		backgroundColor: colors.white,
		borderColor: colors.black_lessy,
		borderWidth: 0.5
	},
	shadow: {
		justifyContent: "center",
		alignItems: "center",
		padding: 0,
		width: "100%",
		height: 10
	}
});
