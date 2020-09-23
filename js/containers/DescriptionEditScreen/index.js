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
import * as device from "../../shared/utils/device/device";
import IAHeader from "../../shared/components/IAHeader";
import IALine from "../../shared/components/IALine";
import fonts from "../../shared/utils/fonts/fonts";
import {updateDesc} from "../MyBookingProfileScreen/actions";
import {ScreenHeight} from "../../shared/utils/dimension/Divices";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class DescriptionEditScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state = {
			description: ""
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps != this.props ) {			
			if (nextProps.updateDescStatus != this.props.updateDescStatus) {
				if (nextProps.updateDescStatus.isSuccess()) {
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
			<IAText text={"Edit about"} style={styles.title}/>
		);
	}

	_updateDesc  = async () => {
		let userInfo = await IALocalStorage.getUserInfo();
		if (userInfo && userInfo.profileId) {
			this.props.updateDesc({id: userInfo.profileId, description: this.state.description});
		}
	}

	render() {
		const {updateDescStatus} = this.props;
		let isLoading = updateDescStatus.isFetching();
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
						<Text style={{fontSize: 15, fontFamily: fonts.family.nunito.regular}}>Every parent want to hear what you do, who you are, how much your experiences with kids, qualification you got.</Text>
					</View>
					<TextInput multiline={true} style={{marginEnd: 32,
						marginTop: 20,
						paddingLeft: 10, paddingTop: 10,
						marginLeft: 32,  paddingBottom: 0, borderColor: colors.black_lightly, 
						borderWidth: 1, height: ScreenHeight/4, textAlign: "left", textAlignVertical: "top", fontSize: 15,
						fontFamily: fonts.family.nunito.regular}} placeholder="Your description here"
					onChangeText={(val => this.setState({description: val}))}
					value={this.state.description}/>
					
				</KeyboardAwareScrollView>
				<TouchableOpacity style={{marginTop: 30, marginBottom: Platform.OS === "ios" && device.isIphoneX() ?  30 : 0, width: "100%", backgroundColor: colors.green,
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
		updateDescStatus: state.userProfileSitterReducer.updateDesc.status,
		updateDesc: state.userProfileSitterReducer.updateDesc.data,
		updateDescError: state.userProfileSitterReducer.updateDesc.error,
	};
};
const mapDispatchToProps = dispatch =>
	bindActionCreators({
		updateDesc
	}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionEditScreen);