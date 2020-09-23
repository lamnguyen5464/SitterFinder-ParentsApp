import React, {Component} from "react";
import {TouchableOpacity, View, StyleSheet} from "react-native";
import DeviceInfo from "react-native-device-info";
import {colors} from "../utils/colors/colors";
import * as devices from "../../shared/utils/device/device";
import IASearchBar from "./IASearchBar";


class IAHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSearchable: true
		};
	}

  toggleSearchSection = () => isNormalReverse => {
  	this.setState({
  		isSearchable: !isNormalReverse
  	});
  };

  // Default lef icon pressable is for searching
  render() {
  	const {
  		style,
  		onPressLeft,
  		onPressRight,
  		viewRight,
  		viewCenter,
  		viewLeft,
  		onSearch,
  		styleCenter,
  		styleLeft,
  		styleRight
  		// isSearchInPressedLeft
  	} = this.props;
  	const {isSearchable} = this.state;
  	return (
  		<View>
  			{isSearchable ? (
  				<View style={[styles.mainContainer, style]}>
  					<View style={[styles.leftChildrenContainer, styleLeft]}>
  						<TouchableOpacity
  							onPress={(onPressLeft && onPressLeft) || this.toggleSearchSection(isSearchable)}
  						>
  							<View style={styles.leftMainContainer}>{viewLeft}</View>
  						</TouchableOpacity>
  					</View>
  					<View style={[styles.childrenContainer, styleCenter]}>
  						<View style={styles.centerMainContainer}>{viewCenter}</View>
  					</View>
  					<View style={[styles.rightChildrenContainer, styleRight]}>
  						<TouchableOpacity
  							onPress={(onPressRight && onPressRight) || this.toggleSearchSection(isSearchable)}
  						>
  							{<View style={styles.rightMainContainer}>{viewRight}</View>}
  						</TouchableOpacity>
  					</View>
  				</View>
  			) : (
  				<View style={[styles.mainContainer, styles.mainContainerExtraSearch]}>
  					<IASearchBar
  						onCancel={() => {
  							this.toggleSearchSection(isSearchable);
  							onSearch("");
  						}}
  						onSearch={onSearch}
  					/>
  				</View>
  			)}
  		</View>
  	);
  }
}
export default IAHeader;
const styles = StyleSheet.create({
	mainContainer: {
		flexDirection: "row",
		height: DeviceInfo.hasNotch() ? 98 : 78,
		justifyContent: "center",
		paddingTop: devices.isIphoneX()? 28 : 10
	},
	mainContainerExtraSearch: {
		flexDirection: "column",
		backgroundColor: colors.gray
	},
	leftChildrenContainer: {
		marginLeft: 19,
		flex: 1,
		justifyContent: "center",
		alignItems: "flex-start",
		alignContent: "center"
	},
	leftMainContainer: {
		justifyContent: "flex-start",
		alignItems: "center",
		alignContent: "center",
		alignSelf: "center"
	},
	rightChildrenContainer: {
		marginRight: 20,
		flex: 1,
		justifyContent: "center",
		alignContent: "flex-end"
	},
	rightMainContainer: {
		justifyContent: "flex-end",
		alignItems: "flex-end",
		alignSelf: "flex-end"
	},
	centerMainContainer: {
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		alignSelf: "center"
	},
	childrenContainer: {
		// flex: 2,
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		alignSelf: "center"
	},
	children: {
		alignSelf: "center",
		fontSize: 17
	}
});
