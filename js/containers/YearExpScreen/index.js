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
import {updateYOE} from "../MyBookingProfileScreen/actions";
import {ScreenHeight} from "../../shared/utils/dimension/Divices";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import ReactNativePickerModule from "react-native-picker-module";
import * as device from "../../shared/utils/device/device";
import Constant from "../../shared/utils/constant/Constant";

class YearExpScreen extends BaseScreen {
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
			if (nextProps.updateYoeStatus != this.props.updateYoeStatus) {
				if (nextProps.updateYoeStatus.isSuccess()) {
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
			<IAText text={"Edit your year of experiences"} style={styles.title}/>
		);
	}

	_updateYoe  = async () => {
		let userInfo = await IALocalStorage.getUserInfo();
		if (userInfo && userInfo.profileId) {
			let experiences = {};
			experiences["INFANTS"] = this.state.one;
			experiences["TODDLERS"] = this.state.two;
			experiences["SCHOOL_AGE"] = this.state.three;
			this.props.updateYOE({id: userInfo.profileId, experiences: experiences});
		}
	}

	render() {
		const {updateYoeStatus} = this.props;
		let isLoading = updateYoeStatus.isFetching();
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
					<View style={[styles.contentContainer, {marginTop: 20,}]}>
						<Text style={{fontSize: 16, fontFamily: fonts.family.nunito.regular, marginBottom: 20}}>YEARS OF EXPERIENCES</Text>
						<IALine color={colors.black_lightly}/>
						<TouchableOpacity style={{height: 54, justifyContent: "center"}} onPress={()=>this.one.show()}>
							<View style={{flexDirection: "row", justifyContent: "space-between"}}>
								<Text style={{fontSize: 16, fontFamily: fonts.family.nunito.regular}}>Infant experiences (under 1)</Text>
								<Text>{`${this.state.one}`}</Text>
							</View>
						</TouchableOpacity>
						<IALine color={colors.black_lightly}/>
						<TouchableOpacity style={{height: 54, justifyContent: "center"}} onPress={()=>this.two.show()}>
							<View style={{flexDirection: "row", justifyContent: "space-between"}}>
								<Text style={{fontSize: 16, fontFamily: fonts.family.nunito.regular}}>Toddlers experiences (1 - 3)</Text>
								<Text>{`${this.state.two}`}</Text>
							</View>
						</TouchableOpacity>
						<IALine color={colors.black_lightly}/>
						<TouchableOpacity style={{height: 54, justifyContent: "center"}} onPress={()=>this.three.show()}>
							<View style={{flexDirection: "row", justifyContent: "space-between"}}>
								<Text style={{fontSize: 16, fontFamily: fonts.family.nunito.regular}}>School age experiences (4+)</Text>
								<Text>{`${this.state.three}`}</Text>
							</View>
						</TouchableOpacity>
						<IALine color={colors.black_lightly}/>
					</View>	
				</KeyboardAwareScrollView>
				<TouchableOpacity style={{marginTop: 30,  marginBottom: Platform.OS === "ios" && device.isIphoneX() ?  30 : 0, width: "100%", backgroundColor: colors.green,
					 justifyContent: "center", height: 54, alignItems: "center"}} onPress={()=>this._updateYoe()}>
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
		updateYoeStatus: state.userProfileSitterReducer.updateYoe.status,
		updateYoe: state.userProfileSitterReducer.updateYoe.data,
		updateYoeError: state.userProfileSitterReducer.updateYoe.error,
	};
};
const mapDispatchToProps = dispatch =>
	bindActionCreators({
		updateYOE
	}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(YearExpScreen);