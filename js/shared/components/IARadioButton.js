/*
  Created by IntelliJ IDEA.
  User: hieuh
  Date: Th 3 04/06/2019
  Time: 5:19 CH
*/

import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {
	View,
	TouchableWithoutFeedback,
	StyleSheet
} from "react-native";

export default class RadioButton extends PureComponent {
  static propTypes = {
  	navigator: PropTypes.object.require
  };

  static defaultProps = {
  	...PureComponent.defaultProps
  };

  constructor(props, context) {
  	super(props, context);
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
  	this.setState({
  		selectedIndex: nextProps.selectedIndex
  	});
  }

  getRadioStyle() {
  	return {
  		height: this.context.size,
  		width: this.context.size,
  		borderRadius: this.context.size / 2,
  		borderWidth: this.context.thickness,
  		//   borderColor:
  		//     this.props.isSelected && this.props.activeColor
  		//       ? this.props.activeColor
  		//       : this.context.color
  		borderColor: "#4A4A4A"
  	};
  }

  getRadioDotStyle() {
  	return {
  		height: this.context.size / 2,
  		width: this.context.size / 2,
  		borderRadius: this.context.size / 4,
  		backgroundColor: this.props.color || this.props.activeColor
  	};
  }

  isSelected() {
  	if (this.props.isSelected) return <View style={this.getRadioDotStyle()} />;
  }

  render() {
  	let {children} = this.props;
  	return (
  		<View style={{opacity: this.props.disabled ? 0.4 : 1}}>
  			<TouchableWithoutFeedback
  				disabled={this.props.disabled}
  				onPress={() =>
  					this.context.onSelect(this.props.index, this.props.value)
  				}
  			>
  				<View
  					style={[
  						styles.container,
  						this.props.style,
  						this.props.isSelected
  							? {backgroundColor: this.context.highlightColor}
  							: null
  					]}
  				>
  					<View style={[styles.radio, this.getRadioStyle()]}>
  						{this.isSelected()}
  					</View>
  					<View style={styles.item}>{children}</View>
  				</View>
  			</TouchableWithoutFeedback>
  		</View>
  	);
  }
}

RadioButton.contextTypes = {
	onSelect: PropTypes.func.isRequired,
	size: PropTypes.number.isRequired,
	thickness: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
	highlightColor: PropTypes.string
};

let styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexDirection: "row",
		padding: 0,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
	},
	radio: {
		alignItems: "center",
		justifyContent: "center"
	},
	item: {
		flex: 1,
		marginLeft: 15,
		alignItems: "center",
		justifyContent: "center",
		minHeight: 30
	}
});
