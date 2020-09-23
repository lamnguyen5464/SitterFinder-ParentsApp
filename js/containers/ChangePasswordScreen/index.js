import React from "react";
import {View, Text, StatusBar, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import BaseScreen from "../BaseScreen/index";
import IAInput from "../../shared/components/IAInput";
import {styles} from "./style";
import {textStyles} from "../../shared/utils/styles/textStyles";
import {colors} from "../../shared/utils/colors/colors";
import Validator from "../../shared/utils/validator/Validator";
import I18n from "../../shared/utils/locale/i18n";
import {changePassword, resetPasswordByToken} from "./actions";
import IAHeader from "../../shared/components/IAHeader";
import LogManager from "../../shared/utils/logging/LogManager";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";
import IAWavingView from "../../shared/components/IAWavingView";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
// import {TouchableOpacity} from "react-native-gesture-handler";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import IARefreshing from "../../shared/components/IARefreshing";
// import { Button } from "react-native-paper";

const langs = {
	changePasswordTitle: I18n.t("resetPasswordViaEmail.title"),
	newPassword: I18n.t("resetPasswordViaEmail.newPassword"),
	oldPassword: I18n.t("resetPasswordViaEmail.oldPassword"),
	confirmPassword: I18n.t("resetPasswordViaEmail.confirmPassword"),
	forgotPassword: I18n.t("forgotPassword"),
	somethingWrong: I18n.t("somethingWrong"),
	error: I18n.t("error"),
	email: I18n.t("email"),
	validEmailIncorrect: I18n.t("emailInvalid"),
	success: I18n.t("success"),
	resetPasswordSuccessfully: I18n.t("yourPasswordHasChanged"),
	mottoForgotPassword: I18n.t("mottoForgotPassword"),
	send: I18n.t("send"),
	forgotPasswordTitle: I18n.t("forgotPasswordTitle"),
	update: I18n.t("resetPasswordViaEmail.update"),
	passHigher8: I18n.t("createAcc.passHigher8"),
};

function ChangePasswordForm({editable, onChangeInput, oldPass, newPass, confirmPassword}) {
	return (
		<View style={[styles.formContainer]}>
			<View>
				<IAInput
					label={langs.oldPassword}
					activeColor={colors.black}
					underlineColor={colors.input_underline}
					labelStyle={[textStyles.input_label, {color: colors.black}]}
					containerStyle={[styles.inputEmail]}
					editable={editable}
					keyboardType="default"
					returnKeyType="next"
					value={oldPass}
					style={{marginLeft: 10, marginEnd: 10, color: colors.black}}
					onChangeText={onChangeInput("oldPassword")}
					secureTextEntry
				/>
				<IAInput
					label={langs.newPassword}
					activeColor={colors.black}
					underlineColor={colors.input_underline}
					labelStyle={[textStyles.input_label, {color: colors.black}]}
					containerStyle={styles.inputEmail}
					editable={editable}
					keyboardType="default"
					returnKeyType="next"
					value={newPass}
					style={{marginLeft: 10, marginEnd: 10}}
					onChangeText={onChangeInput("newPassword")}
					secureTextEntry
				/>
				<IAInput
					label={langs.confirmPassword}
					activeColor={colors.black}
					underlineColor={colors.input_underline}
					labelStyle={[textStyles.input_label, {color: colors.black}]}
					containerStyle={styles.inputPass}
					editable={editable}
					style={{marginLeft: 10, marginEnd: 10}}
					value={confirmPassword}
					returnKeyType="done"
					onChangeText={onChangeInput("confirmPassword")}
					secureTextEntry
				/>
			</View>
		</View>
	);
}
function CreateNewPasswordForm({onChangeInput, email, newPass, confirmPassword}) {
	return (
		<View style={[styles.formContainer]}>
			<View>
				{/* <IAInput
					label={langs.email}
					activeColor={colors.black}
					underlineColor={colors.input_underline}
					labelStyle={[textStyles.input_label, {color: colors.black}]}
					containerStyle={[styles.inputEmail]}
					editable={false}
					keyboardType="default"
					returnKeyType="next"
					value={email}
					style={{marginLeft: 10, marginEnd: 10, color: colors.black}}
				/> */}
				<IAInput
					label={langs.newPassword}
					activeColor={colors.black}
					underlineColor={colors.input_underline}
					labelStyle={[textStyles.input_label, {color: colors.black}]}
					containerStyle={styles.inputEmail}
					editable={true}
					keyboardType="default"
					returnKeyType="next"
					value={newPass}
					style={{marginLeft: 10, marginEnd: 10}}
					onChangeText={onChangeInput("newPassword")}
					secureTextEntry
				/>
				<IAInput
					label={langs.confirmPassword}
					activeColor={colors.black}
					underlineColor={colors.input_underline}
					labelStyle={[textStyles.input_label, {color: colors.black}]}
					containerStyle={styles.inputPass}
					editable={true}
					style={{marginLeft: 10, marginEnd: 10}}
					value={confirmPassword}
					returnKeyType="done"
					onChangeText={onChangeInput("confirmPassword")}
					secureTextEntry
				/>
			</View>
		</View>
	);
}

class ChangePasswordScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state = {
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
		};
		this._onChangeInput = this._onChangeInput.bind(this);
		this.handleResponseChangePass = this.handleResponseChangePass.bind(this);
		this.validFormInput = this.validFormInput.bind(this);
		this._onChangePassword = this._onChangePassword.bind(this);
	}

	componentDidMount() {
		LogManager.showFullLog(LogManager.parseJsonObjectToJsonString(this.props));
	}

	componentWillReceiveProps(nextProps) {
		// handle response sign in on change
		if (nextProps.changePasswordStatus !== this.props.changePasswordStatus || 
				nextProps.resetPasswordStatus !== this.props.resetPasswordStatus ) 
			this.handleResponseChangePass(nextProps);
	}

	async handleResponseChangePass(nextProps) {
		// not handle if the request is fetching
		if (nextProps.changePasswordStatus.isFetching() || 
				nextProps.resetPasswordStatus.isFetching()) return;
		// handle response
		if (nextProps.changePasswordStatus.isSuccess()) {
			this.alertInfo(langs.success, langs.resetPasswordSuccessfully, () => { this.goBack(); });
		}
		if (nextProps.resetPasswordStatus.isSuccess()) {
			this.alertInfo(langs.success, langs.resetPasswordSuccessfully, () => { this.goBack(); });
		}
		if (nextProps.changePasswordStatus.isFailure()) {
			// get error message from error object
			// const errorMessage =
			//   (nextProps.resetPasswordError && (await getErrorMessage(nextProps.resetPasswordError))) || "";
			this.alertInfo(langs.error, nextProps.changePasswordError.data.message ? nextProps.changePasswordError.data.message : nextProps.changePasswordError.data);
		}
		if (nextProps.resetPasswordStatus.isFailure()) {
			// get error message from error object
			// const errorMessage =
			//   (nextProps.resetPasswordError && (await getErrorMessage(nextProps.resetPasswordError))) || "";
			this.alertInfo(langs.error, nextProps.resetPasswordError.data.message ? nextProps.resetPasswordError.data.message : nextProps.resetPasswordError.data);
		}
	}

	validFormInput() {
		const {newPassword, confirmPassword} = this.state;
		// check valid input
		let validEmptyNewPassword = "";
		validEmptyNewPassword = Validator.checkEmptyField(newPassword)
			? `${Validator.checkEmptyField(newPassword)}`
			: "";
		let validEmptyConfirmPassword = "";
		validEmptyConfirmPassword = Validator.checkEmptyField(confirmPassword)
			? `${Validator.checkEmptyField(confirmPassword)}`
			: "";
		const validMatchPass = Validator.checkConfirmPassword(newPassword, confirmPassword);

		const isInvalid = validEmptyNewPassword || validEmptyConfirmPassword || validMatchPass;

		// get error message
		var errorMessage = "";
		if (validEmptyNewPassword != "") {
			errorMessage = `${validEmptyNewPassword}`;
		} else if (validEmptyConfirmPassword != ""){
			errorMessage = `${validEmptyConfirmPassword}`;
		} else if (validMatchPass != "") {
			errorMessage = `${validMatchPass}`;
		}
		// return isInvalid and message
		return {isInvalid, errorMessage};
	}

	async _onChangePassword() {
		this.dismissKeyboard();
		console.log(this.props.navigation.state.params.token);
		if (this.props.navigation.state.params.token) {
			const {newPassword, confirmPassword} = this.state;
			let {isInvalid, errorMessage} = this.validFormInput();
			if (isInvalid) {
				this.alertInfo(langs.error, errorMessage);
				return;
			} else {
				// Reset password process
				if (newPassword.length < 6 || confirmPassword.length < 6) {
					this.alertInfo(langs.error, langs.passHigher8);	
				} else {
					this.props.resetPasswordByToken({
						token: this.props.navigation.state.params.token, 
						newPassword: newPassword, 
						email:  this.props.navigation.state.params.email});
				}	
			}
		} else {
			const {oldPassword, newPassword, confirmPassword} = this.state;
			let {isInvalid, errorMessage} = this.validFormInput();
			let email = await IALocalStorage.getUserEmail();
			if (isInvalid) {
				this.alertInfo(langs.error, errorMessage);
				return;
			} else {
				// Change password process
				if (oldPassword.length < 6 || newPassword.length < 6 || confirmPassword.length < 6) {
					this.alertInfo(langs.error, langs.passHigher8);	
				} else {
					if (email) {
						this.props.changePassword({currentPassword: oldPassword, newPassword: newPassword, email: email});
					} else {
						this.alertInfo(langs.error, "no email");
					}	
				}
		
			}
		}
	}

	onChangeInput(key) {
		return value => this.setState({[key]: value});
	}

	_onChangeInput(key) {
		return value => this.setState({[key]: value});
	}

	renderCheck() {
		const {changePasswordStatus} = this.props;
		const btnLoading = changePasswordStatus.isFetching();
		return (
			<View>
				{btnLoading ?
					<View>
						<IAWavingView size={10}/>
					</View>
					:
					<Feather name={"check"} size={32} color={colors.yellow}/>
				}
			</View>
		);
	}

	_renderUpdateBtn() {
		const {changePasswordStatus} = this.props;
		const btnLoading = changePasswordStatus.isFetching();
		if (btnLoading) {
			return (
				<View style={styles.btnLogin}>
					<IARefreshing />
				</View>
			);
		}
		return (
			<TouchableOpacity style={styles.btnLogout} onPress={()=>{this._onChangePassword();}}>
				<Text style={styles.buttonText}>{langs.update}</Text>
			</TouchableOpacity>
		);
	}

	render() {
		const {oldPassword, newPassword, confirmPassword} = this.state;
		const {changePasswordStatus} = this.props;
		let token = this.props.navigation.state.params.token && this.props.navigation.state.params.token;
		let email = this.props.navigation.state.params.email && this.props.navigation.state.params.email;
		return (
			<View style={styles.mainContainer}>
				<StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true}/>
				<IAHeader viewLeft={this.renderBackButton()}
					viewRight={null}
					styleLeft={styles.headerLeft}
					onPressRight={()=>{}}
					onPressLeft={()=>this.goBack()}/>
				<KeyboardAwareScrollView>
					<Animatable.Text animation="fadeInLeft" style={[styles.welcomeTitle]}>{token ? "Reset password" : langs.changePasswordTitle.toUpperCase()}</Animatable.Text>
					<Animatable.View animation="fadeInUpBig" style={styles.mainContent}>
						{token ? 
							<CreateNewPasswordForm  
								onChangeInput={this._onChangeInput}
								email={email}
								newPassword={newPassword}
								confirmPassword={confirmPassword}/> :
							<ChangePasswordForm
								editable={!changePasswordStatus.isFetching()}
								onChangeInput={this._onChangeInput}
								oldPassword={oldPassword}
								newPassword={newPassword}
								confirmPassword={confirmPassword}/> }
						{this._renderUpdateBtn()}
					</Animatable.View>
				</KeyboardAwareScrollView>
			</View>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		changePasswordStatus: state.changePasswordReducer.changePassword.status,
		changePasswordError: state.changePasswordReducer.changePassword.error,

		resetPasswordStatus: state.changePasswordReducer.resetPasswordByToken.status,
		resetPasswordError: state.changePasswordReducer.resetPasswordByToken.error,
	};
};
const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			changePassword,
			resetPasswordByToken
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChangePasswordScreen);
