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
import {updateRates} from "../MyBookingProfileScreen/actions";
import * as device from "../../shared/utils/device/device";
import {ScreenHeight} from "../../shared/utils/dimension/Divices";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import ReactNativePickerModule from "react-native-picker-module";
import Constant from "../../shared/utils/constant/Constant";

class BabySittingRateScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state = {
			one: 0,
			two: 0,
			three: 0,
			four: 0
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps != this.props ) {			
			if (nextProps.updateRateStatus != this.props.updateRateStatus) {
				if (nextProps.updateRateStatus.isSuccess()) {
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
			<IAText text={"Edit your babysitting rates"} style={styles.title}/>
		);
	}

	_updateRates  = async () => {
		let userInfo = await IALocalStorage.getUserInfo();
		if (userInfo && userInfo.profileId) {
			let ratePerHourForNumberOfChilds = {};
			ratePerHourForNumberOfChilds["ONE_CHILD"] = this.state.one;
			ratePerHourForNumberOfChilds["TWO_CHILDS"] = this.state.two;
			ratePerHourForNumberOfChilds["THREE_CHILDS"] = this.state.three;
			ratePerHourForNumberOfChilds["FOUR_CHILDS"] = this.state.four;
			this.props.updateRates({id: userInfo.profileId, ratePerHourForNumberOfChilds: ratePerHourForNumberOfChilds});
		}
	}

	render() {
		const {updateRateStatus} = this.props;
		let isLoading = updateRateStatus.isFetching();
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
					showsVerticalScrollIndicator={false}>
					<IALine color={colors.black_lightly}/>
					<View style={styles.contentContainer}>
						<Text style={{fontSize: 19, fontFamily: fonts.family.nunito.bold}}>Let us know your hourly rates!</Text>
						<Text style={{fontSize: 15, fontFamily: fonts.family.nunito.regular}}>It will help us to find if you match the average range.</Text>
					</View>
					<View style={[styles.contentContainer, {marginTop: 20,}]}>
						<Text style={{fontSize: 16, fontFamily: fonts.family.nunito.regular, marginBottom: 20}}>HOURLY RATES</Text>
						<IALine color={colors.black_lightly}/>
						<TouchableOpacity style={{height: 54, justifyContent: "center"}} onPress={()=>this.one.show()}>
							<View style={{flexDirection: "row", justifyContent: "space-between"}}>
								<Text style={{fontSize: 16, fontFamily: fonts.family.nunito.regular}}>One child</Text>
								<Text>{`$${this.state.one}`}</Text>
							</View>
						</TouchableOpacity>
						<IALine color={colors.black_lightly}/>
						<TouchableOpacity style={{height: 54, justifyContent: "center"}} onPress={()=>this.two.show()}>
							<View style={{flexDirection: "row", justifyContent: "space-between"}}>
								<Text style={{fontSize: 16, fontFamily: fonts.family.nunito.regular}}>Two childs</Text>
								<Text>{`$${this.state.two}`}</Text>
							</View>
						</TouchableOpacity>
						<IALine color={colors.black_lightly}/>
						<TouchableOpacity style={{height: 54, justifyContent: "center"}} onPress={()=>this.three.show()}>
							<View style={{flexDirection: "row", justifyContent: "space-between"}}>
								<Text style={{fontSize: 16, fontFamily: fonts.family.nunito.regular}}>Three childs</Text>
								<Text>{`$${this.state.three}`}</Text>
							</View>
						</TouchableOpacity>
						<IALine color={colors.black_lightly}/>
						<TouchableOpacity style={{height: 54, justifyContent: "center"}} onPress={()=>this.four.show()}>
							<View style={{flexDirection: "row", justifyContent: "space-between"}}>
								<Text style={{fontSize: 16, fontFamily: fonts.family.nunito.regular}}>Four childs</Text>
								<Text>{`$${this.state.four}`}</Text>
							</View>
						</TouchableOpacity>
						<IALine color={colors.black_lightly}/>
					</View>	
				</KeyboardAwareScrollView>
				<TouchableOpacity style={{marginTop: 30,  marginBottom: Platform.OS === "ios" && device.isIphoneX() ?  30 : 0, width: "100%", backgroundColor: colors.green,
					 justifyContent: "center", height: 54, alignItems: "center"}} onPress={()=>this._updateRates()}>
					<Text style={{fontFamily: fonts.family.nunito.bold, fontSize: 17, color: colors.white}}>Save</Text>
				</TouchableOpacity>	
				<ReactNativePickerModule
					pickerRef={e => this.one = e}
					value={this.state.one}
					title={"Select a value"}
					items={Constant.NUMs}
					onValueChange={(index) => {
						this.setState({
							one: index
						});
					}}/>
				<ReactNativePickerModule
					pickerRef={e => this.two = e}
					value={this.state.two}
					title={"Select a value"}
					items={Constant.NUMs}
					onValueChange={(index) => {
						this.setState({
							two: index
						});
					}}/>
				<ReactNativePickerModule
					pickerRef={e => this.three = e}
					value={this.state.three}
					title={"Select a value"}
					items={Constant.NUMs}
					onValueChange={(index) => {
						this.setState({
							three: index
						});
					}}/>
				<ReactNativePickerModule
					pickerRef={e => this.four = e}
					value={this.state.four}
					title={"Select a value"}
					items={Constant.NUMs}
					onValueChange={(index) => {
						this.setState({
							four: index
						});
					}}/>
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
		updateRateStatus: state.userProfileSitterReducer.updateRate.status,
		updateRate: state.userProfileSitterReducer.updateRate.data,
		updateRateError: state.userProfileSitterReducer.updateRate.error,
	};
};
const mapDispatchToProps = dispatch =>
	bindActionCreators({
		updateRates
	}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BabySittingRateScreen);