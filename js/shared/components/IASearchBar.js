import React, {Component} from "react";
import {View, StyleSheet} from "react-native";
import SearchBar from "react-native-search-box";
import Ant from "react-native-vector-icons/AntDesign";
import {colors} from "../utils/colors/colors";
import {strings} from "../utils/locale/i18n";

class IASearchBar extends Component {
	renderDeleteIcon() {
		return <Ant name={"closecircle"} size={14} color={colors.black} />;
	}
	render() {
		const {onCancel, onSearch} = this.props;
		return (
			<View>
				<SearchBar
					onCancel={onCancel}
					useClearButton={true}
					autoFocus={true}
					iconDelete={this.renderDeleteIcon()}
					backgroundColor={colors.gray}
					cancelButtonStyle={styles.cancelBtn}
					onSearch={onSearch}
					placeholder={strings("search")}
					cancelTitle={strings("cancel")}
					inputStyle={styles.inputStyle}
				/>
			</View>
		);
	}
}
export default IASearchBar;

const styles = StyleSheet.create({
	cancelBtn: {
		color: colors.black,
		fontSize: 14
	},
	inputStyle: {
		borderColor: colors.black
	}
});
