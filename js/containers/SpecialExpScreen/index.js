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
import {updateSpecialYOE} from "../MyBookingProfileScreen/actions";
import {ScreenHeight} from "../../shared/utils/dimension/Divices";
import * as device from "../../shared/utils/device/device";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import LogManager from "../../shared/utils/logging/LogManager";

const data = [
	"ADD", "DIABETES", "OBSESSIVE_COMPULSIVE_DISORDER", "SLEEP_DISORDERS", "DEVELOPMENTALLY_CHALLENGED",
	 "DOWN_SYNDROME", "HEMOPHILIA", "TOURETTE_SYNDROME", "ASTHMA", "ASPERGER_SYNDROME_AUTISM", "PHYSICALLY_CHALLENGED", 
	 "FOOD_ALLERGIES", "ADHD", "VISUAL_IMPAIRMENT", "BEHAVIOR_CHALLENGES", "DEAF_AND_HARD_OF_HEARING", "EPILEPSY"
]

class SpecialExpScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state = {
			description: "",
			specialExperiences: [],
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps != this.props ) {			
			if (nextProps.updateSpecialYoeStatus != this.props.updateSpecialYoeStatus) {
				if (nextProps.updateSpecialYoeStatus.isSuccess()) {
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
			<IAText text={"Edit special experience"} style={styles.title}/>
		);
	}

	_updateDesc  = async () => {
		let userInfo = await IALocalStorage.getUserInfo();
		if (userInfo && userInfo.profileId) {
			this.props.updateSpecialYOE({id: userInfo.profileId, specialExperiences: this.state.specialExperiences});
		}
	}

	render() {
		const {updateSpecialYoeStatus} = this.props;
		let isLoading = updateSpecialYoeStatus.isFetching();
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
						<Text style={{fontSize: 15, fontFamily: fonts.family.nunito.regular}}>Let us know what is your special experiences</Text>
					</View>
					<View style={{marginLeft: 20, marginEnd: 20,}}>
						{data.map((item, index) => {
							return (
								<TouchableOpacity key={index} style={{backgroundColor: this.state.specialExperiences.find(val => item == val) != undefined ? colors.green : colors.black_lightly, flexWrap: "wrap", marginEnd: 5, marginTop: 10, borderRadius: 15, borderWidth: 0.5, paddingBottom: 5, paddingEnd: 10, paddingStart: 10, paddingTop: 5}} 
									onPress={()=>{
										if (this.state.specialExperiences.find(val => item == val) != undefined) {
											this.setState({
												specialExperiences: this.state.specialExperiences.filter(val => val != item)
											});
										} else {
											this.setState({
												specialExperiences: [...this.state.specialExperiences, item]
											});
										}
										
									}}>
									<Text>{item}</Text>
								</TouchableOpacity>
							);
						})}
					</View>
					
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
		updateSpecialYoeStatus: state.userProfileSitterReducer.updateSpecialYoe.status,
		updateSpecialYoeF: state.userProfileSitterReducer.updateSpecialYoe.data,
		updateSpecialYoeError: state.userProfileSitterReducer.updateSpecialYoe.error,
	};
};
const mapDispatchToProps = dispatch =>
	bindActionCreators({
		updateSpecialYOE
	}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SpecialExpScreen);