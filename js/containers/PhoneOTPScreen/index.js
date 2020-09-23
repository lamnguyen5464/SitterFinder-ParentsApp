import React from "react";
import {View, ScrollView, TouchableOpacity, Text, StatusBar, RefreshControl} from "react-native";
import BaseScreen from "../BaseScreen/index";
import {styles} from "./style";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import I18n from "../../shared/utils/locale/i18n";
import {ScreenNames} from "../../route/ScreenNames";
import IAText from "../../shared/components/IAText";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import icons from "../../shared/utils/icons/icons";
import FastImage from "react-native-fast-image";
import Constant from "../../shared/utils/constant/Constant";
import {images} from "../../../assets";
import * as Animatable from "react-native-animatable";
import {colors} from "../../shared/utils/colors/colors";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import firebase from "react-native-firebase";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Foundation from "react-native-vector-icons/Foundation";
import Octicons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import PhoneInput from "react-native-phone-input";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {updateUserProfile} from "../ProfileScreen/actions";
import IAHeader from "../../shared/components/IAHeader";
import IALine from "../../shared/components/IALine";
import IARefreshing from "../../shared/components/IARefreshing";
import textStyles from "../../shared/utils/styles/textStyles";
import IAInput from "../../shared/components/IAInput/NormalInput";
import LogManager from "../../shared/utils/logging/LogManager";

const langs = {
	phoneNumber: I18n.t("phoneNumber"),
	reSendOtp: I18n.t("reSendOtp"),
	verifyOTP: I18n.t("verifyOTP"),
	doesNotReceive: I18n.t("createAcc.doesNotReceive"),
	resendOtp: I18n.t("createAcc.resendOtp"),
	sendOtp: I18n.t("sendOtp"),
	askResend: I18n.t("createAcc.askResend"),
	warning: I18n.t("warning"),
	skip: I18n.t("createAcc.skip"),
	otp: I18n.t("otp"),
	error: I18n.t("error"),
};
const EMERGENCY_CONTACT_PHONE = "emergencyContactPhone";
const OTP = "otp";

class PhoneOTPScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state = {
			emergencyContactPhone: "",
			isVerified: false,
			confirmResult: null,
			isVerifying: false,
			otp: ""
		};
	}

	componentWillReceiveProps(nextProps) {
		console.log(LogManager.parseJsonObjectToJsonString(nextProps));
		if (nextProps != this.props ) {			
			if (nextProps.userProfileStatus != this.props.userProfileStatus) {
				if (nextProps.userProfileStatus.isSuccess()) {
					if (nextProps.userProfile) {
						let userInfo = nextProps.userProfile;
						var address = userInfo && userInfo.address;
						var firstName = userInfo && userInfo.firstName;
						var lastName = userInfo && userInfo.lastName;
						var avatar = userInfo && userInfo.avatar;
						var userName = userInfo && userInfo.name;
						this.setState({
							lastName: lastName,
							firstName: firstName,
							address: address,
							avatar: avatar,
							userName: userName
						});
					}
				}
			}
			if (nextProps.updateUserProfileStatus.isSuccess()) {
				// get error message from error object
				this.goToScreen(ScreenNames.HomeScreen);
				return;
			}
		}
	}

	_onChangeInput(key) {
		return value => this.setState({[key]: value});
	}

	_onAuthen = () => {

	}

	_onSendOTP() {
		this.setState({isVerifyingOTP: true});
		firebase.auth().signInWithPhoneNumber(this.phoneInput.getValue())
			.then(confirmResult =>{
				console.log(confirmResult);
				this.setState({isVerifyingOTP: false, confirmResult: confirmResult});
			})
			.catch(error => {
				this.setState({isVerifyingOTP: false, confirmResult: false});
				this.alertInfo(langs.error, error.message);
			});
	}

	_onVerifyOTP() {
		this.setState({isVerifying: true});
		if (this.state.confirmResult && this.state.otp.length) {
			this.state.confirmResult.confirm(this.state.otp)
				.then(user => {
					this.setState({isVerifying: false});
					this.props.updateUserProfile({id: this.props.navigation.state.params.signedUpData.id,
						email: this.props.navigation.state.params.signedUpData.email,
						customId: this.props.navigation.state.params.signedUpData.id,
						customToken: this.props.navigation.state.params.signedUpData.accessToken, 
						phoneNumber: this.phoneInput.getValue()});
				})
				.catch(error => {
					this.setState({isVerifying: false});
					this.alertInfo(langs.error, error.message);
				});

		} else {
			this.setState({isVerifying: false});
		}
	}
	
	_onResendOTP() {
		this.alertInfo2Options(langs.warning, langs.askResend, () => {this._onSendOTP();}, () => {});
	}

	_renderAuthenFirebase() {
		// const {signUpStatus} = this.props;
		// eslint-disable-next-line no-unused-vars
		const {isVerifyingOTP, isVerifying} = this.state;
		return (
			<Animatable.View animation="fadeInUpBig" style={styles.btnLoginContainer}>
				{isVerifyingOTP || isVerifying ?
					<View style={styles.btnLogin}>
						<IARefreshing />
					</View>
					:
					<TouchableOpacity style={styles.btnLogin} onPress={()=> this._onVerifyOTP()}>
						<View style={styles.buttonSignInContainer}>
							<Text style={styles.buttonText}>
								{langs.verifyOTP.toUpperCase()}
							</Text>
						</View>
					</TouchableOpacity>
				}
			</Animatable.View>
		);
	}

	_renderSendOTP() {
		// const {signUpStatus} = this.props;
		// eslint-disable-next-line no-unused-vars
		const {isVerifyingOTP} = this.state;
		return (
			<Animatable.View animation="fadeInUpBig" style={styles.btnLoginContainer}>
				{isVerifyingOTP ?
					<View style={styles.btnLogin}>
						<IARefreshing />
					</View>
					:
					<TouchableOpacity style={styles.btnLogin} onPress={()=> this._onSendOTP()}>
						<View style={styles.buttonSignInContainer}>
							<Text style={styles.buttonText}>
								{langs.sendOtp.toUpperCase()}
							</Text>
						</View>
					</TouchableOpacity>
				}
			</Animatable.View>
		);
	}

	_renderResend() {
		return (
			<TouchableOpacity style={{marginTop: 20, justifyContent: "center", alignSelf: "center", alignContent: "center"}} onPress={()=>this._onResendOTP()}>
				<Text style={{color: colors.white, opacity: 0.6, fontSize: 13}}>
					{langs.doesNotReceive}
					<Text style={{color: colors.blue}}>{langs.resendOtp}</Text>
				</Text>
			</TouchableOpacity>
		);
	}

	_renderSkip() {
		return (
			<TouchableOpacity style={{marginBottom: 30, alignSelf: "center", alignContent: "center", alignItems: "center"}} onPress={()=>{this.goToScreen(ScreenNames.HomeScreen);}}>
				<Text style={{color: colors.white, opacity: 0.6, fontSize: 13, alignSelf: "center", alignContent: "center", alignItems: "center"}}>
					{langs.skip}
				</Text>
			</TouchableOpacity>
		);
	}

	render() {
		const {isVerifyingOTP} = this.state;
		return(
			<LinearGradient 
				colors={Constant.BACKGROUND_COLORS}
				style={styles.mainContainer}>
				<StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true}/>
				<IAHeader viewLeft={this.renderBackButton(colors.white)}
					styleLeft={styles.headerLeft}
					onPressLeft={()=>this.goBack()}/>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.mainContent}>
					<View style={{marginLeft: 30, marginRight: 20}}>
						<Text style={[styles.welcomeTitle]}>{langs.phoneNumber}</Text>
						<PhoneInput
							ref={ref => {
					    		this.phoneInput = ref;
							}}
							inputLabel={langs.phone}
							flagLabel={"Country"}
							allowZeroAfterCountryCode={false}
							initialCountry={"vn"}
							autoFormat
							onChangePhoneNumber={this._onChangeInput(EMERGENCY_CONTACT_PHONE)}
							textStyle={styles.phoneInput}
							offset={10}
							value={this.state.emergencyContactPhone}
						/>
						<IALine color={colors.black_lessy} height={1}/>
						{this.state.confirmResult ?
							<View style={{flexDirection: "column", marginTop: 20}}>
								<IAInput
									label={langs.otp}
									activeColor={colors.black}
									underlineColor={colors.input_underline}
									style={{color: colors.white}}
									labelStyle={textStyles.input_label}
									containerStyle={styles.inputEmail}
									editable={true}
									value={this.state.otp}
									keyboardType="number-pad"
									returnKeyType="done"
									onChangeText={this._onChangeInput(OTP)}
								/>
							</View> : null }
						{this._renderResend()}
						{!this.state.confirmResult ?
							this._renderSendOTP() : this._renderAuthenFirebase()}
					</View>
					
				</ScrollView>
				{this._renderSkip()}
				{isVerifyingOTP ? this._renderLoading() : null}
			</LinearGradient>
		);
	}
}
const mapStateToProps = state => {
	return {
		updateUserProfileStatus: state.userProfileReducer.updateUserProfile.status,
		updateUserProfile: state.userProfileReducer.updateUserProfile.data,
		updateUserProfileError: state.userProfileReducer.updateUserProfile.error,
	};
};
const mapDispatchToProps = dispatch =>
	bindActionCreators({
		updateUserProfile,
	}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PhoneOTPScreen);