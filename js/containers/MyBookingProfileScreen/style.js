import {StyleSheet, Platform} from "react-native";
import {colors} from "../../shared/utils/colors/colors";
import {ScreenHeight, ScreenWidth} from "../../shared/utils/dimension/Divices";
import fonts from "../../shared/utils/fonts/fonts";

const HEADER_HEIGHT = ScreenHeight * 0.3;
const HEADER_WIDTH = ScreenWidth;

export const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: colors.white,
		flex: 1,
	},
	content: {
		paddingStart: 27,
		paddingEnd: 20
	},
	drawer: {
		marginStart: 10
	},
	headerBackground: {
		backgroundColor: colors.deluge,
		height: HEADER_HEIGHT,
		width: HEADER_WIDTH,
		borderBottomLeftRadius: 60
	},
	welcomeTitle: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 28,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		color: colors.textDefault,
		marginBottom: 22,
		marginTop: 11
	},
	noData: {
		textAlign: "center",
		fontFamily: fonts.family.nunito.regular,
		fontSize: 15
	},
	signInTitle: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 14,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		marginTop: 8,
		color: colors.textDefaultWithOpacity
	},
	mainContent: {
		marginStart: 32,
		marginEnd: 32,
		flex: 1,
		marginBottom: 38
	},
	headerLeft: {
		marginStart: 32
	},
	inputEmail: {
		marginTop: 34,
		marginBottom: 69
	},
	inputPass: {
		marginBottom: 9,
		backgroundColor: colors.white
	},
	formContainer: {
		backgroundColor: colors.white,
		paddingTop: 0,
		marginLeft: 10,
		marginEnd: 10
	},
	buttonView: {
		width: 200,
		height: 65,
		// backgroundColor: null
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignContent: "center"
	},
	buttonText: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 16,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		color: colors.blue
	},
	dismiss: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 16,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		color: colors.red
	},
	mottoText: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 14,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "center",
		color: colors.textDefaultWithOpacity
	},
	leagueStyle: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 20,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		color: colors.textDefault,
		marginLeft: 20,
	},
	leagueContainer: {
		marginTop: 23,
		marginBottom: 20
	},
	marginWithBottomTitle: {
		marginBottom: 20
	},
	marginWithTopTitle: {
		marginTop: 0
	},
	leagueItemContainer: {
		borderRadius: 6,
		marginEnd: 13,
		marginBottom: 20,
	},
	imageItemContainer: {
		width: 140,
		height: 140,
		borderRadius: 70
	},
	titleItem: {
		fontFamily: fonts.family.avenir_book.regular,
		fontSize: 15,
		fontWeight: "bold",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "center",
		marginLeft: 5,
		marginEnd: 5,
		alignSelf: "center",
		alignItems: "center",
		color: colors.black_title_league_joined
	},
	eventItem: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 14,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "left",
		color: colors.yellow_event
	},
	eventDetailItem: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 14,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "left",
		color: colors.yellow_event_title
	},
	descItem: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 14,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "left",
		paddingRight: 30,
		marginRight: 30,
		color: colors.textDefaultWithOpacity
	},
	itemContentContainer: {
		flexDirection: "column",
		alignContent: "center",
		alignItems: "center",
		justifyContent: "center"
	},
	badge: {
		position: "absolute",
		height: 10,
		width: 10,
		backgroundColor: colors.yellow_default,
		borderRadius: 10,
		bottom: 6,
		left: 0
	},
	plusBtn: {
		position: "absolute",
		bottom: 10,
		right: 15,
		width: 63,
		height: 63
	},
	titleLeague: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20
	},
	scrollContainer: {
		marginStart: 8,
		marginEnd: 1
	},
	uploadImageContainer: {
		borderRadius: 70,
		height: 140,
		width: 140,
		// overflow: "hidden",
		alignSelf: "center",
		justifyContent: "center",
		alignContent: "center",
		// elevation: 4
	},
	title: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 22,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "left",
		color: colors.black,
	},
	shadow: {
		shadowColor: "#00000024",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 5,
		shadowOpacity: 1,
	},
	camera: {
		position: "absolute",
		height: 20,
		width: 20,
		bottom: 6,
		right: Platform.OS === "ios" ? 14 : 6,
		borderRadius: 10,
		backgroundColor: colors.white,
		justifyContent: "center",
		alignContent: "center",
		elevation: 4
	},
	profilePicture: {
		width: 140,
		height: 140,
		borderRadius: 70,
		// overflow: "hidden",
		// backgroundColor: "#6abd45"
		// left: "0%",
		// marginTop: Platform.OS === "ios" ? 0 : 15,
		// marginBottom: Platform.OS === "ios" ? 25 : 25,
		// elevation: 4
	},
	mock: {
		width: 110,
		height: 110,
		alignSelf: "center"
	},
	imgBackground: {
		paddingTop: 50,
		width: ScreenWidth,
		height:  ScreenHeight * 0.35,
		zIndex: -1
	},
	waveContainer: {
		width: ScreenWidth,
		height: ScreenHeight / 6,
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
	},
	containerSquare: {
		width: ScreenWidth/4,
		height: ScreenWidth/4,
		borderRadius: ScreenWidth/8,
		borderColor: colors.black_lightly,
		borderWidth: 1,
		overflow: "hidden",
		justifyContent: "center"
	},
	containerSquareContainer: {
		width: ScreenWidth/4,
		height: ScreenWidth/4,
		borderRadius: ScreenWidth/8,
		overflow: "hidden",
		// justifyContent: "center"
	},
	name: {
		fontFamily: fonts.family.nunito.bold,
		fontSize: 17,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: -0.15,
		textAlign: "left",
		color: "#222222",
	},
	info: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 13,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: -0.15,
		textAlign: "left",
		color: "#222222",
	},
	email: {
		fontFamily: fonts.family.nunito.bold,
		fontSize: 20,
		textAlign: "center",
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		color: "#212224"
	},
	btnLoginContainer: {
		height: 70,
		marginLeft: 20,
		marginRight: 20
	},
	btnDismissContainer: {
		height: 70,
		marginBottom: 27,
		marginLeft: 20,
		marginRight: 20
	},
	buttonSignInContainer: {
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		height: 53,
		backgroundColor: colors.white,
		borderColor: colors.blue,
		borderWidth: 1,
		borderRadius: 26.5,
	},
	buttonDismissContainer: {
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		height: 53,
		backgroundColor: colors.white,
	},
	btnLogin: {
		marginTop: 38,
	},
	noLeagueJoinedContainer: {
		marginTop: Platform.OS === "ios" ? 130 : 100,
		marginEnd: 22,
		marginLeft: 22
	},
	totalPointContainer: {
		height: 63,
		borderRadius: 8,
		backgroundColor: "#ffffff",
		shadowColor: "rgba(0, 0, 0, 0.14)",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 22,
		shadowOpacity: 1,
		elevation: 4,
		flexDirection: "row"
	},
	totalPoint: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 20,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "left",
		color: colors.black_title,
		alignSelf: "center",
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		marginLeft: 22
	},
	totalPointBound: {
		alignSelf: "center",
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
	},
	pointBound: {
		width: "50%",
		alignSelf: "flex-end",
		justifyContent: "flex-end",
		alignContent: "flex-end",
		alignItems: "flex-end",
	},
	point: {
		fontFamily: fonts.family.nunito.bold,
		fontSize: 40,
		fontStyle: "normal",
		letterSpacing: 0,
		color: colors.yellow_point,
		alignSelf: "flex-end",
		marginBottom: 3,
		marginEnd: Platform.OS === "ios" ? 22 : 30
	},
	myLeague: {
		fontFamily: fonts.family.nunito.bold,
		fontSize: 20,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "left",
		color: colors.black_title,
		marginTop: 28,
		marginBottom: 28,
	},
	img: {
		width: 140,
		height: 140,
		borderRadius: 70,
	},
	imgBound: {
		shadowColor: "rgba(0, 0, 0, 0.14)",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 5,
		shadowOpacity: 1,
		elevation: 4,
	},
	baseContainer: {
		marginTop: 25,
		marginLeft: 22,
		marginEnd: 22
	},
	itemUserContainer: {
		height: 37, 
		alignItems: "flex-end",
		borderRadius: 8,
		backgroundColor: "#ffffff",
		flexDirection: "row",
	},
	itemEmailContainer: {
		paddingLeft: 5,
		height: 54, 
		justifyContent: "flex-start", 
		alignItems: "center",
		alignSelf: "flex-start",
		width: ScreenWidth - 40, 
		borderRadius: 8,
		backgroundColor: "#ffffff",
		flexDirection: "row",
		shadowColor: "rgba(0, 0, 0, 0.2)",
		shadowOffset: {
			width: 0,
			height: 2
		},
		marginTop: 30,
		opacity: 0.4,
		shadowRadius: 10,
		shadowOpacity: 1,
		elevation: 1,
	},
	itemUserEditContainer: {
		paddingLeft: 5,
		height: 48, 
		justifyContent: "flex-start", 
		alignItems: "center",
		alignSelf: "flex-start",
		width: ScreenWidth - 40, 
		marginTop: 10,
		borderRadius: 8,
		backgroundColor: "#ffffff",
		flexDirection: "row"
	},
	field: {
		color: colors.black, 
		marginLeft: 5
	},
	phoneEmergency: {
		flex: 1,
		width: "100%",
		maxWidth: 315,
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: colors.input_underline,
	},
	labelPhoneEmergency: {
		fontSize: 14,
		fontFamily: fonts.family.nunito.regular,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: -0.7,
		opacity: 0.5,
		color: colors.black							
	},
	textPhoneEmergency: {
		fontFamily: fonts.family.montserrat.regular,
		fontSize: 17,
		color: colors.black,
		letterSpacing: 0.38,
		flex: 1
	},
	inputPhoneEmergency: {
		fontFamily: fonts.family.nunito.regular,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: -0.7,
		opacity: 0.5,
		color: colors.black
	},
	line: {
		marginTop: 15,
		height: 10,
		width: "100%", 
		backgroundColor: colors.black_five, 
		justifyContent: "flex-start", 
		alignItems: "center",
		alignSelf: "flex-start",
		marginBottom: 10,
		shadowColor: "rgba(0, 0, 0, 0.5)",
		shadowOffset: {
			width: 0,
			height: 10
		},
		shadowRadius: 22,
		shadowOpacity: 1,
		elevation: 4,
		flexDirection: "row"
	},
	itemUserContainerEditable: {
		paddingLeft: 20,
		height: 54, 
		justifyContent: "flex-start", 
		alignItems: "center",
		alignSelf: "flex-start",
		width: ScreenWidth - 40, 
		marginLeft: 20,
		marginBottom: 10,
		borderRadius: 8,
		backgroundColor: "#ffffff",
		shadowColor: "rgba(0, 0, 0, 0.14)",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 22,
		shadowOpacity: 1,
		elevation: 4,
	},
	itemUser: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 16,
		letterSpacing: 0,
		color: colors.black,
		marginLeft: 15,
	},
	itemUserDisable: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 16,
		letterSpacing: 0,
		color: colors.black,
		opacity: 0.7
	},
	itemUserDisableText: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: 16,
		letterSpacing: 0,
		textAlign: "right", 
		paddingRight: 10,
		color: colors.black,
	},
	logout: {
		fontFamily: fonts.family.nunito.bold,
		fontSize: 16,
		letterSpacing: 0,
		color: colors.red,
		marginLeft: 10,
	},
	setting: {
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		alignSelf: "center",
	}
});

export default styles;