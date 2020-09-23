import {
	Text,
	View,
	TouchableOpacity, StyleSheet
} from "react-native";
import React, {Component} from "react";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";
import {colors} from "../utils/colors/colors";
import fonts from "../utils/fonts/fonts";
const colorBackgroundLoginBtn = ["#e2c85d", "#d9bf52", "#b89438"];

class IAHeaderWithButtons extends Component{
  static propTypes = {
  	onBtnPress: PropTypes.func,
  	btnNames: PropTypes.array,
  	buttonSelected: PropTypes.string,
  	style: PropTypes.object,
  };

  static defaultProps = {
  	isSearch: false,
  	// eslint-disable-next-line no-unused-vars
  	onBtnPress: (tabName) => {},
  	btnNames: ["Button 1", "Button 2"],
  	buttonSelected: "Button 1",
  	height: 100,
  	isFilter: false,
  	filterPress: () =>{}
  };

  constructor(props) {
  	super(props);
  	this.state = {
  		isSearch: false
  	};
  }

  getStyleChild() {
  	return {
  		btn: {
  			borderRadius: 30,
  			borderWidth: 1,
  			borderColor: "#FFF",
  			justifyContent: "center",
  			alignItems: "center",
  			width: "50%",
  			padding: 0
  		},
  		searchView: {
  			flexDirection: "row",
  			justifyContent: "space-between",
  			alignItems: "center"
  		}
  	};
  }

  renderButtonHeader(txtBtn) {
  	if (txtBtn == this.props.buttonSelected) {
  		return (
  			<TouchableOpacity style={{width: "50%"}}>
  				<LinearGradient
  					angle={1}
  					start={{x: 0, y: 0}}
  					end={{x: 1, y: 0}}
  					colors={colorBackgroundLoginBtn}
  					style={styles.container}
  				>
  					<Text style={styles.textHighlighted} numberOfLines={1}>
  						{txtBtn}
  					</Text>
  				</LinearGradient>
  			</TouchableOpacity>
  		);
  	}  else {
  		return (
  			<TouchableOpacity
  				style={[this.getStyleChild().btn]}
  				onPress={() => {this.props.onBtnPress(txtBtn);}}
  			>
  				<Text style={styles.text}>{txtBtn}</Text>
  			</TouchableOpacity>
  		);
  	}

  }

  render() {
  	let arrBtn = this.props.btnNames;
  	return (
  		<View style={[this.props.style ? this.props.style : styles.mainContainer]}>
  			<View style={styles.buttonsContainer}>
  				{this.renderButtonHeader(arrBtn[0])}
  				{this.renderButtonHeader(arrBtn[1])}
  			</View>
  		</View>
  	);
  }
}
export default IAHeaderWithButtons;

const styles = StyleSheet.create({
	shadow: {
		justifyContent: "center",
		alignItems: "center",
		padding: 5,
		width: "100%",
		height: 10
	},
	mainContainer: {
		height: 60,
		flexDirection: "column",
		backgroundColor: colors.white,
		paddingBottom: 10,
		// padding: 5,
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderRadius: 26,
		borderColor: colors.yellow,
		borderWidth: 0.5,
		height: 56,
		width: "100%"
	},
	text: {
		color: "#c4a442",
		fontFamily: fonts.family.nunito.regular,
		fontSize: 18,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		height: 27.2
	},
	textHighlighted: {
		color: colors.white,
		fontFamily: fonts.family.nunito.regular,
		fontSize: 18,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		height: 27.2
	},
	container: {
		borderRadius: 26,
		justifyContent: "center",
		alignItems: "center",
		height: 56,
		padding: 0,
		width: "100%"}
});