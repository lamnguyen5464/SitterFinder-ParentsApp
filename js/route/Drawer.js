import React from "react";
import {View, TouchableOpacity, ImageBackground} from "react-native";
import IAHeader from "../shared/components/IAHeader";
import Ionicon from "react-native-vector-icons/Ionicons";
import icons from "../shared/utils/icons/icons";
import styles from "./styles";
import {colors} from "../shared/utils/colors/colors";
import {images} from "../../assets";
import I18n from "../shared/utils/locale/i18n";
import {ScreenNames} from "./ScreenNames";
import IAText from "../shared/components/IAText";
import {DrawerActions} from "react-navigation";
import {LoginManager} from "react-native-fbsdk";
// import {GoogleSignin} from "react-native-google-signin";
import IALocalStorage from "../shared/utils/storage/IALocalStorage";
import IALine from "../shared/components/IALine";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

const langs = {
	home: I18n.t("drawer.home").toUpperCase(),
	leagues: I18n.t("drawer.leagues").toUpperCase(),
	leaguesCreation: I18n.t("drawer.leaguesCreation").toUpperCase(),
	results: I18n.t("drawer.results").toUpperCase(),
	notification: I18n.t("drawer.notification").toUpperCase(),
	settings: I18n.t("drawer.settings").toUpperCase(),
	logout: I18n.t("drawer.logout").toUpperCase()
};

class Drawer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentIdItem: 0
		};
	}

	_renderDrawerIco() {
		return (
			<TouchableOpacity
				onPress={() => {
					this._closeDrawer();
				}}
			>
				<Ionicon name={"ios-close"} size={50} color={colors.black} style={styles.drawer} />
			</TouchableOpacity>
		);
	}

	_closeDrawer() {
		this.props.navigation.dispatch(DrawerActions.closeDrawer());
	}

	/**
	 * @name signOut Google
	 */
	signOutGoogle = async () => {
		try {
			// await GoogleSignin.revokeAccess();
			// await GoogleSignin.signOut();
			// eslint-disable-next-line no-empty
		} catch (error) {}
	};

	/**
	 * SignOut Facebook
	 */
	signOutFacebook = async () => {
		try {
			LoginManager.logOut();
			// eslint-disable-next-line no-empty
		} catch (error) {}
	};

	resetToWelcomeNavigator() {
		this.props.navigation.navigate(ScreenNames.WelcomeScreen);
	}

	resetAllToken() {
		IALocalStorage.resetLocalStorage();
	}

	_onLogOutPressed = async () => {
		const deviceToken = await IALocalStorage.getDeviceToken();
		this.props.logOut({
			token: deviceToken
		});
		this.signOutGoogle();
		this.signOutFacebook();
		this.resetToWelcomeNavigator();
		this.resetAllToken();
	};

	_renderBadge() {
		return <View style={styles.badge} />;
	}

	_renderNotificationsIco() {
		return (
			<TouchableOpacity
				style={{marginTop: 15}}
				onPress={() => {
					this._closeDrawer();
					this.props.navigation.navigate(ScreenNames.NotificationScreen);
				}}
			>
				<View>
					{icons.notification.IC_NOTIFICATION}
					{this._renderBadge()}
				</View>
			</TouchableOpacity>
		);
	}

	setCurrentItem = item => {
		this.setState({
			currentIdItem: item.id
		});
	};

	render() {
		const listItems = [
			{id: 0, title: langs.home},
			{id: 1, title: langs.leagues},
			{
				id: 2,
				title: langs.leaguesCreation,
				onPress: () => {
					this.props.navigation.navigate(ScreenNames.CreateLeagueScreen, {myLeague: true});
				}
			},
			{
				id: 3,
				title: langs.results,
				onPress: () => {
					this.props.navigation.navigate(ScreenNames.ResultScreen);
				}
			},
			{
				id: 4,
				title: langs.notification,
				onPress: () => {
					this.props.navigation.navigate(ScreenNames.NotificationScreen);
				}
			},
			{
				id: 5,
				title: langs.settings,
				onPress: () => {
					this.props.navigation.navigate(ScreenNames.SettingScreen);
				}
			},
			{
				id: 6,
				title: langs.logout,
				onPress: () => {
					this._onLogOutPressed();
				}
			}
		];

		return (
			<View>
				<IAHeader
					viewLeft={this._renderDrawerIco()}
					onPressLeft={() => {
						this._closeDrawer();
					}}
					viewRight={this._renderNotificationsIco()}
					onPressRight={() => {}}
					viewCenter={null}
				/>
				<ImageBackground
					source={images.drawer_bg}
					style={styles.imgBackground}
					resizeMode={"stretch"}
				>
					<View style={styles.imgBackgroundContent}>
						{listItems.map(item => {
							return (
								<TouchableOpacity
									key={item.title}
									onPress={() => {
										this.setCurrentItem(item);
										this._closeDrawer();
										if (typeof item.onPress === "function") {
											return item.onPress();
										}
										return this.props.navigation.navigate(ScreenNames.HomeScreen);
									}}
								>
									<View style={{marginBottom: 37}}>
										<IAText text={item.title} style={styles.drawerItem} />
										{this.state.currentIdItem === item.id ? (
											<IALine
												height={1}
												color={colors.white}
												marginTop={5}
												style={[
													styles.underLine,
													{width: item.title.length * 14}
												]}
											/>
										) : null}
									</View>
								</TouchableOpacity>
							);
						})}
					</View>
				</ImageBackground>
			</View>
		);
	}
}

// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => {
	return {};
};
const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{

		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Drawer);
