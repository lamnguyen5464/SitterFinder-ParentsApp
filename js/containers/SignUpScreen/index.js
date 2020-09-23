import React from "react";
import {View, Text, TouchableOpacity, StatusBar, ScrollView, Keyboard, Platform, InputAccessoryView, Button} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import BaseScreen from "../BaseScreen/index";
import IAInput from "../../shared/components/IAInput";
import {styles} from "./style";
import {textStyles} from "../../shared/utils/styles/textStyles";
import {colors} from "../../shared/utils/colors/colors";
import Validator from "../../shared/utils/validator/Validator";
import I18n from "../../shared/utils/locale/i18n";
import {signUp} from "./actions";
import IAHeader from "../../shared/components/IAHeader";
import LinearGradient from "react-native-linear-gradient";
import icons from "../../shared/utils/icons/icons";
import IARefreshing from "../../shared/components/IARefreshing";
import CheckBox from "react-native-check-box";
import {LoginManager} from "react-native-fbsdk";
import Constant from "../../shared/utils/constant/Constant";
import PhoneInput from "react-native-phone-input";
import {AccessToken, GraphRequest, GraphRequestManager} from "react-native-fbsdk";
import {GoogleSignin, statusCodes} from "react-native-google-signin";
import * as Animatable from "react-native-animatable";
import firebase from "react-native-firebase";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import IAText from "../../shared/components/IAText";
import LogManager from "../../shared/utils/logging/LogManager";
import IALine from "../../shared/components/IALine";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import DateTimePicker from "react-native-modal-datetime-picker";
import {ScreenWidth} from "../../shared/utils/dimension/Divices";
import {Appearance} from "react-native-appearance";
import fonts from "../../shared/utils/fonts/fonts";
import {ScreenNames} from "../../route/ScreenNames";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import {AlertHelper} from "../../shared/utils/AlertHelper";
import {TextField} from "react-native-material-textfield";
var moment = require("moment");

const langs = {
	signUpTitle: I18n.t("signUpTitle"),
	email: I18n.t("email"),
	userName: I18n.t("userName"),
	phone: I18n.t("phone"),
	password: I18n.t("password"),
	otp: I18n.t("otp"),
	sendOtp: I18n.t("sendOtp"),
	reSendOtp: I18n.t("reSendOtp"),
	verifyOTP: I18n.t("verifyOTP"),
	validFieldEmpty: I18n.t("validFieldEmpty"),
	forgotPassword: I18n.t("forgotPassword"),
	signUp: I18n.t("signUp"),
	somethingWrong: I18n.t("somethingWrong"),
	error: I18n.t("error"),
	validEmailIncorrect: I18n.t("emailInvalid"),
	validPasswordIncorrect: I18n.t("passwordInvalid"),
	success: I18n.t("success"),
	signUpSuccess: I18n.t("signUpSuccess"),
	mottoSignUp: I18n.t("mottoSignUp"),
	prefix: I18n.t("prefix"),
	termAndCondition: I18n.t("termAndCondition"),
	forceTermAndCondition: I18n.t("forceTermAndCondition"),
	passHigher8: I18n.t("createAcc.passHigher8"),
	userNameHigher6: I18n.t("createAcc.userNameHigher6"),
	googleNotSupport: I18n.t("notSupport"),
	googleSignInError: I18n.t("googleSignInSuspend"),
	errorFetchingDataFB: I18n.t("errorFetchingData"),
	askSignUp: I18n.t("askSignUp"),
	emptyEmail: I18n.t("emptyEmail"),
	resendOtp: I18n.t("createAcc.resendOtp"),
	doesNotReceive: I18n.t("createAcc.doesNotReceive"),
	warning: I18n.t("warning"),
	askResend: I18n.t("createAcc.askResend"),
};
const USERNAME = "userName";
const EMAIL = "email";
const PHONE = "phone";
const PASSWORD = "password";
const CODE = "invitationCode";
const OTP = "otp";
const inputAccessoryViewID = "uniqueID";

class SignUpScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			invitationCode: "",
			password: "",
			phone: "",
			userName: "",
			otp: "",
			prefix: "",
			isChecked: true,
			isVerified: false,
			callingCode: "1",
			countryCode: "US",
			cca2: "US",
			confirmResult: null,
			isVerifyingOTP: false,
			currentUserType: Constant.USER_TYPE.sitter,
			dob: "",
			dobMill: 0,
			isDateTimePickerVisible: false,
		};
		
		this._onChangeInput = this._onChangeInput.bind(this);
		this._onVerifyOTP = this._onVerifyOTP.bind(this);
		this.handleResponseSignUp = this.handleResponseSignUp.bind(this);
		this.validFormInput = this.validFormInput.bind(this);
		this._onSignUpPressed = this._onSignUpPressed.bind(this);
		this.colorScheme = Appearance.getColorScheme();
	}

	componentDidMount() {
		this.setState({
			currentUserType: this.props.navigation.state.params.currentUserType,
			phone: this.phoneInput ? this.phoneInput.getValue() : "",
		});
	}
	componentWillMount() {
		// Configuration for google signin flow
		GoogleSignin.configure({
			webClientId: Constant.WEB_CLIENT_ID
		});
	}

	showDateTimePicker = () => {
		this.setState({isDateTimePickerVisible: true});
	  };
	
	hideDateTimePicker = () => {
	  	this.setState({isDateTimePickerVisible: false});
	};
	
	handleDatePicked = date => {
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		month = month < 10  ? ("0" + month) : month;
		let day = date.getDate();
		day = day < 10 ? ("0" + day) : day;
		this.hideDateTimePicker();
		let time = year + "-" + month + "-" + day;
		
		
		this.setState({dob: time, dobMill: new Date(year, month - 1, day).getTime()});
	};

	componentWillReceiveProps(nextProps) {
		// handle response sign in on change
		if (nextProps.signUpStatus !== this.props.signUpStatus) this.handleResponseSignUp(nextProps);
	}

	async handleResponseSignUp(nextProps) {
		// not handle if the request is fetching
		if (nextProps.signUpStatus.isFetching()) return;
		// handle response
		if (nextProps.signUpStatus.isSuccess()) {
			// this.alertInfo(langs.success, langs.signUpSuccess, () => this.goBack(2));
			if (nextProps.signUpData) {
				IALocalStorage.setUserInfo(nextProps.signUpData);
				if (nextProps.signUpData.email) {
					IALocalStorage.setUserEmail(nextProps.signUpData.email);
					IALocalStorage.setUserToken(nextProps.signUpData.accessToken);
				} else {
					console.log("No email in this account signup");
				}
			} else {
				console.log("No signUpData in this account signup");
			}
			this.goToScreen(ScreenNames.PhoneOTPScreen, {signedUpData: nextProps.signUpData && nextProps.signUpData});
		}
		if (nextProps.signUpStatus.isFailure()) {
			// get error message from error object
			AlertHelper.showError(langs.loginFailedTitle, nextProps.signUpError.data.message ? nextProps.signUpError.data.message : nextProps.signUpError.data);
		}
	}

	validFormInput() {
		const {userName, email, password} = this.state;
		// check valid input
		const validUserName = Validator.checkEmptyField(userName)
			? `${Validator.checkEmptyField(userName)}`
			: "";
		const validPassword = Validator.checkEmptyField(password)
			? `\n${Validator.checkEmptyField(password)}`
			: "";
		const validEmail = Validator.checkEmail(email)
			? `\n${Validator.checkEmail(email)}`
			: "";
		const isInvalid = validEmail || validUserName || validPassword ;
		// get error message
		var errorMessage = "";
		if (validUserName != "") {
			errorMessage = `${validUserName}`;
		}else if (validEmail != "") {
			errorMessage = `${validEmail}`;
		}else {
			errorMessage = `${validEmail} ${validPassword}`;
		}

		// return isInvalid and message
		return {isInvalid, errorMessage};
	}

	_onSignUpPressed() {
		const {userName, email, password} = this.state;
		const {isInvalid, errorMessage} = this.validFormInput();
		if (isInvalid) {
			this.alertInfo(langs.error, errorMessage);
			return;
		}
		if (!this.state.isChecked && !isInvalid) {
			this.alertInfo(langs.error, langs.forceTermAndCondition);
			return;
		}
		// Sign up process
		this.dismissKeyboard();

		if (password.length < 6) {
			if (password.length < 6) {
				this.alertInfo(langs.error, langs.passHigher8, () => {});
			} 
		} else {
			this.setState({isVerifyingOTP: false});
			this.props.signUp({
				authorities: [this.state.currentUserType], 
				name: userName, 
				email: email, 
				invitationCode: this.state.invitationCode != "" ? this.state.invitationCode : null,
				dateOfBirth: this.state.dobMill,
				loginType: Constant.LOGIN_TYPE.original,
				password: password});
		}
	}

	_onChangeInput(key) {
		return value => this.setState({[key]: value});
	}

	_onVerifyOTP() {
		this.setState({isVerifyingOTP: true});
		firebase.auth().signInWithPhoneNumber(this.phoneInput.getValue())
			.then(confirmResult =>{
				
				this.setState({confirmResult});
			})
			.catch(error => {
				this.alertInfo(langs.error, error.message);
			});
	}
	
	_onResendOTP() {
		this.alertInfo2Options(langs.warning, langs.askResend, () => {this._onVerifyOTP();}, () => {});
	}

	async _goToLoginFacebook() {
		LoginManager.logInWithPermissions(["public_profile", "email"])
			.then(
				result => {
					if (!result.isCancelled) {
						this._getFBUserInfo();
					}
				},
				() => {
					this.alertInfo(langs.error, langs.somethingWrong);
				}
			).catch(err => {
				console.log(LogManager.parseJsonObjectToJsonString(err));
			});
	}
  
	_getFBUserInfo() {
		AccessToken.getCurrentAccessToken()
			.then((user) => {
				// There are some info here:
				// user.accessToken
				// user.accessTokenSource
				// user.userID
				return user;
			})
			.then((user) => {
				const responseInfoCallback = (error, result) => {
					if (error) {
						this.alertInfo(langs.errorFetchingDataFB, error.toString());
					} else {
						// There are some info here:
						// email, id, last_name, first_name, name, picture.
						// They are exist here because of depending on the fields in GraphRequest
						console.log("Access Facebook SDK for userInfo: " + LogManager.parseJsonObjectToJsonString(result));
						// IALocalStorage.setUserInfo(result);
						if (result.email) {
							this.props.signUp({
								authorities: [this.state.currentUserType], 
								name: result.name, 
								email: result.email, 
								loginType: Constant.LOGIN_TYPE.social,
								phoneNumber: "", 
								password: ""
							});
						} else {
							this.alertInfo(langs.error, langs.emptyEmail, () => {});
						}
						
					}
				};
				// Config request for getting information
				const infoRequest = new GraphRequest("/me", {
					accessToken: user.accessToken,
					parameters: {
						fields: {
							string: "email, name, first_name, last_name, picture"
						}
					}
				}, responseInfoCallback);
  
				// Start the graph request.
				new GraphRequestManager()
					.addRequest(infoRequest)
					.start();
			});
	}

	signIn = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const loggedInUser = await GoogleSignin.signIn();
			// Login with google
			console.log("Access Google SDK for userInfo: " + LogManager.parseJsonObjectToJsonString(loggedInUser));
			this.props.signUp({
				authorities: [this.state.currentUserType], 
				name: loggedInUser.user.name, 
				email: loggedInUser.user.email, 
				loginType: Constant.LOGIN_TYPE.social,
				phoneNumber: "", 
				password: ""
			});
  
		} catch (error) {
			this.handleSignInError(error);
		}
	};
  
	/**
	 * @name handleSignInError
	 * @param error the SignIn error object
	 */
	handleSignInError = async error => {
		if (error.code) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				// this.showSignInError('User cancelled the login flow.');
			} else if (error.code === statusCodes.IN_PROGRESS) {
				// this.showSignInError('Sign in is in progress.');
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				await this.getGooglePlayServices();
			} else {
				console.log(error);
				// this.alertInfo(langs.error, JSON.stringify(error))
			}
		} else {
			console.log(error);
			// this.alertInfo(langs.error, JSON.stringify(error))
		}
	};
  
	/**
	 * @name signOut
	 */
	signOut = async () => {
		try {
			await GoogleSignin.revokeAccess();
			await GoogleSignin.signOut();
		} catch (error) {
			this.handleSignInError(error);
		}
	};
  
	getGooglePlayServices = async () => {
		try {
			await GoogleSignin.hasPlayServices({
				showPlayServicesUpdateDialog: true
			});
			// Google services are available
		} catch (err) {
			this.alertInfo(langs.error, langs.googleNotSupport);
		}
	};
	/**
	 * @name isUserSignedIn
	 */
	isUserSignedIn = async () => {
		this.setState({isUserSignedIn: false, checkingSignedInStatus: true});
		const isUserSignedIn = await GoogleSignin.isSignedIn();
		if (isUserSignedIn) {
			await this.getCurrentUserInfo();
		}
		this.setState({isUserSignedIn, checkingSignedInStatus: false});
	};
  
	/**
	 * @name getCurrentUserInfo
	 */
	getCurrentUserInfo = async () => {
		try {
			const loggedInUser = await GoogleSignin.signInSilently();
			this.setState({loggedInUser});
		} catch (error) {
			this.setState({loggedInUser: {}});
		}
	};

	_renderSignUpBtn() {
		
		// eslint-disable-next-line no-unused-vars
		const {isVerified, confirmResult} =this.state;
		
		return (
			<Animatable.View animation="fadeInUpBig" style={styles.btnLoginContainer}>
				<TouchableOpacity style={styles.btnLogin} onPress={this._onSignUpPressed}>
					<View style={styles.buttonSignInContainer}>
						<Text style={styles.buttonText}>
							{confirmResult?langs.verifyOTP.toUpperCase(): langs.signUp.toUpperCase()}
						</Text>
					</View>
				</TouchableOpacity>
			</Animatable.View>
		);
	}

	_renderChecked() {
		return (
			<View style={styles.checkBox}>
				{icons.checkbox.checked}
			</View>
		);
	}

	_renderUnCheck() {
		return (
			<View style={styles.checkBox}>
			</View>
		);
	}

	_renderTermAndCondition() {
		return (
			<View style={styles.termConditionContainer}>
				<View style={{marginEnd: 11}}>
					<CheckBox
						style={styles.checkBoxContainer}
						onClick={()=>{
							this._toggleCheckbox();
						}}
						isChecked={this.state.isChecked}
						checkedImage={this._renderChecked()}
						unCheckedImage={this._renderUnCheck()}/>
				</View>
				<TouchableOpacity onPress={()=>this._toggleCheckbox()}>
					<Text style={styles.termAndCondition}>{langs.termAndCondition}</Text>
				</TouchableOpacity>
			</View>
		);
	}

	_toggleCheckbox = () => {
		this.setState({
			isChecked:!this.state.isChecked
		});
	}

	_renderFBSDKLogin() {
		return (
			<TouchableOpacity style={[styles.fbContainer]} onPress={()=>{this._goToLoginFacebook();}}>
				<Animatable.View animation="fadeInLeft" style={styles.btnFBLoginContainer}>
					<IAText text="Facebook" style={styles.fbText}/>
				</Animatable.View>
			</TouchableOpacity>
		);
	}

	_renderGoogleLogin() {
		return (
			<TouchableOpacity style={styles.googleContainer} onPress={()=>{this.signIn();}}>
				<Animatable.View animation="fadeInRight" style={styles.btnGoogleLoginContainer}>
					<IAText text="Google" style={styles.fbText}/>
				</Animatable.View>
			</TouchableOpacity>
		);
	}

	_signUpForm() {
		const {userName, email, password} = this.state;	
		var dob = this.state.dob;
		return (
			<View >
				<IAInput
					label={langs.userName}
					activeColor={colors.black}
					underlineColor={colors.input_underline}
					style={{color: colors.white, height: 40}}
					labelStyle={textStyles.input_label}
					containerStyle={styles.inputEmail}
					editable={true}
					autoCapitalize
					returnKeyType="next"
					value={userName}
					onChangeText={this._onChangeInput(USERNAME)}
				/>
				<IAInput
					label={langs.email}
					activeColor={colors.black}
					underlineColor={colors.input_underline}
					style={{color: colors.white}}
					labelStyle={textStyles.input_label}
					containerStyle={styles.inputEmail}
					editable={true}
					keyboardType="email-address"
					returnKeyType="next"
					value={email}
					onChangeText={this._onChangeInput(EMAIL)}
				/>
				<IAInput
					label={langs.password}
					activeColor={colors.black}
					secureTextEntry
					underlineColor={colors.input_underline}
					style={{color: colors.white}}
					labelStyle={textStyles.input_label}
					containerStyle={styles.inputPass}
					editable={true}
					value={password}
					returnKeyType="done"
					onChangeText={this._onChangeInput(PASSWORD)}
				/>
				<TouchableOpacity style={[styles.inputPass, {marginBottom: 10, justifyContent: "space-between", alignContent: "center", flexDirection: "row", alignItems: "center"}]} onPress={()=>this.showDateTimePicker()}>
					<IAText style={{paddingTop: 10, color: "#fff", height: 40, opacity: 0.55, fontSize: 17,
						justifyContent: "center", alignSelf: "center", alignContent: "center", fontFamily: fonts.family.nunito.regular,
						alignItems: "center"}} text={"Birthday: "}/>
					<IAText style={{
						paddingTop: 10, color: "#fff", height: 40, opacity: 0.55, fontSize: 17,
						justifyContent: "center", alignSelf: "center", alignContent: "center", fontFamily: fonts.family.nunito.regular,
						alignItems: "center"
					}} text={dob}/>
				</TouchableOpacity>
				<IALine color={colors.black_lessy} height={1}/>
				{Platform.OS === "ios" ? 
					<InputAccessoryView
						style={{flexDirection: "row", alignItems: "flex-end"}}
						backgroundColor={colors.white}
						nativeID={inputAccessoryViewID}>
						<View style={{alignItems: "flex-end", paddingRight: 10}}>
							<Button
								color={colors.blue}
								onPress={()=>{Keyboard.dismiss();}}
								title="Next"
							/>
						</View>
					</InputAccessoryView> : null}
			</View>
		);
	}

	_signUpFormParent() {
		const {userName, email, password, invitationCode} = this.state;
		return (
			<View >
				<IAInput
					label={langs.userName}
					activeColor={colors.black}
					underlineColor={colors.input_underline}
					style={{color: colors.white, height: 40}}
					labelStyle={textStyles.input_label}
					containerStyle={styles.inputEmail}
					editable={true}
					autoCapitalize
					returnKeyType="next"
					value={userName}
					onChangeText={this._onChangeInput(USERNAME)}
				/>
				<IAInput
					label={langs.email}
					activeColor={colors.black}
					underlineColor={colors.input_underline}
					style={{color: colors.white}}
					labelStyle={textStyles.input_label}
					containerStyle={styles.inputEmail}
					editable={true}
					keyboardType="email-address"
					returnKeyType="next"
					value={email}
					onChangeText={this._onChangeInput(EMAIL)}
				/>
				<IAInput
					label={langs.password}
					activeColor={colors.black}
					secureTextEntry
					underlineColor={colors.input_underline}
					style={{color: colors.white}}
					labelStyle={textStyles.input_label}
					containerStyle={styles.inputPass}
					editable={true}
					value={password}
					returnKeyType="done"
					onChangeText={this._onChangeInput(PASSWORD)}
				/>
				<IAInput
					label={"Invitation code"}
					activeColor={colors.black}
					underlineColor={colors.input_underline}
					style={{color: colors.white}}
					labelStyle={textStyles.input_label}
					containerStyle={styles.inputPass}
					editable={true}
					value={invitationCode}
					returnKeyType="done"
					onChangeText={this._onChangeInput(CODE)}
				/>
				{Platform.OS === "ios" ? 
					<InputAccessoryView
						style={{flexDirection: "row", alignItems: "flex-end"}}
						backgroundColor={colors.white}
						nativeID={inputAccessoryViewID}>
						<View style={{alignItems: "flex-end", paddingRight: 10}}>
							<Button
								color={colors.blue}
								onPress={()=>{Keyboard.dismiss();}}
								title="Next"
							/>
						</View>
					</InputAccessoryView> : null}
			</View>
		);
	}

	_renderLine() {
		return (
			<Animatable.View animation="fadeInDownBig" style={{justifyContent: "space-between", flexDirection: "row", alignContent: "center", alignSelf: "center", alignItems: "center", marginTop: 20}}>
				<IALine height={1} color={colors.white} style={{marginTop: 25, marginEnd: 10, width: ScreenWidth/ 2 - 50}}/>
				<Text style={{color: colors.white}}>OR</Text>
				<IALine height={1} color={colors.white} style={{marginTop: 25, marginStart: 10, width: ScreenWidth/ 2 - 50}}/>
			</Animatable.View>
		);
	}

	_renderBackLogin() {
		return (
			<View style={styles.forgotPassword} >
				<TouchableOpacity onPress={()=>this.goBack(2)}>
					<Text style={[styles.signInTitle]}>
						{"Already has account? "}
						<Text style={[styles.signInTitle, {color: colors.blue}]}>
							{"Sign in"}
						</Text>
					</Text>
				</TouchableOpacity>
			</View>
		);
	}

	render() {
		const {signUpStatus} = this.props;
		const btnLoading = signUpStatus.isFetching();
		// eslint-disable-next-line no-unused-vars
		const {userName, email, phone, password, isVerified, confirmResult, prefix} = this.state;
		var isSitter = this.props.navigation.state.params.currentUserType === Constant.USER_TYPE.sitter;
		return (
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
					<View style={{flex: 1,  justifyContent: "flex-start", alignItems: "flex-start"}}>
						<Text style={[styles.welcomeTitle]}>{langs.signUpTitle}</Text>
					</View>
					{isSitter ? 
						<View style={{flex: 6, justifyContent: "center",}}>
							{this._signUpForm()}
						</View> :
						<View style={{flex: 6, justifyContent: "center"}}>
							{this._signUpFormParent()}
						</View> }
					<View style={{flex: 5}}>
						<View>
							{this._renderSignUpBtn()}
							{this._renderLine()}
							<View style={styles.containerLoginSocial}>
								{this._renderFBSDKLogin()}
								{this._renderGoogleLogin()}
							</View>
						</View>
						<View style={{marginTop: 10, justifyContent: "center", alignItems: "center"}}>
							{this._renderBackLogin()}
						</View>
					</View>
				</ScrollView>
				{btnLoading ? this._renderLoading():null}
				<DateTimePicker
					isDarkModeEnabled= {this.colorScheme === "dark"}
					isVisible={this.state.isDateTimePickerVisible}
					onConfirm={this.handleDatePicked}
					onCancel={this.hideDateTimePicker}
					minimumDate={new Date(1900, 1, 1)}
					maximumDate={new Date(new Date().getFullYear() - 19, 1, 1)}
				/>
			</LinearGradient>
		);
	}
}
const mapStateToProps = state => {
	return {
		signUpStatus: state.signUpReducer.signUp.status,
		signUpError: state.signUpReducer.signUp.error,
		signUpData: state.signUpReducer.signUp.data,
	};
};
const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			signUp
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignUpScreen);
