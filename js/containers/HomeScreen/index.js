import React from "react";
import {View, ScrollView, Text, TouchableOpacity, RefreshControl, Image, StatusBar} from "react-native";
import BaseScreen from "../BaseScreen/index";
import {styles} from "./style";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {AxiosFetch} from "../../api/AxiosFetch";
import IAHeader from "../../shared/components/IAHeader";
import IAText from "../../shared/components/IAText";
import IANodata from "../../shared/components/IANodata";
import {ScreenWidth, ScreenHeight} from "../../shared/utils/dimension/Divices";
import fonts from "../../shared/utils/fonts/fonts";
import {colors} from "../../shared/utils/colors/colors";
import SearchBar from "react-native-search-bar";
import rootStyles from "../../shared/utils/styles/rootStyles";
import {images} from "../../../assets";
import {ScreenNames} from "../../route/ScreenNames";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DropdownAlert from "react-native-dropdownalert";
import LogManager from "../../shared/utils/logging/LogManager";
import firebase, {Notification, NotificationOpen, RemoteMessage} from "react-native-firebase";
import moment from "moment";

const STATUS = [
	"CREATED", "PROCCESSING", "APPROVED_BY_ADMIN", "CONFIRMED_BY_SITTER", "PROCCESSED", "IN_PROGRESS", "BOOKING", "WORKING", "DONE", "REJECTED"
];
const COLORS_STATUS = {
	CREATED: "#00BFFF",
	PROCCESSING: "#00BFFF",
	CONFIRMED_BY_ADMIN: "#DBA901",
	CONFIRMED_BY_SITTER: "#FA58F4",
	PROCESSED: "#04B404",
	IN_PROGRESS: "#58D3F7",
	BOOKING: "#F8E0E0",
	WORKING: "#01DF74",
	DONE: "green",
	REJECTED: "#EA4335",
	CANCEL_BY_PARENT: "#EA4335",
};

class HomeScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state = {

			dataJobs: [],
			dataTemp: [],
			dataTemp1: [],
			wallet: "0",
			isParent: false,
			isLoading: false,
		};
	}

	addTriggerForScreen() {
		this.focusListener = this.props && this.props.navigation.addListener("willFocus", async () => {
			
			let userId = await IALocalStorage.getUserInfo();
			this._getDataJobCreatedByParent(userId.profileId);
			this.getWallet();
			this.updateFCM();
		});
	}

	async componentDidMount() {
		this.addTriggerForScreen();
		this.setState({isParent: true});
	}

	componentWillUnmount() {
		this.focusListener && this.focusListener.remove();
	}

	updateFCM = async () => {
		// /api/users/{userId}/FCMToken/save
		const fcmToken = await firebase.messaging().getToken();
		if (fcmToken) {
			let userId = await IALocalStorage.getUserInfo();
			AxiosFetch({
				method: "POST",
				url: "api/users/" + userId.id + "/FCMToken/save?fcmToken=" + fcmToken,
				contentType: "application/json",
				onSuccess: data => {
					this.setState({
					}, () => {
					});
				},
				onError: error => {
				},
				hasToken: true
			});
		}

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

	_renderTitle() {
		return (
			<IAText text={"My created jobs"} style={styles.title} />
		);
	}

	_filter = (item) => {
		console.log(LogManager.parseJsonObjectToJsonString(item == "" || !item));
		let dataTemp = this.state.dataTemp;

		if (item == "" || !item) {
			this.setState({dataJobs: this.state.dataTemp1});
		} else {
			this.setState({dataJobs: dataTemp.filter(val => val.jobTitle.toLowerCase() && val.jobTitle.toLowerCase().includes(item.toLowerCase()) || val.address.toLowerCase() && val.address.toLowerCase().includes(item.toLowerCase()))});
		}
	}

	async getWallet() {
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
				this.dropDownAlertRef.alertWithType("error", "Error", error.data.message || "Something wrong, please try again");
				this.setState({isLoading: false});
			},
			hasToken: true
		});
	}

	_renderCoin = () => {
		return (
			<View style={{flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center"}}>
				<MaterialCommunityIcons name="coin" size={20} color={colors.yellow_fresh} />
				<Text style={{marginLeft: 7, justifyContent: "center", alignContent: "center", alignItems: "center"}}>{this.state.wallet.coinBalance && this.state.wallet.coinBalance || "0"}</Text>
			</View>
		);
	}

	render() {
		return (
			<View style={styles.mainContainer}>
				<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
				<View style={{marginTop: 11}}>
					<IAHeader
						style={{backgroundColor: "#fafafb"}}
						viewLeft={null}
						onPressLeft={() => { }}
						viewRight={this._renderCoin()}
						onPressRight={() => { }}
						viewCenter={this._renderTitle()} />
				</View>
				<SearchBar
					ref="searchBar"
					placeholder="Filter job?"
					onChangeText={(item) => {
						this._filter(item);
					}}
					onSearchButtonPress={() => {
						this.refs.searchBar.unFocus();
					}}
					onCancelButtonPress={() => {
						this.refs.searchBar.unFocus();
						this._filter("");
					}}
				/>
				<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.content, {flex: this.state.dataJobs.length == 0 && !this.state.isLoading ? 1 : 0}]} refreshControl={
					<RefreshControl
						refreshing={false}
						onRefresh={() => {
							IALocalStorage.getUserInfo().then(data => {
								this._getDataJobCreatedByParent(data.profileId);
							});
							this.getWallet();
						}} />
				}>
					{this.state.dataJobs.length == 0 && !this.state.isLoading ?
						<View style={{flex: 1, justifyContent: "center", alignItems: "center", alignContent: "center"}}>
							<IANodata style={{flex: 1, justifyContent: "center", alignItems: "center", alignContent: "center", alignSelf: "center"}} />
						</View> :
						this.state.dataJobs.map((item, index) => {
							return (
								<TouchableOpacity onPress={() => this.goToScreen(ScreenNames.DetailJobScreen, {data: item})} key={item.id} style={[{marginBottom: 10, backgroundColor: "#fff", flexDirection: "row", justifyContent: "space-between", padding: 10, borderRadius: 10, borderColor: colors.white, borderWidth: 1}, rootStyles.shadowBox]}>
									<View style={{width: (ScreenWidth - 60) * 1, overflow: "hidden"}}>
										<View style={{flexDirection: "row", justifyContent: "space-between", alignContent: "center"}}>
											<View style={[{marginEnd: 10, overflow: "hidden", justifyContent: "center", alignSelf: "center", alignContent: "center", alignItems: "center", width: 40, height: 40, borderRadius: 20, borderColor: colors.black_lightly, borderWidth: 1}, rootStyles.shadowBox]}>
												<Image source={images.mom} style={{borderRadius: 20, width: 35, height: 35, justifyContent: "center", alignSelf: "center"}} resizeMethod="resize" resizeMode="cover" />
											</View>
											<View>
												<Text style={{marginBottom: 5, width: (ScreenWidth - 100), textAlign: "left", fontWeight: "600", fontSize: 17, color: colors.black_seventy}}>{item.jobTitle && item.jobTitle || "Untitle"}</Text>
												<Text style={{marginBottom: 5, width: (ScreenWidth - 100), textAlign: "left", fontWeight: "300", fontSize: 12, color: colors.black_seventy}}>{`Created at: ${moment(item.postJobDate).format("YYYY-DD-MM HH:mm")}`}</Text>
											</View>


										</View>
										<View style={{marginLeft: 10, marginTop: 10,}}>
											<Text ellipsizeMode="tail" style={{textAlign: "left", width: (ScreenWidth - 75), fontSize: 14, fontFamily: fonts.family.nunito.bold, color: colors.black_title}}>{`${item.numOfChild} childrens`}</Text>
											<Text ellipsizeMode="tail" style={{textAlign: "left", width: (ScreenWidth - 75), fontSize: 14, fontFamily: fonts.family.nunito.bold, color: colors.black_title}}>{`Childs age: ${item.childAge} years old`}</Text>
											<Text ellipsizeMode="tail" style={{textAlign: "left", width: (ScreenWidth - 75), fontSize: 13, fontFamily: fonts.family.avenir_book.regular, color: colors.black_seventy}}>{`Address: ${item.address}`}</Text>
											<Text ellipsizeMode="tail" style={{textAlign: "left", width: (ScreenWidth - 75), fontSize: 13, fontFamily: fonts.family.avenir_book.regular, color: colors.black_seventy}}>{`Start at: ${moment(item.startAt).format("YYYY-DD-MM HH:mm")}`}</Text>
											<Text ellipsizeMode="tail" style={{textAlign: "left", width: (ScreenWidth - 75), fontSize: 13, fontFamily: fonts.family.avenir_book.regular, color: colors.black_seventy}}>{`End at: ${moment(item.endAt).format("YYYY-DD-MM HH:mm")}`}</Text>
											<Text ellipsizeMode="tail" style={{textAlign: "left", width: (ScreenWidth - 75), fontSize: 13, fontFamily: fonts.family.avenir_book.regular, color: colors.black_seventy}}>{`Fee credit: ${item.feeCredit && item.feeCredit || "0"}`}</Text>
											{item.sitterName ?
												<View style={{ width: ScreenWidth, flexDirection: "row", justifyContent: "flex-end", alignItems: "center", alignContent: "center",}}>
													{item.sitterAvatar ?
														<Image style={{width: 34, height: 34, borderRadius: 17, borderWidth: 0.5, borderColor: colors.black_seventy}} source={{uri: item.sitterAvatar}} />
														:
														<Image style={{width: 34, height: 34, borderRadius: 17}} source={images.mother} />
													}
													<View style={{marginLeft: 5, width: ScreenWidth - 35}}>
														<Text numberOfLines={1} ellipsizeMode="tail" style={{marginTop: 10, width: ScreenWidth, fontSize: 14, fontWeight: "600", color: colors.black_seventy}}>{`Sitter: ${item.sitterName || "Undefined"}`}</Text>
													</View>
												</View> : null}
										</View>
										
										<View style={{flexDirection: "row", paddingLeft: 10, paddingEnd: 10, alignSelf: "flex-end", backgroundColor: COLORS_STATUS[item.jobStatus || STATUS[0]], alignItems: "center", justifyContent: "center", height: 30, borderRadius: 5, borderColor: colors.black_lightly, borderWidth: 0.5}}>
											<Text style={{fontSize: 11, fontFamily: fonts.family.nunito.bold}}>{item.jobStatus || STATUS[0]}</Text>
										</View>
										
									</View>

								</TouchableOpacity>
							);
						})}

				</ScrollView>
				<DropdownAlert warnColor={colors.orange} warnImageSrc={null} successImageSrc={null} ref={ref => this.dropDownAlertRef = ref} />
				{this._renderBtn(() => this.goToScreen(ScreenNames.CreateJobScreen))}
				{this.state.isLoading ? this._renderLoading() : null}
			</View>
		);
	}
}
const mapStateToProps = state => {
	return {

	};
};
const mapDispatchToProps = dispatch =>
	bindActionCreators({

	}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);