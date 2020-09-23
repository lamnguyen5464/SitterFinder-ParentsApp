import React from "react";
import {View, TouchableOpacity, Platform, Image, StatusBar, ActivityIndicator, TextInput, Text} from "react-native";
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
import * as Animatable from "react-native-animatable";
import {colors} from "../../shared/utils/colors/colors";
import ImagePicker from "react-native-image-picker";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import PhoneInput from "react-native-phone-input";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {getUserProfile, uploadImgGoogle, uploadUserProfilePicture, updateUserProfile} from "./actions";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import IAHeader from "../../shared/components/IAHeader";
import DateTimePicker from "react-native-modal-datetime-picker";
import IALine from "../../shared/components/IALine";
import IARefreshing from "../../shared/components/IARefreshing";
import {Appearance} from "react-native-appearance";
import {ScreenWidth} from "../../shared/utils/dimension/Divices";
import DropdownAlert from "react-native-dropdownalert";
import fonts from "../../shared/utils/fonts/fonts";
import LogManager from "../../shared/utils/logging/LogManager";
import {AxiosFetch} from "../../api/AxiosFetch";
const moment = require("moment");

const langs = {
	title: I18n.t("me.updateMyProfile"),
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
	save: I18n.t("me.save"),
	dob: I18n.t("myProfile.dateOfBirth")
};

const USER_NAME = "userName";
const ADDRESS = "address";
const EMERGENCY_CONTACT_PHONE = "emergencyContactPhone";
const PHONE = "phone";
const EMAIL = "email";
const CURRENT_DISPLAY_TYPE = ["SHOW", "EDIT"];

class ProfileEditScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state = {
			marginAll: 10,
			currentLeagueId: 0,
			currentImgChosen: "",
			userInfo: {},
			shouldUpdate: false,
			currentDisplayType: CURRENT_DISPLAY_TYPE[0],
			password: "",
			lastName: "",
			phone: "",
			firstName: "",
			email: "",
			userName: "",
			address: "",
			avatar: "",
			callingCode: "1",
			countryCode: "US",
			cca2: "US",
			emergencyContactPrefix: "",
			emergencyContactPhone: "",
			hasTouchId: false,
			hasFaceId: false,
			dob: null,
			dobTime: 0,
			isDateTimePickerVisible: false,
			darkMode: "",
			isUpdatingAvt: false,
			isUpdatedAvt: 0,
			isLoading: false,
			avtUpdated: false,
		};
		this.colorScheme = Appearance.getColorScheme();
		this._onChangeInput = this._onChangeInput.bind(this);
		this._checkUserProfile = this._checkUserProfile.bind(this);
		this._setAdd = this._setAdd.bind(this);
	}

	_checkUserProfile() {
		var userInfo = this.props.navigation.state.params && this.props.navigation.state.params.userInfo;
		if (userInfo) {
			
			var address = userInfo && userInfo.address;
			console.log("_checkDetailUserInfo_Profile" + address);
	  		var firstName = userInfo && userInfo.firstName;
	  		var lastName = userInfo && userInfo.lastName;
	  		var avatar = userInfo && userInfo.avatar;
			var userName = userInfo && userInfo.name;
			var email = userInfo && userInfo.email;
			var dob = userInfo && userInfo.dob;
			var userType = userInfo && userInfo.authorities;
	  		this.setState({
	  			lastName: lastName,
	  			firstName: firstName,
	  			address: address,
	  			avatar: avatar,
				userName: userName,
				dob: dob,
				email: email,
				userType: userType,
				userInfo: userInfo,
	  		});
		}

	}

	showDateTimePicker = () => {
		this.setState({isDateTimePickerVisible: true});
	  };
	
	  hideDateTimePicker = () => {
	  	this.setState({isDateTimePickerVisible: false});
	  };
	
	  handleDatePicked = date => {
	  	let year = date.getFullYear();
		  let month = date.getMonth() + 1;
		  if (month < 10) {
			  month = "0" + month;
		  }
		  let day = date.getDate();
		  if (day < 10) {
			  day = "0" + day;
		  }
		  this.hideDateTimePicker();
		  let time = year + "-" + month + "-" + day;
		  console.log("A date has been picked: ", time);
		  this.setState({dob: time, dobTime: new Date(year, month - 1, day).getTime()});
	  };

	  async _checkDetailUserInfo() {
	  	
	  	var userInfo = await IALocalStorage.getUserDetailInfo();
	  	if (userInfo) {
	  		console.log("UserInfo in Local storage detected_Profile");
	  		var address = userInfo && userInfo.address || "";
	  		var firstName = userInfo && userInfo.firstName || "";
	  		var lastName = userInfo && userInfo.lastName || "";
	  		var avatar = userInfo && userInfo.avatar || "";
	  		var userName = userInfo && userInfo.name || "";
	  		var email = userInfo && userInfo.email || "";
	  		var dob = userInfo && userInfo.dateOfBirth || "";
	  		var userType = userInfo && userInfo.authorities || "";
	  		var tempTime = moment(dob);
	  		var dobTime = dob ? (tempTime.year() + "-" + (tempTime.month() + 1) + "-" + tempTime.date()) : "";
	  		this.setState({
	  			lastName: lastName,
	  			firstName: firstName,
	  			// address: address,
	  			avatar: avatar,
	  			userName: userName,
	  			dob: dobTime,
	  			email: email,
	  			userType: userType,
	  			userInfo: userInfo,
	  		});
		  } 
		  
	  	var tempAdd = await IALocalStorage.getTempAdd();
	  	if (tempAdd && tempAdd!="") {
	  		this.setState({address: tempAdd});
	  		IALocalStorage.setTempAdd("");
	  	}
	  }

	  addTriggerForScreen() {
	  	this.props && this.props.navigation.addListener("willFocus", () => { 
			  this._checkDetailUserInfo();
	  		  
	  	});
	  }

	  async componentDidMount() {
		  this.addTriggerForScreen();
		  this._checkUserProfile();
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
						  (new Date(dateOfBirth).getMonth() + 1 === 0 ? new Date(dateOfBirth).getMonth() : 
						  new Date(dateOfBirth).getMonth() + 1) + "-" + 
						  new Date(dateOfBirth).getDate() : "",
	  					emergencyContactPhone: emergencyContact
	  				});
	  			}
	  		}
	  		if (nextProps.updateUserProfileStatus != this.props.updateUserProfileStatus) {
	  			if (nextProps.updateUserProfileStatus.isSuccess()) {
	  				this.setState({isUpdatingAvt: false});
	  				this.dropDownAlertRef.alertWithType("success", "Updated", "Your profile has been updated");
	  				this._getUserInfo();
	  			} else if (nextProps.updateUserProfileStatus.isFailure() && nextProps.updateUserProfileError !== "") {
	  				this.setState({isUpdatedAvt: 0, isUpdatingAvt: false});
	  				this.dropDownAlertRef.alertWithType("error", "Error", nextProps.updateUserProfileError ? nextProps.updateUserProfileError : langs.error);
	  			}
	  		}
	  		if (nextProps.userProfileStatus != this.props.userProfileStatus) {
	  			if (nextProps.userProfileStatus.isFailure() && nextProps.userProfileError !== "") {
					  // get error message from error object
	  				this.dropDownAlertRef.alertWithType("error", "Error", nextProps.userProfileError ? nextProps.userProfileError: 
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

	  _renderDrawerIco() {
	  	return (
	  		<TouchableOpacity onPress={()=>this._openDrawer()}>
	  			<View style={styles.drawer}>
	  				{ icons.drawer.IC_DRAWER_WHITE }
	  			</View>
	  		</TouchableOpacity>
	  	);
	  }

	  async _updateProfile() {
	  	var userInfo = this.props.navigation.state.params && this.props.navigation.state.params.userInfo;
	  	if (userInfo) {
	  		var userType = userInfo && userInfo.authorities;
	  		var phoneNumber = this.state.phone;
	  		var email = this.state.email;
	  		var createdOn = userInfo.createdOn;
	  		var customId = userInfo.customId;
	  		var id = userInfo && userInfo.id;
	  		var idPassport = userInfo.idPassport;
	  		var modifiedBy = userInfo.modifiedBy;
	  		var modifiedOn = userInfo.modifiedOn;
	  		var joinedDate = userInfo.joinedDate;
	  		var partners = userInfo.partners;
	  		var socialToken = userInfo.socialToken;
	  		var socialNetwork = userInfo.socialNetwork;
	  		var avatar = this.state.avatar;
	  		var dob = this.state.dobTime;
	  		var emergencyContactPhone  = this.state.emergencyContactPhone;
	  		if (this.state.userName.length == "") {
	  			this.alertInfo("Error", "Please dont leave your name empty");
	  		} else {
	  			this.props.updateUserProfile({
	  				dateOfBirth: dob, 
	  				userName: this.state.userName, 
	  				address: this.state.address, 
	  				email: email, 
	  				authorities: userType, 
	  				avatar: avatar, 
	  				createdOn: createdOn,
	  				customId: customId, 
	  				emergencyContact: emergencyContactPhone, 
	  				firstName: "",
	  				id: id, 
	  				idPassport: idPassport, 
	  				modifiedBy: modifiedBy, 
	  				modifiedOn: modifiedOn, 
	  				lastName: "", 
	  				joinedDate: joinedDate, 
	  				partners: partners, 
	  				socialToken: socialToken, 
	  				socialNetwork: socialNetwork, 
	  				phoneNumber: phoneNumber});
	  		}
	  	}

	  }

	  _renderUpdateIcon() {
	  	var isEditable = this.state.currentDisplayType === CURRENT_DISPLAY_TYPE[1];
	  	return (
	  		<TouchableOpacity onPress={()=>{
	  			this._updateProfile();}}
	  		style={styles.setting}>
	  			<View style={{alignItems: "flex-end", alignSelf: "flex-end"}}>
	  				{isEditable ? 
	  					null :
	  					<MaterialCommunityIcons name="file-document-edit-outline" size={25} color={colors.black}/>}
	  			</View>
	  		</TouchableOpacity>
	  	);
	  }

	  _renderDismiss() {
	  	var isEditable = this.state.currentDisplayType === CURRENT_DISPLAY_TYPE[1];
	  	if (isEditable) {
	  		return (
	  			<TouchableOpacity onPress={()=>{
	  				this.setState({currentDisplayType: CURRENT_DISPLAY_TYPE[isEditable ? 0 : 1]});
	  			}} 
	  			style={[styles.setting, {right: 55}]}>
	  				<View>
	  					{isEditable ? 
	  						<AntDesign name="closecircleo" size={25} color={colors.red}/> :
	  						<MaterialCommunityIcons name="file-document-edit-outline" size={25} color={colors.black}/>}
	  				</View>
	  			</TouchableOpacity>
	  		);
	  	}
	  	return (
	  		null
	  	);
	  }

	  _renderUserProfileSetting() {
	  	var isEditable = this.state.currentDisplayType === CURRENT_DISPLAY_TYPE[1];
	  	if (!isEditable) {
	  		return (
	  			<TouchableOpacity onPress={()=>{
	  				this.goToScreen(ScreenNames.UserProfileSettingScreen);
	  			}} 
	  			style={[styles.setting, {right: isEditable ? 85 : 55}]}>
	  				<View>
	  					<AntDesign name="setting" size={25} color={colors.black}/>
	  				</View>
	  			</TouchableOpacity>
	  		);
	  	}
	  	return (
	  		null
	  	);
	  }

	_renderHeader = (title = "") => {
		return (
			<View>
				<View style={{height: 37, justifyContent: "flex-end", marginLeft: 20}}>
					<IAText text={title} style={{marginBottom: 5, fontWeight: "bold", fontSize: 17}}/>
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

	_onRefresh = () => {
		this.setState({currentDisplayType: CURRENT_DISPLAY_TYPE[0]});
		this._getUserInfo();
	}

	_renderProfilePicture = () => {
		var img = this.state.currentImgChosen != "" ? this.state.currentImgChosen : (this.props.userProfile.avatar ? this.props.userProfile.avatar   : Constant.MOCKING_DATA.PLACE_HOLDER);
		return (
			<TouchableOpacity onPress={()=>{this._openGalleryOrCamera();}} style={[styles.profilePicture, styles.shadow]}>
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
					<EvilIcons name="camera" size={20} color={colors.yellow_camera} style={{alignSelf: "center", marginTop: Platform.OS === "ios" ? 2 : 0, marginLeft: Platform.OS === "ios" ? 1 : 0}}/>
				</Animatable.View>
			</TouchableOpacity>
		);
	}

	_openGalleryOrCamera = () => {
		
		ImagePicker.showImagePicker(Constant.CONFIG_IMAGE_PICKER.storageOptions, (response) => {
			if (response.didCancel) {
				console.log("User cancelled image picker");
			} else if (response.error) {
				console.log("ImagePicker Error: ", response.error);
			} else if (response.customButton) {
				console.log("User tapped custom button: ", response.customButton);
			} else {
				let source = response.uri;
				let imageItem = {image: source, data: response};
				this.setState({isLoading: true, isUpdatedAvt: 1, currentImgChosen: imageItem.image, shouldUpdate: false, currentDisplayType: CURRENT_DISPLAY_TYPE[0]});

				var form = new FormData();
				form.append("file", {
					name: new Date().getTime() + ".PNG",
					type: "image/png",
					uri: imageItem.image,
				});
				form.append("imageType", "AVARTA");
				AxiosFetch({
					method: "POST",
					url: "api/users/updateImage",
					contentType: "multipart/form-data",
					data: form,					
					onSuccess: data => {
						this.dropDownAlertRef.alertWithType("success", "Updated", "Profile picture has been updated");
						this.setState({avtUpdated: true, isLoading: false});
					},
					onError: error => {
						this.dropDownAlertRef.alertWithType("error", "Error", error.message || "Something wrong, please try again" );
						this.setState({isLoading: false});
					},
					hasToken: true
				});
			}
		});
		
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

	_renderDisplay() {
		var userInfo = this.props.userProfile;
		var phoneNumber = userInfo && userInfo.phoneNumber;
		var email = userInfo && userInfo.email;
		var address = userInfo && userInfo.address;
		var userType = userInfo && userInfo.authorities && userInfo.authorities[0];
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
			<View style={{marginEnd: 20, marginStart: 20,}}>
				<Animatable.View animation="bounceInLeft" style={styles.itemUserContainer}>
					<View style={{width: 30}}>
						<Ionicons name="ios-contact" size={26}/>
					</View>
					<IAText style={styles.itemUserDisable} text={userName}/>
				</Animatable.View>
				<IALine color={colors.black_lightly} height={2}/>
				<Animatable.View animation="bounceInLeft" style={styles.itemUserContainer}>
					<View style={{width: 30}}>
						<MaterialCommunityIcons name="phone" size={25}/>
					</View>
					<IAText style={styles.itemUserDisable} text={phoneNumber}/>
				</Animatable.View>
				<IALine color={colors.black_lightly} height={2}/>
				<Animatable.View animation="bounceInRight" style={styles.itemUserContainer}>
					<View style={{width: 30}}>
						<MaterialCommunityIcons name="email-outline" size={25}/>
					</View>
					<IAText style={styles.itemUserDisable} text={email}/>
				</Animatable.View>
				<IALine color={colors.black_lightly} height={2}/>
				<Animatable.View animation="bounceInLeft" style={styles.itemUserContainer}>
					<View style={{width: 30}}>
						<Entypo name="address" size={25}/>
					</View>
					<IAText style={styles.itemUserDisable} text={address}/>
				</Animatable.View>
				<IALine color={colors.black_lightly} height={2}/>
				<Animatable.View animation="bounceInRight" style={styles.itemUserContainer}>
					<View style={{width: 30}}>
						<MaterialIcons name="local-pharmacy" size={26}/>
					</View>
					<IAText style={[styles.itemUserDisable, {marginLeft: 17}]} text={emergencyContact}/>
				</Animatable.View>
				<IALine color={colors.black_lightly} height={2}/>
				<Animatable.View animation="bounceInLeft" style={styles.itemUserContainer}>
					<View style={{width: 30}}>
						<FontAwesome name="user" size={25}/>
					</View>
					<IAText style={styles.itemUserDisable} text={userType}/>
				</Animatable.View>
				<IALine color={colors.black_lightly} height={2}/>
				<Animatable.View animation="bounceInLeft" style={styles.itemUserContainer}>
					<View style={{width: 30}}>
						<FontAwesome5 name="birthday-cake" size={25}/>
					</View>
					<IAText style={styles.itemUserDisable} text={dobTime}/>
				</Animatable.View>
				<IALine color={colors.black_lightly} height={2}/>
			</View>
		);
	}

	_renderItemUserEdit = (title = "", text = "", keyTextChange = "", editable = true) => {
		return (
			<Animatable.View animation="bounceInLeft" style={styles.itemUserContainer}>
				<View style={{width: ScreenWidth/4 + 10 , alignItems: "flex-start", alignContent: "flex-end", alignSelf: "flex-end"}}>
					<IAText style={styles.itemUserDisable} text={title}/>
				</View>
				<View style={{width: ScreenWidth - ScreenWidth/4 - 46, alignItems: "flex-start", alignContent: "flex-end", alignSelf: "flex-end", justifyContent: "flex-end"}}>
					<TextInput
						editable={editable}
						style={{width: ScreenWidth - ScreenWidth/4 - 46,  fontFamily: fonts.family.nunito.regular, fontSize: 17,paddingTop: 0, paddingBottom: 0,
							paddingRight: 10, color: editable ? colors.black : colors.black_lessy, textAlign: "right"}}
						value={text}
						returnKeyType="next"
						onChangeText={this._onChangeInput(keyTextChange)}/>
				</View>
				
			</Animatable.View>
					
		);
	}

	_renderItemContactEmergencyUserEdit = (title = "", value = "", key = "") => {
		return (
			<Animatable.View animation="bounceInLeft" style={styles.itemUserContainer}>
				<View style={{width: ScreenWidth/4 + 10 , alignItems: "flex-start", alignContent: "flex-end", alignSelf: "flex-end"}}>
					<IAText style={styles.itemUserDisable} text={title}/>
				</View>
				<View style={{width: ScreenWidth - ScreenWidth/4 - 46, alignItems: "flex-start", alignContent: "flex-end", alignSelf: "flex-end", justifyContent: "flex-end"}}>
					<PhoneInput
						ref={ref => {
					    		this.phoneInput = ref;
						}}
						inputLabel={" "}
						flagLabel={" "}
						allowZeroAfterCountryCode={false}
						initialCountry={"vn"}
						autoFormat
						inputLabelStyle={{fontSize: 13}}
						style={{fontSize: 13}}
						onChangePhoneNumber={this._onChangeInput(key)}
						textStyle={styles.phoneInput}
						offset={10}
						value={value}
					/>
				</View>
				
			</Animatable.View>
					
		);
	}

	_renderItemUserBirthdayEdit = (title = "", text = "", onPress = () => {}) => {
		return (
			<TouchableOpacity style={styles.itemUserContainer} onPress={onPress}>
				<View style={{width: ScreenWidth/4 + 10, alignItems: "flex-start", alignContent: "flex-end", alignSelf: "flex-end"}}>
					<IAText style={styles.itemUserDisable} text={title}/>
				</View>
				<View style={{width: ScreenWidth - ScreenWidth/4 - 46, alignItems: "flex-start", alignContent: "flex-end", alignSelf: "flex-end", justifyContent: "flex-end"}}>
					<Text
						style={{width: ScreenWidth - ScreenWidth/4 - 46,  fontFamily: fonts.family.nunito.regular, fontSize: 16,paddingTop: 0,
							paddingBottom: 0, textAlign: "right", paddingRight: 10}}>{text}
					</Text>
				</View>
			</TouchableOpacity>
					
		);
	}

	_renderItemUserAddEdit = (title = "", onPress = () => {}) => {
		return (
			<TouchableOpacity style={styles.itemUserContainer} onPress={onPress}>
				<View style={{width: ScreenWidth/4 + 10, alignItems: "flex-start", alignContent: "flex-end", alignSelf: "flex-end"}}>
					<IAText style={styles.itemUserDisable} text={title}/>
				</View>
				<View style={{width: ScreenWidth - ScreenWidth/4 - 46, alignItems: "flex-start", alignContent: "flex-end", alignSelf: "flex-end", justifyContent: "flex-end"}}>
					<Text
						style={{width: ScreenWidth - ScreenWidth/4 - 46,  fontFamily: fonts.family.nunito.regular, fontSize: 16,paddingTop: 0,
							paddingBottom: 0, textAlign: "right", paddingRight: 10}}>{this.state.address}
					</Text>
				</View>
			</TouchableOpacity>
					
		);
	}

	_setAdd = (add) => {
		this.setState({address: add},()=>{
			// console.log("===========" + LogManager.parseJsonObjectToJsonString(this.state));
		});
	}

	_renderEditable() {
		var userInfo = this.props.userProfile;
		var phone = userInfo && userInfo.phoneNumber;
		var emergencyContact = userInfo && userInfo.emergencyContact;
		var dob = this.state.dob;
		var userName = this.state.userName;
		var address = this.state.address;
		var email = this.state.email;
		return (
			<View style={{marginTop: 10}}>
				{this._renderHeader("Basic information")}
				<View style={[styles.formContainer]}>
					{this._renderItemUserEdit("Name", userName, USER_NAME)}
					<IALine color={colors.black_lightly} height={2}/>
					{this._renderItemUserEdit("Email", email, EMAIL, false)}
					<IALine color={colors.black_lightly} height={2}/>
					{this._renderItemUserAddEdit("Address", ()=>{this.goToScreen(ScreenNames.AddressScreen, {_setAdd: this._setAdd.bind(this)});})}
					<IALine color={colors.black_lightly} height={2}/>
					{this._renderItemUserBirthdayEdit("Birthday", dob, ()=>{
						this.setState({isDateTimePickerVisible: true});
					})}
					<IALine color={colors.black_lightly} height={2}/>
				</View>
				<IALine color={colors.black_lightly} height={7} style={{marginBottom: 10}}/>
				{this._renderHeader("Phone management")}
				<View style={[styles.formContainer]}>
					{this._renderItemContactEmergencyUserEdit("Phone", phone, PHONE)}
					<IALine color={colors.black_lightly} height={2}/>
					{this._renderItemContactEmergencyUserEdit("Emergency", emergencyContact, EMERGENCY_CONTACT_PHONE)}
					<IALine color={colors.black_lightly} height={2}/>
				</View>
			</View>
		);
	}

	_onChangeInput(key) {
		return value => this.setState({[key]: value});
	}

	_renderInfo() {
		return (
			<View>
				{this._renderEditable()}
			</View>
		);
	}

	_renderSpace() {
		return (
			<IALine height={7} color={colors.black_lightly}/>
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
				<IAText text={langs.save}/>
			</View>
		);
	}

	_renderUpdateBtn() {
		const {updateUserProfileStatus} = this.props;
		// eslint-disable-next-line no-unused-vars
		const {isVerified, confirmResult} =this.state;
		const btnLoading = updateUserProfileStatus.isFetching();
		return (
			<Animatable.View animation="fadeInUpBig" style={styles.btnLoginContainer}>
				{btnLoading ?
					<View style={styles.btnLogin}>
						<IARefreshing />
					</View>
					: null
				}
			</Animatable.View>
		);
	}

	_renderDismissUpdateBtn() {
		return (
			<Animatable.View animation="fadeInUpBig" style={styles.btnLoginContainer}>
				<TouchableOpacity style={styles.btnLogin} onPress={()=>{this.goBack();}}>
					<View style={styles.buttonDismissContainer}>
						<Text style={styles.dismiss}>
							{langs.cancel}
						</Text>
					</View>
				</TouchableOpacity>
			</Animatable.View>
		);
	}

	_renderUpdateView() {
		return (
			<View>
				{this._renderUpdateBtn()}
			</View> 
		);
	}

	render() {
		const {updateUserProfileStatus} = this.props;
		const {isUpdatingAvt} = this.state;
		let isLoadingY = updateUserProfileStatus.isFetching() || isUpdatingAvt;
		return(
			<View style={styles.mainContainer}>
				<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
				
				<IAHeader viewLeft={this.renderBackButton()}
					viewRight={this._renderToolTopBar()}
					viewCenter={this._renderTitle()}
					styleLeft={styles.headerLeft}
					onPressRight={()=>{this._updateProfile();}}
					onPressLeft={()=>{this.goBack();}}/>
				<KeyboardAwareScrollView
					extraScrollHeight={20}
					automaticallyAdjustContentInsets={false}
					showsVerticalScrollIndicator={false}>
					<View style={{paddingTop: 5, paddingBottom: 40}}>
						{this._renderProfilePicture()}
						{this._renderBasicUserInfo()}
						{this._renderSpace()}
						{this._renderInfo()}
					</View>
				</KeyboardAwareScrollView>
				<DateTimePicker
					isDarkModeEnabled= {this.colorScheme === "dark"}
					isVisible={this.state.isDateTimePickerVisible}
					onConfirm={this.handleDatePicked}
					onCancel={this.hideDateTimePicker}
					minimumDate={new Date(1900, 1, 1)}
					maximumDate={new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate())}
				/>
				{isLoadingY || this.state.isLoading? 
					this._renderLoading() : null}
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
	};
};
const mapDispatchToProps = dispatch =>
	bindActionCreators({
		getUserProfile,
		updateUserProfile,	
		uploadImgGoogle,
		uploadUserProfilePicture
	}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditScreen);