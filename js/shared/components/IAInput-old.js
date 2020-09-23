import React, {Component} from "react";
import  {
	TextInput, View, StyleSheet, Image, TouchableOpacity, Platform
} from "react-native";
import * as Animatable from "react-native-animatable";
import PropTypes from "prop-types";
import {colors} from "../colors/colors";
import Line from "./Line";
import images from "../../assets/imgs/index";

class SNSInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFocus: false,
			isVisiblePassword: false,
			height: 30,
		};
	}
  static propTypes = {
  	placeholder: PropTypes.string.isRequired,
  	onChangeText: PropTypes.func.isRequired,
  	textColor: PropTypes.string,
  	autoFocus: PropTypes.bool,
  	fontSize: PropTypes.number,
  	returnKey: PropTypes.string,
  	isSecureTextEntry: PropTypes.bool,
  	editable: PropTypes.bool,
  	isPassword: PropTypes.bool,
  	value: PropTypes.string,
  	hasLine: PropTypes.bool,
  	hasIcon: PropTypes.bool,
  	lineColor: PropTypes.string,
  	keyboardType: PropTypes.string
  }
  static defaultProps = {
  	fontSize : 25,
  	returnKey: "next"
  }
  updateSize = (height) => {
  	this.setState({
  		height
  	});
  }
  render() {
  	const props = this.props;
  	return(
  		<View>
  			{
  				this.state.isFocus && props.label ?
  					<Animatable.Text animation="fadeInUp" duration={500} style={styles.title}>{props.label}</Animatable.Text> : null
  			}
  			<View style={styles.passContainer}>
  				<TextInput
  					{...props}
  					ref={(input) => props.reference && props.reference(input)}
  					style={[props.style,{color: colors.black, fontSize: 15}]}
  					onChangeText={props.onChangeText}
  					placeholderTextColor={colors.black}
  					editable={props.editable ? props.editable : true}
  					placeholder={this.state.isFocus ? "" : props.placeholder}
  					onKeyPress={props.onSubmitEditing}
  					multiline={props.multiline ? props.multiline : false}
  					keyboardType={props.keyboardType ? props.keyboardType : "default"}
  					textAlignVertical="top"
  					onFocus={()=>this.setState({isFocus :true})}
  					textColor={props.textColor ? props.textColor : colors.black}
  					fontSize={props.fontSize}
  					onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
  					returnKeyType={props.returnKey ? props.returnKey : "next"}/>
  				{props.isPassword ?
  					<TouchableOpacity style={styles.eyeContainer}
  						onPress={()=>this.setState({isVisiblePassword: !this.state.isVisiblePassword})}>
  						<Image source={this.state.isVisiblePassword ? images.eye_off : images.eye_on} style={styles.eye}/>
  					</TouchableOpacity> : null }
  				{props.hasIcon ?
  					<TouchableOpacity style={styles.eyeContainer}
  						disabled={true}>
  						{props.viewIcon ? this.props.viewIcon : null}
  					</TouchableOpacity> : null }
  			</View>
  			{props.hasLine ?
  				<View style={styles.lineContainer}>
  					<Line color={props.lineColor ? props.lineColor : colors.black} height={props.heightLine}/>
  				</View> : null}
  		</View>
  	);
  }
}
export default SNSInput;
const styles = StyleSheet.create({
	mainContainer: {
		height: 30,
		width: "100%"
	},
	lineContainer: {
		marginTop: 0
	},
	title: {
		color: colors.pink,
		fontSize: 13,
		marginBottom: 0
	},
	passContainer: {
		// flex: 1,
		flexDirection: "column",
	},
	eyeContainer: {
		width: 25,
		right: 0,
		bottom: Platform.OS === "android" ? 10 : 0,
		justifyContent:"center",
		position: "absolute",
	},
	eye: {
		width: 20,
		height: 15,
	}
});