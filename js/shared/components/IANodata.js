import React from "react";
import {View, StyleSheet, Text} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import I18n from "../../shared/utils/locale/i18n";
import {colors} from "../utils/colors/colors";
import fonts from "../utils/fonts/fonts";
import LottieView from "lottie-react-native";

const IANodata = () => {
	return (
		<View style={style.shadow}>
			<LottieView source={require("../../../assets/imgs/empty.json")} style={{width: 130, height: 130, alignSelf: "center"}} autoPlay loop />
			<Text style={{fontSize: 16, fontFamily: fonts.family.nunito.regular, opacity: 0.6}}>{I18n.t("no_data")}</Text>
		</View>
	);
};
export default IANodata;
const style = StyleSheet.create({
	shadow: {
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
		alignContent: "center",
		flex: 1,
	},
	absolute: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
});