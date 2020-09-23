import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, Platform} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import {colors} from "../colors/colors";
const {width} = Dimensions.get("window");
const isAndroid = Platform.OS == "android";

const SNSTextField = ({nameIcon, title, text, colorIcon, isAbleToClick, onPress, isEditable, onChangeText, keyboardType, placeHolder}) => {
	const hasNoText = (!text || text == "");
	return (
		<TouchableOpacity disabled={isAbleToClick == undefined || !isAbleToClick} onPress={onPress}>
			<View style={styles.mainContainer}>
				<View style={[styles.leftContainer, {flex: hasNoText ? 1 : 0.3}]}>
					<Feather name={nameIcon} size={20} color={colorIcon ? colorIcon : colors.orange} style={{marginRight: 14, justifyContent: "center", alignItems: "center", alignSelf: "center"}}/>
					<Text style={styles.title}>{title}</Text>
				</View>
				{hasNoText ? null :
					<View style={styles.inputContainer}>
						{
							!isEditable ?
								<Text style={styles.text}>{text}</Text> :
								<View style={styles.viewRight}>
									<TextInput style={{height: isAndroid ? 40 : 30, width: width * 0.35, borderColor: colors.white, borderRadius: 2}}
										onChangeText={onChangeText}
										keyboardType={keyboardType}
										returnKeyType="done"
										placeholder={placeHolder}/>
								</View>
						}
					</View>
				}
			</View>
		</TouchableOpacity>
	);
};
export default SNSTextField;
const styles =StyleSheet.create({
	mainContainer: {
		flexDirection: "row",
		width: "100%",
		padding: 10
	},
	inputContainer: {
		flex: 0.7,
		justifyContent: "flex-end",
		alignContent: "flex-end",
		alignItems: "flex-end"
	},
	viewRight: {
		fontSize: 14,
		textAlign: "right",
		justifyContent: "flex-end",
		alignItems: "flex-end",
		alignSelf: "flex-end",
		alignContent: "flex-end",
		borderColor: colors.gray,
		borderWidth: 0.5
	},
	leftContainer: {
		flexDirection: "row",
		flex: 0.3
	},
	title: {
		fontSize: 17,
		color: colors.black,
		alignSelf: "center",
		justifyContent: "center"
	},
	text: {
		flex: 1,
		fontSize: 14,
		color: colors.black,
		textAlign: "right",
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "flex-end",
		alignContent: "center"
	}
});