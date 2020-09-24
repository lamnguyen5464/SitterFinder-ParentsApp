import React, {Component} from "react";
import {View, Keyboard, Alert, TouchableOpacity, Text} from "react-native";
import LogManager from "../../shared/utils/logging/LogManager";
import {ScreenNames} from "../../route/ScreenNames";
import Ionicons from "react-native-vector-icons/Ionicons";
import I18n from "../../shared/utils/locale/i18n";
import {colors} from "../../shared/utils/colors/colors";
import {PacmanIndicator} from "react-native-indicators";
import AntDesign from "react-native-vector-icons/AntDesign";
var moment  = require("moment-timezone");
import LottieView from "lottie-react-native";
import Toaster, {ToastStyles} from "react-native-toaster";
import fonts from "../../shared/utils/fonts/fonts";

const langs = {
	ok: I18n.t("ok"),
	cancel: I18n.t("cancel"),
};
const messages = [
	{text: "FYI"},
	{text: "Hooray!", styles: ToastStyles.success},
	{text: "Eek", styles: ToastStyles.warning},
	{text: "Oh noe!", styles: ToastStyles.error}
];

class BaseScreen extends Component {
  static navigationOption = {
  	header: null,
  }

  // You wanna do the header, let modify here
  // static navigationOptions = ({navigation}) => ({
  //   title: "Title",
  //   headerLeft: <TouchableOpacity
  //       onPress={() => navigation.toggleDrawer()}>
  //     <Ionicon name="ios-menu" size={22.5} style={{color: colors.black}}/>
  //   </TouchableOpacity>,
  // })

  constructor(props) {
  	super(props);
  }

  /**
   * More simple and clean logging data
   * @param {*} className
   * @param {*} object
   */
  log(className = "", object = {}) {
  	// eslint-disable-next-line no-undef
  	if (__DEV__) {
  		return LogManager.showFullLog(className + ": " + LogManager.parseJsonObjectToJsonString(object));
  	} else {
  		return "";
  	}
  }

  /**
   * Dismiss keyboard which is active
   */
  dismissKeyboard () {
  	Keyboard.dismiss();
  }

  /**
   * Pop screen
   * @param {*} num
   */
  goBack(num = 1) {
  	this.props.navigation && this.props.navigation.pop(num);
  }

  /**
   * Go to another screen with name defined
   * @param {*} screen
   * @param {*} params
   */
  goToScreen(screen = ScreenNames.SplashScreen,  params = {}) {
  	this.props && this.props.navigation && this.props.navigation.navigate(screen, params);
  }

  /**
   * Render view back button
   */
  renderBackButton = (color = colors.black) => {
  	return (
  		<View>
  			{/* <Ionicons name={"ios-arrow-round-back"} size={41} color={color}/> */}
			  <Text>Back</Text>
  		</View>
  	);
  }

  /**
   * Show alert message
   */
  alertInfo(title, msg, onPress = () => {}) {
  	Alert.alert(title, msg, [
  		{text: langs.ok, onPress: onPress},
  	]);
  }

  /**
   * Show alert message for 2 options
   */
  alertInfo2Options(title, msg, onPressOK = () => {}, onPressCancel = () => {}) {
  	Alert.alert(title, msg, [
  		{text: langs.ok, onPress: onPressOK},
  		{text: langs.cancel, onPress: onPressCancel},
  	]);
  }

  _convertTime = item => {
  	if (!item) {
  		return "";
  	}
  	let timeConverted = moment(item).format("YYYY-MM-DDTHH:mm:ss.sssZ");
  	var timeWithDateFormat = new Date(timeConverted);
  	var timeFormatted = 
    moment(item).format("hh:mm") + (timeWithDateFormat.getHours() > 12 ? " PM " : " AM ") + " " +
    moment(item).format("MM/DD/YY");
  	return timeFormatted;
  }

  _renderLoading() {
  	return (
  		<View style={{
  			position: "absolute", flex: 1, width: "100%", height: "100%", alignItems: "center", justifyContent: "center", alignContent: "center"}}>
  			{/* <PacmanIndicator color={colors.blue} size={48}/>  */}
  			<LottieView source={require("./loading.json")} style={{width: 130, height: 130, alignSelf: "center"}} autoPlay loop />
  		</View>);
  }

  _renderLoadingFall() {
  	return (
  		<View style={{
  			position: "absolute", flex: 1, width: "100%", height: "100%", alignItems: "center", justifyContent: "center", alignContent: "center"}}>
  			{/* <PacmanIndicator color={colors.blue} size={48}/>  */}
  			<LottieView source={require("../../../assets/imgs/loading.json")} style={{width: 200, height: 200, alignSelf: "center"}} autoPlay loop />
  		</View>);
  }

  _renderLoadingCircle() {
  	return (
  		<View style={{
  			position: "absolute", flex: 1, width: "100%", height: "100%", alignItems: "center", justifyContent: "center", alignContent: "center"}}>
  			{/* <PacmanIndicator color={colors.blue} size={48}/>  */}
  			<LottieView source={require("../../../assets/imgs/loading_circle.json")} style={{width: 200, height: 200, alignSelf: "center"}} autoPlay loop />
  		</View>);
  }

  _renderBtn = (onPress) => {
  	return (
  		<TouchableOpacity onPress={onPress} 
  			style={{position: "absolute", borderRadius: 30,
  				bottom: 10,
  				right: 10,
  				justifyContent: "center",
  				alignContent: "center",
  				alignItems: "center",
  				width: 90,
  				height: 90}}>
  			<LottieView source={require("../../../assets/imgs/add.json")} style={{width: 90, height: 90, alignSelf: "center"}} autoPlay loop />
  		</TouchableOpacity>
  	);
  }

  _renderSuccessPopup = (msg) => {
  	return (
  		<Toaster message={{text: msg, styles: ToastStyles.success}} messageType={{styles: {marginTop: 10},height: 80}}/>
  	);
  }
  _renderWarningPopup = (msg) => {
  	return (
  		<Toaster message={{text: msg, styles: ToastStyles.warning}} />
  	);
  }
  _renderErrorPopup = (msg) => {
  	return (
  		<Toaster message={{text: msg, styles: ToastStyles.error}} />
  	);
  }
  _renderNormalPopup = (msg) => {
  	return (
  		<Toaster message={{text: msg}} />
  	);
  }

  _renderSuccess = (msg) => {
  	return (
  		<View style={{
  			position: "absolute", flex: 1, width: "100%", height: "100%", alignItems: "center", justifyContent: "center", alignContent: "center"}}>
  			<LottieView source={require("../../../assets/imgs/success.json")} style={{width: 90, height: 90, alignSelf: "center"}} autoPlay loop />
  			<Text style={{fontFamily: fonts.family.nunito.regular,
  				fontSize: 18,
  				fontWeight: "normal",
  				fontStyle: "normal",
  				alignSelf: "center",
  				letterSpacing: 0,
  				textAlign: "left",
  				color: colors.black,}}>{msg && msg || "Success"}</Text>
  		</View>
  	);
  }
}

export default BaseScreen;