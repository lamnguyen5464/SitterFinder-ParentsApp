import React from "react";
import {View, TouchableOpacity, Image, StatusBar, ScrollView, ActivityIndicator, RefreshControl} from "react-native";
import BaseScreen from "../BaseScreen/index";
import {styles} from "./style";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import I18n from "../../shared/utils/locale/i18n";
import {ScreenNames} from "../../route/ScreenNames";
import IAText from "../../shared/components/IAText";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import FastImage from "react-native-fast-image";
import Constant from "../../shared/utils/constant/Constant";
import * as Animatable from "react-native-animatable";
import {colors} from "../../shared/utils/colors/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {getUserProfile, uploadImgGoogle, uploadUserProfilePicture, updateUserProfile} from "./actions";
import IAHeader from "../../shared/components/IAHeader";
import IALine from "../../shared/components/IALine";
const moment = require("moment");

import {Appearance} from "react-native-appearance";
import {ScreenWidth} from "../../shared/utils/dimension/Divices";

const langs = {
	title: I18n.t("me.myProfile"),
	empty: I18n.t("empty"),
	noLeague: I18n.t("myProfile.noLeague"),
	joinLeague: I18n.t("myProfile.joinLeague"),
	totalPoints: I18n.t("myProfile.totalPoints"),
	myLeague: I18n.t("home.myLeagues"),
	success: I18n.t("success"),
	userNameHigher6: I18n.t("createAcc.userNameHigher6"),
	logout: I18n.t("logout.title"),
	phone: I18n.t("phoneContact"),
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
	update: I18n.t("resetPasswordViaEmail.update"),
	cancel: I18n.t("cancel"),
	edit: I18n.t("me.edit"),	
	dob: I18n.t("myProfile.dateOfBirth")
};


class ProfileScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state = {
			currentImgChosen: "",
			userInfo: {},
			shouldUpdate: false,
			password: "",
			lastName: "",
			firstName: "",
			userName: "",
			address: "",
			avatar: "",
			callingCode: "1",
			countryCode: "US",
			cca2: "US",
			userType: Constant.USER_TYPE.sitter,
			emergencyContactPrefix: "",
			emergencyContactPhone: "",
			hasTouchId: false,
			hasFaceId: false,
			dob: null,
			isDateTimePickerVisible: false,
			darkMode: "",
			dobTime: "",
		};
		this.colorScheme = Appearance.getColorScheme();
	}

	  async _checkDetailUserInfo() {
	  	console.log("_checkDetailUserInfo_Profile");
	  	var userInfo = await IALocalStorage.getUserDetailInfo();
	  	if (userInfo) {
	  		console.log("UserInfo in Local storage detected_Profile");
	  		var address = userInfo && userInfo.address || "";
	  		var firstName = userInfo && userInfo.firstName || "";
	  		var lastName = userInfo && userInfo.lastName || "";
	  		var avatar = userInfo && userInfo.avatar || "";
			var userName = userInfo && userInfo.name || "";
			var dob = userInfo && userInfo.dob || "";
			var userType = userInfo && userInfo.authorities || "";
			var tempTime = moment(dob);
			var dobTime = dob ? (tempTime.year() + "-" + (tempTime.month() + 1) + "-" + tempTime.date()) : "";
	  		this.setState({
	  			lastName: lastName,
	  			firstName: firstName,
	  			address: address,
	  			avatar: avatar,
				userName: userName,
				dob: dob,
				userType: userType,
				userInfo: userInfo,
				dobTime: dobTime
	  		});
	  	} 
	  }

	  addTriggerForScreen() {
		this.focusListener = this.props && this.props.navigation.addListener("didFocus", () => { 
			  this._checkDetailUserInfo();
			  this._getUserInfo();
	  	});
	  }
	  componentWillUnmount() {
		this.focusListener.remove();
	  }

	  async componentDidMount() {
	  	this.addTriggerForScreen();
	  }
	  
	  componentWillReceiveProps(nextProps) {
	  	if (nextProps != this.props ) {
	  		if (nextProps.uploadImgGoogleStorageStatus.isSuccess()) {
	  			var imgUrl = nextProps.uploadImgGoogleStorage;
	  			if (imgUrl) {
	  				this.setState({currentImgChosen: imgUrl}, () =>{});
	  			}
	  		}
	  		if (nextProps.userProfileStatus != this.props.userProfileStatus) {
	  			if (nextProps.userProfileStatus.isSuccess()) {
	  				let userInfo = nextProps.userProfile;
	  				IALocalStorage.setUserDetailInfo(nextProps.userProfile);
	  				var address = userInfo && userInfo.address;
	  				var firstName = userInfo && userInfo.firstName;
	  				var lastName = userInfo && userInfo.lastName;
	  				var avatar = userInfo && userInfo.avatar;
	  				var userName = userInfo.name ? userInfo.name : firstName + " " + lastName;
	  				var dateOfBirth = userInfo.dateOfBirth && userInfo.dateOfBirth;
	  				var emergencyContact = userInfo.emergencyContact && userInfo.emergencyContact;
	  				this.setState({
	  					lastName: lastName,
	  					firstName: firstName,
	  					address: address,
	  					avatar: avatar,
						userName: userName,
						dob: dateOfBirth ? new Date(dateOfBirth).getFullYear() + "-" + 
						  (new Date(dateOfBirth).getMonth() + 1) + "-" + 
						  new Date(dateOfBirth).getDate() : "",
	  					emergencyContactPhone: emergencyContact
	  				});
				  }
				  if (nextProps.userProfileStatus.isFailure() && nextProps.userProfileError !== "") {
					// get error message from error object
					this.alertInfo(langs.error, nextProps.userProfileError ? nextProps.userProfileError: 
						(nextProps.userProfileError.data ? nextProps.userProfileError.data.message : langs.error));
					return;
				}
	  		}
	  	}
	  }

	async _getUserInfo() {
		const userEmail = await IALocalStorage.getUserEmail();
		if (userEmail && userEmail !== "") {
			this.props.getUserProfile({email: userEmail});
		}
	}

	_renderUpdateIcon() {
		return (
			<TouchableOpacity onPress={()=>{
				this.goToScreen(ScreenNames.ProfileEditScreen);
			}} 
			style={styles.setting}>
				<View style={{alignItems: "flex-end", alignSelf: "flex-end"}}>
					<MaterialCommunityIcons name="file-document-edit-outline" size={25} color={colors.black}/>
				</View>
			</TouchableOpacity>
		);
	}

	_onRefresh = () => {
		this._getUserInfo();
	}

	_renderProfilePicture = () => {
		var img = this.state.currentImgChosen != "" ? this.state.currentImgChosen : (this.props.userProfile.avatar ? this.props.userProfile.avatar : Constant.MOCKING_DATA.PLACE_HOLDER);
		return (
			<View style={[styles.profilePicture, styles.shadow]}>
				<Animatable.View animation="fadeIn" style={[styles.uploadImageContainer, styles.shadow]}>
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
				<Animatable.View animation="fadeIn" style={[styles.camera, styles.shadow]}>
					<FontAwesome5 name="check-circle" size={20} color={colors.blue} style={{alignSelf: "center"}}/>
				</Animatable.View>
			</View>
		);
	}

	_renderBasicUserInfo () {
		var userInfo = this.props.userProfile;
		var userName = "";
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

	_renderHeader = (title = "") => {
		return (
			<View>
				<View style={{height: 37, justifyContent: "flex-end"}}>
					<IAText text={title} style={{marginBottom: 5, fontWeight: "600", fontSize: 17}}/>
				</View>
				<IALine color={colors.black_lightly} height={2}/>
			</View>
		);
	}

	_renderItemBasicInfo = (title = "", content = "", isEnd = false) => {
		return (
			<View>
				<Animatable.View animation="bounceInLeft" style={styles.itemUserContainer}>
					<View style={{width: ScreenWidth/4}}>
						<IAText style={styles.itemUserDisable} text={title}/>
					</View>
					<View style={{width: ScreenWidth - ScreenWidth/4 - 36}}>
						<IAText style={styles.itemUserDisableText} text={content}/>
					</View>
				</Animatable.View>
				{!isEnd ? 
					<IALine color={colors.black_lightly} height={2} numberOfLines={1} /> : <View style={{height: 5}}/>}
			</View>
		);
	}

	_renderDisplay() {
		var userInfo = this.props.userProfile;
		var phoneNumber = userInfo && userInfo.phoneNumber;
		var email = userInfo && userInfo.email;
		var address = userInfo && userInfo.address;
		var userType = this.state.userType || userInfo && userInfo.authorities && userInfo.authorities[0];
		var userName = this.state.userName || "";
		if (userInfo.name) {
			userName = userInfo.name;
		} else {
			if (userInfo.firstName && userInfo.lastName) {
				userName = userInfo.firstName + " " + userInfo.lastName;
			}
		}
		var emergencyContact = userInfo.emergencyContact && userInfo.emergencyContact;
		var dob = userInfo.dateOfBirth && userInfo.dateOfBirth;
		var tempTime = moment(dob);
		var dobTime = dob ? (tempTime.year() + "-" + (tempTime.month() + 1) + "-" + tempTime.date()) : "";
		return (
			<View>
				<View style={{paddingRight: 20, paddingStart: 20}}>
					{this._renderHeader("Basic information")}
					<View>
						{this._renderItemBasicInfo("Name", userName)}
						{this._renderItemBasicInfo("Email", email)}
						{this._renderItemBasicInfo("Address", address)}
						{this._renderItemBasicInfo("Birthday", dobTime)}
						{this._renderItemBasicInfo("Authority", userType, true)}
					</View>
				</View>
				<IALine color={colors.black_lightly} height={7}/>
				<View style={{paddingRight: 20, paddingStart: 20}}>
					{this._renderHeader("Phone management")}
					<View>
						{this._renderItemBasicInfo("Phone", phoneNumber)}
						{this._renderItemBasicInfo("Emergency", emergencyContact, true)}
					</View>
				</View>
				<IALine color={colors.black_lightly} height={7}/>
			</View>
		);
	}

	_renderInfo() {
		return (
			<View>
				{this._renderDisplay()}
			</View>
		);
	}

	_renderSpace = (height = 7) => {
		return (
			<IALine color={colors.black_lightly} height={height}/>
		);
	}

	_renderTitle() {
		return (
			<IAText text={langs.title} style={styles.title}/>
		);
	}

	_renderToolTopBar() {
		return (
			<View style={{flexDirection: "row", justifyContent: "space-between"}}>		
				<IAText text={langs.edit}/>
			</View>
		);
	}

	render() {
		const {userProfileStatus} = this.props;
		let isLoading = userProfileStatus.isFetching();
		return(
			<View style={styles.mainContainer}>
				<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
				<IAHeader viewLeft={this.renderBackButton()}
					viewRight={this._renderToolTopBar()}
					viewCenter={this._renderTitle()}
					styleLeft={styles.headerLeft}
					onPressRight={()=>{this.goToScreen(ScreenNames.ProfileEditScreen, {userInfo: this.state.userInfo});}}
					onPressLeft={()=>{this.goBack();}}/>
				<ScrollView
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={false}
							onRefresh={()=>this._onRefresh()}
						/>
					}>
					<View style={{paddingTop: 5, paddingBottom: 40}}>
						{this._renderProfilePicture()}
						{this._renderBasicUserInfo()}
						{this._renderSpace()}
						{this._renderInfo()}
					</View>
				</ScrollView>
				{isLoading ? 
					this._renderLoading() : null}
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

	};
};
const mapDispatchToProps = dispatch =>
	bindActionCreators({
		getUserProfile,
		updateUserProfile,	
		uploadImgGoogle,
		uploadUserProfilePicture
	}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);