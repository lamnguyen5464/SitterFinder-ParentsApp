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
import { AxiosFetch } from "../../api/AxiosFetch";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import LogManager from "../../shared/utils/logging/LogManager";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import IANodata from "../../shared/components/IANodata";
import moment from "moment";

const langs = {
	title: I18n.t("message.title"),
	noData: I18n.t("message.no_data"),
	noDataMotto: I18n.t("message.no_data_motto"),
};

class NotificationScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state={
			messages: [],
			isLoading: false,
			updating: false,
		}
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
			this.setState({updating: false,})
			this.getMsgs();
		});
	}

	async getMsgs() {
		this.setState({isLoading: true});
		let userId = await IALocalStorage.getUserInfo();
		AxiosFetch({
			method: "GET",
			url: "api/notification/" + userId.id,
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
		if (this.state.messages.length ===  0 && !this.state.isLoading) { 
			return (
				<IANodata />
			);
		}
		return (
			<View>
				{this.state.messages.map(item => {
					return(
						<TouchableOpacity key={item.id} style={[rootStyles.shadowBox, {backgroundColor: "#fff", marginBottom: 10, flexDirection: "row", justifyContent: "space-between", padding: 20, borderRadius: 8, borderColor: colors.white, borderWidth: 1, height: 100}, ]}>
							<View style={{width: (ScreenWidth-60)*0.2}}>
								<MaterialIcons size={30} 
								name={item.message && item.message.includes("message") ? "announcement" : item.message && item.message.includes("call") ? "call-end": "description"}
								color={item.message && item.message.includes("message") ? colors.red_cinnabar : item.message && item.message.includes("call") ?  colors.blue_dodger :  colors.green }/>
							</View>
							<View>
								<Text ellipsizeMode="tail" style={{width: (ScreenWidth-60)*0.8, fontSize: 16, fontFamily: fonts.family.avenir_book.regular}}>{item.message}</Text>
								<Text ellipsizeMode="tail" style={{position: "absolute", bottom: 0, right: 10, textAlign: "right", width: (ScreenWidth-60)*0.8, fontSize: 12, fontFamily: fonts.family.avenir_book.regular, color: colors.black_title}}>{item.createdOn && moment(item.createdOn).format("DD/MM/YYYY HH:mm:ss")}</Text>
							</View>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	}

	_renderTitle() {
		return (
			<IAText text={"Notification"} style={styles.title}/>
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
					contentContainerStyle={{padding: 10}}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={false}
							onRefresh={()=>this.getMsgs()}
						/>
					}>
					{this.renderMessages()}
					
				</ScrollView>
				{this.state.isLoading ? this._renderLoadingCircle() : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);