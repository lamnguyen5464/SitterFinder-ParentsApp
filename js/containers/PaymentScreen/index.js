import React from "react";
import {View, ScrollView, Text, StatusBar, Image, RefreshControl, TouchableOpacity} from "react-native";
import BaseScreen from "../BaseScreen/index";
import {styles} from "./style";
import ReactNativePickerModule from "react-native-picker-module";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
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

const STATUSES = ["Payment via ATM", "Payment via stripe"];
const PACKAGES = [
	{
		id: 1,
		name: "Pay as you go",
		prices: "700.000",
		currency: "VND",
		credits: 20,
		expirationMonth: 2,
		desc: "This is suitable to who just join our app"
	},
	{
		id: 2,
		name: "Starter",
		prices: "750.000",
		currency: "VND",
		credits: 25,
		expirationMonth: 2,
		desc: "This is a good point for starters"
	},
	{
		id: 3,
		name: "Silver",
		prices: "1.400.000",
		currency: "VND",
		credits: 50,
		expirationMonth: 2,
		desc: "You should buy this package if you have a little bit experiences"
	},
	{
		id: 4,
		name: "Gold",
		prices: "2.000.000",
		currency: "VND",
		credits: 80,
		expirationMonth: 2,
		desc: "Here we go our way!"
	},
	{
		id: 5,
		name: "Platinum",
		prices: "3.500.000",
		currency: "VND",
		credits: 150,
		expirationMonth: 2,
		desc: "Move on, let do the magics"
	},
];

class PaymentScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state={
			currentIndex: -1,
		};
	}

	_onRefresh = () => {
		this._getUserInfo();
	}

	componentDidMount() {
		this.addTriggerForScreen();
	}

	componentWillUnmount() {
		this.focusListener.remove();
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
			<IAText text={"Buy credits"} style={styles.title}/>
		);
	}

	_renderMotto() {
		return (
			<IAText multiLine numberOfLines={3} text={"Choose one of these below packages to buy more credits to able to create new job"} style={styles.motto}/>
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

	_renderNext () {
		if (this.state.currentIndex >= 0) {
			return (
				<Text>Go</Text>
			)
		} else {
			return null;
		}
		
	}

	render() {
		return(
			<View style={styles.mainContainer}>
				<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
				<IAHeader viewLeft={this.renderBackButton()}
					viewRight={this._renderNext()}
					viewCenter={this._renderTitle()}
					styleLeft={styles.headerLeft}
					onPressRight={()=>{this.updateStatus.show()}}
					onPressLeft={()=>{this.goBack()}}/>
				<ScrollView
					contentContainerStyle={{padding: 10}}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={false}
							onRefresh={()=>this.getMsgs()}
						/>
					}>
					{this._renderMotto()}
					{this._renderPackages()}
					{/* {this.renderMessages()} */}
					<ReactNativePickerModule
						pickerRef={e => this.updateStatus = e}
						title={"Payment option"}
						items={STATUSES}
						onValueChange={(value, index) => {
							if (index == 0) {
								this.goToScreen(ScreenNames.OptionPayment, {package: this.state.currentIndex})
							} else {
								this.goToScreen(ScreenNames.OptionPaymentVISA, {package: this.state.currentIndex})
							}
						}} />
				</ScrollView>
				<DropdownAlert warnColor={colors.orange} warnImageSrc={null} successImageSrc={null} ref={ref => this.dropDownAlertRef = ref} />
				{/* {this.state.isLoading ? this._renderLoading() : null}
				{!this.state.isLoading ? this._renderSuccessPopup("Done!") : null}
				{this.state.isLoading ? this._renderWarningPopup("Fetching...") : null} */}
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);