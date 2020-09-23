import React from "react";
import {View, Text, TouchableOpacity, StatusBar} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import BaseScreen from "../BaseScreen/index";
import IAInput from "../../shared/components/IAInput";
import {styles} from "./style";
import {textStyles} from "../../shared/utils/styles/textStyles";
import {colors} from "../../shared/utils/colors/colors";
import Validator from "../../shared/utils/validator/Validator";
import I18n from "../../shared/utils/locale/i18n";
import * as Animatable from "react-native-animatable";
import {resetPassword} from "./actions";
import IAHeader from "../../shared/components/IAHeader";
import LinearGradient from "react-native-linear-gradient";
import LogManager from "../../shared/utils/logging/LogManager";
import IARefreshing from "../../shared/components/IARefreshing";
import Constant from "../../shared/utils/constant/Constant";
import { AlertHelper } from "../../shared/utils/AlertHelper";

const langs = {
	signUpTitle: I18n.t("signUpTitle"),
	email: I18n.t("email"),
	forgotPassword: I18n.t("forgotPassword"),
	somethingWrong: I18n.t("somethingWrong"),
	error: I18n.t("error"),
	validEmailIncorrect: I18n.t("emailInvalid"),
	success: I18n.t("success"),
	resetPasswordSuccessfully: I18n.t("resetPasswordSuccessfully"),
	mottoForgotPassword: I18n.t("mottoForgotPassword"),
	send: I18n.t("send"),
	forgotPasswordTitle: I18n.t("resetPassword")
};
const EMAIL = "email";

function ResetPassForm({editable, onChangeInput, email}) {
	return (
		<View style={[styles.formContainer]}>
			<IAInput
				label={langs.email}
				activeColor={colors.black}
				underlineColor={colors.input_underline}
				labelStyle={[textStyles.input_label, {color: colors.white}]}
				containerStyle={styles.inputEmail}
				editable={editable}
				keyboardType="email-address"
				style={{color: colors.white}}
				value={email}
				returnKeyType="done"
				onChangeText={onChangeInput(EMAIL)}
			/>
		</View>
	);
}

class ForgotPasswordScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state = {
			email: ""
		};
		this._onChangeInput = this._onChangeInput.bind(this);
		this.handleResponseResetPass = this.handleResponseResetPass.bind(this);
		this.validFormInput = this.validFormInput.bind(this);
		this._onResetPasswordPressed = this._onResetPasswordPressed.bind(this);
	}

	componentDidMount() {
		LogManager.showFullLog(LogManager.parseJsonObjectToJsonString(this.props));
	}

	componentWillReceiveProps(nextProps) {
		// handle response sign in on change
		if (nextProps.resetPasswordStatus !== this.props.resetPasswordStatus) this.handleResponseResetPass(nextProps);
	}

	async handleResponseResetPass(nextProps) {
		// not handle if the request is fetching
		if (nextProps.resetPasswordStatus.isFetching()) return;
		// handle response
		if (nextProps.resetPasswordStatus.isSuccess()) {
			this.alertInfo(langs.success, langs.resetPasswordSuccessfully, () => { this.goBack(); });
		}
		if (nextProps.resetPasswordStatus.isFailure()) {
			// get error message from error object
			// const errorMessage =
			//   (nextProps.resetPasswordError && (await getErrorMessage(nextProps.resetPasswordError))) || "";
			this.alertInfo(langs.error, nextProps.resetPasswordError.data.message);
		}
	}

	validFormInput() {
		const {email} = this.state;
		// check valid input
		let validEmptyEmail = "";
		validEmptyEmail = Validator.checkEmptyField(email)
			? `${Validator.checkEmptyField(email)}`
			: "";
		const validEmail = Validator.checkEmail(email)
			? `\n${Validator.checkEmail(email)}`
			: "";
		const isInvalid = validEmail || validEmptyEmail;
		// get error message
		var errorMessage = "";
		if (validEmptyEmail != "") {
			errorMessage = `${validEmptyEmail}`;
		} else {
			errorMessage = `${validEmptyEmail} ${validEmail}`;
		}
		// return isInvalid and message
		return {isInvalid, errorMessage};
	}

	_onResetPasswordPressed() {
		const {email} = this.state;
		const {isInvalid, errorMessage} = this.validFormInput();
		if (isInvalid) {
			this.alertInfo(langs.error, errorMessage);
			return;
		}

		this.dismissKeyboard();
		this.props.resetPassword({email});
	}

	_onChangeInput(key) {
		return value => this.setState({[key]: Validator.trimValue(value)});
	}

	_renderSendEmailToResetPasswordBtn() {
		const {resetPasswordStatus} = this.props;
		const btnLoading = resetPasswordStatus.isFetching();
		return (
			<View style={styles.btnLoginContainer}>
				{btnLoading ?
					<View style={styles.btnLogin}>
						<IARefreshing />
					</View>
					:
					<TouchableOpacity style={styles.btnLogin} onPress={this._onResetPasswordPressed}>
						<View
							style={styles.buttonSignInContainer}>
							<Text style={styles.buttonText}>
								{langs.send.toUpperCase()}
							</Text>
						</View>
					</TouchableOpacity>
				}
			</View>
		);
	}

	render() {
		const {email} = this.state;

		return (
			<LinearGradient
				colors={Constant.BACKGROUND_COLORS}
				style={styles.mainContainer}>
				<StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true}/>
				<IAHeader viewLeft={this.renderBackButton(colors.white)}
					styleLeft={styles.headerLeft}
					onPressLeft={()=>this.goBack()}/>
				<Animatable.View animation="bounceInDown" style={styles.mainContent}>
					<Animatable.Text animation="fadeInLeft" style={[styles.welcomeTitle]}>{langs.forgotPasswordTitle.toUpperCase()}</Animatable.Text>
					<Animatable.Text animation="fadeInRight" style={[styles.signInTitle]}>{langs.mottoForgotPassword}</Animatable.Text>
					<ResetPassForm
						editable={true}
						onChangeInput={this._onChangeInput}
						email={email}/>
					{ this._renderSendEmailToResetPasswordBtn() }
				</Animatable.View>
			</LinearGradient>
		);
	}
}
const mapStateToProps = state => {
	return {
		resetPasswordStatus: state.resetPasswordReducer.resetPassword.status,
		resetPasswordError: state.resetPasswordReducer.resetPassword.error,
	};
};
const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			resetPassword
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ForgotPasswordScreen);
