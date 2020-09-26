import React, {Component} from "react";
import {View, Text, StatusBar, StyleSheet, TouchableOpacity} from "react-native";
import BaseScreen from "./js/containers/BaseScreen";
import {Provider} from "react-redux";
import store from "./js/store/configureStore";
import {colors} from "./js/shared/utils/colors/colors";
import fonts from "./js/shared/utils/fonts/fonts";
import {ScreenHeight, ScreenWidth} from "./js/shared/utils/dimension/Divices";
import IAHeader from "./js/shared/components/IAHeader";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {CreditCardInput, LiteCreditCardInput} from "react-native-credit-card-input";
import * as device from "./js/shared/utils/device/device";
import {TextField} from "react-native-material-textfield";
import {
	createAppContainer,
	createSwitchNavigator,
	createBottomTabNavigator,
} from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import PaymentScreen from "./js/containers/PaymentScreen";
import OptionPaymentVISA from "./js/containers/OptionPaymentVISA";
import OptionPayment from "./js/containers/OptionPayment";
const StoreRedux = new store();
export class Screen1 extends BaseScreen{

	render(){
		return(
			<Provider store = {StoreRedux}>
				<AppContainerTest/>
			</Provider>
		);
	}
}

export class AppContainerTest extends React.Component {
	render() {
		// const Navigator = createDrawerNavigator(
		// 	{MainScreenNavigator: {screen: AppBottomTabNavigator}},
		// 	{
		// 		contentComponent: (props) => {
		// 			return (
		// 				<Drawer {...props}/>
		// 			);
		// 		},
		// 		drawerWidth: ScreenWidth,
		// 	}
		// );
		// SwitchNavigator for using the multiple stack in the same route
		// const AppSwitchNavigator = createSwitchNavigator({
		// 	SplashScreen: {screen: SplashScreen},
		// 	LoginScreen: {screen: LoginScreen},
		// 	HomeScreen: {screen: Navigator},
		// },{
		// 	initialRouteName: "SplashScreen"
		// });
		// ScreenNavigator for separately each screen into stack one
		const MainScreenNavigator = createStackNavigator(
			{
				
				PaymentScreen: PaymentScreen,
				OptionPaymentVISA: OptionPaymentVISA,
				OptionPayment: OptionPayment,
			},
			{
				mode: "modal",
				headerMode: "none",
				transparentCard: true,
			}
		);
		const App = createAppContainer(MainScreenNavigator);
		return <App/>;
		// return <App ref={navigatorRef => {
        //   			NavigationService.setTopLevelNavigator(navigatorRef);
		// }}
		// {...this.props} 
		// />;
	}
}