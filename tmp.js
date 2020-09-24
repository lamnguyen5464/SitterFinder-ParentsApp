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
    render() {
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

    // render(){
    //     return(
    //         // <Provider store = {Store}>

    //         // </Provider>
    //         <View>
    //             <Text>123131</Text>
    //             <Text>123123</Text>
    //             {this._renderPackages}
    //         </View>
    //     );
    // }

}