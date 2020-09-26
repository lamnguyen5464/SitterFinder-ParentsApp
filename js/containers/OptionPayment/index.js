import React from "react";
import {View, Text, Switch, TouchableOpacity, StatusBar, Platform, ScrollView} from "react-native";
import BaseScreen from "../BaseScreen/index";
import {styles} from "./style";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import I18n from "../../shared/utils/locale/i18n";
import IAText from "../../shared/components/IAText";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import Constant from "../../shared/utils/constant/Constant";
import {images} from "../../../assets";
import * as Animatable from "react-native-animatable";
import {colors} from "../../shared/utils/colors/colors";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import TouchID from "react-native-touch-id";
import IAHeader from "../../shared/components/IAHeader";
import * as device from "../../shared/utils/device/device";
import IALine from "../../shared/components/IALine";
import LinearGradient from "react-native-linear-gradient";
import {ScreenNames} from "../../route/ScreenNames";
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

const PACKAGES = [
	{
		id: 1,
		name: "PAY_AS_YOU_GO",
		prices: "700.000",
		currency: "VND",
		credits: 20,
		expirationMonth: 2,
		desc: "This is suitable to who just join our app"
	},
	{
		id: 2,
		name: "STARTER",
		prices: "750.000",
		currency: "VND",
		credits: 25,
		expirationMonth: 2,
		desc: "This is a good point for starters"
	},
	{
		id: 3,
		name: "SILVER",
		prices: "1.400.000",
		currency: "VND",
		credits: 50,
		expirationMonth: 2,
		desc: "You should buy this package if you have a little bit experiences"
	},
	{
		id: 4,
		name: "GOLD",
		prices: "2.000.000",
		currency: "VND",
		credits: 80,
		expirationMonth: 2,
		desc: "Here we go our way!"
	},
	{
		id: 5,
		name: "PLATINUM",
		prices: "3.500.000",
		currency: "VND",
		credits: 150,
		expirationMonth: 2,
		desc: "Move on, let do the magics"
	},
];

class OptionPayment extends BaseScreen {
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
		};
		IALocalStorage.getUserInfo().then(data => {
			this.setState({id: data.id});
		});
	}

	componentDidMount() {
		console.log("On start OptionPayment")
		// this.addTriggerForScreen();
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
			<IAText text={"Payment options via ATM"} style={styles.title}/>
		);
	}

	_renderRequest = async () => {
		if (this.state.bankOwner === "" || this.state.bankName === "" || this.state.note === "") {
			AlertHelper.showError("Error", "Please fill all the blank before make a request to our admin");
		} else {
			let user = await IALocalStorage.getUserInfo();
			this.setState({isLoading: true});
			AxiosFetch({
				method: "POST",
				url: "api/parentrequest/save",
				data: {
					bank: this.state.bankName,
					dateTransfer: new Date().getTime(),
					note: this.state.note,
					ownerBank: this.state.bankOwner,
					packageSubscriptionType: PACKAGES[this.props.navigation.state.params.package].name,
					parentId: user.id,
					requestStatus: "REQUEST"
				},
				contentType: "application/json",
				onSuccess: data => {
					AlertHelper.showSuccess("Success", "Request has been sent. Our admin will review as soon as possible");
					this.setState({
						isLoading: false,
					}, () => {
					});
					setTimeout(()=>{
						this.goBack();
	
					}, 1000);
				},
				onError: error => {
					AlertHelper.showError("Error", error.message);
					this.setState({isLoading: false});
				},
				hasToken: true
			});
		}
	}


	render() {
		return(
			<View 
				style={styles.mainContainer}>
				<StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true}/>
				<IAHeader viewLeft={this.renderBackButton()}
					styleLeft={styles.headerLeft}
					viewCenter={this._renderTitle()}
					onPressLeft={()=>this.goBack()}/>
				<ScrollView style={styles.mainContent}>
					<Text style={[styles.motto, {opacity: 0.5}]}>{"Please transfer to this bank account, with full description, id transaction after you successfully transfer"}</Text>
					<View style={{justifyContent: "center", alignContent: "center", alignItems: "flex-start", borderRadius: 8, borderColor: colors.gray, borderWidth: 1, marginTop: 24, marginBottom: 24, marginEnd: 24, marginLeft: 24}}>
						<Text style={[styles.motto]}>{"Bank name: SACOMBANK"}</Text>
						<Text style={[styles.motto]}>{"Bank number: 0602.0370.3946"}</Text>
						<Text style={[styles.motto, {marginBottom: 24,}]}>{"Owner: Van Nguyen"}</Text>
					</View>
				
					<Text style={[styles.motto, {opacity: 0.7}]}>{"If you has transfered successfully to above account, please request to admin for update credit manual by fill all fields below"}</Text>
					<View style={{margin: 24}}>
						<TextField 
							label={"Credit package"}
							placeholder={""}
							editable={false}
							keyboardType='number-pad'
							// value={PACKAGES[this.props.navigation.state.params.package &&this.props.navigation.state.params.package || 0].name.replaceAll("_"," ")}  
							textColor={"#000"} style={{width: "80%", color: "#000"}}/>
						<TextField 
							label={"Bank name"}
							placeholder={"Sacombank,..."}
							keyboardType='default'
							onChangeText={(text) => this.setState({bankName: text})}
							value={this.state.bankName}  
						 textColor={"#000"} style={{width: "80%", color: "#000"}}/>
						 <TextField 
							label={"Bank account number"}
							placeholder={"Card owner"}
							keyboardType='default'
							onChangeText={(text) => this.setState({bankOwner: text})}
							value={this.state.bankOwner}  
						 textColor={"#000"} style={{width: "80%", color: "#000"}}/>
						 <TextField 
							label={"Note"}
							placeholder={"What do you want our admin will be noticed?"}
							keyboardType='default'
							onChangeText={(text) => this.setState({note: text})}
							value={this.state.note}  
							multiline
						 textColor={"#000"} style={{width: "80%", color: "#000"}}/>
						 </View>
				</ScrollView>
				<TouchableOpacity style={{marginTop: 30, marginBottom: Platform.OS === "ios" && device.isIphoneX() ?  30 : 0, width: "100%", backgroundColor: colors.green,
					 justifyContent: "center", height: 54, alignItems: "center"}} onPress={()=>{this._renderRequest()}}>
					<Text style={{ fontSize: 17, color: colors.white}}>Send</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(OptionPayment);