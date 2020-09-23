import React from "react";
import {View, Platform, Text, StatusBar, RefreshControl, ActivityIndicator, TextInput, TouchableOpacity} from "react-native";
import BaseScreen from "../BaseScreen/index";
import {styles} from "./style";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import I18n from "../../shared/utils/locale/i18n";
import IAText from "../../shared/components/IAText";
import {images} from "../../../assets";
import {colors} from "../../shared/utils/colors/colors";
import IAHeader from "../../shared/components/IAHeader";
import IALine from "../../shared/components/IALine";
import fonts from "../../shared/utils/fonts/fonts";
import {updateTime} from "../MyBookingProfileScreen/actions";
import AntDesign from "react-native-vector-icons/AntDesign";
import {ScreenHeight} from "../../shared/utils/dimension/Divices";
import * as device from "../../shared/utils/device/device";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import LogManager from "../../shared/utils/logging/LogManager";
import Constant from "../../shared/utils/constant/Constant";

class AvailableTimeScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state = {
			description: "",
			certificates: [],
			morning: [false, false, false, false, false, false, false],
			afternoon: [false, false, false, false, false, false, false],
			evening: [false, false, false, false, false, false, false],
			data : [
				{
					"afternoon": true,
					"dateOfWeek": {
						"code": "SUN",
						"label": "Sunday",
						"recurringAvaibilityId": "string"
					},
					"evening": true,
					"morning": true,
				},
				{
					"afternoon": true,
					"dateOfWeek": {
						"code": "MON",
						"label": "Monday",
						"recurringAvaibilityId": "string"
					},
					"evening": true,
					"morning": true,
				},
				{
					"afternoon": true,
					"dateOfWeek": {
						"code": "TUE",
						"label": "Tuesday",
						"recurringAvaibilityId": "string"
					},
					"evening": true,
					"morning": true,
				},
				{
					"afternoon": true,
					"dateOfWeek": {
						"code": "WED",
						"label": "Wednesday",
						"recurringAvaibilityId": "string"
					},
					"evening": true,
					"morning": true,
				},
				{
					"afternoon": true,
					"dateOfWeek": {
						"code": "THU",
						"label": "Thursday",
						"recurringAvaibilityId": "string"
					},
					"evening": true,
					"morning": true,
				},
				{
					"afternoon": true,
					"dateOfWeek": {
						"code": "FRI",
						"label": "Friday",
						"recurringAvaibilityId": "string"
					},
					"evening": true,
					"morning": true,
				},
				{
					"afternoon": true,
					"dateOfWeek": {
						"code": "SAT",
						"label": "Saturday",
						"recurringAvaibilityId": "string"
					},
					"evening": true,
					"morning": true,
				},
			]
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps != this.props ) {			
			if (nextProps.updateTimeStatus != this.props.updateTimeStatus) {
				if (nextProps.updateTimeStatus.isSuccess()) {
					this.goBack();
				}
			}
		}
	}

	_onRefresh = () => {
		this._getUserInfo();
	}

	_renderSpace = (height = 7) => {
		return (
			<IALine color={colors.black_lightly} height={height}/>
		);
	}

	_renderTitle() {
		return (
			<IAText text={"Edit available time"} style={styles.title}/>
		);
	}

	_updateDesc  = async () => {
		let userInfo = await IALocalStorage.getUserInfo();
		if (userInfo && userInfo.profileId) {
			let i = 0;
			var recurringAvaibilities = this.state.data;
			for (i = 0; i < 7; i++) {
				recurringAvaibilities[i].morning = this.state.morning[i+1];
				recurringAvaibilities[i].afternoon = this.state.afternoon[i+1];
				recurringAvaibilities[i].evening = this.state.evening[i+1];
			}
			this.props.updateTime({id: userInfo.profileId, recurringAvaibilities: recurringAvaibilities});
		}
	}


	_renderGeneralVailableTime() {
		var recurringAvaibilities = this.props.userProfile && this.props.userProfile.recurringAvaibilities || [];

		return (
			<View style={{marginTop: 10}}>				
				<View>
					<View style={{marginLeft: 10, marginEnd: 10, paddingTop: 10, borderColor: colors.black_lightly, borderWidth: 1, borderRadius: 5,}}>
						<View style={{marginBottom: 10, flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10}}>
							{Constant.calendarTime[0].map((item, index) => {
								let filteredObj = this._filterRecurring(recurringAvaibilities, item);
								return (
									<TouchableOpacity key={item + index+ "0mo" } style={{marginRight: 2, height: 38, width: 38, borderRadius: 19,
										borderColor: index != 0 ? colors.blue_dodger : colors.black_seventy, 
										borderWidth: 0.5, justifyContent: "center", alignItems:"center", 
										alignContent: "center", 
										backgroundColor: this.state.morning[index] ? colors.green : colors.white}}
									onPress={()=>{
										if (index !== 0) {
											var a = this.state.morning;
											a[index] = !a[index];
											this.setState({
												morning: a
											});
										}
									}}>
										<Text style={{fontSize: 13, fontFamily: fonts.family.nunito.regular}}>{item.code}</Text>
									</TouchableOpacity>
								);
							})}
						</View>
						<View style={{marginBottom: 10, flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10}}>
							{Constant.calendarTime[1].map((item, index) => {
								let filteredObj = this._filterRecurring(recurringAvaibilities, item);
								return (
									<TouchableOpacity key={item +  index+ "1mo"} style={{height: 38, width: 38, borderRadius: 17,
										borderColor: index != 0 ? colors.blue_dodger : colors.black_seventy, 
										borderWidth: 0.5, justifyContent: "center", alignItems:"center", 
										alignContent: "center",
										backgroundColor: this.state.afternoon[index] ? colors.green : colors.white}}
									onPress={()=>{
										if (index !== 0) {
											var a = this.state.afternoon;
											a[index] = !a[index];
											this.setState({
												afternoon: a
											});
										}
									}}>
										<Text style={{fontSize: 13, fontFamily: fonts.family.nunito.regular}}>{item.code}</Text>
									</TouchableOpacity>
								);
							})}
						</View>
						<View style={{marginBottom: 10, flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10}}>
							{Constant.calendarTime[2].map((item, index) => {
								let filteredObj = this._filterRecurring(recurringAvaibilities, item);
								return (
									<TouchableOpacity key={item + index+  "2mo"} style={{height: 38, width: 38, borderRadius: 19,
										borderColor: index != 0 ? colors.blue_dodger : colors.black_seventy, borderWidth: 0.5, 
										justifyContent: "center", alignItems:"center", alignContent: "center",
										backgroundColor: this.state.evening[index] ? colors.green : colors.white}}
									onPress={()=>{
										if (index !== 0) {
											var a = this.state.evening;
											a[index] = !a[index];
											this.setState({
												evening: a
											});
										}
									}}>
										<Text style={{fontSize: 13, fontFamily: fonts.family.nunito.regular}}>{item.code}</Text>
									</TouchableOpacity>
								);
							})}
						</View>
					</View>
				</View>
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

	render() {
		const {updateTimeStatus} = this.props;
		let isLoading = updateTimeStatus.isFetching();
		return(
			<View style={styles.mainContainer}>
				<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
				<IAHeader viewLeft={this.renderBackButton()}
					viewRight={null}
					viewCenter={this._renderTitle()}
					styleLeft={styles.headerLeft}
					styleRight={{marginBottom: 10}}
					onPressRight={()=>{}}
					onPressLeft={()=>{this.goBack();}}/>
				<KeyboardAwareScrollView
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={false}
							onRefresh={()=>this._onRefresh()}
						/>
					}>
					<IALine color={colors.black_lightly}/>
					<View style={styles.contentContainer}>
						<Text style={{fontSize: 17, fontFamily: fonts.family.nunito.bold}}>This might help you be a great babysitter</Text>
						<Text style={{fontSize: 15, fontFamily: fonts.family.nunito.regular}}>Let us know what is your available time</Text>
					</View>
					{this._renderGeneralVailableTime()}
					
				</KeyboardAwareScrollView>
				<TouchableOpacity style={{marginBottom: Platform.OS === "ios" && device.isIphoneX() ?  30 : 0, width: "100%", backgroundColor: colors.green,
					 justifyContent: "center", height: 54, alignItems: "center"}} onPress={()=>this._updateDesc()}>
					<Text style={{fontFamily: fonts.family.nunito.bold, fontSize: 17, color: colors.white}}>Save</Text>
				</TouchableOpacity>
				{isLoading ? 
					<View style={{backgroundColor: colors.black_lightly, opacity: 0.3, position: "absolute", flex: 1, width: "100%", height: "100%", justifyContent: "center", alignContent: "center"}}>
					 <ActivityIndicator size="small" color="#000000" /> 
					</View> : null}
			</View>
		);
	}
}
// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => {
	return {
		updateTimeStatus: state.userProfileSitterReducer.updateTime.status,
		updateTime: state.userProfileSitterReducer.updateTime.data,
		updateTimeError: state.userProfileSitterReducer.updateTime.error,
	};
};
const mapDispatchToProps = dispatch =>
	bindActionCreators({
		updateTime
	}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AvailableTimeScreen);