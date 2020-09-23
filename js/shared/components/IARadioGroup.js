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
} from "react-native";
import RadioButton from "./IARadioButton";
import {colors} from "../utils/colors/colors";

const defaultSize = 20;
const defaultThickness = 1;
const defaultColor = colors.orange;

export default class RadioGroup extends PureComponent {
	constructor(props, context) {
		super(props, context);

		this.state = {
			selectedIndex: this.props.selectedIndex,
		};
		this.prevSelected = this.props.selectedIndex;
		this.onSelect = this.onSelect.bind(this);
	}

	// eslint-disable-next-line react/no-deprecated
	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedIndex !== this.prevSelected) {
			this.prevSelected = nextProps.selectedIndex;
			this.setState({
				selectedIndex: nextProps.selectedIndex
			});
		}
	}

	setSelectedIndex(index) {
		this.setState(
			{
				selectedIndex: index
			}
		);
	}

	getSelectedIndex() {
		return this.state.selectedIndex;
	}

	getChildContext() {
		return {
			onSelect: this.onSelect,
			size: this.props.size,
			thickness: this.props.thickness,
			color: this.props.color,
			highlightColor: this.props.highlightColor
		};
	}

	onSelect(index, value) {
		this.setState({
			selectedIndex: index
		});
		if (this.props.onSelect)
			this.props.onSelect(index, value);
	}

	render() {
		let radioButtons = React.Children.map(this.props.children, (radioButton, index) => {
			let isSelected = this.state.selectedIndex === index;
			let color = isSelected && this.props.activeColor ? this.props.activeColor : this.props.color;
			return (
				<RadioButton
					color={color}
					activeColor={this.props.activeColor}
					{...radioButton.props}
					index={index}
					isSelected={isSelected}
				>
					{radioButton.props.children}
				</RadioButton>
			);
		});

		return (
			<View style={this.props.style}>
				{radioButtons}
			</View>
		);
	}
}

RadioGroup.childContextTypes = {
	onSelect: PropTypes.func.isRequired,
	size: PropTypes.number.isRequired,
	thickness: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
	activeColor: PropTypes.string,
	highlightColor: PropTypes.string,
};

RadioGroup.defaultProps = {
	size: defaultSize,
	thickness: defaultThickness,
	color: defaultColor,
	highlightColor: null,
};