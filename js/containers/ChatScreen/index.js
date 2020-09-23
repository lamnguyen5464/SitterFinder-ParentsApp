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
import {GiftedChat} from "react-native-gifted-chat";
import Constant from "../../shared/utils/constant/Constant";
var moment = require("moment-timezone");

const langs = {
	title: I18n.t("message.title"),
	noData: I18n.t("message.no_data"),
	noDataMotto: I18n.t("message.no_data_motto"),
};

class ChatScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state={
			messages: [],
			isLoading: false,
			updating: false,
			currentUserId: "",
			avatar: ""
		};
	}

	_onRefresh = () => {
		this._getUserInfo();
	}

	componentDidMount() {
		this.addTriggerForScreen();
	}

	componentWillUnmount() {
		this.focusListener.remove();
	}

	addTriggerForScreen() {
		this.focusListener = this.props && this.props.navigation.addListener("willFocus", async () => {
			this.setState({updating: false,});
			this.getMsgs();
			let currentUser = await IALocalStorage.getUserInfo();
			this.setState({currentUserId: currentUser.id, avatar: currentUser.avatar});
		});
	}

	async getMsgs() {
		this.setState({isLoading: true});
		const {user} = this.props.navigation.state.params;
		let currentUser = await IALocalStorage.getUserInfo();
		AxiosFetch({
			method: "GET",
			url: "api/messages/find/allmessages/conversation?fromUserid=" + currentUser.id +"&toUserId=" + user.userId,
			contentType: "application/json",
			onSuccess: data => {
				this.setState({
					messages: this._convertMessage(data.data),					
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

	_convertMessage = (msgs) => {
		let i = 0; 
		let res = [];
		for (i; i< msgs.length; i++) {
			let obj = {
				_id: msgs[i].id || new Date().getMilliseconds(),
				createdAt: new Date(moment(msgs[i].createdOn)),
				text: msgs[i].message,
				user: {
					_id: msgs[i].fromUserId,
					name: msgs[i].ownerName,
					avatar: msgs[i].ownerAvatar || Constant.MOCKING_DATA.PLACE_HOLDER,
				  },
			};
			res.push(obj);
		}
		return res;
	}

	_renderSpace = (height = 7) => {
		return (
			<IALine color={colors.black_lightly} height={height}/>
		);
	}

	async onSend(messages = []) {
		this.setState(previousState => ({
		  messages: GiftedChat.append(previousState.messages, messages),
		}));
		
		let currentUser = await IALocalStorage.getUserInfo();
		//Send to server
		// alert(LogManager.parseJsonObjectToJsonString( this.props.navigation.state.params.user));
		this.setState({isLoading: true});
		
		AxiosFetch({
			method: "POST",
			url: "api/messages/save",
			contentType: "application/json",
			data: {
				"fromUserId": currentUser.id,
				"message": messages[0].text,
				"toUserId": this.props.navigation.state.params.user.userId
			},
			onSuccess: data => {
				this.setState({
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
	
	renderMessages = () => {
		return (
			<View style={{flex: 1}}>
				<GiftedChat
					messages={this.state.messages}
					onSend={messages => this.onSend(messages)}
					user={{
						_id: this.state.currentUserId,
						name: 'Me',
            			avatar: this.state.avatar || Constant.MOCKING_DATA.PLACE_HOLDER,
					}}
				/>
			</View>
		);
	}

	_renderTitle() {
		return (
			<IAText text={"Chat"} style={styles.title}/>
		);
	}

	render() {
		return(
			<View style={styles.mainContainer}>
				<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
				<IAHeader viewLeft={this.renderBackButton()}
					viewRight={null}
					viewCenter={this._renderTitle()}
					styleLeft={styles.headerLeft}
					onPressRight={()=>{}}
					onPressLeft={()=>{this.goBack();}}/>
				<ScrollView
					contentContainerStyle={{flex: 1, padding: 10}}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={false}
							onRefresh={()=>this.getMsgs()}
						/>
					}>
					{this.renderMessages()}
					
				</ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);