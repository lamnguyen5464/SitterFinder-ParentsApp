import React from "react";
import "react-native-gesture-handler";
import {View, ScrollView, Text, TouchableOpacity, Platform, Animated, TextInput, Image, StatusBar} from "react-native";
import BaseScreen from "../BaseScreen/index";
import {styles} from "./style";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import I18n from "../../shared/utils/locale/i18n";
import * as Animatable from "react-native-animatable";
import {AxiosFetch} from "../../api/AxiosFetch";
import LogManager from "../../shared/utils/logging/LogManager";
import IAHeader from "../../shared/components/IAHeader";
import IAText from "../../shared/components/IAText";
import {ScreenWidth} from "../../shared/utils/dimension/Divices";
import * as device from "../../shared/utils/device/device";
import fonts from "../../shared/utils/fonts/fonts";
import {colors} from "../../shared/utils/colors/colors";
import rootStyles from "../../shared/utils/styles/rootStyles";
import {images} from "../../../assets";
import Heart from "../../../assets/imgs/Heart";
import {Appearance} from "react-native-appearance";
import ReactNativePickerModule from "react-native-picker-module";
import DateTimePicker from "react-native-modal-datetime-picker";
import {ScreenNames} from "../../route/ScreenNames";
import Constant from "../../shared/utils/constant/Constant";
import IALine from "../../shared/components/IALine";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import { AlertHelper } from "../../shared/utils/AlertHelper";
var moment = require("moment-timezone");

const langs = {
	welcome: I18n.t("home.welcome"),
	leagues: I18n.t("home.leagues"),
	allEvents: I18n.t("home.allEvent").toUpperCase(),
	myLeagues: I18n.t("home.myLeagues").toUpperCase(),
	upcommingEvent: I18n.t("home.upcommingEvent").toUpperCase(),
	createdLeague: I18n.t("home.createdLeague").toUpperCase(),
	joinedLeague: I18n.t("home.joinedLeague").toUpperCase(),
	event: I18n.t("home.event"),
	error: I18n.t("error"),
	success: I18n.t("success")
};
const temp = [
	{
		"afternoon": false,
		"dateOfWeek": {
		  "code": "SUN",
		  "label": "Sunday",
		},
		"evening": false,
		"morning": false,
	},
	{
		"afternoon": false,
		"dateOfWeek": {
		  "code": "MON",
		  "label": "Monday",
		},
		"evening": false,
		"morning": false,
	},
	{
		"afternoon": false,
		"dateOfWeek": {
		  "code": "TUE",
		  "label": "Tuesday",
		},
		"evening": false,
		"morning": false,
	},
	{
		"afternoon": false,
		"dateOfWeek": {
		  "code": "WED",
		  "label": "Wednesday",
		},
		"evening": false,
		"morning": false,
	},
	{
		"afternoon": false,
		"dateOfWeek": {
		  "code": "THU",
		  "label": "Thursday",
		},
		"evening": false,
		"morning": false,
	},
	{
		"afternoon": false,
		"dateOfWeek": {
		  "code": "FRI",
		  "label": "Friday",
		},
		"evening": false,
		"morning": false,
	},
	{
		"afternoon": false,
		"dateOfWeek": {
		  "code": "SAT",
		  "label": "Saturday",
		},
		"evening": false,
		"morning": false,
	},
];
class CreateJobScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state = {
			dataJobs: {
				data: [],
				err: null
			},
			isLoading: false,
			isSuccess: false,
			jobTitle: "",
			address: "",
			userName: "",
			childAge: "5",
			childNumber: "1",
			overNightBooking: "No",
			gender: "",
			ratePerHours: 10,
			isDateTimePickerVisible: false,
			isDateTimePickerVisibleEnd: false,
			start: new Date().getTime(),
			startTime: moment().format("YYYY-DD-MM HH:mm"),
			end: new Date().getTime() + 86400000,
			endTime: moment(new Date().getTime() + 3600000).format("YYYY-DD-MM HH:mm"),
			jobType: "PART_TIME",
			recurringTime: temp,
		};
		this.colorScheme = Appearance.getColorScheme();
	}

	addTriggerForScreen() {
		this.focusListener = this.props && this.props.navigation.addListener("willFocus", () => {
			let i = 0;
			let tempData = [];
			for (i; i< temp.length; i++) {
				temp[i].morning = false; 
				temp[i].evening = false; 
				temp[i].afternoon = false; 
				tempData.push(temp[i]);
			}
			this.setState({
				recurringTime: tempData
			});
		});
	}

	componentDidMount() {
		this.addTriggerForScreen();
	}

	componentWillUnmount() {
		this.focusListener.remove();
	}

	async _create() {
		let userInfo = await IALocalStorage.getUserInfo();
		
		let body = {
			address: this.state.address,
			childAge: this.state.childAge,
			endAt: this.state.end,
			jobType: this.state.jobType,
			numOfChild: this.state.childNumber,
			gender: this.state.gender,
			parentId: userInfo.profileId,
			overnightBooking: this.state.overNightBooking === "Yes",
			recurringAvaibilities: this.state.recurringTime,
			startAt: this.state.start,
			jobTitle: this.state.jobTitle,
			timeZone: moment.tz.guess()
		};
		this.setState({isLoading: true});
		AxiosFetch({
			method: "POST",
			url: "/api/job/save",
			contentType: "application/json",
			data: body,
			onSuccess: data => {
				this.setState({
					isLoading: false,
					isSuccess: true
				}, () => {
					AlertHelper.showSuccess("Success", "Job has been created successfully");
					setTimeout(() => {
						this.goBack();
					}, 2000);
				});
				this.setState({isLoading: false, isSuccess: true});
			},
			onError: error => {
				AlertHelper.showSuccess("Error while creating job", error.data.message);
				this.setState({isLoading: false}, ()=> {
					
				});
				console.log("=========1" +LogManager.parseJsonObjectToJsonString(error));	
			},
			hasToken: true
		});
	}

	_renderTitle() {
		return (
			<IAText text={"Create a new job"} style={styles.title}/>
		);
	}

	_renderItemUserEdit = (title = "", text = "", keyTextChange = "", editable = true, keyboardType ="default", maxLength=100000) => {
		return (
			<Animatable.View animation="bounceInLeft" style={styles.itemUserContainer}>
				<View style={{width: ScreenWidth/4}}>
					<IAText style={styles.itemUserDisable} text={title}/>
				</View>
				<View style={{width: ScreenWidth - ScreenWidth/4 - 20,}}>
					<TextInput
						editable={editable}
						style={{width: ScreenWidth - ScreenWidth/4 - 30,  fontFamily: fonts.family.nunito.regular, fontSize: 17,paddingTop: 0, paddingBottom: 0,
							marginRight: 10, color: editable ? colors.black : colors.black_lessy, textAlign: "right"}}
						value={text}
						placeholder="Job title here"
						maxLength={maxLength}
						returnKeyType="next"
						keyboardType={keyboardType}
						onChangeText={(text) => this.setState({[keyTextChange]: text})}/>
				</View>
			</Animatable.View>
					
		);
	}

	_renderItemUserAddEdit = (title = "", onPress = () => {}) => {
		return (
			<TouchableOpacity style={styles.itemUserContainer} onPress={onPress}>
				<View style={{width: ScreenWidth/4}}>
					<IAText style={styles.itemUserDisable} text={title}/>
				</View>
				<View style={{width: ScreenWidth - ScreenWidth/4 - 20, alignItems: "flex-start", alignContent: "flex-end", alignSelf: "flex-end", justifyContent: "flex-end"}}>
					<Text
						style={{width: ScreenWidth - ScreenWidth/4 - 20, fontFamily: fonts.family.nunito.regular, fontSize: 16,paddingTop: 0,
							paddingBottom: 0, textAlign: "right", paddingRight: 10}}>{this.state.address}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}

	_renderOvernight = (title = "", value, onPress = () => {}) => {
		return (
			<TouchableOpacity style={styles.itemUserContainer} onPress={onPress}>
				<View style={{width: ScreenWidth/4 + 10}}>
					<IAText style={styles.itemUserDisable} text={title}/>
				</View>
				<View style={{width: ScreenWidth - ScreenWidth/4 - 30}}>
					<Text
						style={{width: ScreenWidth - ScreenWidth/4 - 30, fontFamily: fonts.family.nunito.regular, fontSize: 16,paddingTop: 0,
							paddingBottom: 0, textAlign: "right", paddingRight: 10}}>{value}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}

	_modalOvernight = () => {
		return (
			<ReactNativePickerModule
				pickerRef={e => this.overNightBooking = e}
				value={this.state.overNightBooking ? "Yes" : "No"}
				title={"Is overnight require?"}
				items={Constant.OVERNIGHT}
				onValueChange={(index) => {
					this.setState({
						overNightBooking: index
					});
				}}/>
		);
	}

	_renderRatePerHours = (title = "", onPress = () => {}) => {
		return (
			<TouchableOpacity style={styles.itemUserContainer} onPress={onPress}>
				<View style={{width: ScreenWidth/4 + 50}}>
					<IAText style={styles.itemUserDisable} text={title}/>
				</View>
				<View style={{width: ScreenWidth - ScreenWidth/4 - 70}}>
					<Text
						style={{width: ScreenWidth - ScreenWidth/4- 70, fontFamily: fonts.family.nunito.bold, fontSize: 16,paddingTop: 0,
							paddingBottom: 0, textAlign: "right", paddingRight: 10}}>{`$${this.state.ratePerHours}`}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}

	_modalRatePerHours = () => {
		return (
			<ReactNativePickerModule
				pickerRef={e => this.ratePerHours = e}
				value={this.state.ratePerHours}
				title={"How much do you pay?"}
				items={Constant.NUMs}
				onValueChange={(index) => {
					this.setState({
						ratePerHours: index
					});
				}}/>
		);
	}

	_setAdd = (add) => {
		this.setState({address: add},()=>{
		});
	}

	_renderDateStart() {
		return (
			<DateTimePicker
				isDarkModeEnabled= {this.colorScheme === "dark"}
				isVisible={this.state.isDateTimePickerVisible}
				onConfirm={this.handleDatePickedStart}
				onCancel={this.hideDateTimePickerStart}
				mode="datetime"
				minimumDate={new Date()}
				maximumDate={new Date(this.state.end - 86400000)}
			/>
		);
	}
	
	showDateTimePickerStart = () => {
		this.setState({isDateTimePickerVisible: true});
	  };
	
	hideDateTimePickerStart = () => {
	  	this.setState({isDateTimePickerVisible: false});
	};
	
	handleDatePickedStart = date => {
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		month = month < 10  ? ("0" + month) : month;
		let day = date.getDate();
		day = day < 10 ? ("0" + day) : day;
		this.hideDateTimePickerStart();
		let time = year + "-" + month + "-" + day;
		
		this.setState({startTime: moment(date).format("YYYY-DD-MM HH:mm"), start: new Date(date).getTime()});
	};

	_renderDateEnd() {
		return (
			<DateTimePicker
				isDarkModeEnabled= {this.colorScheme === "dark"}
				isVisible={this.state.isDateTimePickerVisibleEnd}
				onConfirm={this.handleDatePickedEnd}
				onCancel={this.hideDateTimePickerEnd}
				mode="datetime"
				minimumDate={new Date(this.state.start)}
			/>
		);
	}
	
	showDateTimePickerEnd = () => {
		this.setState({isDateTimePickerVisibleEnd: true});
	  };
	
	hideDateTimePickerEnd = () => {
	  	this.setState({isDateTimePickerVisibleEnd: false});
	};
	
	handleDatePickedEnd = date => {
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		month = month < 10  ? ("0" + month) : month;
		let day = date.getDate();
		day = day < 10 ? ("0" + day) : day;
		this.hideDateTimePickerEnd();
		let time = year + "-" + month + "-" + day;
		
		this.setState({endTime: moment(date).format("YYYY-DD-MM HH:mm"), end: new Date(date).getTime()});
	};

	_renderTime = (title = "", onPress = () => {}, value = "") => {
		return (
			<TouchableOpacity style={styles.itemUserContainer} onPress={onPress}>
				<View style={{width: ScreenWidth/4 + 10}}>
					<IAText style={styles.itemUserDisable} text={title}/>
				</View>
				<View style={{width: ScreenWidth - ScreenWidth/4 - 30}}>
					<Text
						style={{width: ScreenWidth - ScreenWidth/4 - 30, fontFamily: fonts.family.nunito.regular, fontSize: 16,paddingTop: 0,
							paddingBottom: 0, textAlign: "right", paddingRight: 10}}>{value}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}

	_renderJobType = (title = "", onPress = () => {}) => {
		return (
			<TouchableOpacity style={styles.itemUserContainer} onPress={onPress}>
				<View style={{width: ScreenWidth/4 + 50}}>
					<IAText style={styles.itemUserDisable} text={title}/>
				</View>
				<View style={{width: ScreenWidth - ScreenWidth/4 - 70}}>
					<Text
						style={{width: ScreenWidth - ScreenWidth/4- 70, fontFamily: fonts.family.nunito.bold, fontSize: 16,paddingTop: 0,
							paddingBottom: 0, textAlign: "right", paddingRight: 10}}>{`${this.state.jobType.replaceAll("_", " ")}`}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}

	_modalJobType = () => {
		return (
			<ReactNativePickerModule
				pickerRef={e => this.jobType = e}
				value={this.state.jobType}
				title={"Which type of job?"}
				items={Constant.JOBTYPE}
				onValueChange={(index) => {
					this.setState({
						jobType: index
					});
				}}/>
		);
	}

	_updateRecurringTime = (index, type = 0) => {
		let data = this.state.recurringTime;
		if (type == 0) {
			data[index].morning = !data[index].morning;
		} else if (type == 1) {
			data[index].afternoon = !data[index].afternoon;
		} else {
			data[index].evening = !data[index].evening;
		}
		this.setState({recurringTime: data});
	}

	_renderRecurringTime() {
		var data = this.state.recurringTime;
		return (
			<View style={{backgroundColor: "#fff",}}>
				<Text style={{marginLeft: 32, fontSize: 16, color: colors.black, opacity: 0.5, fontFamily: fonts.family.nunito.regular}}>Availabilities</Text>
				<View style={{flexDirection: "row", justifyContent: "space-around"}}>
					<View style={{padding: 10,}}>
						<TouchableOpacity disabled style={{backgroundColor: colors.white,  marginBottom: 10, justifyContent: "center", alignItems: "center", width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: colors.black_lightly}}>
							<Text style={{fontSize: 8}}>{"am"}</Text>
						</TouchableOpacity>
						<TouchableOpacity disabled style={{backgroundColor: colors.white,  marginBottom: 10, justifyContent: "center", alignItems: "center", width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: colors.black_lightly}}>
							<Text style={{fontSize: 8}}>{"mid"}</Text>
						</TouchableOpacity>
						<TouchableOpacity disabled style={{backgroundColor: colors.white,  marginBottom: 10, justifyContent: "center", alignItems: "center", width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: colors.black_lightly}}>
							<Text style={{fontSize: 8}}>{"pm"}</Text>
						</TouchableOpacity>
					</View>
					<View style={{padding: 10, width: ScreenWidth * 0.9, paddingTop: 10, paddingBottom: 10, flexDirection: "row", justifyContent: "space-between", borderLeftColor: colors.white, borderRightColor: colors.white,  borderWidth: 1, borderTopColor: colors.white, borderBottomColor: colors.black_lightly}}>
						{data.map((item, index) => {
							return (
								<View key={index} >
									<TouchableOpacity onPress={()=>{
										this._updateRecurringTime(index, 0);
									}} style={{backgroundColor: item.morning ? "#6abd45" : colors.white,  marginBottom: 10, justifyContent: "center", alignItems: "center", width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: colors.black_lightly}}>
										<Text style={{fontSize: 8}}>{item.dateOfWeek.code}</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={()=>{
										this._updateRecurringTime(index, 1);
									}} style={{backgroundColor: item.afternoon ? "#6abd45" : colors.white, marginBottom: 10,justifyContent: "center", alignItems: "center", width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: colors.black_lightly}}>
										<Text style={{fontSize: 8}}>{item.dateOfWeek.code}</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={()=>{
										this._updateRecurringTime(index, 2);
									}} style={{backgroundColor: item.evening ? "#6abd45" : colors.white, marginBottom: 0,justifyContent: "center", alignItems: "center", width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: colors.black_lightly}}>
										<Text style={{fontSize: 8}}>{item.dateOfWeek.code}</Text>
									</TouchableOpacity>
								</View>
							);
						})}
					</View>
				</View>
			</View>
		);
	}

	_modalGender = () => {
		return (
			<ReactNativePickerModule
				pickerRef={e => this.gender = e}
				title={"Gender match your expectation?"}
				items={Constant.GENDER}
				onValueChange={(index) => {
					this.setState({
						gender: index
					});
				}}/>
		);
	}


	render() {
		const {childNumber, childAge, jobTitle} = this.state;
		return(
			<View style={styles.mainContainer}>
				<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
				<View style={{marginTop: 11}}>
					<IAHeader
						style={{backgroundColor: "#fafafb"}}
						viewLeft={this.renderBackButton()}
						onPressLeft={() => {this.goBack();}}
						viewRight={null}
						onPressRight={()=>{}}
						viewCenter={this._renderTitle()}/>
				</View>
				<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
					{this._renderItemUserAddEdit("Address", ()=>{this.goToScreen(ScreenNames.AddressScreen, {_setAdd: this._setAdd.bind(this)});})}
					<IALine color={"#fafafb"} height={10}/>
					{this._renderItemUserEdit("Job title", jobTitle, "jobTitle", true, "default")}
					{this._renderItemUserEdit("Child age", childAge, "childAge", true, "number-pad", 2)}
					{this._renderItemUserEdit("Child num", childNumber, "childNumber", true, "number-pad", 9)}
					<IALine color={"#fafafb"} height={10}/>
					{this._renderOvernight("Overnight", this.state.overNightBooking, ()=>{this.overNightBooking.show();})}
					{this._modalOvernight()}
					{this._renderOvernight("Gender", this.state.gender, ()=>{this.gender.show();})}
					{this._modalGender()}
					<IALine color={"#fafafb"} height={10}/>
					{this._renderTime("Start at", ()=>{this.showDateTimePickerStart();}, this.state.startTime)}
					{this._renderDateStart()}
					{this._renderTime("End at", ()=>{this.showDateTimePickerEnd();}, this.state.endTime)}
					{this._renderDateEnd()}
					<IALine color={"#fafafb"} height={10}/>
					{this._renderJobType("Type of job", ()=>{this.jobType.show();})}
					{this._modalJobType()}
					<IALine color={"#fafafb"} height={10}/>
					{this._renderRecurringTime()}	
					
				</ScrollView>
				
				<TouchableOpacity style={{marginTop: 30, marginBottom: Platform.OS === "ios" && device.isIphoneX() ?  30 : 0, width: "100%", backgroundColor: colors.green,
					 justifyContent: "center", height: 54, alignItems: "center"}} onPress={()=>{this._create();}}>
					<Text style={{fontFamily: fonts.family.nunito.bold, fontSize: 17, color: colors.white}}>Create</Text>
				</TouchableOpacity>
				{this.state.isLoading ? this._renderLoading() : null}
				{this.state.isSuccess ? this._renderSuccess("Job has been created") : null}
			</View>
		);
	}
}
const mapStateToProps = state => {
	return {
		
	};
};
const mapDispatchToProps = dispatch =>
	bindActionCreators({
		
	}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateJobScreen);