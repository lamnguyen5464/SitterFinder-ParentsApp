import React from "react";
import {View, Text, Switch, TouchableOpacity, StatusBar} from "react-native";
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
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import TouchID from "react-native-touch-id";
import IAHeader from "../../shared/components/IAHeader";
import IALine from "../../shared/components/IALine";
import LinearGradient from "react-native-linear-gradient";
import { ScreenNames } from "../../route/ScreenNames";

const langs = {
	optionsSignup: I18n.t("optionsSignup.title"),
	motto: I18n.t("optionsSignup.motto"),
	sitter: I18n.t("optionsSignup.sitter"),
	parent: I18n.t("optionsSignup.parent"),
};

class OptionSignupScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state = {
			hasTouchId: false,
			hasFaceId: false,
			supportTouchID: false,
			supportFaceID: false,
			currentUserType: Constant.USER_TYPE.parent,
		};
	}

	_renderUserType() {
		var userType = this.state.currentUserType;
		var isSitter = userType === Constant.USER_TYPE.parent;
		return (
			<View style={{flexDirection: "row", justifyContent: "space-between"}}>
				<TouchableOpacity style={[styles.parent, 
					{borderWidth: isSitter ? 1 : 0.4 , opacity: isSitter ? 1 : 0.8,
						backgroundColor:  colors.blue_sitter}]} 
				onPress={()=>{
					this.setState({currentUserType: Constant.USER_TYPE.parent});
				}}>
					<Animatable.Text animation="fadeInRight" style={{fontWeight: !isSitter ? "bold" : "500",color: isSitter ? colors.whiteWithOpacity : colors.white}}>{langs.parent}</Animatable.Text>
				</TouchableOpacity>
			</View>
		);
	}

	_renderNext() {
		return (
			<View style={{height: 50, width: 50, justifyContent: "center"}}>
				<AntDesign name="arrowright" size={25} color={colors.white}/>
			</View>
		);
	}

	render() {
		return(
			<LinearGradient 
				colors={Constant.BACKGROUND_COLORS}
				style={styles.mainContainer}>
				<StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true}/>
				<IAHeader viewLeft={this.renderBackButton(colors.white)}
					styleLeft={styles.headerLeft}
					onPressLeft={()=>this.goBack()}/>
				<Text style={[styles.welcomeTitle]}>{langs.optionsSignup}</Text>
				<Text style={[styles.motto]}>{langs.motto}</Text>
				<View style={styles.mainContent}>
					{this._renderUserType()}
					<View style={{flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: 30}}>
						<TouchableOpacity style={{flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: 30}} onPress={()=>this.goToScreen(ScreenNames.SignUpScreen, {currentUserType: this.state.currentUserType})}>
							<IAText style={styles.next} text={"Next"}/>
							{this._renderNext()}
						</TouchableOpacity>
					</View>
				</View>
			</LinearGradient>
		);
	}
}
const mapStateToProps = state => {
	return {};
};
const mapDispatchToProps = dispatch =>
	bindActionCreators({
	}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OptionSignupScreen);