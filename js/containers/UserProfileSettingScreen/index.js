import React from "react";
import {View, ScrollView, Switch, ImageBackground, StatusBar} from "react-native";
import BaseScreen from "../BaseScreen/index";
import {styles} from "./style";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import I18n from "../../shared/utils/locale/i18n";
import IAText from "../../shared/components/IAText";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import Constant from "../../shared/utils/constant/Constant";
import {images} from "../../../assets";
import * as Animatable from "react-native-animatable";
import {colors} from "../../shared/utils/colors/colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import TouchID from "react-native-touch-id";
import IAHeader from "../../shared/components/IAHeader";
import IALine from "../../shared/components/IALine";

const langs = {
	title: I18n.t("userProfileSetting.title"),
	success: I18n.t("success"),
	error: I18n.t("error"),
	loading: I18n.t("loading"),
	touchID: I18n.t("userProfileSetting.touchID"),
	faceID: I18n.t("userProfileSetting.faceID"),
	notSupport: I18n.t("userProfileSetting.notSupport"),
	askEnableTouchID: I18n.t("userProfileSetting.askEnableTouchID"),
	askEnableFaceID: I18n.t("userProfileSetting.askEnableFaceID"),
	askDisableTouchID: I18n.t("userProfileSetting.askDisableTouchID"),
	askDisableFaceID: I18n.t("userProfileSetting.askDisableFaceID"),
	askTitle: I18n.t("userProfileSetting.askTitle"),
	updateSuccess: I18n.t("userProfileSetting.updateSuccess"),
};

class UserProfileSettingScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state = {
			hasTouchId: false,
			hasFaceId: false,
			supportTouchID: false,
			supportFaceID: false,
		};
	}

	addTriggerForScreen() {
		this.props && this.props.navigation.addListener("willFocus", () => { 
			this._checkSecurities();
		});
	}

	async _checkSecurities() {
		// Touch ID
		const hasTouchID = await IALocalStorage.getTouchID();
		console.log(hasTouchID);
		this.setState({hasTouchId: hasTouchID && hasTouchID});
		// Face ID
		const hasFaceID = await IALocalStorage.getFaceID();
		this.setState({hasFaceId: hasFaceID && hasFaceID});
	}

	componentDidMount() {
		this.addTriggerForScreen();
		this.checkTouchFaceId();
	}

	checkTouchFaceId() {
		TouchID.isSupported(Constant.TOUCH_FACE_ID)
			.then(biometryType => {
				console.log("============="+biometryType);
				// Success code
				if (biometryType === "TouchID") {
					this.setState({supportTouchID: true});
					console.log("TouchID is supported.");
				} else {
					if (biometryType === "FaceID") {
						this.setState({supportFaceID: true});
						console.log("FaceID is supported.");
					}
					
				}
			})
			.catch(error => {
				// Failure code
				console.log("===="+error);
			});
	}

	_renderWave = () => {
		return (
			<Animatable.Image animation="pulse" iterationCount="infinite" source={images.wave}
				style={styles.waveContainer}/>
		);
	}

	_alertTouchIdChange = (val) => {
		this.setState({hasTouchId: val});
		this.alertInfo2Options(langs.askTitle, val ?  langs.askEnableTouchID : langs.askDisableTouchID, () => {
			IALocalStorage.setTouchID(val);
			this._showUpdateSuccess();
		}, () => {
			this.setState({hasTouchId: !val});
		});
	}

	_showUpdateSuccess() {
		this.alertInfo(langs.success, langs.updateSuccess);
	}

	_alertFaceIdChange = (val) => {
		this.setState({hasFaceId: val});
		this.alertInfo2Options(langs.askTitle, val ? langs.askEnableFaceID : langs.askDisableFaceID, () => {
			IALocalStorage.setFaceID(val);
			this._showUpdateSuccess();
		}), () => {
			this.setState({hasFaceId: !val});
		};
	}
	
	_renderDisplay() {
		return (
			<View style={{marginEnd: 20, marginLeft: 20, marginTop: 20}}>
				<Animatable.View animation="bounceInLeft" duration={1500} style={styles.itemUserContainer}>
					<View style={styles.securityContainer}>
						<Entypo name="fingerprint" size={25}/>
						<IAText style={styles.itemUserDisable} text={langs.touchID}/>
					</View>
					<View style={{marginEnd: 20}}>
						{this.state.supportTouchID ?
							<Switch thumbColor={colors.white} value={this.state.hasTouchId} onValueChange={(val) => this._alertTouchIdChange(val)}/> : 
							<IAText style={styles.itemUserDisable} text={langs.notSupport}/> }
					</View>
				</Animatable.View>
				<IALine color={colors.black_lightly} height={2}/>
				<Animatable.View animation="bounceInRight" duration={1500} style={styles.itemUserContainer}>
					<View style={styles.securityContainer}>
						<MaterialIcons name="face" size={25}/>
						<IAText style={styles.itemUserDisable} text={langs.faceID}/>
					</View>
					<View style={{marginEnd: 20}}>
						{this.state.supportFaceID ?
							<Switch thumbColor={colors.white} value={this.state.hasFaceId} onValueChange={(val) => this._alertFaceIdChange(val)}/> : 
							<IAText style={styles.itemUserDisable} text={langs.notSupport}/> }
					</View>
				</Animatable.View>
				<IALine color={colors.black_lightly} height={2}/>
			</View>
		);
	}

	_renderInfo() {
		return (
			<View style={{paddingTop: 20}}>
				{this._renderDisplay()}
			</View>
		);
	}

	render() {
		return(
			<View style={styles.mainContainer}>
				<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
				<IAHeader viewLeft={this.renderBackButton(colors.black)}
					styleLeft={styles.headerLeft}
					onPressLeft={()=>this.goBack()}/>
				<View style={{flexDirection: "row", justifyContent: "space-between"}}>
					<IAText text={langs.title.toUpperCase()} style={styles.title}/>
				</View>
				<ScrollView
					contentContainerStyle={{flexGrow: 1}}
					showsVerticalScrollIndicator={false}
					style={{backgroundColor: colors.white}}>
					<View>
						{this._renderInfo()}
					</View>
				</ScrollView>
			</View>
		);
	}
}
const mapStateToProps = state => {
	return {};
};
const mapDispatchToProps = dispatch =>
	bindActionCreators({
	}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileSettingScreen);