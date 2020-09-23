import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {View, TextInput, StyleSheet, ViewPropTypes} from "react-native";
import * as Animatable from "react-native-animatable";
import Icons from "react-native-vector-icons/Entypo";
import fonts from "../../utils/fonts/fonts";
import {colors} from "../../utils/colors/colors";

const labelUpAnimation = {
	from: {
		bottom: 10,
		fontSize: 17
	},
	to: {
		bottom: 35,
		fontSize: 14
	}
};
const labelDownAnimation = {
	from: {
		bottom: 35,
		fontSize: 14
	},
	to: {
		bottom: 10,
		fontSize: 17
	}
};

class IAInput extends PureComponent {
  static propTypes = {
  	label: PropTypes.string,
  	underlineWidth: PropTypes.number,
  	underlineColor: PropTypes.string,
  	containerStyle: ViewPropTypes.style,
  	style: ViewPropTypes.style,
  	labelStyle: ViewPropTypes.style,
  	secureTextEntry: PropTypes.bool,
  	visibleIconColor: PropTypes.string,
  	activeColor: PropTypes.string,
  	returnKeyType: PropTypes.string,
  	onSubmitEditing: PropTypes.func,
  	ref: PropTypes.string,
  	refInner: PropTypes.string,
  	multiline: PropTypes.bool,
  	autoCapitalize: PropTypes.bool,
  };

  static defaultProps = {
  	label: "",
  	underlineWidth: 1,
  	containerStyle: {},
  	style: {},
  	labelStyle: {},
  	underlineColor: "transparent",
  	secureTextEntry: false,
  	visibleIconColor: "#4A4A4A",
	  activeColor: colors.white,
	  autoCapitalize: "none",
	  showLabelUp: false,
  };

  constructor(props) {
  	super(props);
  	this.state = {
  		isFocused: false,
  		inputValue: props.value,
  		visibleSecureText: true,
  	};
  }

  onInputBlur = () => {
  	this.setState({isFocused: false});
  };

  onInputFocus = () => {
  	this.setState({isFocused: true});
  };

  onChangeText = value => {
  	const {onChangeText} = this.props;
  	this.setState({inputValue: value});
  	if (onChangeText) onChangeText(value);
  };

	onSubmitEditing = ({nativeEvent: {text, eventCount, target}}) => {
		const {onSubmitEditing, refInner} = this.props;
		if (onSubmitEditing) onSubmitEditing(refInner);
	};

	render() {
  	const {
  		label,
  		underlineColor,
  		underlineWidth,
  		containerStyle,
  		style,
  		labelStyle,
  		placeholder,
  		secureTextEntry,
  		hasEye,
  		activeColor,
  		visibleIconColor,
  		refInner,
			multiline,
			autoCapitalize,
			showLabelUp
  	} = this.props;
  	const {isFocused, inputValue, visibleSecureText} = this.state;
  	/**
     * Move label up if input has focus or value
     */
  	const labelShouldMoveUp = isFocused || inputValue;
  	/**
     * At input type secure text, show text when user click toggle visible
     */
  	const secureInputShouldShow = secureTextEntry ? visibleSecureText : false;
  	return (
  		<View style={[styles.container, containerStyle]}>
  			<Animatable.Text
  				animation={labelShouldMoveUp || showLabelUp ? labelUpAnimation : labelDownAnimation}
  				style={[styles.label, {color: labelShouldMoveUp ? colors.white : colors.white}, labelStyle ]}
  				duration={300}>
  				{label}
  			</Animatable.Text>
  			<View style={{flexDirection: "row"}}>
  				<TextInput
  					{...this.props}
  					ref={refInner}
  					style={[styles.input, style]}
  					placeholder={label ? "" : placeholder}
  					onBlur={this.onInputBlur}
						onFocus={this.onInputFocus}
						autoCapitalize={autoCapitalize}
  					autoCorrect={false}
  					onChangeText={this.onChangeText}
  					multiline={multiline ? multiline : false}
  					secureTextEntry={secureInputShouldShow}
						onSubmitEditing={this.onSubmitEditing}
  				/>
  				{secureTextEntry && hasEye && (
  					<Icons
  						onPress={() => this.setState({visibleSecureText: !visibleSecureText})}
  						name={visibleSecureText ? "eye-with-line" : "eye"}
  						size={16.5}
  						style={{paddingHorizontal: 5}}
  						color={visibleIconColor}
  					/>
  				)}
  			</View>
  			<View
  				style={{
  					flex: 1,
  					maxHeight: underlineWidth,
  					backgroundColor: underlineColor
  				}}
  			/>
  		</View>
  	);
	}
}
export default IAInput;

const styles = StyleSheet.create({
	container: {
		height: 55,
		justifyContent: "flex-end"
	},
	input: {
		height: 40,
		fontFamily: fonts.family.montserrat.regular,
		fontSize: 17,
		color: "#212224",
		letterSpacing: 0.38,
		flex: 1
	},
	label: {
		position: "absolute",
		left: 0,
		bottom: 2,
		fontSize: 14,
		fontFamily: fonts.family.nunito.regular,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: -0.7,
		color: "#676e75"
	}
});
