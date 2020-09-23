import React from "react";
import {View, ScrollView, Text, StatusBar, Image, RefreshControl, Platform, TouchableOpacity} from "react-native";
import BaseScreen from "../BaseScreen/index";
import {styles} from "./style";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as device from "../../shared/utils/device/device";
import I18n from "../../shared/utils/locale/i18n";
import IAText from "../../shared/components/IAText";
import {images} from "../../../assets";
import {colors} from "../../shared/utils/colors/colors";
import IAHeader from "../../shared/components/IAHeader";
import IALine from "../../shared/components/IALine";
import rootStyles from "../../shared/utils/styles/rootStyles";
import {ScreenWidth} from "../../shared/utils/dimension/Divices";
import fonts from "../../shared/utils/fonts/fonts";
import {AxiosFetch} from "../../api/AxiosFetch";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import LogManager from "../../shared/utils/logging/LogManager";
import IANodata from "../../shared/components/IANodata";
import {GiftedChat} from "react-native-gifted-chat";
import Constant from "../../shared/utils/constant/Constant";
var moment = require("moment-timezone");
import LottieView from "lottie-react-native";
import DropdownAlert from "react-native-dropdownalert";
import ModalDropdown from "react-native-modal-dropdown";
import LinearGradient from "react-native-linear-gradient";
import {ScreenNames} from "../../route/ScreenNames";
import {TextField} from "react-native-material-textfield";
import { AlertHelper } from "../../shared/utils/AlertHelper";

class Invitation extends BaseScreen {
	constructor(props) {
		super(props);
		this.state={
			email: "",
			isLoading: false,
		};
	}

	_onRefresh = () => {
		this._getUserInfo();
	}

	componentDidMount() {
		// this.addTriggerForScreen();
	}

	componentWillUnmount() {
		// this.focusListener.remove();
	}

	addTriggerForScreen() {
		this.focusListener = this.props && this.props.navigation.addListener("willFocus", async () => {
			// this.setState({updating: false,});
			// this.getMsgs();
			// let currentUser = await IALocalStorage.getUserInfo();
			// this.setState({currentUserId: currentUser.id, avatar: currentUser.avatar});
		});
	}

	async getMsgs() {
		// this.setState({isLoading: true});
		// const {user} = this.props.navigation.state.params;
		
		// AxiosFetch({
		// 	method: "GET",
		// 	url: "api/messages/find/toUserId?toUserId=" + user.userId,
		// 	contentType: "application/json",
		// 	onSuccess: data => {
		// 		this.setState({
		// 			messages: this._convertMessage(data.data),					
		// 			isLoading: false,
		// 		}, () => {
		// 		});
		// 	},
		// 	onError: error => {
		// 		this.setState({isLoading: false});
		// 	},
		// 	hasToken: true
		// });
	}

	_renderSpace = (height = 7) => {
		return (
			<IALine color={colors.black_lightly} height={height}/>
		);
	}

	_renderTitle() {
		return (
			<IAText text={"Invite your friend"} style={styles.title}/>
		);
	}

	_renderMotto() {
		return (
			<IAText multiLine numberOfLines={3} text={"Type your friend email here and we will invite to them"} style={styles.motto}/>
		);
	}

	_renderMethod() {
		return (
			<View style={{flexDirection: "column", justifyContent: "center"}}>
				<TouchableOpacity onPress={()=>{
				}}>
					<LottieView resizeMode="center" source={require("../../../assets/imgs/credit_card.json")} style={{alignSelf:"center", width: ScreenWidth/2, height: ScreenWidth/2}} autoPlay loop/>
				</TouchableOpacity>
				<TouchableOpacity onPress={()=>{
					this.dropDownAlertRef.alertWithType("error", "Hold on", "We are developing this feature, please try again later!" );
				}}>
					<Image resizeMode="center" source={images.momo} style={{alignSelf: "center", width: ScreenWidth/2.5, height: ScreenWidth/2.5}}/>
				</TouchableOpacity>
			</View>
		);
	}

	_renderPackages() {
		return (
			<View style={{flexDirection: "column", justifyContent: "center", alignContent: "center", alignItems: "center"}}>
				{PACKAGES.map((item, index) => {
					var isSame = index === this.state.currentIndex;
					return (
						<TouchableOpacity style={[{marginBottom: 20,}, isSame? {borderColor: "#FFBF00" , borderWidth: 1.5, borderRadius: 12} : {}]} key={item.id} onPress={()=>{
							this.setState({currentIndex: index});
						}}>
							<LinearGradient 
								colors={Constant.PAYMENT[index]}
								start={{x: 0, y: 0}}
								end={{x: 1, y: 0}}
								locations={Constant.LOCATION_BACKGROUND_BTN}
								style={{padding: 20, borderRadius: 10, width: ScreenWidth-40, height: ScreenWidth/2.1}}>
								<Text style={{color: colors.white, fontSize: 22, fontFamily: fonts.family.nunito.bold}}>{item.name}</Text>
								<Text style={{color: colors.white, fontSize: 18, fontFamily: fonts.family.avenir_book.regular}}>{`${item.prices} ${item.currency}`}</Text>
								<Text style={{color: colors.white, fontSize: 16, fontFamily: fonts.family.nunito.bold}}>{`Credits: ${item.credits}`}</Text>
								<Text style={{color: colors.white, fontSize: 16, fontFamily: fonts.family.nunito.bold}}>{`Expiration: ${item.expirationMonth} months`}</Text>
								<Text style={{color: colors.white, fontSize: 15, fontFamily: fonts.family.avenir_book.regular}}>{`${item.desc}`}</Text>
							</LinearGradient>
							{/* <LottieView resizeMode="center" source={require("../../../assets/imgs/credit_card.json")} style={{alignSelf:"center", width: ScreenWidth/2, height: ScreenWidth/2}} autoPlay loop/> */}
						</TouchableOpacity>
					);
				})}
			</View>
		);
	}
	_updateDesc = async () => {
		this.setState({isLoading: true});
		let user = await IALocalStorage.getUserInfo();
		AxiosFetch({
			method: "POST",
			url: "api/" + user.id + "/invitation?email=" + this.state.email,
			contentType: "application/json",
			onSuccess: data => {
				this.setState({
					isLoading: false,
				});
				AlertHelper.showSuccess("Success", "Shared to your friend " + this.state.email);
			},
			onError: error => {
				this.setState({isLoading: false});
				AlertHelper.showError("Error", "Shared to your friend " + this.state.email + " failed: " + error.message || error.data.message);
			},
			hasToken: true
		});
	}
	
	render() {
		return(
			<View style={styles.mainContainer}>
				<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
				<IAHeader viewLeft={this.renderBackButton()}
					viewRight={null}
					viewCenter={this._renderTitle()}
					styleLeft={styles.headerLeft}
					onPressRight={()=>{}}
					onPressLeft={()=>{this.goBack();}}/>
				{this._renderMotto()}
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{margin: 30}}
					refreshControl={
						<RefreshControl
							refreshing={false}
							onRefresh={()=>this._onRefresh()}
						/>
					}>
					<TextField 
						label={"Email"}
						placeholder={"abc@gmail.com..."}
						keyboardType='default'
						onChangeText={(text) => this.setState({email: text})}
						value={this.state.email}  
						 textColor={"#000"} style={{width: "80%", color: "#000"}}/>
						 </ScrollView>
						 <TouchableOpacity style={{marginBottom: Platform.OS === "ios" && device.isIphoneX() ?  30 : 0, width: "100%", backgroundColor: colors.green,
					 justifyContent: "center", height: 54, alignItems: "center"}} onPress={()=>this._updateDesc()}>
					<Text style={{fontFamily: fonts.family.nunito.bold, fontSize: 17, color: colors.white}}>Save</Text>
				</TouchableOpacity>
				<DropdownAlert warnColor={colors.orange} warnImageSrc={null} successImageSrc={null} ref={ref => this.dropDownAlertRef = ref} />
				{this.state.isLoading ? this._renderLoading() : null}
			</View>
		);
	}
}
// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => {
	return {
	};
};
const mapDispatchToProps = dispatch =>
	bindActionCreators({
	}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Invitation);