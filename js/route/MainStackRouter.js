/* eslint-disable react/display-name */
import "react-native-gesture-handler";
import {
	createStackNavigator,
	createAppContainer,
	createSwitchNavigator,
	createDrawerNavigator,
	createBottomTabNavigator,
} from "react-navigation";
import React from "react";
import {View} from "react-native";
import SplashScreen from "../containers/SplashScreen/index";
import LoginScreen from "../containers/LoginScreen/index";
import SignUpScreen from "../containers/SignUpScreen/index";
import ProfileScreen from "../containers/ProfileScreen/index";
import HomeScreen from "../containers/HomeScreen/index";
import Invitation from "../containers/Invitation/index";
import Feedback from "../containers/Feedback/index";
import SitterListScreen from "../containers/SitterListScreen/index";
import OptionPayment from "../containers/OptionPayment/index";
import MeScreen from "../containers/MeScreen/index";
import ChatScreen from "../containers/ChatScreen/index";

import VideoScreen from "../containers/VideoScreen/index";
import SitterDetailProfileScreen from "../containers/SitterDetailProfileScreen/index";
import AddressScreen from "../containers/AddressScreen/index";
import PaymentScreen from "../containers/PaymentScreen/index";
import ForgotPasswordScreen from "../containers/ForgotPasswordScreen/index";
import ChangePasswordScreen from "../containers/ChangePasswordScreen/index";
import UserProfileSettingScreen from "../containers/UserProfileSettingScreen/index";
import OptionSignupScreen from "../containers/OptionSignupScreen/index";
import PhoneOTPScreen from "../containers/PhoneOTPScreen/index";
import DescriptionEditScreen from "../containers/DescriptionEditScreen/index";
import MessageScreen from "../containers/MessageScreen/index";
import ProfileEditScreen from "../containers/ProfileEditScreen/index";
import NotificationScreen from "../containers/NotificationScreen/index";
import MyBookingProfileScreen from "../containers/MyBookingProfileScreen/index";
import BabySittingRateScreen from "../containers/BabySittingRateScreen/index";
import SpecialExpScreen from "../containers/SpecialExpScreen/index";
import CreateJobScreen from "../containers/CreateJobScreen/index";
import CertificatesScreen from "../containers/CertificatesScreen/index";
import YearExpScreen from "../containers/YearExpScreen/index";
import WalletScreen from "../containers/WalletScreen/index";
import {colors} from "../shared/utils/colors/colors";
import TabbarComponentCustom from "./TabbarComponentCustom";
import AvailableTimeScreen from "../containers/AvailableTimeScreen/index";
import I18n from "../shared/utils/locale/i18n";
import Drawer from "../route/Drawer";
import {ScreenWidth} from "../shared/utils/dimension/Divices";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import NavigationService from "../shared/utils/navigation/NavigationService";
import DetailJobScreen from "../containers/DetailJobScreen/index";
import LottieView from "lottie-react-native";
import OptionPaymentVISA from "../containers/OptionPaymentVISA/index";

const langs = {
	home: I18n.t("home.title"),
	profile: I18n.t("myProfile.title_tab"),
	message: I18n.t("message.title"),
};
// Create bottom tab for navigator
const AppBottomTabNavigator = createBottomTabNavigator(
	{
		HomeScreen: {
			screen: HomeScreen,
			navigationOptions: {
				tabBarIcon: ({focused}) => {
					return (
						<View>
							<MaterialIcons name="home" size={22} color={focused ? colors.blue : colors.black}/>
						</View>
					);
				},
				title: "Mine"
			}
		},
		NotificationScreen: {
			screen: NotificationScreen,
			navigationOptions: {
				tabBarIcon: ({focused}) => {
					return (
						<View>
							<MaterialIcons name="wb-sunny" size={22} color={focused ? colors.blue : colors.black}/>
						</View>
					);
				},
				title: "Notifications"
			}
		},
		SitterListScreen: {
			screen: SitterListScreen,
			navigationOptions: {
				tabBarIcon: ({focused}) => {
					return (
						<View>
							<MaterialIcons name="face" size={22} color={focused ? colors.blue : colors.black}/>
						</View>
					);
				},
				title: "Sitters"
			}
		},
		MessageScreen: {
			screen: MessageScreen,
			navigationOptions: {
				tabBarIcon: ({focused}) => {
					return (
						<View>
							<MaterialCommunityIcons name="message-outline" size={22} color={focused ? colors.blue : colors.black}/>
						</View>
					);
				},
				title: langs.message
			}
		},
		MeScreen: {
			screen: MeScreen,
			navigationOptions: {
				tabBarIcon: ({focused}) => {
					return (
						<View>
							<Feather name="user" size={22} color={focused ? colors.blue : colors.black}/>
						</View>
					);
				},
				title: langs.profile
			}
		},
	},
	{
		tabBarOptions: {
			showLabel: true, // Define if title in bottom will be display
			activeTintColor: colors.blue,
			inactiveTintColor: colors.black
		},
		// tabBarComponent: TabbarComponentCustom
	}
);



export default class AppContainer extends React.Component {
	render() {
		const Navigator = createDrawerNavigator(
			{MainScreenNavigator: {screen: AppBottomTabNavigator}},
			{
				contentComponent: (props) => {
					return (
						<Drawer {...props}/>
					);
				},
				drawerWidth: ScreenWidth,
			}
		);
		// SwitchNavigator for using the multiple stack in the same route
		const AppSwitchNavigator = createSwitchNavigator({
			SplashScreen: {screen: SplashScreen},
			LoginScreen: {screen: LoginScreen},
			HomeScreen: {screen: Navigator},
		},{
			initialRouteName: "SplashScreen"
		});
		// ScreenNavigator for separately each screen into stack one
		const MainScreenNavigator = createStackNavigator(
			{
				
				MainScreen: {screen: ProfileEditScreen},
				LoginScreen: {screen: LoginScreen},
				SignUpScreen: {screen: SignUpScreen},
				ForgotPasswordScreen: {screen: ForgotPasswordScreen},	
				ChangePasswordScreen: {screen: ChangePasswordScreen},
				UserProfileSettingScreen: {screen: UserProfileSettingScreen},
				ProfileScreen: {screen: ProfileScreen},
				OptionSignupScreen: {screen: OptionSignupScreen},
				OptionPaymentVISA: {screen: OptionPaymentVISA},
				PhoneOTPScreen: {screen: PhoneOTPScreen},
				ProfileEditScreen: {screen: ProfileEditScreen},
				MyBookingProfileScreen: {screen: MyBookingProfileScreen},
				DescriptionEditScreen: {screen: DescriptionEditScreen},
				BabySittingRateScreen: {screen: BabySittingRateScreen},
				YearExpScreen: {screen: YearExpScreen},
				SpecialExpScreen: {screen: SpecialExpScreen},
				CertificatesScreen: {screen: CertificatesScreen},
				AvailableTimeScreen: {screen: AvailableTimeScreen},
				AddressScreen: {screen: AddressScreen},
				CreateJobScreen: {screen: CreateJobScreen},
				VideoScreen: {screen: VideoScreen},
				DetailJobScreen: {screen: DetailJobScreen},
				ChatScreen: {screen: ChatScreen},
				SitterDetailProfileScreen: {screen: SitterDetailProfileScreen},
				NotificationScreen: {screen: NotificationScreen},
				WalletScreen: {screen: WalletScreen},
				PaymentScreen: {screen: PaymentScreen},
				OptionPayment: {screen: OptionPayment},
				Invitation: {screen: Invitation},
				Feedback: {screen: Feedback},
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
