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
import ModalDropdown from "react-native-modal-dropdown";
import ReactNativePickerModule from "react-native-picker-module";
import DateTimePicker from "react-native-modal-datetime-picker";
import LottieView from "lottie-react-native";
import {ScreenNames} from "../../route/ScreenNames";
import Constant from "../../shared/utils/constant/Constant";
import IALine from "../../shared/components/IALine";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import {AlertHelper} from "../../shared/utils/AlertHelper";
var moment = require("moment-timezone");

const STATUSES_UPDATE = ["DONE", "CANCEL_BY_PARENT"];
const STATUSES = ["Done", "Cancel"];
const STATUSES_1 = ["Cancel"];
const STATUSES_UPDATE_1 = ["CANCEL_BY_PARENT"];

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
			start: 0,
			startTime: moment().format("YYYY-DD-MM HH:mm"),
			end: 0,
			endTime: moment().format("YYYY-DD-MM HH:mm"),
			jobType: "PART_TIME",
			recurringTime: Constant.RECURRING_AVAILABLE_TIME,
		};
		this.colorScheme = Appearance.getColorScheme();
	}

	addTriggerForScreen() {
		this.focusListener = this.props && this.props.navigation.addListener("willFocus", () => {
			const jobDetail = this.props.navigation.state.params.data;
			console.log(LogManager.parseJsonObjectToJsonString(this.props.navigation.state.params.data));
			this.setState({
				jobTitle: jobDetail.jobTitle,
				address: jobDetail.address,
				userName: "",
				childAge: jobDetail.childAge + "",
				childNumber: jobDetail.numOfChild + "",
				overNightBooking: jobDetail.overNightBooking ? "Yes" : "No",
				gender: jobDetail.gender,
				ratePerHours: 10,
				isDateTimePickerVisible: false,
				isDateTimePickerVisibleEnd: false,
				start: 0,
				startTime: moment(jobDetail.startAt).format("YYYY-DD-MM HH:mm"),
				end: 0,
				endTime: moment(jobDetail.endAt).format("YYYY-DD-MM HH:mm"),
				jobType: jobDetail.jobType,
				recurringTime: jobDetail.recurringAvaibilities,
			});
		});
	}

	componentDidMount() {
		this.addTriggerForScreen();
	}

	componentWillUnmount() {
		this.focusListener.remove();
	}

	// async _create() {
	// 	let userInfo = await IALocalStorage.getUserInfo();
	// 	let body = {
	// 		address: this.state.address,
	// 		childAge: this.state.childAge,
	// 		endAt: this.state.end,
	// 		jobType: this.state.jobType,
	// 		numOfChild: this.state.childNumber,
	// 		gender: this.state.gender,
	// 		parentId: userInfo.profileId,
	// 		overnightBooking: this.state.overNightBooking === "Yes",
	// 		recurringAvaibilities: this.state.recurringTime,
	// 		startAt: this.state.start,
	// 		jobTitle: this.state.jobTitle
	// 	};
	// 	this.setState({isLoading: true});
	// 	AxiosFetch({
	// 		method: "POST",
	// 		url: "/api/job/save",
	// 		contentType: "application/json",
	// 		data: body,
	// 		onSuccess: data => {
	// 			this.setState({
	// 				isLoading: false,
	// 				isSuccess: true
	// 			}, () => {
	// 				console.log("=========" +LogManager.parseJsonObjectToJsonString(data));	
	// 				// this.alertInfo("Success", "Job has been created!", ()=>this.goBack());
	// 				setTimeout(() => {
	// 					this.goBack();
	// 				}, 2000);
	// 			});
	// 			this.setState({isLoading: false, isSuccess: true});
	// 		},
	// 		onError: error => {
	// 			this.setState({isLoading: false}, ()=> {
	// 				this.alertInfo("Error while creating job", error.message, ()=>this.goBack());
	// 			});
	// 			console.log("=========1" +LogManager.parseJsonObjectToJsonString(error));	
	// 		},
	// 		hasToken: true
	// 	});
	// }

	_renderTitle() {
		return (
			<IAText text={"Job detail"} style={styles.title} />
		);
	}

	_renderItemUserEdit = (title = "", text = "", keyTextChange = "", editable = true, keyboardType = "default", maxLength = 100000) => {
		return (
			<Animatable.View animation="bounceInLeft" style={styles.itemUserContainer}>
				<View style={{width: ScreenWidth / 4}}>
					<IAText style={styles.itemUserDisable} text={title} />
				</View>
				<View style={{width: ScreenWidth - ScreenWidth / 4 - 20,}}>
					<TextInput
						editable={editable}
						style={{
							width: ScreenWidth - ScreenWidth / 4 - 30, fontFamily: fonts.family.nunito.regular, fontSize: 17, paddingTop: 0, paddingBottom: 0,
							marginRight: 10, color: editable ? colors.black : colors.black_lessy, textAlign: "right"
						}}
						value={text}
						maxLength={maxLength}
						returnKeyType="next"
						keyboardType={keyboardType}
						onChangeText={(text) => this.setState({[keyTextChange]: text})} />
				</View>
			</Animatable.View>

		);
	}

	_renderItemUserAddEdit = (title = "", onPress = () => { }) => {
		return (
			<TouchableOpacity style={styles.itemUserContainer} onPress={onPress}>
				<View style={{width: ScreenWidth / 4}}>
					<IAText style={styles.itemUserDisable} text={title} />
				</View>
				<View style={{width: ScreenWidth - ScreenWidth / 4 - 20, alignItems: "flex-start", alignContent: "flex-end", alignSelf: "flex-end", justifyContent: "flex-end"}}>
					<Text
						style={{
							width: ScreenWidth - ScreenWidth / 4 - 20, fontFamily: fonts.family.nunito.regular, fontSize: 16, paddingTop: 0,
							paddingBottom: 0, textAlign: "right", paddingRight: 10
						}}>{this.state.address}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}

	_renderOvernight = (title = "", value, onPress = () => { }) => {
		return (
			<TouchableOpacity style={styles.itemUserContainer} onPress={onPress}>
				<View style={{width: ScreenWidth / 4 + 10}}>
					<IAText style={styles.itemUserDisable} text={title} />
				</View>
				<View style={{width: ScreenWidth - ScreenWidth / 4 - 30}}>
					<Text
						style={{
							width: ScreenWidth - ScreenWidth / 4 - 30, fontFamily: fonts.family.nunito.regular, fontSize: 16, paddingTop: 0,
							paddingBottom: 0, textAlign: "right", paddingRight: 10
						}}>{value}
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
				}} />
		);
	}

	_renderRatePerHours = (title = "", onPress = () => { }) => {
		return (
			<TouchableOpacity style={styles.itemUserContainer} onPress={onPress}>
				<View style={{width: ScreenWidth / 4 + 50}}>
					<IAText style={styles.itemUserDisable} text={title} />
				</View>
				<View style={{width: ScreenWidth - ScreenWidth / 4 - 70}}>
					<Text
						style={{
							width: ScreenWidth - ScreenWidth / 4 - 70, fontFamily: fonts.family.nunito.bold, fontSize: 16, paddingTop: 0,
							paddingBottom: 0, textAlign: "right", paddingRight: 10
						}}>{`$${this.state.ratePerHours}`}
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
				}} />
		);
	}

	_setAdd = (add) => {
		this.setState({address: add}, () => {
		});
	}

	_renderDateStart() {
		return (
			<DateTimePicker
				isDarkModeEnabled={this.colorScheme === "dark"}
				isVisible={this.state.isDateTimePickerVisible}
				onConfirm={this.handleDatePickedStart}
				onCancel={this.hideDateTimePickerStart}
				mode="datetime"
				minimumDate={new Date()}
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
		month = month < 10 ? ("0" + month) : month;
		let day = date.getDate();
		day = day < 10 ? ("0" + day) : day;
		this.hideDateTimePickerStart();
		let time = year + "-" + month + "-" + day;

		this.setState({startTime: moment(date).format("YYYY-DD-MM HH:mm"), start: new Date(year, month - 1, day).getTime()});
	};

	_renderDateEnd() {
		return (
			<DateTimePicker
				isDarkModeEnabled={this.colorScheme === "dark"}
				isVisible={this.state.isDateTimePickerVisibleEnd}
				onConfirm={this.handleDatePickedEnd}
				onCancel={this.hideDateTimePickerEnd}
				mode="datetime"
				minimumDate={new Date()}
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
		month = month < 10 ? ("0" + month) : month;
		let day = date.getDate();
		day = day < 10 ? ("0" + day) : day;
		this.hideDateTimePickerEnd();
		let time = year + "-" + month + "-" + day;

		this.setState({endTime: moment(date).format("YYYY-DD-MM HH:mm"), end: new Date(year, month - 1, day).getTime()});
	};

	_renderTime = (title = "", onPress = () => { }, value = "") => {
		return (
			<TouchableOpacity style={styles.itemUserContainer} onPress={onPress}>
				<View style={{width: ScreenWidth / 4 + 10}}>
					<IAText style={styles.itemUserDisable} text={title} />
				</View>
				<View style={{width: ScreenWidth - ScreenWidth / 4 - 30}}>
					<Text
						style={{
							width: ScreenWidth - ScreenWidth / 4 - 30, fontFamily: fonts.family.nunito.regular, fontSize: 16, paddingTop: 0,
							paddingBottom: 0, textAlign: "right", paddingRight: 10
						}}>{value}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}

	_renderJobType = (title = "", onPress = () => { }) => {
		return (
			<TouchableOpacity style={styles.itemUserContainer} onPress={onPress}>
				<View style={{width: ScreenWidth / 4 + 50}}>
					<IAText style={styles.itemUserDisable} text={title} />
				</View>
				<View style={{width: ScreenWidth - ScreenWidth / 4 - 70}}>
					<Text
						style={{
							width: ScreenWidth - ScreenWidth / 4 - 70, fontFamily: fonts.family.nunito.bold, fontSize: 16, paddingTop: 0,
							paddingBottom: 0, textAlign: "right", paddingRight: 10
						}}>{`${this.state.jobType.replaceAll("_", " ")}`}
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
				}} />
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
						<TouchableOpacity disabled style={{backgroundColor: colors.white, marginBottom: 10, justifyContent: "center", alignItems: "center", width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: colors.black_lightly}}>
							<Text style={{fontSize: 8}}>{"am"}</Text>
						</TouchableOpacity>
						<TouchableOpacity disabled style={{backgroundColor: colors.white, marginBottom: 10, justifyContent: "center", alignItems: "center", width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: colors.black_lightly}}>
							<Text style={{fontSize: 8}}>{"mid"}</Text>
						</TouchableOpacity>
						<TouchableOpacity disabled style={{backgroundColor: colors.white, marginBottom: 10, justifyContent: "center", alignItems: "center", width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: colors.black_lightly}}>
							<Text style={{fontSize: 8}}>{"pm"}</Text>
						</TouchableOpacity>
					</View>
					<View style={{padding: 10, width: ScreenWidth * 0.9, paddingTop: 10, paddingBottom: 10, flexDirection: "row", justifyContent: "space-between", borderLeftColor: colors.white, borderRightColor: colors.white, borderWidth: 1, borderTopColor: colors.white, borderBottomColor: colors.black_lightly}}>
						{data.map((item, index) => {
							return (
								<View key={index} >
									<TouchableOpacity onPress={() => {
										this._updateRecurringTime(index, 0);
									}} style={{backgroundColor: item && item.morning ? "#6abd45" : colors.white, marginBottom: 10, justifyContent: "center", alignItems: "center", width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: colors.black_lightly}}>
										<Text style={{fontSize: 8}}>{item && item.dateOfWeek.code}</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={() => {
										this._updateRecurringTime(index, 1);
									}} style={{backgroundColor: item && item.afternoon ? "#6abd45" : colors.white, marginBottom: 10, justifyContent: "center", alignItems: "center", width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: colors.black_lightly}}>
										<Text style={{fontSize: 8}}>{item && item.dateOfWeek.code}</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={() => {
										this._updateRecurringTime(index, 2);
									}} style={{backgroundColor: item && item.evening ? "#6abd45" : colors.white, marginBottom: 0, justifyContent: "center", alignItems: "center", width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: colors.black_lightly}}>
										<Text style={{fontSize: 8}}>{item && item.dateOfWeek.code}</Text>
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
				value={this.state.gender}
				title={"Gender match your expectation?"}
				items={Constant.GENDER}
				onValueChange={(index) => {
					this.setState({
						gender: index
					});
				}} />
		);
	}




	_renderTick = () => {
		// if (this.props.navigation.state.params.data.jobStatus !== "DONE" &&
		// 	this.props.navigation.state.params.data.jobStatus !== "REJECTED" &&
		// 	(
		// 		this.props.navigation.state.params.data.sitterId && this.props.navigation.state.params.data.sitterId !== null
		// 	)) {
		// 	return (<ModalDropdown defaultValue={"Update"} options={STATUSES}
		// 		onSelect={(idx, value) => this._confirmJob(STATUSES_UPDATE[idx])}>

		// 	</ModalDropdown>);
		// } else if (this.props.navigation.state.params.data.jobStatus !== "CANCEL_BY_PARENT") {
		// 	return (<ModalDropdown defaultValue={"Update"} options={STATUSES_1}
		// 		onSelect={(idx, value) => this._confirmJob(STATUSES_UPDATE_1[idx])}>

		// 	</ModalDropdown>);
		// } else {
		// 	return null;
		// }
		if (this.props.navigation.state.params.data.jobStatus !== "DONE" &&
			this.props.navigation.state.params.data.jobStatus !== "REJECTED" &&
			this.props.navigation.state.params.data.jobStatus !== "CANCEL_BY_PARENT" 
			// (
		// this.props.navigation.state.params.data.sitterId && this.props.navigation.state.params.data.sitterId !== null
			// )
		) 
		{
			return (<Text>Update</Text>);
		} return null;
	}
	//WORKING, DONE, IN_PROGRESS, CREATED, BOOKING, PROCCESSING, CONFIRMED_BY_SITTER, REJECTED, PROCCESSED, CONFIRMED_BY_ADMIN
	_confirmJob = async (status) => {
		if ((this.props.navigation.state.params.data.jobStatus !== "WORKING" || 
		this.props.navigation.state.params.data.jobStatus !== "DONE") && 
		(!this.state.sitter && !this.props.navigation.state.params.data.sitterId)) {
			AlertHelper.showError("Warning", "This job currently have not sitter for starting working. Please choose sitter and assign her/him before update another one else");
			return;
		} 
		if (this.props.navigation.state.params.data.jobStatus !== "CONFIRMED_BY_ADMIN" ||
			this.props.navigation.state.params.data.jobStatus !== "REJECTED" ||
			this.props.navigation.state.params.data.jobStatus !== "DONE") {
			// console.log(LogManager.parseJsonObjectToJsonString(this.props.navigation.state.params.data));
			this.setState({isLoading: true});
			let token = await IALocalStorage.getUserInfo();
			AxiosFetch({
				method: "PUT",
				url: "api/job/" + this.props.navigation.state.params.data.id + "/status/update",
				data: {
					"adminId": token.id,
					"jobId": this.props.navigation.state.params.data.id,
					"jobStatus": status,
					"sitterId": this.props.navigation.state.params.data.sitterId || null,
					"parentId": this.props.navigation.state.params.data.parentId,
				},
				contentType: "application/json",
				onSuccess: data => {
					AlertHelper.showSuccess("Success", "Job status has been updated");
					console.log(LogManager.parseJsonObjectToJsonString(data));
					this.setState({
						isLoading: false,
					}, () => {
					});
					setTimeout(() => {
						this.goBack();

					}, 1000);
				},
				onError: error => {
					AlertHelper.showError("Error", error.message);
					this.setState({isLoading: false});
				},
				hasToken: true
			});
		}
	}

	_renderSitter() {
		if (!this.props.navigation.state.params.data.sitterId && !this.props.navigation.state.params.data.sitterName) {
			return null;
		}
		return (
			<View style={[
				{
					backgroundColor: "#fff", flex: 1, marginRight: 15, marginLeft: 15,
					marginBottom: 10,
					padding: 10, borderRadius: 8, borderColor: colors.black_twenty, borderWidth: 1
				},]}>
				<Text>Sitter chosen:</Text>
				<View style={[
					{
						backgroundColor: "#fff",
						marginBottom: 10, flexDirection: "row", justifyContent: "space-between"
					}]}>
					<View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignContent: "center"}}>
						<View style={{width: ScreenWidth , flexDirection: "row", justifyContent: "flex-start", alignItems: "center", alignContent: "center"}}>
							{this.props.navigation.state.params.data.sitterAvatar ?
								<Image style={{width: 34, height: 34, borderRadius: 17, borderWidth: 0.5, borderColor: colors.black_seventy}} source={{uri: this.props.navigation.state.params.data.sitterAvatar}} />
								:
								<Image style={{width: 34, height: 34, borderRadius: 17}} source={images.mother} />
							}
							<View style={{marginLeft: 5, width: ScreenWidth}}>
								<Text numberOfLines={1} ellipsizeMode="tail" style={{marginTop: 10, width: ScreenWidth / 2, fontSize: 14, fontWeight: "600", color: colors.black_seventy}}>{this.props.navigation.state.params.data.sitterName || "Undefined"}</Text>
								<Text numberOfLines={1} ellipsizeMode="tail" style={{marginTop: 10, width: ScreenWidth / 2, fontSize: 14, fontWeight: "600", color: colors.black_seventy}}>{`Sitter id: ${this.props.navigation.state.params.data.sitterId || "Undefined"}`}</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	}

	render() {
		const {childNumber, childAge, jobTitle} = this.state;
		return (
			<View style={styles.mainContainer}>
				<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
				<View style={{marginTop: 11}}>
					<IAHeader
						style={{backgroundColor: "#fafafb"}}
						viewLeft={this.renderBackButton()}
						onPressLeft={() => { this.goBack(); }}
						viewRight={this._renderTick()}
						onPressRight={() => { this.updateStatus.show();}}
						viewCenter={this._renderTitle()} />
				</View>
				<ScrollView contentContainerStyle={[styles.content, {
					opacity: this.props.navigation.state.params.data.jobStatus !== "DONE" &&
						this.props.navigation.state.params.data.jobStatus !== "REJECTED" ? 1 : 0.5
				}]} showsVerticalScrollIndicator={false}>
					<Text style={{marginLeft: 28, color: this.props.navigation.state.params.data.jobStatus !== "DONE" && this.props.navigation.state.params.data.jobStatus !== "REJECTED" && this.props.navigation.state.params.data.jobStatus !== "CANCEL_BY_PARENT" ? colors.blue_dodger : (this.props.navigation.state.params.data.jobStatus === "REJECTED" || this.props.navigation.state.params.data.jobStatus === "CANCEL_BY_PARENT") ? colors.red : colors.green, marginBottom: 10, fontFamily: fonts.family.avenir_book.regular, fontSize: 14}}>{`Status: ${this.props.navigation.state.params.data.jobStatus && this.props.navigation.state.params.data.jobStatus.replaceAll("_", " ")}`}</Text>
					{this.props.navigation.state.params.data.jobStatus === "DONE" ? 
					<View>
						<Text style={{marginLeft: 28, color: colors.blue_dodger}}>{`Fee paid: ${this.props.navigation.state.params.data.feeCredit || 0 } credits`}</Text> 
						</View>: null
					}
					{this._renderSitter()}
					{this._renderItemUserAddEdit("Address", () => { this.goToScreen(ScreenNames.AddressScreen, {_setAdd: this._setAdd.bind(this)}); })}
					<IALine color={"#fafafb"} height={10} />
					{this._renderItemUserEdit("Job title", jobTitle, "jobTitle", true, "default")}
					{this._renderItemUserEdit("Child age", childAge, "childAge", true, "number-pad", 2)}
					{this._renderItemUserEdit("Child num", childNumber, "childNumber", true, "number-pad", 9)}
					<IALine color={"#fafafb"} height={10} />
					{this._renderOvernight("Overnight", this.state.overNightBooking, () => { this.overNightBooking.show(); })}
					{this._modalOvernight()}
					{this._renderOvernight("Gender", this.state.gender, () => { this.gender.show(); })}
					{this._modalGender()}
					<IALine color={"#fafafb"} height={10} />
					{this._renderTime("Start at", () => { this.showDateTimePickerStart(); }, this.state.startTime)}
					{this._renderDateStart()}
					{this._renderTime("End at", () => { this.showDateTimePickerEnd(); }, this.state.endTime)}
					{this._renderDateEnd()}
					<IALine color={"#fafafb"} height={10} />
					{this._renderJobType("Type of job", () => { this.jobType.show(); })}
					{this._modalJobType()}
					<IALine color={"#fafafb"} height={10} />
					{this._renderRecurringTime()}
					<ReactNativePickerModule
						pickerRef={e => this.updateStatus = e}
						title={"Update job status"}
						items={STATUSES}
						onValueChange={(value, index) => {
							// if (this.props.navigation.state.params.data.sitterId || this.props.navigation.state.params.data.sitterName || this.props.navigation.state.params.data.sitterAvatar) {
								this._confirmJob(STATUSES_UPDATE[index]);
							// } else {
							// 	this._confirmJob(STATUSES_UPDATE_1[index]);
							// }
						}} />
					{this.props.navigation.state.params.data.jobStatus === "DONE" ?
						<View style={{
							position: "absolute", flex: 1, width: "100%", height: "100%", alignItems: "center", justifyContent: "center", alignContent: "center"
						}}>
							{/* <PacmanIndicator color={colors.blue} size={48}/>  */}
							<LottieView source={require("../../../assets/imgs/done.json")} style={{width: 130, height: 130, alignSelf: "center"}} autoPlay loop={false} />
						</View> : null}
					{this.props.navigation.state.params.data.jobStatus === "REJECTED" || this.props.navigation.state.params.data.jobStatus === "CANCEL_BY_PARENT" ?
						<View style={{
							backgroundColor: "#fff",
							position: "absolute", opacity: 0.4, flex: 1, width: "100%", height: "100%", alignItems: "center", justifyContent: "center", alignContent: "center"
						}}>
							{/* <PacmanIndicator color={colors.blue} size={48}/>  */}
							<LottieView source={require("../../../assets/imgs/reject.json")} style={{width: 130, height: 130, alignSelf: "center"}} autoPlay loop={false} />
						</View> : null}
				</ScrollView>

				{/* <TouchableOpacity style={{marginTop: 30, marginBottom: Platform.OS === "ios" && device.isIphoneX() ?  30 : 0, width: "100%", backgroundColor: colors.green,
					 justifyContent: "center", height: 54, alignItems: "center"}} onPress={()=>{this._create();}}>
					<Text style={{fontFamily: fonts.family.nunito.bold, fontSize: 17, color: colors.white}}>Create</Text>
				</TouchableOpacity> */}
				{this.state.isLoading ? this._renderLoading() : null}
				{/* {this.state.isSuccess ? this._renderSuccess("Job has been created") : null} */}
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