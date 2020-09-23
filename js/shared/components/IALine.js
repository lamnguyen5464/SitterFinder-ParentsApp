import React, {Component} from "react";
import  {
	View, StyleSheet
} from "react-native";
import {colors} from "../utils/colors/colors";

export default class IALine extends Component {
	render() {
		const props = this.props;
		return(
			<View style={[styles.container, props.style,
				{height: props.height ? props.height : 1, width: props.width ? props.width : "100%",
					backgroundColor: props.color ? props.color : colors.black,
					marginTop: props.marginTop ? props.marginTop : 0}]}>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 1,
	}
});