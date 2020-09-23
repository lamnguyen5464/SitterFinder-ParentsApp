import React from "react";
import {View, Text, TouchableOpacity, StatusBar, ScrollView, Alert} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import BaseScreen from "../BaseScreen/index";
import IAInput from "../../shared/components/IAInput";
import {styles} from "./style";
import {textStyles} from "../../shared/utils/styles/textStyles";
import {colors} from "../../shared/utils/colors/colors";
import Validator from "../../shared/utils/validator/Validator";
import I18n from "../../shared/utils/locale/i18n";
import {signIn} from "./actions";
import {ScreenNames} from "../../route/ScreenNames";
import IALine from "../../shared/components/IALine";
import LinearGradient from "react-native-linear-gradient";
import * as Animatable from "react-native-animatable";
import {LoginManager} from "react-native-fbsdk";
import {images} from "../../../assets/index";
import {AccessToken, GraphRequest, GraphRequestManager} from "react-native-fbsdk";
import {GoogleSignin, statusCodes} from "react-native-google-signin";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import IARefreshing from "../../shared/components/IARefreshing";
import Constant from "../../shared/utils/constant/Constant";
import IAText from "../../shared/components/IAText";
import LogManager from "../../shared/utils/logging/LogManager";
import {ScreenWidth} from "../../shared/utils/dimension/Divices";
import {AlertHelper} from "../../shared/utils/AlertHelper";

const langs = {
	welcomeBack: I18n.t("welcomeTitle"),
	signInTitle: I18n.t("signInTitle"),
	email: I18n.t("email"),
	password: I18n.t("password"),
	forgotPassword: I18n.t("forgotPassword"),
	signIn: I18n.t("signIn"),
	signUp: I18n.t("signUp"),
	btnLoginFacebook: I18n.t("fb"),
	somethingWrong: I18n.t("somethingWrong"),
	error: I18n.t("error"),
	validEmailIncorrect: I18n.t("emailInvalid"),
	validPasswordIncorrect: I18n.t("passwordInvalid"),
	success: I18n.t("success"),
	loginSuccess: I18n.t("loginSuccess"),
	loginFailedTitle: I18n.t("loginFail"),
	googleNotSupport: I18n.t("notSupport"),
	googleSignInError: I18n.t("googleSignInSuspend"),
	errorFetchingDataFB: I18n.t("errorFetchingData"),
	askSignUp: I18n.t("askSignUp"),
	emptyEmail: I18n.t("emptyEmail"),
	passHigher8: I18n.t("createAcc.passHigher8"),
	reset: I18n.t("reset"),
};
const EMAIL = "email";
const PASSWORD = "password";

function LoginForm({editable, onChangeInput, email, password}) {
	return (
		<Animatable.View animation="fadeIn" style={[styles.formContainer]}>
			<IAInput
				label={langs.email}
				activeColor={colors.black}
				underlineColor={colors.input_underline}
				labelStyle={textStyles.input_label}
				containerStyle={styles.inputEmail}
				editable={editable}
				keyboardType="email-address"
				value={email}
				returnKeyType="next"
				style={{color: colors.white}}
				onChangeText={onChangeInput(EMAIL)}
			/>
			<IAInput
				label={langs.password}
				activeColor={colors.black}
				secureTextEntry
				underlineColor={colors.input_underline}
				labelStyle={textStyles.input_label}
				containerStyle={styles.inputPass}
				editable={editable}
				value={password}
				returnKeyType="done"
				style={{color: colors.white}}
				onChangeText={onChangeInput(PASSWORD)}
			/>
		</Animatable.View>
	);
}

/**
 * This should be modified a little bit that if user has logged in, directly go to homescreen
 * This will be belong to next sprint
 */
class LoginScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: ""
		};
		this._onChangeInput = this._onChangeInput.bind(this);
		this.handleResponseSignIn = this.handleResponseSignIn.bind(this);
		this.validFormInput = this.validFormInput.bind(this);
		this._goToLoginFacebook = this._goToLoginFacebook.bind(this);
		this._onLoginPressed = this._onLoginPressed.bind(this);
		this._goToForgotPassword = this._goToForgotPassword.bind(this);
	}

	componentWillMount() {
		// Configuration for google signin flow
		GoogleSignin.configure({
			webClientId: Constant.WEB_CLIENT_ID
		});
	}

	componentWillReceiveProps(nextProps) {
		// handle response sign in on change
		if (nextProps.signInStatus !== this.props.signInStatus) this.handleResponseSignIn(nextProps);
	}

	async handleResponseSignIn(nextProps) {
		console.log(LogManager.parseJsonObjectToJsonString(nextProps));
		if (nextProps.signInStatus.isFetching()) return;
		// handle response
		if (nextProps.signInStatus.isSuccess()) {
			if (nextProps.signInUserInfo && nextProps.signInUserInfo.accountType !== "PARRENT") {
				AlertHelper.showError("Wrong platform", "This account is not a parent account, please try login again with parent account! \nThank you.");
			} else {
				await this._saveUserInfo(nextProps.signInUserInfo);
				this._goToHomeScreen();
			}
			return;
		}
		if (nextProps.signInStatus.isFailure()) {
			// get error message from error object
			AlertHelper.showError(langs.loginFailedTitle, nextProps.signInError.message ? nextProps.signInError.message : (nextProps.signInError.data ? nextProps.signInError.data.message : langs.error));
			return;
		}
	}

	_saveUserInfo(userInfo) {
		IALocalStorage.setUserInfo(userInfo);
		IALocalStorage.setUserToken(userInfo.accessToken);
		IALocalStorage.setUserEmail(userInfo.email);
		IALocalStorage.setIsParent(userInfo.accountType === "PARRENT");
	}

	_goToHomeScreen = () => {
		this.goToScreen(ScreenNames.HomeScreen);
	}

	validFormInput() {
		const {email, password} = this.state;
		// check valid input
		let validUserName = "";
		validUserName = Validator.checkEmptyField(email)
			? `${Validator.checkEmptyField(email)}`
			: "";
		const validPassword = Validator.checkEmptyField(password)
			? `\n${Validator.checkEmptyField(password)}`
			: "";
		const validUsername = Validator.checkEmail(email)
			? `\n${Validator.checkEmail(email)}`
			: "";
		const isInvalid = validUserName || validUsername || validPassword;
		// get error message
		var errorMessage = "";
		if (validUserName != "") {
			errorMessage = `${validUserName}`;
		} else {
			errorMessage = `${validUsername} ${validPassword}`;
		}

		// return isInvalid and message
		return {isInvalid, errorMessage};
	}

	_onLoginPressed() {
		this.signOut();
		const {email, password} = this.state;
		const {isInvalid, errorMessage} = this.validFormInput();
		if (isInvalid) {
			this.alertInfo(langs.error, errorMessage);
			return;
		}
		// Sign in process
		this.dismissKeyboard();
		if (password.length < 6) {
			this.alertInfo(langs.error, langs.passHigher8);
		} else {
			this.props.signIn({
				email: email.toLowerCase(),
				password,
				loginType: Constant.LOGIN_TYPE.original,
			});
		}
	}

	_onChangeInput(key) {
		if (key === PASSWORD) {
			return value => this.setState({[key]: value});
		}
		return value => this.setState({[key]: Validator.trimValue(value)});
	}

	_goToLoginFacebook() {
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
				this.alertInfo(langs.error, err.message);
			});
	}

	_getFBUserInfo() {
		AccessToken.getCurrentAccessToken()
			.then((user) => {
				// There are some info here:
				// user.accessToken
				// user.accessTokenSource
				// user.userID
				IALocalStorage.setTokenUserInfoFacebook(user.accessToken);
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
						console.log("Access Facebook SDK for userInfo: " + LogManager.parseJsonObjectToJsonString(user));
						// IALocalStorage.setUserInfo(result);
						if (result.email) {
							this.props.signIn({
								email: result.email,
								password: "",
								loginType: Constant.LOGIN_TYPE.social,
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

	_renderLoginBtn() {
		return (
			<View style={styles.btnLoginContainer}>
				<TouchableOpacity style={styles.btnLogin} onPress={this._onLoginPressed}>
					<LinearGradient
						colors={[colors.blue, colors.blue]}
						style={styles.buttonSignInContainer}>
						<Animatable.Text animation="bounceInLeft" style={styles.buttonText}>
							{langs.signIn}
						</Animatable.Text>
					</LinearGradient>
				</TouchableOpacity>
			</View>
		);
	}

	signIn = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const loggedInUser = await GoogleSignin.signIn();
			// Login with google
			console.log("Access Google SDK for userInfo: " + LogManager.parseJsonObjectToJsonString(loggedInUser));
			this.props.signIn({
				email: loggedInUser.user.email,
				password: "",
				loginType: Constant.LOGIN_TYPE.social,
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

	_goToForgotPassword() {
		this.goToScreen(ScreenNames.ForgotPasswordScreen);
	}

	_renderFBSDKLogin() {
		return (
			<TouchableOpacity style={[styles.fbContainer]} onPress={this._goToLoginFacebook}>
				<Animatable.View animation="fadeInLeft" style={styles.btnFBLoginContainer}>
					<IAText text="Facebook" style={styles.fbText}/>
				</Animatable.View>
			</TouchableOpacity>
		);
	}

	_renderGoogleLogin() {
		return (
			<TouchableOpacity style={styles.googleContainer} onPress={this.signIn}>
				<Animatable.View animation="fadeInRight" style={styles.btnGoogleLoginContainer}>
					<IAText text="Google" style={styles.fbText}/>
				</Animatable.View>
			</TouchableOpacity>
		);
	}

	_renderForgotPassword() {
		return (
			<View style={styles.forgotPassword} >
				<TouchableOpacity onPress={()=>this.goToScreen(ScreenNames.ForgotPasswordScreen)}>
					<Text style={[styles.signInTitle]}>
						{langs.forgotPassword}
						<Text style={[styles.signInTitle, {color: colors.blue}]}>
							{langs.reset}
						</Text>
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
	_renderSignUp() {
		return (
			<TouchableOpacity style={[styles.forgotPassword, {marginBottom: 10}]} onPress={()=>{this.goToScreen(ScreenNames.OptionSignupScreen);}}>
				<View>
					<Text style={[styles.signInTitle]}>
						{langs.askSignUp}
						<Text style={[styles.signInTitle, {color: colors.blue}]}>{langs.signUp}</Text>
					</Text>		
				</View>  
			</TouchableOpacity>
		);
	}
	_renderLine() {
		return (
			<Animatable.View animation="fadeInDownBig" style={{justifyContent: "space-between", flexDirection: "row", alignContent: "center", alignSelf: "center", alignItems: "center"}}>
				<IALine height={1} color={colors.white} style={{marginTop: 15, marginEnd: 10, width: ScreenWidth/ 2 - 50}}/>
				<Text style={{color: colors.white}}>OR</Text>
				<IALine height={1} color={colors.white} style={{marginTop: 15, marginStart: 10, width: ScreenWidth/ 2 - 50}}/>
			</Animatable.View>
		);
	}

	render() {
		const {email, password} = this.state;
		const {signInStatus} = this.props;
		const btnLoading = signInStatus.isFetching();
		return (
			<LinearGradient
				colors={Constant.BACKGROUND_COLORS}
				style={styles.mainContainer}>
				<StatusBar barStyle="light-content" hidden/>
				<ScrollView style={styles.mainContainer} 
					contentContainerStyle={styles.mainContainer} 
					showsVerticalScrollIndicator={false}>
					<View style={styles.mainContent}>
						<View style={{height: "15%", justifyContent: "center", alignItems: "center"}}>
							<Animatable.Image animation="fadeInDown" source={images.splash_ico} style={{width: 100, height: 100, alignSelf: "center"}}/>
						</View>
						<View style={{height: "30%", justifyContent: "center"}}>
							<LoginForm
								editable={true}
								onChangeInput={this._onChangeInput}
								email={email}
								password={password}/>
						</View>
						<View style={{height: "30%"}}>
							{this._renderLoginBtn()}
							{this._renderLine()}
							<View style={styles.containerLoginSocial}>
								{this._renderFBSDKLogin()}
								{this._renderGoogleLogin()}
							</View>
						</View>
						<View style={{height: "25%", justifyContent: "center", alignItems: "center"}}>
							{this._renderForgotPassword()}
							{this._renderSignUp()}
						</View>
					</View>
				</ScrollView>
				{btnLoading ? this._renderLoading() : null}
			</LinearGradient>
		);
	}
}
const mapStateToProps = state => {
	return {
		signInStatus: state.loginReducer.signIn.status,
		signInError: state.loginReducer.signIn.error,
		signInUserInfo: state.loginReducer.signIn.userInfo,
	};
};
const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			signIn
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginScreen);
