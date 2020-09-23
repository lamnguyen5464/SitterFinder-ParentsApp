import React from "react";
import {View, ScrollView, Text, StatusBar, Image, RefreshControl, TouchableOpacity} from "react-native";
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
import rootStyles from "../../shared/utils/styles/rootStyles";
import {ScreenWidth} from "../../shared/utils/dimension/Divices";
import fonts from "../../shared/utils/fonts/fonts";
import {AxiosFetch} from "../../api/AxiosFetch";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import LogManager from "../../shared/utils/logging/LogManager";
import IANodata from "../../shared/components/IANodata";
import LottieView from "lottie-react-native";
import { ScreenNames } from "../../route/ScreenNames";
import { AlertHelper } from "../../shared/utils/AlertHelper";
var moment = require("moment-timezone");

const langs = {
	title: I18n.t("message.title"),
	noData: I18n.t("message.no_data"),
	noDataMotto: I18n.t("message.no_data_motto"),
};

class MessageScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state={
			messages: [],
			isLoading: false,
			updating: false,
		};
	}

	_onRefresh = () => {
		this._getUserInfo();
	}

	componentDidMount() {
		this.getMsgs();
		this.addTriggerForScreen();
	}

	componentWillUnmount() {
		this.focusListener.remove();
	}

	addTriggerForScreen() {
		this.focusListener = this.props && this.props.navigation.addListener("willFocus", async () => {
			this.setState({updating: false,});
			
		});
	}

	async getMsgs() {
		let currentUser = await IALocalStorage.getUserInfo();
		this.setState({isLoading: true});
		AxiosFetch({
			method: "GET",
			url: "api/messages/find/allmessages/conversationlist?userId=" + currentUser.id,
			contentType: "application/json",
			onSuccess: data => {
				this.setState({
					messages: data.data,
					isLoading: false,
				}, () => {
				});
			},
			onError: error => {
				this.setState({isLoading: false});
			},
			hasToken: true
		});
	}

	_renderSpace = (height = 7) => {
		return (
			<IALine color={colors.black_lightly} height={height}/>
		);
	}

	renderMessages = () => {
		if (this.state.messages.length ===  0) { 
			return (
				<IANodata />
			);
		}
		return (
			<View>
				{this.state.messages.map(item => {
					return(
						<TouchableOpacity onPress={()=>this.goToScreen(ScreenNames.ChatScreen, {user: {
							userId: item.participateId
						}})} key={item.id} style={[rootStyles.shadowBox, {backgroundColor: "#fff", marginBottom: 10, flexDirection: "row", justifyContent: "space-between", padding: 20, borderRadius: 8, borderColor: colors.white, borderWidth: 1}, ]}>
							<View style={{width: (ScreenWidth-60)*0.2}}>
								{item.participateAvatar ? 
									<Image style={{marginRight: 15, width: 50, height: 50, borderRadius: 25, borderWidth: 0.5, borderColor: colors.black_lightly}} source={{uri:  item.participateAvatar}}/>:
									<Image style={{marginRight: 15, width: 50, height: 50, borderRadius: 25, borderWidth: 0.5, borderColor: colors.black_lightly}} source={images.mother}/>}
							</View>
							<View>
								<Text ellipsizeMode="tail" style={{width: (ScreenWidth-60)*0.8, fontSize: 16, fontFamily: fonts.family.nunito.bold}}>{item.participateName}</Text>
								<Text style={{marginTop: 2, fontSize: 11, fontFamily: fonts.family.avenir_book.regular, color: colors.black_seventy}}>{`${moment(item.latestMessage.createdOn).format("DD-MM-YY HH:mm")}`}</Text>
								<Text ellipsizeMode="tail" style={{marginTop: 10, fontSize: 15, fontFamily: fonts.family.avenir_book.regular, color: colors.black_seventy}}>{item.latestMessage.message}</Text>
							</View>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	}

	_renderTitle() {
		return (
			<IAText text={"Messages"} style={styles.title}/>
		);
	}

	_renderMotto() {
		return (
			<IAText text={"Who you chatted before? Let see list below! \nGreat day"} style={styles.motto}/>
		);
	}

	render() {
		return(
			<View style={styles.mainContainer}>
				<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
				<IAHeader viewLeft={null}
					viewRight={null}
					style={{backgroundColor: "#fafafb"}}
					viewCenter={this._renderTitle()}
					styleLeft={styles.headerLeft}
					styleRight={{marginBottom: 10}}
					onPressRight={()=>{}}
					onPressLeft={()=>{}}/>
				<ScrollView
					contentContainerStyle={{flex: 1, padding: 10}}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={false}
							onRefresh={()=>this.getMsgs()}
						/>
					}>
					{this._renderMotto()}
					{this.renderMessages()}
				</ScrollView>
				<TouchableOpacity onPress={()=>{
					IALocalStorage.getUserInfo().then(data => {
						this.goToScreen(ScreenNames.VideoScreen, {user: {
							userId: data.id
						}});
					});
				}} style={{
  			position: "absolute", width: 50, height: 50, bottom: 30, right: 10}}>
  				<LottieView source={require("../../../assets/imgs/call.json")} style={{width: 80, height: 80, alignSelf: "center"}} autoPlay loop />
  		</TouchableOpacity>
		  <TouchableOpacity onPress={()=>{
			  this.goToScreen(ScreenNames.ChatScreen, {user: {
			  userId: "-Lw0ypLS3OAF-xnLWYaZ"
		  }});
		  AlertHelper.showSuccess("Yep!", "You are going to chat with our admin!")
		}} style={{
  			position: "absolute", width: 50, height: 50, bottom: 30, right: 60}}>
  				<LottieView source={require("../../../assets/imgs/chat.json")} style={{width: 80, height: 80, alignSelf: "center"}} autoPlay loop />
  		</TouchableOpacity>
				{this.state.isLoading ? this._renderLoading() : null}
			</View>
		);
	}
}
// eslint-disable-next-line no-unused-vars
const mapStateToProps = state => {
	return {
	};
};
const mapDispatchToProps = dispatch =>
	bindActionCreators({
	}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen);