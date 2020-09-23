import * as React from "react";
import {View, Platform} from "react-native";
import {
	Drawer,
	withTheme,
	List,
	DefaultTheme
} from "react-native-paper";
import Icons from "react-native-vector-icons/MaterialIcons";
import {colors} from "../../utils/colors/colors";
import I18n from "../../utils/locale/i18n";

const CLOSE_ICON_SIZE = 24;
const MENU_ITEM_TITLE_COLOR = colors.black;
const customThemeMenu = {
	colors: {text: MENU_ITEM_TITLE_COLOR, primary: MENU_ITEM_TITLE_COLOR}
};

class DrawerItems extends React.Component {
  onPressMenu = () => {};

  onPressClose = () => {
  	const {navigation} = this.props;
  	navigation.toggleDrawer();
  };

  renderDrawerItem = props => (
  	<Drawer.Item
  		{...props}
  		label={I18n.t(props.label)}
  		key={props.key}
  		theme={customThemeMenu}
  		onPress={this.onPressMenu}
  		style={styles.drawerItem}
  	/>
  );

  renderContent = menuData => (
  	<React.Fragment>
  		{menuData.map(props => {
  			if (props.children && props.children instanceof Array)
  				return (
  					<List.Accordion
  						{...props}
  						title={I18n.t(props.label)}
  						titleStyle={[styles.menuLabel, styles.expandLabel]}
  						left={props.icon}
  						style={[styles.drawerItem, {marginLeft: 10}]}
  						theme={customThemeMenu}
  					>
  						<View style={{backgroundColor: colors.gray_less}}>
  							{props.children.map(childProps =>
  								this.renderDrawerItem(childProps)
  							)}
  						</View>
  					</List.Accordion>
  				);
  			return this.renderDrawerItem(props);
  		})}
  	</React.Fragment>
  );

  render() {
  	const {menuData, customContent} = this.props;
  	return (
  		<View style={[styles.drawerContent]}>
  			<View style={[styles.header]}>
  				<Icons
  					name="close"
  					color={colors.white}
  					size={CLOSE_ICON_SIZE}
  					onPress={this.onPressClose}
  				/>
  			</View>
  			{(customContent && customContent) || this.renderContent(menuData ? menuData : [])}
  		</View>
  	);
  }
}

const styles = {
	drawerContent: {
		flex: 1,
		backgroundColor: colors.white
	},
	preference: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 12,
		paddingHorizontal: 16
	},
	header: {
		marginTop: 135,
		height: 135,
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.red,
		paddingTop: Platform.OS === "android" ? 25 : 22,
		paddingHorizontal: 13
	},
	headerContent: {
		flex: 1,
		maxHeight: 54,
		marginHorizontal: 13
	},
	name: {
		fontFamily: "Helvetica",
		fontSize: 17,
		color: colors.white,
		letterSpacing: 0.38,
		fontWeight: "500"
	},
	email: {
		fontFamily: "Helvetica",
		fontSize: 12,
		color: colors.white,
		letterSpacing: 0.27
	},
	drawerItem: {
		borderBottomWidth: 0.5,
		borderBottomColor: colors.black_lightly
	},
	menuLabel: {
		fontSize: 15,
		letterSpacing: 0.34,
		color: MENU_ITEM_TITLE_COLOR,
		fontFamily: DefaultTheme.fonts.medium
	},
	expandLabel: {
		marginLeft: 23
	}
};

export default withTheme(DrawerItems);
