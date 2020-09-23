import React from "react";
import {View, ScrollView, TouchableOpacity, Image, StatusBar, RefreshControl} from "react-native";
import BaseScreen from "../BaseScreen/index";
import {styles} from "./style";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import I18n from "../../shared/utils/locale/i18n";
import {ScreenNames} from "../../route/ScreenNames";
import IAText from "../../shared/components/IAText";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import icons from "../../shared/utils/icons/icons";
import FastImage from "react-native-fast-image";
import Constant from "../../shared/utils/constant/Constant";
import {images} from "../../../assets";
import * as Animatable from "react-native-animatable";
import {colors} from "../../shared/utils/colors/colors";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import DropdownAlert from "react-native-dropdownalert";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Foundation from "react-native-vector-icons/Foundation";
import Octicons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {getUserProfile, getVersion} from "../ProfileScreen/actions";
import IAHeader from "../../shared/components/IAHeader";
import IALine from "../../shared/components/IALine";
import LogManager from "../../shared/utils/logging/LogManager";

const langs = {
	title: I18n.t("myProfile.title"),
	empty: I18n.t("empty"),
	noLeague: I18n.t("myProfile.noLeague"),
	joinLeague: I18n.t("myProfile.joinLeague"),
	totalPoints: I18n.t("myProfile.totalPoints"),
	myLeague: I18n.t("home.myLeagues"),
	success: I18n.t("success"),
	logout: I18n.t("logout.title"),
	phone: I18n.t("phone"),
	email: I18n.t("email"),
	error: I18n.t("error"),
	prefix: I18n.t("prefix"),
	firstName: I18n.t("firstName"),
	userName: I18n.t("userName"),
	loading: I18n.t("loading"),
	lastName: I18n.t("lastName"),
	address: I18n.t("address"),
	forgotPasswordTitle: I18n.t("forgotPasswordTitle"),
	updateSuccess: I18n.t("myProfile.updateSuccess"),
	emergencyContact: I18n.t("emergencyContact"),
	userProfileSetting: I18n.t("userProfileSetting.title"),
	myProfile: I18n.t("me.myProfile"),
	myBookingProfile: I18n.t("me.myBookingProfile"),
	myWallet: I18n.t("me.myWallet"),
	payment: I18n.t("me.payment"),
	invitation: I18n.t("me.invitation"),
	logoutAsk: I18n.t("me.logoutAsk"),
	feedback: I18n.t("me.feedback"),
	version: I18n.t("me.version"),
};

class MeScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state = {
			currentImgChosen: "",
			userInfo: {},
			password: "",
			lastName: "",
			firstName: "",
			userName: "",
			address: "",
			avatar: "",
		};

	}
	async _checkDetailUserInfo() {
		console.log("_checkDetailUserInfo");
		var userInfo = await IALocalStorage.getUserDetailInfo();
		if (userInfo) {
			console.log("UserInfo in Local storage detected" + LogManager.parseJsonObjectToJsonString(userInfo));
			var address = userInfo.address && userInfo.address;
			var firstName = userInfo.firstName && userInfo.firstName;
			var lastName = userInfo.lastName && userInfo.lastName;
			var avatar = userInfo.avatar && userInfo.avatar;
			var userName = userInfo.name && userInfo.name;
			this.setState({
				lastName: lastName,
				firstName: firstName,
				address: address,
				avatar: avatar,
				userName: userName
			});
		} 
	}

	addTriggerForScreen() {
		this.props && this.props.navigation.addListener("didFocus", () => { 
			this._checkDetailUserInfo();
		});
	}

	async componentDidMount() {
		this.addTriggerForScreen();
		this._getUserInfo();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps != this.props ) {			
			if (nextProps.userProfileStatus != this.props.userProfileStatus) {
				if (nextProps.userProfileStatus.isSuccess()) {
					if (nextProps.userProfile) {

						IALocalStorage.setUserDetailInfo(nextProps.userProfile);
						
						let userInfo = nextProps.userProfile;
						var address = userInfo && userInfo.address;
						var firstName = userInfo && userInfo.firstName;
						var lastName = userInfo && userInfo.lastName;
						var avatar = userInfo && userInfo.avatar;
						var userName = userInfo && userInfo.name;
						this.setState({
							lastName: lastName,
							firstName: firstName,
							address: address,
							avatar: avatar,
							userName: userName
						});
					}
				}
			}
			if (nextProps.userProfileStatus.isFailure()) {
				// get error message from error object
				var errMsg = nextProps.userProfileError ? nextProps.userProfileError: 
					(nextProps.userProfileError.data ? nextProps.userProfileError.data.message : langs.error);
				this.dropDownAlertRef.alertWithType("error", "Error", errMsg || "Something wrong, please try again" );
				return;
			}
		}
	}

	async _getUserInfo() {
		const userEmail = await IALocalStorage.getUserEmail();
		if (userEmail && userEmail !== "") {
			this.props.getUserProfile({email: userEmail});
			this.props.getVersion({});
		} else {
			console.log("No email");
		}
	}

	_onRefresh = () => {
		this._getUserInfo();
	}

	_renderProfilePicture = () => {
		var img = this.state.currentImgChosen != "" ? 
			this.state.currentImgChosen : 
			(this.props.userProfile.avatar ? this.props.userProfile.avatar : Constant.MOCKING_DATA.PLACE_HOLDER);
		return (
			<TouchableOpacity style={[styles.profilePicture, styles.shadow]}>
				<Animatable.View animation="fadeInDown" style={[styles.uploadImageContainer, styles.shadow]}>
					{ this.state.currentImgChosen != "" ?
						<FastImage
							style={styles.containerSquare}
							source={{
								uri: img,
								priority: FastImage.priority.high,
							}}
							resizeMode={FastImage.resizeMode.cover}/>
						:
						<View>
							<Image source={{uri: img}} style={styles.mock} resizeMode="cover" resizeMethod="resize"/>
						</View> }
				</Animatable.View>
				<Animatable.View animation="fadeInUp" style={[styles.camera, styles.shadow]}>
					<FontAwesome5 name="check-circle" size={20} color={colors.blue} style={{alignSelf: "center"}}/>
				</Animatable.View>
			</TouchableOpacity>
		);
	}

	_renderWave = () => {
		return (
			<Animatable.Image animation="pulse" iterationCount="infinite" source={images.wave}
				style={styles.waveContainer}/>
		);
	}

	_renderBasicUserInfo () {
		var userInfo = this.props.userProfile;
		var userName = this.state.userName || "";
		if (userInfo.name) {
			userName = userInfo.name;
		} else {
			if (userInfo.firstName && userInfo.lastName) {
				userName = userInfo.firstName + " " + userInfo.lastName;
			}
		}
		return (
			<Animatable.View animation="fadeInUpBig" duration={600} style={{marginBottom: 20}}>
				<IAText text={userName} style={styles.name}/>
			</Animatable.View>
		);
	}

	_logout = async () => {
		await IALocalStorage.resetLocalStorage();
		this.goToScreen(ScreenNames.LoginScreen);
	}

	_renderDisplay() {
		var version = this.props.version;
		return (
			<View>
				<View style={{marginLeft: 20, marginRight: 20}}>
					<TouchableOpacity style={[styles.itemUserContainer, {flexDirection: "row"}]} onPress={()=>this.goToScreen(ScreenNames.ProfileScreen)}>
						<Animatable.View animation="bounceInLeft" style={styles.itemUserContainer}>
							<View style={{width: 30}}>
								<Ionicons name="ios-contact" size={26}/>
							</View>
							<IAText style={styles.itemUser} text={langs.myProfile}/>
						</Animatable.View>
						<AntDesign name="right" style={{marginEnd: 0}} size={15}/>
					</TouchableOpacity>
					<IALine color={colors.black_lightly} height={2}/>
					{/* <TouchableOpacity style={[styles.itemUserContainer, {flexDirection: "row"}]} onPress={()=>this.goToScreen(ScreenNames.MyBookingProfileScreen)}>
						<Animatable.View animation="bounceInLeft" style={styles.itemUserContainer}>
							<View style={{width: 30}}>
								<MaterialIcons name="group-work" size={26}/>
							</View>
							<IAText style={styles.itemUser} text={langs.myBookingProfile}/>
						</Animatable.View>
						<AntDesign name="right" style={{marginEnd: 0}} size={15}/>
					</TouchableOpacity>
					<IALine color={colors.black_lightly} height={2}/> */}
					<TouchableOpacity style={[styles.itemUserContainer, {flexDirection: "row"}]} onPress={()=>{this.goToScreen(ScreenNames.UserProfileSettingScreen);}}>
						<Animatable.View animation="bounceInLeft" style={styles.itemUserContainer}>
							<View style={{width: 30}}>
								<AntDesign name="setting" size={25} color={colors.black}/>
							</View>
							<IAText style={styles.itemUser} text={langs.userProfileSetting}/>
						</Animatable.View>
						<AntDesign name="right" style={{marginEnd: 0}} size={15}/>
					</TouchableOpacity>
					<IALine color={colors.black_lightly} height={2}/>
					<TouchableOpacity style={[styles.itemUserContainer, {flexDirection: "row"}]} onPress={()=>this.goToScreen(ScreenNames.ChangePasswordScreen)}>
						<Animatable.View animation="bounceInLeft" style={styles.itemUserContainer}>
							<View style={{width: 30}}>
								<Foundation name="key" size={25}/>
							</View>
							<IAText style={styles.itemUser} text={langs.forgotPasswordTitle}/>
						</Animatable.View>
						<AntDesign name="right" style={{marginEnd: 0}} size={15}/>
					</TouchableOpacity>
				</View>
				{this._renderSpace(7)}

				<View style={{marginLeft: 20, marginRight: 20}}>
					<TouchableOpacity style={[styles.itemUserContainer, {flexDirection: "row"}]} onPress={()=>this.goToScreen(ScreenNames.WalletScreen)}>
						<Animatable.View animation="bounceInLeft" style={styles.itemUserContainer}>
							<View style={{width: 30}}>
								<Entypo name="wallet" size={25}/>
							</View>
							<IAText style={styles.itemUser} text={langs.myWallet}/>
						</Animatable.View>
						<AntDesign name="right" style={{marginEnd: 0}} size={15}/>
					</TouchableOpacity>
					<IALine color={colors.black_lightly} height={2}/>
					<TouchableOpacity style={[styles.itemUserContainer, {flexDirection: "row"}]} onPress={()=>this.goToScreen(ScreenNames.PaymentScreen)}>
						<Animatable.View animation="bounceInLeft" style={styles.itemUserContainer}>
							<View style={{width: 30}}>
								<MaterialIcons name="payment" size={25}/>
							</View>
							<IAText style={styles.itemUser} text={langs.payment}/>
						</Animatable.View>
						<AntDesign name="right" style={{marginEnd: 0}} size={15}/>
					</TouchableOpacity>
				</View>
				{this._renderSpace(7)}

				<View style={{marginLeft: 20, marginRight: 20}}>
					<TouchableOpacity style={[styles.itemUserContainer, {flexDirection: "row"}]}  onPress={()=>this.goToScreen(ScreenNames.Invitation)}>
						<Animatable.View animation="bounceInLeft" style={styles.itemUserContainer}>
							<View style={{width: 30}}>
								<FontAwesome name="handshake-o" size={26}/>
							</View>
							<IAText style={styles.itemUser} text={langs.invitation}/>
						</Animatable.View>
						<AntDesign name="right" style={{marginEnd: 0}} size={15}/>
					</TouchableOpacity>
					<IALine color={colors.black_lightly} height={2}/>
					<TouchableOpacity style={[styles.itemUserContainer, {flexDirection: "row"}]} onPress={()=>this.goToScreen(ScreenNames.Feedback)}>
						<Animatable.View animation="bounceInLeft" style={styles.itemUserContainer}>
							<View style={{width: 30}}>
								<MaterialIcons name="feedback" size={25}/>
							</View>
							<IAText style={styles.itemUser} text={langs.feedback}/>
						</Animatable.View>
						<AntDesign name="right" style={{marginEnd: 0}} size={15}/>
					</TouchableOpacity>
				</View>
				{this._renderSpace(7)}
				
				<View style={{marginLeft: 20, marginRight: 20}}>
					<View style={[styles.itemUserContainer, {flexDirection: "row"}]}>
						<Animatable.View animation="bounceInLeft" style={styles.itemUserContainer}>
							<View style={{width: 30}}>
								<Octicons name="verified" size={23}/>
							</View>
							<IAText style={styles.itemUser} text={langs.version + version}/>
						</Animatable.View>
					</View>
				</View>
				{this._renderSpace(7)}

				<View style={{paddingEnd: 20, paddingLeft: 20, backgroundColor: colors.black_lightly}}>
					{this._renderLogout()}
				</View>
			</View>
		);
	}

	_logout = async () => {
		this.alertInfo2Options(langs.logout, langs.logoutAsk, () => {
			IALocalStorage.resetLocalStorage();
			this.goToScreen(ScreenNames.LoginScreen);
		}, () => {});
	}

	_renderLogout() {
		return (
			<TouchableOpacity style={styles.logoutContainer} onPress={()=>this._logout()}>
				<IAText style={styles.logout} text={langs.logout}/>
			</TouchableOpacity>
		);
	}

	_renderSpace = (height = 7) => {
		return (
			<IALine color={colors.black_lightly} height={height}/>
		);
	}

	_renderInfo() {
		return (
			<View>
				{this._renderDisplay()}
			</View>
		);
	}

	_renderTitle() {
		return (
			<IAText text={langs.title} style={styles.title}/>
		);
	}

	_renderBadge() {
		return <View style={styles.badge} />;
	}

	_renderToolTopBar() {
		return (
			<TouchableOpacity onPress={() => {this.goToScreen(ScreenNames.NotificationScreen);}}>
				<View>
					{icons.notification.IC_NOTIFICATION}
				</View>
			</TouchableOpacity>
		);
	}

	render() {
		return(
			<View style={styles.mainContainer}>
				<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
				<IAHeader viewLeft={null}
					viewRight={this._renderToolTopBar()}
					viewCenter={this._renderTitle()}
					styleLeft={styles.headerLeft}
					styleRight={{marginBottom: 10}}
					onPressRight={()=>{this.goToScreen(ScreenNames.NotificationScreen)}}
					onPressLeft={()=>{}}/>
				<ScrollView
					contentContainerStyle={{flexGrow: 1}}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={false}
							onRefresh={()=>this._onRefresh()}
						/>
					}>
					<View style={{paddingTop: 5}}>
						{this._renderProfilePicture()}
						{this._renderBasicUserInfo()}
						{this._renderSpace()}
						{this._renderInfo()}
					</View>
				</ScrollView>
				<DropdownAlert warnColor={colors.orange} warnImageSrc={null} successImageSrc={null} ref={ref => this.dropDownAlertRef = ref} />
			</View>
		);
	}
}
const mapStateToProps = state => {
	return {
		userProfileStatus: state.userProfileReducer.userProfile.status,
		userProfile: state.userProfileReducer.userProfile.data,
		userProfileError: state.userProfileReducer.userProfile.error,

		uploadImgGoogleStorageStatus: state.userProfileReducer.uploadImgGoogleStorage.status,
		uploadImgGoogleStorage: state.userProfileReducer.uploadImgGoogleStorage.url,
		uploadImgGoogleStorageError: state.userProfileReducer.uploadImgGoogleStorage.error,

		updateUserProfileStatus: state.userProfileReducer.updateUserProfile.status,
		updateUserProfile: state.userProfileReducer.updateUserProfile.data,
		updateUserProfileError: state.userProfileReducer.updateUserProfile.error,

		versionStatus: state.userProfileReducer.getVersion.status,
		version: state.userProfileReducer.getVersion.version,
		versionError: state.userProfileReducer.getVersion.error,

	};
};
const mapDispatchToProps = dispatch =>
	bindActionCreators({
		getUserProfile,
		getVersion
	}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MeScreen);