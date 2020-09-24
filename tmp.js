import React, {Component} from "react";
import {View, Keyboard, TouchableOpacity, StatusBar, Text} from "react-native";
// import I18n from "./js/shared/utils/locale/i18n";
// import {PacmanIndicator} from "react-native-indicators";
import BaseScreen from "./js/containers/BaseScreen";
// import store from "./js/store/configureStore";
import IAHeader from "./js/shared/components/IAHeader";
import LinearGradient from "react-native-linear-gradient";
import Constant from "./js/shared/utils/constant/Constant";
import {ScreenWidth} from "./js/shared/utils/dimension/Divices";
import {colors} from "./js/shared/utils/colors/colors";
import fonts from "./js/shared/utils/fonts/fonts";
import IALine from "../../shared/components/IALine";
// const Store = new store(js
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
export default class Tmp extends BaseScreen{

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
	_renderNext () {
		if (this.state.currentIndex >= 0) {
			return (
				<Text>Go</Text>
			)
		} else {
			return null;
		}
		
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
								<Text style={{color: colors.white, fontSize: 22, }}>{item.name}</Text>
								<Text style={{color: colors.white, fontSize: 18, }}>{`${item.prices} ${item.currency}`}</Text>
								<Text style={{color: colors.white, fontSize: 16, }}>{`Credits: ${item.credits}`}</Text>
								<Text style={{color: colors.white, fontSize: 16, }}>{`Expiration: ${item.expirationMonth} months`}</Text>
								<Text style={{color: colors.white, fontSize: 15, }}>{`${item.desc}`}</Text>
							</LinearGradient>
							{/* <LottieView resizeMode="center" source={require("../../../assets/imgs/credit_card.json")} style={{alignSelf:"center", width: ScreenWidth/2, height: ScreenWidth/2}} autoPlay loop/> */}
						</TouchableOpacity>
					);
				})}
			</View>
		);
	}

    render(){
        return(
            <View style = {styles.mainContainer}>

            </View>
        );
    }

}