import React from "react";
import {TouchableOpacity, View, StyleSheet, Animated
} from "react-native";
import DeviceInfo from "react-native-device-info";
import {colors} from "../colors/colors";
import FastImage from "react-native-fast-image";
import Constant from "../constants";


const SNSHeaderWithAbsoluteImage = ({style, onPressLeft, onPressRight, viewRight, img, viewLeft, viewCenter, onPressCenter, disabledImg, heightImg}) => {

	return (
		<Animated.View style={[styles.mainContainer, style]}>
			<View style={{height: 98, flexDirection: "row", top: 18}}>
				<View style={styles.leftChildrenContainer}>
					<TouchableOpacity onPress={onPressLeft}>
						<View style={styles.leftMainContainer}>
							{viewLeft}
						</View>
					</TouchableOpacity>
				</View>

				<View style={styles.rightChildrenContainer}>
					<TouchableOpacity onPress={onPressRight}>
						{
							<View style={styles.rightMainContainer}>
								{viewRight}
							</View>
						}
					</TouchableOpacity>
				</View>
			</View>
			<Animated.View style={[styles.childrenContainer, {top: heightImg}]}>
				<View style={styles.centerMainContainer}>
					<TouchableOpacity onPress={onPressCenter} disabled={disabledImg ? disabledImg : false}>
						<View style={styles.containerCenter}>
							{
								viewCenter ?
									viewCenter :
									<View>
										<FastImage
											style={styles.floatImg}
											source={{
												uri: img ? img : Constant.USER_PLACEHOLDER,
												priority: FastImage.priority.high,
											}}
											resizeMode={FastImage.resizeMode.cover}/>
										<View style={styles.dot}></View>
									</View>
							}
						</View>
					</TouchableOpacity>
				</View>
			</Animated.View>
		</Animated.View>
	);
};
export default SNSHeaderWithAbsoluteImage;
const styles = StyleSheet.create({
	mainContainer: {
		flexDirection: "column",
		height: DeviceInfo.hasNotch ? 120 : 100,
		justifyContent: "center",
		paddingTop: 50,
	},
	leftChildrenContainer: {
		marginLeft: 19,
		flex: 1,
		height: 58,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	leftMainContainer: {
		justifyContent:"center",
		alignItems:"center"
	},
	rightChildrenContainer: {
		marginRight: 19,
		flex: 1,
		height: 58,
		justifyContent: "center",
		alignContent: "flex-end",
	},
	rightMainContainer: {
		justifyContent:"center",
		alignItems: "flex-end"
	},
	centerMainContainer: {
		justifyContent:"center",
		alignItems:"center",
		width: 100,
		height: 100,
	},
	childrenContainer: {
		flex: 1,
		height: 100,
		top: 66,
		position:"absolute",
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		alignSelf: "center",
	},
	children: {
		alignSelf: "center",
		fontSize: 17,
	},
	floatImg: {
		width: 98,
		height: 98,
		borderRadius: 49,
		borderColor: colors.black_twenty,
		borderWidth: 1,
		alignSelf: "center",
		alignItems: "center",
		alignContent: "center",
	},
	containerCenter: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
	dot: {
		position: "absolute",
		width: 11,
		height: 11,
		bottom: 8.75,
		right: 8.75,
		borderRadius: 5.5,
		backgroundColor: colors.green
	}
});
