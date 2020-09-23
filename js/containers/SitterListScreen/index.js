/* eslint-disable react/no-string-refs */
import React from "react";
import {View, ScrollView, Keyboard, Text, StatusBar, FlatList, Image, RefreshControl, TouchableOpacity} from "react-native";
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
import Stars from "react-native-star-rating";
import {AxiosFetch} from "../../api/AxiosFetch";
import LogManager from "../../shared/utils/logging/LogManager";
import Constant from "../../shared/utils/constant/Constant";
import SearchBar from "react-native-search-bar";
import {ScreenNames} from "../../route/ScreenNames";
import LottieView from "lottie-react-native";

class SitterListScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			sitters: [],
			tempSitter: [],
			tempSitter1: []
		};
	}

	_onRefresh = () => {
		this._getUserInfo();
	}

	_renderSpace = (height = 7) => {
		return (
			<IALine color={colors.black_lightly} height={height}/>
		);
	}

	componentDidMount() {
		this._getSitterList();
		this.addTriggerForScreen();
	}

	componentWillUnmount() {
		this.focusListener.remove();
	}

	addTriggerForScreen() {
		this.focusListener = this.props && this.props.navigation.addListener("willFocus", async () => {
			
		});
	}

	_getSitterList() {
		this.setState({isLoading: true});
		AxiosFetch({
			method: "GET",
			url: "api/sitters/all?offset=9999&limit=100000",
			contentType: "application/json",
			onSuccess: data => {
				this.setState({
					sitters: data.data,
					tempSitter: data.data,
					tempSitter1: data.data,
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


	renderSitters = (item) => {
		return (
			<TouchableOpacity onPress={()=>this.goToScreen(ScreenNames.SitterDetailProfileScreen, {data: item})} style={[ 
				{backgroundColor: "#fff", flex: 1, marginRight: 5,  marginLeft: 5,
					marginBottom: 10,  height: ScreenWidth /2 - 40,
					padding: 10, borderRadius: 8, borderColor: colors.black_twenty, borderWidth: 1}, ]}>
				<View  key={item.id} style={[ 
					{backgroundColor: "#fff", 
						marginBottom: 10,  flexDirection: "row", justifyContent: "space-between"}]}>
					<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", alignContent: "center"}}>
						{item.avatar ?
							<Image style={{width: 34, height: 34, borderRadius: 17, borderWidth: 0.5, borderColor: colors.black_seventy}} source={{uri: item.avatar}}/>
							: 
							<Image style={{width: 34, height: 34, borderRadius: 17}} source={images.mother}/>
						}
						<View style={{marginLeft: 5, width: ScreenWidth/4}}>
							<Text numberOfLines={1} ellipsizeMode="tail" style={{marginTop: 10,width: ScreenWidth/4, fontSize: 14, fontWeight: "600", color: colors.black_seventy}}>{item.sitterName || "Undefined"}</Text>
							<Stars rating={(item.ratingPoint/2)} starSize={15} fullStarColor={colors.yellow_fresh} starStyle={{marginTop: 0, width: 13}}/>
						</View>
					</View>
				</View>
				<Text ellipsizeMode="tail" numberOfLines={3} style={{marginLeft: 10, width: ScreenWidth/2 - 50, fontSize: 14, fontFamily: fonts.family.avenir_book.regular}}>{item.description || ""}</Text>
			</TouchableOpacity>
		);
	}

	_renderTitle() {
		return (
			<IAText text={"Sitters"} style={styles.title}/>
		);
	}

	_filter = (item) => {
		console.log(LogManager.parseJsonObjectToJsonString(item == "" || !item));
		let tempData = this.state.tempSitter;
		
		if (item == "" || !item) {
			this.setState({sitters: this.state.tempSitter1});
		} else {
			this.setState({sitters: tempData.filter(val => val.sitterName && val.sitterName.includes(item) || val.description && val.description.includes(item))});
		}
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
				<SearchBar
					ref="searchBar"
					placeholder="You wanna find directly sitter?"
					onChangeText={(item)=>{
						this._filter(item);
					}}
					onSearchButtonPress={()=>{
						this.refs.searchBar.unFocus();
					}}
					onCancelButtonPress={()=>{
						this.refs.searchBar.unFocus();
						this._filter("");
					}}
				/>
				<ScrollView
					contentContainerStyle={{padding: 10}}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={false}
							onRefresh={()=>this._getSitterList()}
						/>
					}>
					<FlatList 
						data={this.state.sitters}
						numColumns={2}
						columnWrapperStyle={{
            				justifyContent: "space-between"
						}}
						renderItem={(item) => this.renderSitters(item.item)}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SitterListScreen);