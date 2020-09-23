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
import {updateTime} from "../MyBookingProfileScreen/actions";
import AntDesign from "react-native-vector-icons/AntDesign";
import {ScreenHeight, ScreenWidth} from "../../shared/utils/dimension/Divices";
import * as device from "../../shared/utils/device/device";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import LogManager from "../../shared/utils/logging/LogManager";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import Constant from "../../shared/utils/constant/Constant";
import LottieView from 'lottie-react-native';

const homePlace = {description: "Home", geometry: {location: {lat: 48.8152937, lng: 2.4597668}}};
const workPlace = {description: "Work", geometry: {location: {lat: 48.8496818, lng: 2.2940881}}};

class AddressScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.state = {
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

	_renderTitle() {
		return (
			<IAText text={"Edit address"} style={styles.title}/>
		);
	}

	render() {
		return(
			<View style={styles.mainContainer}>
				<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
				<IAHeader viewLeft={this.renderBackButton()}
					viewRight={null}
					viewCenter={this._renderTitle()}//AIzaSyDB5BiqYb-K0tiXDpJkwiTCz6QrPP7_fSs
					styleLeft={styles.headerLeft}
					styleRight={{marginBottom: 10}}
					onPressRight={()=>{}}
					onPressLeft={()=>{this.goBack();}}/>
				<LottieView source={require("../../../assets/imgs/address.json")} style={{width: ScreenWidth * 0.7, height: ScreenWidth * 0.5, alignSelf: "center"}} autoPlay loop />
				<GooglePlacesAutocomplete
					placeholder='Type here and we will auto find directly for you...'
					minLength={2}
					autoFocus={false}
					returnKeyType={"search"}
					keyboardAppearance={"light"}
					listViewDisplayed={false}
					fetchDetails={true}
					textInputContainer={{borderBottomColor: "#000", borderBottomWidth: 1}}
					keyboardShouldPersistTaps="handled"
					renderDescription={row => row.description}
					onPress={(data, details = null) => {
						// console.log(data,details);
						this.props.navigation.state.params._setAdd(data.description);
						IALocalStorage.setTempAdd(data.description);
						this.goBack();
						// this.setState({location:data.structured_formatting.main_text, user_long:details.geometry.location.lng, user_lat: details.geometry.location.lat })
					}}
					enablePoweredByContainer={false}
					getDefaultValue={() => ""}
					textInputProps={{
						ref: (input) => {this.fourthTextInput = input;}
					}}
					query={{
						// available options: https://developers.google.com/places/web-service/autocomplete
						key: "AIzaSyDB5BiqYb-K0tiXDpJkwiTCz6QrPP7_fSs",
						language: "en",
						//It removes the country name from the suggestion list
						types: "", // default: 'geocode'
						components: "country:vn"
					}}
					styles={{
						container: {width:ScreenWidth},
						textInputContainer: {
							backgroundColor: "transparent",
							margin: 0,
							width: ScreenWidth ,
							padding:0,
							borderTopWidth: 0,
							borderBottomWidth:0
						},
						textInput: {
							textAlign: "center",
							minWidth: ScreenWidth/1.4, 
							borderColor: "#cbb4c0",
							borderBottomWidth: 1,
							color: "#5d5d5d",
							fontSize: 14,
						},
						description: {
							color:"#ac879a",
							fontWeight: "300"
						},
						predefinedPlacesDescription: {
							color: "#1faadb"
						}
					}}
					currentLocation={false} 
					nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
					GoogleReverseGeocodingQuery={{// available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
					}}
					GooglePlacesSearchQuery={{
						// available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
						rankby: "distance",
						type: "cafe"
					}}    
					GooglePlacesDetailsQuery={{
						// available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
						fields: "formatted_address",
					}}
					filterReverseGeocodingByTypes={["locality", "administrative_area_level_3"]}
					debounce={200}
				/>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddressScreen);