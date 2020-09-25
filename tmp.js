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
// import {TextField} from "react-native-material-textfield";
// import {
// 	createAppContainer,
// 	createSwitchNavigator,
// 	createBottomTabNavigator,
// } from "react-navigation";
// import { createStackNavigator } from '@react-navigation/stack';
// // import { createDrawerNavigator } from '@react-navigation/drawer';
import PaymentScreen from "./js/containers/PaymentScreen";
import OptionPaymentVISA from "./js/containers/OptionPaymentVISA";
import OptionPayment from "./js/containers/OptionPayment";
const StoreRedux = new store();
export class Screen1 extends BaseScreen{

	render(){
		return(
			<Provider store = {StoreRedux}>
				<OptionPayment/>

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
				
				MainScreen: {screen: PaymentScreen},
			},
			{
				mode: "modal",
				headerMode: "none",
				transparentCard: true,
			}
		);
		const App = createAppContainer(MainScreenNavigator);
		return <App ref={navigatorRef => {
          			NavigationService.setTopLevelNavigator(navigatorRef);
		}}
		{...this.props} />;
	}


}

const HEADER_HEIGHT = ScreenHeight * 0.3;
const HEADER_WIDTH = ScreenWidth;
const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: colors.white,
		flex: 1,
	},
	content: {
		paddingStart: 27,
		paddingEnd: 20
	},
	drawer: {
		marginStart: 10
	},
	title: {
		// fontFamily: fonts.family.nunito.regular,
		fontSize: 22,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "left",
		color: colors.black,
	},
	request: {
		// fontFamily: fonts.family.nunito.regular,
		fontSize: 17,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "left",
		color: colors.black,
	},
	headerBackground: {
		backgroundColor: colors.deluge,
		height: HEADER_HEIGHT,
		width: HEADER_WIDTH,
		borderBottomLeftRadius: 60
	},
	welcomeTitle: {
		// fontFamily: fonts.family.nunito.regular,
		fontSize: 28,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		color: colors.black,
		marginBottom: 22,
		marginTop: 11,
		marginLeft: 25
	},
	motto: {
		// fontFamily: fonts.family.nunito.bold,
		fontSize: 16,
		fontWeight: "600",
		fontStyle: "normal",
		letterSpacing: 0,
		color: colors.black,
		marginTop: 30,
		marginLeft: 25
	},
	next: {
		// fontFamily: fonts.family.nunito.regular,
		fontSize: 16,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		color: colors.white,
		marginLeft: 25,
		marginRight: 10
	},
	mainContent: {
		marginStart: 32,
		marginEnd: 32,
		flex: 1,
		paddingBottom: 50,
		marginBottom: 50,
	},
	sitter: {
		borderColor: colors.white, 
		borderRadius: 20, 
		width: "48%", 
		height: 40, 
		justifyContent: "center", 
		alignItems: "center",
	},
	parent: {
		borderColor: colors.white, 
		borderRadius: 20, 
		width: "48%", 
		height: 40, 
		justifyContent: "center", 
		alignItems: "center",
	},
	headerLeft: {
		marginStart: 32
	}
});