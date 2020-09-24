import React from "react";
import {View, Text, Switch, TouchableOpacity, StatusBar, Platform, ScrollView} from "react-native";
import BaseScreen from "../BaseScreen/index";
import {styles} from "./style";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import I18n from "../../shared/utils/locale/i18n";
import IAText from "../../shared/components/IAText";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import Stripe from "react-native-stripe-api";

import {CreditCardInput, LiteCreditCardInput} from "react-native-credit-card-input";

import Constant from "../../shared/utils/constant/Constant";
import * as Animatable from "react-native-animatable";
import {colors} from "../../shared/utils/colors/colors";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import AntDesign from "react-native-vector-icons/AntDesign";
import IAHeader from "../../shared/components/IAHeader";
import * as device from "../../shared/utils/device/device";
import {TextField} from "react-native-material-textfield";
import fonts from "../../shared/utils/fonts/fonts";
import {AxiosFetch} from "../../api/AxiosFetch";
import {AlertHelper} from "../../shared/utils/AlertHelper";

const langs = {
	optionsSignup: I18n.t("optionsSignup.title"),
	motto: I18n.t("optionsSignup.motto"),
	sitter: I18n.t("optionsSignup.sitter"),
	parent: I18n.t("optionsSignup.parent"),
};
const apiKey = "pk_test_0QDZM8RAY1NNzES1mGQ1gC3v00hSOQx37K";
const client = new Stripe(apiKey);

const PACKAGES = [
	{
		id: 1,
		name: "PAY_AS_YOU_GO",
		prices: 700000,
		currency: "VND",
		credits: 20,
		expirationMonth: 2,
		desc: "This is suitable to who just join our app"
	},
	{
		id: 2,
		name: "STARTER",
		prices: 750000,
		currency: "VND",
		credits: 25,
		expirationMonth: 2,
		desc: "This is a good point for starters"
	},
	{
		id: 3,
		name: "SILVER",
		prices: 1400000,
		currency: "VND",
		credits: 50,
		expirationMonth: 2,
		desc: "You should buy this package if you have a little bit experiences"
	},
	{
		id: 4,
		name: "GOLD",
		prices: 2000000,
		currency: "VND",
		credits: 80,
		expirationMonth: 2,
		desc: "Here we go our way!"
	},
	{
		id: 5,
		name: "PLATINUM",
		prices: 3500000,
		currency: "VND",
		credits: 150,
		expirationMonth: 2,
		desc: "Move on, let do the magics"
	},
];
class OptionPaymentVISA extends BaseScreen {
	constructor(props) {
		super(props);
		this.state = {
			hasTouchId: false,
			hasFaceId: false,
			supportTouchID: false,
			supportFaceID: false,
			currentUserType: Constant.USER_TYPE.parent,
			bankName: "",
			bankOwner: "",
			note: "",
			desc: "",
			id: "",
			formData: undefined,
		};
		IALocalStorage.getUserInfo().then(data => {
			this.setState({id: data.id});
		});
	}
	componentDidMount = async() =>{
		
	}

	_renderUserType() {
		var userType = this.state.currentUserType;
		var isSitter = userType === Constant.USER_TYPE.parent;
		return (
			<View style={{flexDirection: "row", justifyContent: "space-between"}}>
				<TouchableOpacity style={[styles.parent, 
					{borderWidth: isSitter ? 1 : 0.4 , opacity: isSitter ? 1 : 0.8,
						backgroundColor:  colors.blue_sitter}]} 
				onPress={()=>{
					this.setState({currentUserType: Constant.USER_TYPE.parent});
				}}>
					<Animatable.Text animation="fadeInRight" style={{fontWeight: !isSitter ? "bold" : "500",color: isSitter ? colors.whiteWithOpacity : colors.white}}>{langs.parent}</Animatable.Text>
				</TouchableOpacity>
			</View>
		);
	}

	_renderNext() {
		return (
			<View style={{height: 50, width: 50, justifyContent: "center"}}>
				<AntDesign name="arrowright" size={25} color={colors.black}/>
			</View>
		);
	}
	
	_renderTitle() {
		return (
			<IAText text={"Stripe payment"} style={styles.title}/>
		);
	}

	_renderRequest = async () => {
		// if (this.state.formData) {
			const token = await client.createToken({
				number: this.state.formData.number ,
				exp_month: this.state.formData.expiry.split("/")[0], 
				exp_year: this.state.formData.expiry.split("/")[1], 
				cvc: this.state.formData.cvc,
				address_zip: "700000"
	// 			number: '4242424242424242' ,
    //    exp_month: '09', 
    //    exp_year: '24', 
    //    cvc: '111',
    //    address_zip: '12345'
			});
			// {"error":{"code":"incorrect_number","doc_url":"https://stripe.com/docs/error-codes/incorrect-number",
			// "message":"Your card number is incorrect.","param":"number","type":"card_error"}},
			console.log(token.id)
			if (!token.error) {
				let user = await IALocalStorage.getUserInfo();
				this.setState({isLoading: true});
				AxiosFetch({
					method: "POST",
					url: "api/parents/payment/charge",
					data: {
						token: token.id,
						amount: PACKAGES[this.props.navigation.state.params.package &&this.props.navigation.state.params.package || 0].prices,
						userId: user.id,
						type: "VISA",
						packageSubscriptionType: PACKAGES[this.props.navigation.state.params.package &&this.props.navigation.state.params.package || 0].name
					},
					contentType: "application/json",
					onSuccess: data => {
						AlertHelper.showSuccess("Success", "We charged and updated credit to your wallet. Thanks and create job for good life!");
						this.setState({
							isLoading: false,
						}, () => {
						});
						setTimeout(()=>{
							this.goBack();
		
						}, 1000);
					},
					onError: error => {
						AlertHelper.showError("Error while charging your money and updating credit package", error.message || error.data.message || "Hmm, its get something wrong now, please back later");
						this.setState({isLoading: false});
					},
					hasToken: true
				});
			} else {
				AlertHelper.showError("Error while charging your money and updating credit package", token.error.message);
			}
			
		// }
		
	}

	_onChange = (formData) =>  {this.setState({formData: formData.values}); console.log(JSON.stringify(formData, null, " "));};
	// _onFocus = (field) => {};
	_setUseLiteCreditCardInput = (useLiteCreditCardInput) => this.setState({useLiteCreditCardInput});
  
	render() {
		return(
			<View 
				style={styles.mainContainer}>
				<StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true}/>
				<IAHeader viewLeft={this.renderBackButton()}
					styleLeft={styles.headerLeft}
					viewCenter={this._renderTitle()}
					onPressLeft={()=>this.goBack()}/>
				<KeyboardAwareScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
				<View>
					<Text style={[styles.motto, {opacity: 0.7, marginLeft: 0, marginBottom: 20, marginRight: 0}]}>{"Please fill all the card name and you will be charge with currently credit package selected before."}</Text>
					
					<TextField 
						label={"Credit package selected"}
						placeholder={""}
						editable={false}
						keyboardType='number-pad'
						value={PACKAGES[this.props.navigation.state.params.package &&this.props.navigation.state.params.package || 0].name.replaceAll("_"," ")}  
						textColor={"#000"} style={{width: "80%", color: "#000"}}/>
					<Text style={[styles.motto, {opacity: 0.7, marginLeft: 0, marginBottom: 5, marginRight: 0}]}>{"Your card"}</Text>
					<LiteCreditCardInput
						// autoFocus
						// requiresName
						// requiresCVC
						// requiresPostalCode
					// 	validColor={"black"}
					// 	invalidColor={"red"}
					// 	placeholderColor={"darkgray"}
					// returnKey="done"
						// onFocus={this._onFocus}
						onChange={this._onChange} />
						</View>
				</KeyboardAwareScrollView>
				<TouchableOpacity style={{marginTop: 30, marginBottom: Platform.OS === "ios" && device.isIphoneX() ?  30 : 0, width: "100%", backgroundColor: colors.green,
					 justifyContent: "center", height: 54, alignItems: "center"}} onPress={()=>{this._renderRequest();}}>
					<Text style={{fontFamily: fonts.family.nunito.bold, fontSize: 17, color: colors.white}}>Send</Text>
				</TouchableOpacity>
				{this.state.isLoading ? this._renderLoading() : null}
			</View>
		);
	}
}
const mapStateToProps = state => {
	return {};
};
const mapDispatchToProps = dispatch =>
	bindActionCreators({
	}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OptionPaymentVISA);