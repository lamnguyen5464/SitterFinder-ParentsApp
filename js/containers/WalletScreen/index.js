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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import LogManager from "../../shared/utils/logging/LogManager";
import IANodata from "../../shared/components/IANodata";
import {GiftedChat} from "react-native-gifted-chat";
import Constant from "../../shared/utils/constant/Constant";
import {TextMask} from "react-native-masked-text";
import * as Animatable from "react-native-animatable";
var moment = require("moment-timezone");
import LottieView from "lottie-react-native";
import DropdownAlert from "react-native-dropdownalert";

const langs = {
	title: I18n.t("message.title"),
	noData: I18n.t("message.no_data"),
	noDataMotto: I18n.t("message.no_data_motto"),
};

class WalletScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state={
			transactions: [
				
			  ],
			wallet: {},
			isLoading: false,
			updating: false,
			currentUserId: "",
			avatar: "",
			dataJobs: [],
		};
	}

	_onRefresh = () => {
		this._getUserInfo();
	}

	componentDidMount() {
		this.addTriggerForScreen();
		IALocalStorage.getUserInfo().then(data => {
			this._getDataJobCreatedByParent(data.profileId);
		});
	}

	componentWillUnmount() {
		this.focusListener.remove();
	}

	addTriggerForScreen() {
		this.focusListener = this.props && this.props.navigation.addListener("willFocus", async () => {
			this.setState({updating: false,});
			this.getWallet();
			let currentUser = await IALocalStorage.getUserInfo();
			this.setState({currentUserId: currentUser.id, avatar: currentUser.avatar});
		});
	}

	_getDataJobCreatedByParent = (id) => {
		this.setState({isLoading: true});
		AxiosFetch({
			method: "GET",
			url: "api/job/summary/parent?parentId=" + id,
			contentType: "application/json",
			onSuccess: data => {
				this.setState({
					dataJobs: data.data,
					dataTemp: data.data,
					dataTemp1: data.data,
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

	async getWallet() {
		this.setState({isLoading: true});
		let currentUser = await IALocalStorage.getUserInfo();
		console.log(LogManager.parseJsonObjectToJsonString(currentUser));
		AxiosFetch({
			method: "GET",
			url: "api/users/" + currentUser.id,
			contentType: "application/json",
			onSuccess: data => {
				this.setState({
					wallet: data.data,
					isLoading: false,
				}, () => {
				});
			},
			onError: error => {
				this.dropDownAlertRef.alertWithType("error", "Error", error.data.message || "Something wrong, please try again" );
				this.setState({isLoading: false});
			},
			hasToken: true
		});
	}

	async getTransaction() {
		this.setState({isLoading: true});
		let currentUser = await IALocalStorage.getUserInfo();
		AxiosFetch({
			method: "GET",
			url: "api/trans/userId/" + currentUser.id,
			contentType: "application/json",
			onSuccess: data => {
				this.setState({
					transactions: data.data,
					isLoading: false,
				}, () => {
				});
			},
			onError: error => {
				this.dropDownAlertRef.alertWithType("error", "Error", error.data.message || "Something wrong, please try again" );
				this.setState({isLoading: false});
			},
			hasToken: true
		});
	}

	renderTransactions = () => {
		if (this.state.transactions.length ===  0) { 
			return (
				<IANodata />
			);
		}
		return (
			<View>
				{this.state.transactions.map(item => {
					return(
						<TouchableOpacity key={item.id} style={[rootStyles.shadowBox, {backgroundColor: "#fff", marginBottom: 10, flexDirection: "row", justifyContent: "space-between", padding: 20, borderRadius: 8, borderColor: colors.white, borderWidth: 1}, ]}>
							<View style={{flexDirection: "row", justifyContent: "space-between"}}>
								<Text ellipsizeMode="tail" style={{fontSize: 14, fontFamily: fonts.family.nunito.regular}}>{this._convertTimeMil(item.transactionDate)}</Text>
								<View style={{width: ScreenWidth/2,justifyContent: "flex-end", alignItems: "flex-end", alignContent: "flex-end"}}>
									<TextMask
										type={"money"}
										options={{
											precision: 0,
											separator: " ",
											delimiter: ".",
											unit: "",
											suffixUnit: "đ",
										}}
										value={item.amount}
										style={{fontSize: 16, fontFamily: fonts.family.nunito.bold, textAlign: "right"}}
									/>
									<Text ellipsizeMode="tail" style={{fontSize: 14, fontFamily: fonts.family.nunito.regular}}>{`Via: ${item.method}`}</Text>
								</View>
							</View>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	}

	_renderSpace = (height = 7) => {
		return (
			<IALine color={colors.black_lightly} height={height}/>
		);
	}

	_renderTitle() {
		return (
			<IAText text={"My wallet"} style={styles.title}/>
		);
	}

	_renderMotto() {
		return (
			<IAText multiLine numberOfLines={3} text={"Let see how much you payment, paid, how far you go!"} style={styles.motto}/>
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
					contentContainerStyle={{padding: 10, paddingBottom: 80,}}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={false}
							onRefresh={()=>{this.getTransaction(); this.getWallet();}}
						/>
					}>
					{this._renderMotto()}
					<View style={{width: "100%", paddingLeft: 50, justifyContent: "center", alignItems: "center", alignContent: "center"}}>
						<LottieView resizeMode="contain" source={require("../../../assets/imgs/credits.json")} style={{alignSelf: "center", width: ScreenWidth, height: ScreenWidth/2}} autoPlay loop/>
					</View>
					<View style={{borderRadius: 8, borderWidth: 1, borderColor: colors.black}}>
						<TextMask
							type={"money"}
							options={{
								precision: 0,
								separator: " ",
								delimiter: ".",
								unit: "",
								suffixUnit: "credits",
							}}
							value={this.state.wallet && this.state.wallet.coinBalance || 0}
							style={{fontSize: 30, fontFamily: fonts.family.nunito.bold, textAlign: "center"}}
						/>
					</View>
					<Text style={{marginTop: 20,
						marginBottom: 20, fontSize: 16, opacity:0.7, fontFamily: fonts.family.nunito.bold, textAlign: "left"}}>Transaction history</Text>
					{/* {this.renderTransactions()} */}
					{this.state.dataJobs.length == 0 ?
						<View style={{flex: 1, justifyContent: "center", alignItems: "center", alignContent: "center"}}>
							<IANodata style={{flex: 1, justifyContent: "center", alignItems: "center", alignContent: "center", alignSelf: "center"}} />
						</View> :
						this.state.dataJobs.map((item, index) => {
							return (
								<Animatable.View animation="slideInLeft" key={item.id} style={[{marginBottom: 10, backgroundColor: "#fff", flexDirection: "row", justifyContent: "space-between", padding: 10, borderRadius: 10, borderColor: colors.white, borderWidth: 1}, rootStyles.shadowBox]}>
									<View style={{width: (ScreenWidth - 60) * 1, overflow: "hidden"}}>
										<View style={{flexDirection: "row", justifyContent: "space-between", alignContent: "center"}}>
											<View>
												<Text style={{marginBottom: 5, width: (ScreenWidth - 100), textAlign: "left", fontWeight: "600", fontSize: 17, color: colors.black_seventy}}>{item.jobTitle && item.jobTitle || "Untitle"}</Text>
												<Text style={{marginBottom: 5, width: (ScreenWidth - 100), textAlign: "left", fontWeight: "300", fontSize: 12, color: colors.black_seventy}}>{`Transaction date: ${moment(item.postJobDate).format("YYYY-DD-MM HH:mm")}`}</Text>
											</View>
										</View>
										<View style={{marginLeft: 10, marginTop: 10, flexDirection: "row", justifyContent: 'center', alignContent: "center", alignItems: "center"}}>
											<MaterialCommunityIcons name="coin" size={20} color={colors.yellow_fresh} />
											<Text ellipsizeMode="tail" style={{marginLeft: 5, textAlign: "left", width: (ScreenWidth - 75), fontSize: 13, fontFamily: fonts.family.avenir_book.regular, color: colors.black_seventy}}>{`${item.feeCredit && item.feeCredit || "0"} credits`}</Text>
										</View>
									</View>
								</Animatable.View>
							);
						})}
				</ScrollView>
				{/* <TouchableOpacity onPress={()=>{
					if (this.state.wallet && this.state.wallet.currentCredit > 0) {
						this.dropDownAlertRef.alertWithType("success", "Success", "We will process your request soon. Have a nice day!");
					} else {
						this.dropDownAlertRef.alertWithType("error", "Error", "Your wallet balance is 0d. Work and earn more money. Have a nice day!");
					}
				}} style={{alignContent: "center", alignItems: "center", bottom: 30, right:0, alignSelf: "center", left: 0, width: "100%"}}>
					<LottieView resizeMode="contain" source={require("../../../assets/imgs/charge.json")} style={{alignContent: "center", alignItems: "center", alignSelf: "center", width: 50, height: 50}} autoPlay loop/>
					<Text style={{fontSize: 18, fontFamily: fonts.family.nunito.bold, textAlign: "center"}}>Money transfer request</Text>
				</TouchableOpacity> */}
				{this.state.isLoading ? this._renderLoading() : null}
				<DropdownAlert warnColor={colors.orange} warnImageSrc={null} successImageSrc={null} ref={ref => this.dropDownAlertRef = ref} />
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

export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen);