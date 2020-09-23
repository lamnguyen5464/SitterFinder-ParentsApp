import React from "react";
import {View, TouchableOpacity, Image, Text, StatusBar, ActivityIndicator, ScrollView, RefreshControl} from "react-native";
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
import AntDesign from "react-native-vector-icons/AntDesign";
import {getUserSitterProfile, getUserAvailableSitterProfile} from "./actions";
import IAHeader from "../../shared/components/IAHeader";
import IALine from "../../shared/components/IALine";
const moment = require("moment");
import StarRating from "react-native-star-rating";
import {TabView, SceneMap} from "react-native-tab-view";
import {Appearance} from "react-native-appearance";
import {ScreenWidth, ScreenHeight} from "../../shared/utils/dimension/Divices";
import LogManager from "../../shared/utils/logging/LogManager";
import fonts from "../../shared/utils/fonts/fonts";
import {images} from "../../../assets";
import {Calendar, CalendarList, Agenda} from "react-native-calendars";
import rootStyles from "../../shared/utils/styles/rootStyles";
  
const langs = {
	title: I18n.t("me.myBookingProfile"),
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
	dob: I18n.t("myProfile.dateOfBirth"),
	noData: I18n.t("no_data"),
};

class MyBookingProfileScreen extends BaseScreen {
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
			starCount: 3.5,
			index: 0,
			currentTab: 0,
			currentSection: 0,
		};
		this.colorScheme = Appearance.getColorScheme();
	}

	onStarRatingPress(rating) {
		this.setState({
		  starCount: rating
		});
	  }
	

	async _checkDetailUserInfo() {
		console.log("_checkDetailUserInfo");
		var userInfo = await IALocalStorage.getUserDetailInfo();
		if (userInfo) {
			var address = userInfo.address && userInfo.address;
			var firstName = userInfo.firstName && userInfo.firstName;
			var lastName = userInfo.lastName && userInfo.lastName;
			var avatar = userInfo.avatar && userInfo.avatar || "";
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
	componentWillReceiveProps(nextProps) {
		if (nextProps != this.props ) {			
			if (nextProps.userProfileStatus != this.props.userProfileStatus) {
				if (nextProps.userProfileStatus.isSuccess()) {
					if (nextProps.userProfile) {
						let userInfo = nextProps.userProfile;
						var address = userInfo && userInfo.address;
						var firstName = userInfo && userInfo.firstName;
						var lastName = userInfo && userInfo.lastName;
						this.setState({
							lastName: lastName,
							firstName: firstName,
							address: address,
						});
					}
				}
			}
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

	async _getUserInfo() {
		let userInfo = await IALocalStorage.getUserInfo();
		if (userInfo && userInfo.profileId) {
			this.props.getUserSitterProfile({id: userInfo.profileId});
			this.props.getUserAvailableSitterProfile({id: userInfo.profileId});
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
		var img = this.state.avatar;
		return (
			<View style={[styles.containerSquare, {marginBottom: 15}, styles.shadow]}>
				{ this.state.avatar != "" ?
					<FastImage
						style={styles.containerSquareContainer}
						source={{
							uri: img,
							priority: FastImage.priority.high,
						}}
						resizeMode={FastImage.resizeMode.stretch}
						resizeMethod="resize"/>
					:
					<View>
						<Image source={{uri: Constant.MOCKING_DATA.PLACE_HOLDER}} style={styles.mock} resizeMode="cover" resizeMethod="resize"/>
					</View> }
			</View>
		);
	}

	_renderBasicUserInfo () {
		var userName = this.state.userName;
		return (
			<Animatable.View animation="fadeInUpBig" duration={600} style={{marginBottom: 20, marginLeft: 0, alignSelf: "flex-start"}}>
				<IAText text={userName} style={styles.name}/>
				<View>
					<Text style={styles.info}>
						{this.props.userProfile.contactAddress  && 
										this.props.userProfile.contactAddress.numberOfStreet + " " +
										this.props.userProfile.contactAddress.street + " " +
										this.props.userProfile.contactAddress.city}
					</Text>
					<Text style={styles.info}>{ `$${this.props.userProfile.ratePerHour && this.props.userProfile.ratePerHour || 0} per hour`}</Text>
				</View>
			</Animatable.View>
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

	_renderBaby = (num) => {
		var views = [];
		for (let i = 0; i < num; i++) {
			views.push(
				<View style={{margin: 5}}>
					<FontAwesome5 name="baby" size={18}/>
				</View>
			);
		}
		return (
			views
		);
	}

	_renderDesc() {
		var description = this.props.userProfile && this.props.userProfile.description || "";
		var noteAvailibility = this.props.userProfile && this.props.userProfile.noteAvailibility || "";
		return (
			<View style={{marginLeft: 20, marginTop: 10, marginBottom: 10, marginEnd: 20}}>
				<Text style={{marginBottom: 5, fontFamily: fonts.family.nunito.bold, fontSize: 16, backgroundColor: colors.white}}>About me</Text>	
				<View style={{padding: 10, borderColor: colors.black_lightly, borderWidth: 1, borderRadius: 5,}}>
					<Text style={{fontFamily: fonts.family.nunito.regular, fontSize: 16}}>{description}</Text>
					{noteAvailibility != "" ?
					<Text style={{fontFamily: fonts.family.nunito.bold, fontSize: 14}}>{`\nNote: ${noteAvailibility}`}</Text> :null}
				</View>

				<TouchableOpacity style={{marginTop: 10, marginLeft: 30, marginEnd: 30, justifyContent: "center", alignItems: "center", backgroundColor: colors.black_lightly, height: 36, borderRadius: 5}} onPress={()=>{this.goToScreen(ScreenNames.DescriptionEditScreen);}}>
					<Text style={{fontFamily: fonts.family.nunito.bold, fontSize: 14, color: colors.green}}>Edit description</Text>
				</TouchableOpacity>
			</View>
		);
	}

	_renderMinHours() {
		var minHourPerJob = this.props.userProfile && this.props.userProfile.minHourPerJob || 0;
		var isPositive = minHourPerJob > 1;
		return (
			<View style={{marginLeft: 20, marginTop: 10, marginEnd: 20}}>
				<View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
					<Text style={{marginBottom: 5, fontFamily: fonts.family.nunito.bold, fontSize: 16, backgroundColor: colors.white}}>Minimum hour per job</Text>	
					<TouchableOpacity onPress={()=>this.setState({currentSection: this.state.currentSection == 7 ? -7 : 7})}>
						<AntDesign name={this.state.currentSection == 7 ?  "minus" : "plus"} size={22}/>
					</TouchableOpacity>
				</View>
				{this.state.currentSection == 7 ?
					<View>
						<View style={{padding: 10, borderColor: colors.black_lightly, borderWidth: 1, borderRadius: 5,}}>
							<Text style={{fontFamily: fonts.family.nunito.regular, fontSize: 16}}>{`${minHourPerJob} ${isPositive ? "hours" : "hour"}`}</Text>
						</View>
					</View>:null}
			</View>
		);
	}

	_renderBabySittingRates() {
		var ratePerHourForNumberOfChilds = this.props.userProfile && this.props.userProfile.ratePerHourForNumberOfChilds || [];
		var ratePerHourForNumberOf1Childs = ratePerHourForNumberOfChilds && ratePerHourForNumberOfChilds.ONE_CHILD || 0;
		var ratePerHourForNumberOf2Childs = ratePerHourForNumberOfChilds && ratePerHourForNumberOfChilds.TWO_CHILDS || 0;
		var ratePerHourForNumberOf3Childs = ratePerHourForNumberOfChilds && ratePerHourForNumberOfChilds.THREE_CHILDS || 0;
		var ratePerHourForNumberOf4Childs = ratePerHourForNumberOfChilds && ratePerHourForNumberOfChilds.FOUR_CHILDS || 0;
		return (
			<View style={{marginLeft: 20, marginTop: 10, marginEnd: 20}}>
				<View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
					<Text style={{marginBottom: 5, fontFamily: fonts.family.nunito.bold, fontSize: 16, backgroundColor: colors.white}}>Babysitting Rates</Text>	
					<TouchableOpacity onPress={()=>this.setState({currentSection: this.state.currentSection == 1 ? -1 : 1})}>
						<AntDesign name={this.state.currentSection == 1 ?  "minus" : "plus"} size={22}/>
					</TouchableOpacity>
				</View>
				{this.state.currentSection == 1 ?
					<View style={{padding: 10, borderColor: colors.black_lightly, borderWidth: 1,  borderRadius: 5,}}>
						<View style={{flexDirection: "row", justifyContent: "space-between"}}>
							<Text style={{fontFamily: fonts.family.nunito.regular, fontSize: 16}}>
								{`$${ratePerHourForNumberOf1Childs} per hour`}
							</Text>
							<View style={{flexDirection: "row"}}>
								{this._renderBaby(1)}
							</View>
						</View>
						<View style={{flexDirection: "row", justifyContent: "space-between"}}>
							<Text style={{fontFamily: fonts.family.nunito.regular, fontSize: 16}}>
								{ratePerHourForNumberOf2Childs != 0 ? `$${ratePerHourForNumberOf2Childs} per hour` : "-"}
							</Text>
							<View style={{flexDirection: "row"}}>
								{this._renderBaby(2)}
							</View>
						</View>
						<View style={{flexDirection: "row", justifyContent: "space-between"}}>
							<Text style={{fontFamily: fonts.family.nunito.regular, fontSize: 16}}>
								{ratePerHourForNumberOf3Childs != 0 ? `$${ratePerHourForNumberOf3Childs} per hour` : "-"}
							</Text>
							<View style={{flexDirection: "row"}}>
								{this._renderBaby(3)}
							</View>
						</View>
						<View style={{flexDirection: "row", justifyContent: "space-between"}}>
							<Text style={{fontFamily: fonts.family.nunito.regular, fontSize: 16}}>
								{ratePerHourForNumberOf4Childs != 0 ? `$${ratePerHourForNumberOf4Childs} per hour` : "-"}
							</Text>
							<View style={{flexDirection: "row"}}>
								{this._renderBaby(4)}
							</View>
						</View>
					</View> 
					:null}
				{this.state.currentSection == 1 ?
					<TouchableOpacity style={{marginTop: 10, marginLeft: 30, marginEnd: 30, justifyContent: "center", alignItems: "center", backgroundColor: colors.black_lightly, height: 36, borderRadius: 5}} onPress={()=>this.goToScreen(ScreenNames.BabySittingRateScreen)}>
						<Text style={{fontFamily: fonts.family.nunito.bold, fontSize: 14, color: colors.green}}>Edit babysitting rates</Text>
					</TouchableOpacity>:null}
			</View>
		);
	}

	_renderYearOfExp() {
		var experiences = this.props.userProfile && this.props.userProfile.experiences || [];
		var toddlers = experiences && experiences.TODDLERS || 0;
		var infant = experiences && experiences.INFANTS || 0;
		var ageSchool = experiences && experiences.SCHOOL_AGE || 0;
		return (
			<View style={{marginTop: 10}}>
				<View style={{marginLeft: 20, marginEnd: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
					<Text style={{marginBottom: 5, fontFamily: fonts.family.nunito.bold, fontSize: 16, backgroundColor: colors.white}}>Year of experiences</Text>	
					<TouchableOpacity onPress={()=>this.setState({currentSection: this.state.currentSection == 2 ? -2 : 2})}>
						<AntDesign name={this.state.currentSection == 2 ?  "minus" : "plus"} size={22}/>
					</TouchableOpacity>
				</View>
				{this.state.currentSection === 2 ?
					<View>
						<View style={{marginLeft: 20, marginEnd: 20,flexDirection: "row",marginHorizontal: 20, marginTop: 20, justifyContent: "space-between"}}>
							<Image source={images.toddlers} style={{width: 80, height: 80, borderRadius: 40, borderColor: colors.black_twenty, borderWidth: 1}}/>
							<Image source={images.infant} style={{width: 80, height: 80, borderRadius: 40, borderColor: colors.black_twenty, borderWidth: 1}}/>
							<Image source={images.school} style={{width: 80, height: 80, borderRadius: 40, borderColor: colors.black_twenty, borderWidth: 1}}/>
						</View>
						<View style={{flexDirection: "row",marginHorizontal: 20, marginTop: 20, justifyContent: "space-between"}}>
							<Text style={{textAlign: "center", fontSize: 12, fontFamily: fonts.family.nunito.regular}}>{`Toddler: ${toddlers} \n(1-3 years old)`}</Text>
							<Text style={{textAlign: "center", fontSize: 12, fontFamily: fonts.family.nunito.regular}}>{`Infant: ${infant}\n(under 1 year old)`}</Text>
							<Text style={{textAlign: "center", fontSize: 12, fontFamily: fonts.family.nunito.regular}}>{`Age of school: ${ageSchool}\n(4+ years old)`}</Text>
						</View>
					</View>:null}
				{this.state.currentSection === 2 ?
					<TouchableOpacity style={{marginTop: 10, marginLeft: 30, marginEnd: 30, justifyContent: "center", alignItems: "center", backgroundColor: colors.black_lightly, height: 36, borderRadius: 5}} onPress={()=>this.goToScreen(ScreenNames.YearExpScreen)}>
						<Text style={{fontFamily: fonts.family.nunito.bold, fontSize: 14, color: colors.green}}>Edit years of experiences</Text>
					</TouchableOpacity>:null}
			</View>
		);
	}

	_renderSpecialOfExp() {
		var specialExperiences = this.props.userProfile && this.props.userProfile.specialExperiences || [];
		return (
			<View style={{marginTop: 10}}>
				
				<View>
				
					<View style={{marginLeft: 20, marginEnd: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
						<Text style={{marginBottom: 5, fontFamily: fonts.family.nunito.bold, fontSize: 16, backgroundColor: colors.white}}>Special of experiences</Text>	
						<TouchableOpacity onPress={()=>this.setState({currentSection: this.state.currentSection == 3 ? -3 : 3})}>
							<AntDesign name={this.state.currentSection == 3 ?  "minus" : "plus"} size={22}/>
						</TouchableOpacity>
					</View>
					{this.state.currentSection === 3 ?
						<View style={{marginLeft: 20, marginEnd: 20, borderColor: colors.black_lightly, borderWidth: 1, borderRadius: 5,}}>
							<Animatable.View animation="slideInDown" style={{flexDirection: "row", flexWrap: "wrap"}}>
								{specialExperiences.map(item => {
									return (
										<View key={item.id} onPress={()=>{}}>
											<View style={{margin: 10, backgroundColor: colors.background_tag,
									 borderRadius: 10, paddingEnd: 15, paddingLeft: 15, paddingBottom: 5,
									  paddingTop: 5, borderWidth: 1, borderColor: colors.background_tag,}}>
												<Text style={{fontFamily: fonts.family.nunito.regular, fontSize: 14}}>{item}</Text>
											</View>
										</View>
									);
								})}
							</Animatable.View>
						</View>:null}
				</View>
				{this.state.currentSection === 3 ?
					<TouchableOpacity style={{marginTop: 10, marginLeft: 30, marginEnd: 30, justifyContent: "center", alignItems: "center", backgroundColor: colors.black_lightly, height: 36, borderRadius: 5}} onPress={()=>this.goToScreen(ScreenNames.SpecialExpScreen)}>
						<Text style={{fontFamily: fonts.family.nunito.bold, fontSize: 14, color: colors.green}}>Edit special of experiences</Text>
					</TouchableOpacity>:null}			
			</View>
		);
	}

	_renderBackgroundBasic() {
		var certificates = this.props.userProfile && this.props.userProfile.certificates || [];
		return (
			<View style={{marginTop: 10}}>				
				<View>
					<View style={{marginLeft: 20, marginEnd: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
						<Text style={{marginBottom: 5, fontFamily: fonts.family.nunito.bold, fontSize: 16, backgroundColor: colors.white}}>Background basic/certificates</Text>	
						<TouchableOpacity onPress={()=>this.setState({currentSection: this.state.currentSection == 4 ? -4 : 4})}>
							<AntDesign name={this.state.currentSection == 4 ?  "minus" : "plus"} size={22}/>
						</TouchableOpacity>
					</View>
					{this.state.currentSection === 4 ?
						<View style={{marginLeft: 20, marginEnd: 20, borderColor: colors.black_lightly, borderWidth: 1, borderRadius: 5,}}>
							<Animatable.View animation="lightSpeedIn" style={{flexDirection: "row", flexWrap: "wrap"}}>
								{certificates.map(item => {
									return (
										<View key={item.id} onPress={()=>{}}>
											<View style={{margin: 10, backgroundColor: colors.background_tag,
									 borderRadius: 10, paddingEnd: 15, paddingLeft: 15, paddingBottom: 5,
									  paddingTop: 5, borderWidth: 1, borderColor: colors.background_tag,}}>
												<Text style={{fontFamily: fonts.family.nunito.regular, fontSize: 14}}>{item.replaceAll("_", " ")}</Text>
											</View>
										</View>
									);
								})}
							</Animatable.View>
						</View>:null}
				</View>
				{this.state.currentSection === 4 ?
					<TouchableOpacity style={{marginTop: 10, marginLeft: 30, marginEnd: 30, justifyContent: "center", alignItems: "center", backgroundColor: colors.black_lightly, height: 36, borderRadius: 5}} onPress={()=>this.goToScreen(ScreenNames.CertificatesScreen)}>
						<Text style={{fontFamily: fonts.family.nunito.bold, fontSize: 14, color: colors.green}}>Edit background basic/certificates</Text>
					</TouchableOpacity>:null}			
			</View>
		);
	}

	_filterRecurring = (recurringAvaibilities = [], item) => {
		var dates = [];
		var time = {};
		for (let i = 0; i< recurringAvaibilities.length; i++) {
			let date = recurringAvaibilities[i].dateOfWeek.code;
			let am = recurringAvaibilities[i].morning;
			let middate = recurringAvaibilities[i].afternoon;
			let pm = recurringAvaibilities[i].evening;
			let newDate = {};
			newDate["date"] = date;
			newDate["am"] = am;
			newDate["middate"] = middate;
			newDate["pm"] = pm;
			
			dates.push(newDate);
		}
		let isBelongTo = false;
		for (let j = 0; j< dates.length; j++) {
			if (item.name === dates[j].date) {
				isBelongTo = true;
				// if (item === date) {
				time["am"] = dates[j].am;
				time["middate"] = dates[j].middate;
				time["pm"] = dates[j].pm;
				// }
				break;
			}
		} 
		return {isBelongTo, time};
		
	}

	_renderGeneralVailableTime() {
		var recurringAvaibilities = this.props.userProfile && this.props.userProfile.recurringAvaibilities || [];
		return (
			<View style={{marginTop: 10}}>				
				<View>
					<View style={{marginLeft: 20, marginEnd: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
						<Text style={{marginBottom: 5, fontFamily: fonts.family.nunito.bold, fontSize: 16, backgroundColor: colors.white}}>Available time</Text>	
						<TouchableOpacity onPress={()=>this.setState({currentSection: this.state.currentSection == 5 ? -5 : 5})}>
							<AntDesign name={this.state.currentSection == 5 ?  "minus" : "plus"} size={22}/>
						</TouchableOpacity>
					</View>
					{this.state.currentSection === 5 ?
						<View style={{marginLeft: 10, marginEnd: 10, paddingTop: 10, borderColor: colors.black_lightly, borderWidth: 1, borderRadius: 5,}}>
							<View style={{marginBottom: 10, flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10}}>
								{Constant.calendarTime[0].map((item, index) => {
									let filteredObj = this._filterRecurring(recurringAvaibilities, item);
									return (
										<View key={item + index +"0m"} style={{marginRight: 2, height: 38, width: 38, borderRadius: 19,
											borderColor: index != 0 ? colors.blue_dodger : colors.black_seventy, 
											borderWidth: 0.5, justifyContent: "center", alignItems:"center", 
											alignContent: "center", 
											backgroundColor: filteredObj.isBelongTo && filteredObj.time.am ? colors.green : colors.white}}>
											<Text style={{fontSize: 13, fontFamily: fonts.family.nunito.regular}}>{item.code}</Text>
										</View>
									);
								})}
							</View>
							<View style={{marginBottom: 10, flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10}}>
								{Constant.calendarTime[1].map((item, index) => {
									let filteredObj = this._filterRecurring(recurringAvaibilities, item);
									return (
										<View key={item + index +"1mm"} style={{height: 38, width: 38, borderRadius: 17,
											borderColor: index != 0 ? colors.blue_dodger : colors.black_seventy, 
											borderWidth: 0.5, justifyContent: "center", alignItems:"center", 
											alignContent: "center",
											backgroundColor: filteredObj.isBelongTo && filteredObj.time.middate ? colors.green : colors.white}}>
											<Text style={{fontSize: 13, fontFamily: fonts.family.nunito.regular}}>{item.code}</Text>
										</View>
									);
								})}
							</View>
							<View style={{marginBottom: 10, flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10}}>
								{Constant.calendarTime[2].map((item, index) => {
									let filteredObj = this._filterRecurring(recurringAvaibilities, item);
									return (
										<View key={item + index +"2mmm"} style={{height: 38, width: 38, borderRadius: 19,
											borderColor: index != 0 ? colors.blue_dodger : colors.black_seventy, borderWidth: 0.5, 
											justifyContent: "center", alignItems:"center", alignContent: "center",
											backgroundColor: filteredObj.isBelongTo && filteredObj.time.pm ? colors.green : colors.white}}>
											<Text style={{fontSize: 13, fontFamily: fonts.family.nunito.regular}}>{item.code}</Text>
										</View>
									);
								})}
							</View>
						</View>:null}
				</View>
				{this.state.currentSection === 5 ?
					<TouchableOpacity style={{marginTop: 10, marginLeft: 30, marginEnd: 30, justifyContent: "center", alignItems: "center", backgroundColor: colors.black_lightly, height: 36, borderRadius: 5}} onPress={()=>this.goToScreen(ScreenNames.AvailableTimeScreen)}>
						<Text style={{fontFamily: fonts.family.nunito.bold, fontSize: 14, color: colors.green}}>Edit available time</Text>
					</TouchableOpacity>:null}			
			</View>
		);
	}

	_renderTransport() {
		var transportTypes = this.props.userProfile && this.props.userProfile.transportTypes || [];
		return (
			<View style={{marginTop: 10}}>				
				<View>
					<View style={{marginLeft: 20, marginEnd: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
						<Text style={{marginBottom: 5, fontFamily: fonts.family.nunito.bold, fontSize: 16, backgroundColor: colors.white}}>Transport</Text>	
						<TouchableOpacity onPress={()=>this.setState({currentSection: this.state.currentSection == 6 ? -6 : 6})}>
							<AntDesign name={this.state.currentSection == 6 ?  "minus" : "plus"} size={22}/>
						</TouchableOpacity>
					</View>
					{this.state.currentSection === 6 ?
						<View style={{marginLeft: 20, marginEnd: 20, borderColor: colors.black_lightly, borderWidth: 1, borderRadius: 5,}}>
							<Animatable.View animation="fadeInLeftBig" style={{flexDirection: "row", flexWrap: "wrap"}}>
								{transportTypes.map(item => {
									return (
										<View key={item.id} onPress={()=>{}}>
											<View style={{margin: 10, backgroundColor: colors.background_tag,
									 borderRadius: 10, paddingEnd: 15, paddingLeft: 15, paddingBottom: 5,
									  paddingTop: 5, borderWidth: 1, borderColor: colors.background_tag,}}>
												<Text style={{fontFamily: fonts.family.nunito.regular, fontSize: 14}}>{item.replaceAll("_", " ")}</Text>
											</View>
										</View>
									);
								})}
							</Animatable.View>
						</View>:null}
				</View>	
			</View>
		);
	}

	_renderSummary = () => {
		return (
			
			<View style={{backgroundColor: colors.white}}>
				
				{/* Description */}
				{this._renderDesc()}

				{/* Min hour */}
				{this._renderMinHours()}

				{/* Baby Sitting */}
				{this._renderBabySittingRates()}

				{/* Year of exp */}
				{this._renderYearOfExp()}

				{/* Special exp */}
				{this._renderSpecialOfExp()}

				{/* Background basic / certificates */}
				{this._renderBackgroundBasic()}

				{/* Available */}
				{this._renderGeneralVailableTime()}

				{/* Transport */}
				{this._renderTransport()}
			</View>
		);
	};

	_renderReview = () => {
		var ratingPoint = this.props.userProfile && this.props.userProfile.ratingPoint || 0;
		let tempData = [
			{
			  "avatar": "string",
			  "comment": "He has a good overview his background, and finish his workload properly. I will recommend him for another one",
			  "createdOn": "2019-11-20 08:12 AM",
			  "modifiedBy": "string",
			  "modifiedOn": 0,
			  "parentId": "string",
			  "parentName": "string",
			  "ratingPoint": 5,
			  "sitterId": "string"
			}
		];

		return (
			<View style={{marginTop: 20, alignContent: "center", alignItems: "center", alignSelf: "center", justifyContent: "center"}}>
				{tempData.map(item => {
					return (
						<View key={item.id} style={[rootStyles, {marginBottom: 10, flexDirection: "row", justifyContent: "space-between", padding: 20, borderRadius: 5, borderColor: colors.black_lessy, borderWidth: 1}, ]}>
							<View style={{width: (ScreenWidth-60)*0.2}}>
								<Image style={{marginRight: 15, width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: colors.black_seventy}} source={images.userProfile}/>
							</View>
							<View>
								<Text ellipsizeMode="tail" style={{width: (ScreenWidth-60)*0.8, fontSize: 14, fontFamily: fonts.family.avenir_book.regular}}>{item.comment}</Text>
								<Text ellipsizeMode="tail" style={{textAlign: "right", width: (ScreenWidth-60)*0.8, fontSize: 12, fontFamily: fonts.family.avenir_book.regular, color: colors.black_title}}>{item.createdOn}</Text>
							</View>
						</View>
					);
				})}
			</View>
		);
	};

	_filterDate() {

	}

	_renderCalendar = () => {
		var time = this.props.getUserSitterAvailable && this.props.getUserSitterAvailable || [];
		var data = {};
		for (let i = 0; i < time.length; i++) {
			let date = time[i].date;
			let convertedTimeMill = new Date(date);
			let timeString = convertedTimeMill.getFullYear() +"-" + (convertedTimeMill.getMonth() < 10 ? 
				"0" + convertedTimeMill.getMonth()  :convertedTimeMill.getMonth()) +"-"+
				(convertedTimeMill.getDate() < 10 ? "0"+convertedTimeMill.getDate() : convertedTimeMill.getDate());
			data[timeString] = {};
			data[timeString].selected = true;
			data[timeString].marked = true;
			data[timeString].selectedColor = "red";
		}
		return (
			<View style={[styles.scene, {backgroundColor: "#ffffff"}]}>
				<Calendar
					// Initially visible month. Default = Date()
					// Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
					// minDate={"2012-05-10"}
					// Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
					// maxDate={"2012-05-30"}
					// Handler which gets executed on day press. Default = undefined
					onDayPress={(day) => {console.log("selected day", day);}}
					// Handler which gets executed on day long press. Default = undefined
					onDayLongPress={(day) => {console.log("selected day", day);}}
					// Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
					monthFormat={"yyyy MMM, dd"}
					// Handler which gets executed when visible month changes in calendar. Default = undefined
					onMonthChange={(month) => {console.log("month changed", month);}}
					// Hide month navigation arrows. Default = false
					// hideArrows={false}
					// Replace default arrows with custom ones (direction can be 'left' or 'right')
					// renderArrow={(direction) => (<Arrow />)}
					// Do not show days of other months in month page. Default = false
					hideExtraDays={false}
					// If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
					// day from another month that is visible in calendar page. Default = false
					disableMonthChange={false}
					// If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
					// firstDay={1}
					// Hide day names. Default = false
					hideDayNames={false}
					// Show week numbers to the left. Default = false
					// showWeekNumbers={true}
					// Handler which gets executed when press arrow icon left. It receive a callback can go back month
					onPressArrowLeft={substractMonth => substractMonth()}
					// Handler which gets executed when press arrow icon left. It receive a callback can go next month
					onPressArrowRight={addMonth => addMonth()}
					markedDates={
						data
					}
				/>
				<IALine height={3} color={colors.black_lightly}/>
				<View style={{marginLeft: 20, marginEnd: 20, marginTop: 20}}>
					<Text style={{marginBottom: 20, fontSize: 16, fontFamily: fonts.family.nunito.bold}}>List available time</Text>
					{time.length === 0 ? <IAText text={langs.noData} style={styles.noData}/> : 
						time.map(item => {
							return (
								<View key={item} style={[{padding: 5, borderColor: colors.black_twenty, borderRadius: 5, borderWidth: 1,}, styles.shadow]}>
									<Text style={{textDecorationLine:"underline", fontSize: 15, fontFamily: fonts.family.avenir_book.bold}}>{`Date: ${new Date(item.date).toLocaleDateString("en-US")}`}</Text>
									<View style={{marginLeft: 40}}>
										{item.times.map(val => {
											return (
												<View key={val}>
													<Text style={{fontSize: 13, fontFamily: fonts.family.avenir_book.regular, textAlign: "left"}}>
														{`Start: ${new Date(val.start).toLocaleString()}`}
													</Text>
													<Text style={{fontSize: 13, fontFamily: fonts.family.avenir_book.regular,  textAlign: "right"}}>
														{`End: ${new Date(val.end).toLocaleString()}`}
													</Text>
												</View>
											);
										})}
									</View>
								</View>
							);
						})}
				</View>
			</View>
		);
	};

	render() {
		var ratingPoint = this.props.userProfile && this.props.userProfile.ratingPoint || 0;
		const {userProfileStatus} = this.props;
		let isLoading = userProfileStatus.isFetching();
		return(
			<View style={styles.mainContainer}>
				<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
				<IAHeader viewLeft={this.renderBackButton()}
					viewRight={null}
					viewCenter={this._renderTitle()}
					styleLeft={styles.headerLeft}
					onPressRight={()=>{}}
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
						<View style={{width: ScreenWidth - 50,justifyContent: "center",  alignContent: "center", alignItems: "center", alignSelf: "center"}}>
							<View style={{flexDirection: "row", justifyContent:"space-between", alignContent: "center", alignItems: "center", alignSelf: "flex-start"}}>
								<View style={{justifyContent: "center", width: ScreenWidth/2 - 25}}>
									{this._renderProfilePicture()}
								</View>
								<View style={{alignContent: "center", alignItems: "center", alignSelf: "center"}}>
									<StarRating
										starSize={25}
										disabled={true}
										emptyStar={"ios-star-outline"}
										fullStar={"ios-star"}
										halfStar={"ios-star-half"}
										iconSet={"Ionicons"}
										maxStars={5}
										rating={ratingPoint}
										selectedStar={(rating) => this.onStarRatingPress(rating)}
										fullStarColor={"blue"}/>
									<Text>0 Reviews</Text>
								</View>
							</View>
							{this._renderBasicUserInfo()}
						</View>
						{this._renderSpace()}
						<View style={{backgroundColor: colors.black_lightly, 
							paddingBottom: 20, 
							paddingTop: 10,
							flexDirection: "row", width: "100%", justifyContent: "space-around", alignSelf: "center", alignItems: "center", alignContent: "center"}}>
							<TouchableOpacity onPress={()=>this.setState({currentTab: 0})}>
								<Text style={{
									fontWeight: this.state.currentTab === 0 ? "800" : "normal",
									fontSize: 17,
									textDecorationLine: this.state.currentTab === 0 ? "underline" : "none",
									fontFamily: this.state.currentTab === 0 ? fonts.family.nunito.bold : fonts.family.nunito.regular
								}}>Summary</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>this.setState({currentTab: 1})}>
								<Text style={{
									fontWeight: this.state.currentTab === 1 ? "800" : "normal",
									fontSize: 17,
									textDecorationLine: this.state.currentTab === 1 ? "underline" : "none",
									fontFamily: this.state.currentTab === 1 ? fonts.family.nunito.bold : fonts.family.nunito.regular}}>Reviews</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={()=>this.setState({currentTab: 2})}>
								<Text style={{
									fontWeight: this.state.currentTab === 2 ? "800" : "normal",
									fontSize: 17,
									textDecorationLine: this.state.currentTab === 2 ? "underline" : "none",
									fontFamily: this.state.currentTab === 2 ? fonts.family.nunito.bold : fonts.family.nunito.regular}}>Calendar</Text>
							</TouchableOpacity>
						</View>
						<View>
							{this.state.currentTab == 0 ? 
								this._renderSummary() : 
								(this.state.currentTab == 1 ? 
									this._renderReview() : this._renderCalendar()) 
							}
						</View>
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
		userProfileStatus: state.userProfileSitterReducer.userSitterProfile.status,
		userProfile: state.userProfileSitterReducer.userSitterProfile.data,
		userProfileError: state.userProfileSitterReducer.userSitterProfile.error,

		getUserSitterAvailableStatus: state.userProfileSitterReducer.getUserSitterAvailable.status,
		getUserSitterAvailable: state.userProfileSitterReducer.getUserSitterAvailable.data,
		getUserSitterAvailableError: state.userProfileSitterReducer.getUserSitterAvailable.error,
	};
};
const mapDispatchToProps = dispatch =>
	bindActionCreators({
		getUserSitterProfile,
		getUserAvailableSitterProfile
	}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyBookingProfileScreen);