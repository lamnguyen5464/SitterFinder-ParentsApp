import React from "react";
import {StatusBar, Animated, Text} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import BaseScreen from "../BaseScreen";
import {splashAnim, splashAnimFinish, splashAnimCounter} from "./actions";
import {styles} from "./style";
import * as Animatable from "react-native-animatable";
import {images} from "../../../assets/index";
import I18n from "../../shared/utils/locale/i18n";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import {ScreenNames} from "../../route/ScreenNames";
import LinearGradient from "react-native-linear-gradient";
import TouchID from "react-native-touch-id";
import Constant from "../../shared/utils/constant/Constant";

const langs = {
	authenTouchFaceID: I18n.t("authenTouchFaceID"),
	error: I18n.t("error"),
	ok: I18n.t("ok"),
	authenTouchFaceIDFailed: I18n.t("authenTouchFaceIDFailed"),
};
class SplashScreen extends BaseScreen {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {
		console.log("here SplashScreen");
		setTimeout(()=>{
			this._directOpenScreenByUserToken();
		}, 2000);
	}

	_goToLogin() {
		this.goToScreen(ScreenNames.LoginScreen);
	}

	async _checkTouchOrFaceID() {
		// Touch ID
		const hasTouchID = await IALocalStorage.getTouchID();
		// Face ID
		const hasFaceID = await IALocalStorage.getFaceID();

		// console.log
		if (hasTouchID || hasFaceID) {
			this._authenLocal();
		} else {
			this._goToHomeScreen();
		}
	}

	_authenLocal() {
		TouchID.authenticate(langs.authenTouchFaceID, Constant.TOUCH_FACE_ID)
			.then(success => {
				this._goToHomeScreen();
			})
			.catch(error => {
				this.alertInfo(langs.authenTouchFaceID, error.message, () => {this._authenLocal();});
			});
	}

	_goToHomeScreen() {
		this.goToScreen(ScreenNames.HomeScreen);
	}

	async _directOpenScreenByUserToken () {
		const tokenExist = await IALocalStorage.getUserToken();
		console.log("Token logged in: " + tokenExist ? tokenExist : "===");
		if (tokenExist) {
			this._checkTouchOrFaceID();
		} else {
			this._goToLogin();
		}
	}

	render() {
		return (
			<LinearGradient
				colors={Constant.BACKGROUND_COLORS}
				style={styles.mainContainer}>
				<StatusBar barStyle="light-content" hidden/>
				<Animatable.Image ref={this.handleViewRef} style={styles.logo} source={images.splash_ico} resizeMode={"stretch"} animation="pulse" duration={3000}></Animatable.Image>
			</LinearGradient>
		);
	}
}

const mapStateToProps = state => {
	return state.splashReducer;
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			splashAnim,
			splashAnimFinish,
			splashAnimCounter
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SplashScreen);
