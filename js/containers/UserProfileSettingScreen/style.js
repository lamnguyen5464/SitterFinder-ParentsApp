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
		paddingTop: 10,
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
		color: colors.whiteWithOpacity
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
		width: 90,
		height: 90,
		borderRadius: 10
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
		borderRadius: 45,
		height: 90,
		width: 90,
		overflow: "hidden",
		alignSelf: "center",
		justifyContent: "center",
		alignContent: "center",
		elevation: 4
	},
	title: {
		fontFamily: fonts.family.nunito.regular,
		fontSize: Platform.OS === "ios" ? 28 : 24,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "left",
		color: colors.black,
		marginLeft: 25
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
		height: 24,
		width: 24,
		bottom: 8,
		right: 4,
		borderRadius: 12,
		backgroundColor: colors.white,
		justifyContent: "center",
		alignContent: "center",
		elevation: 4
	},
	profilePicture: {
		position: "absolute",
		width: "30%",
		left: "35%",
		bottom: Platform.OS === "ios" ? ScreenHeight/25 : ScreenHeight/55,
		elevation: 4
	},
	mock: {
		width: 110,
		height: 110,
		alignSelf: "center"
	},
	imgBackground: {
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
		width: 110,
		height: 110
	},
	name: {
		fontFamily: fonts.family.nunito.bold,
		fontSize: 26,
		fontWeight: "bold",
		fontStyle: "normal",
		letterSpacing: -0.15,
		textAlign: "center",
		color: "#222222",
		marginTop: -20,
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
		marginBottom: 27
	},
	buttonSignInContainer: {
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		height: 53,
		backgroundColor: colors.green,
		borderRadius: 26.5,
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
		width: 90,
		height: 133,
		borderRadius: 6,
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
		paddingLeft: 5,
		height: 60, 
		justifyContent: "space-between", 
		alignItems: "center",
		alignSelf: "center",
		width: ScreenWidth - 40, 
		borderRadius: 8,
		backgroundColor: "#ffffff",
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
		marginLeft: 15,
		opacity: 0.5
	},
	logout: {
		fontFamily: fonts.family.nunito.bold,
		fontSize: 16,
		letterSpacing: 0,
		color: colors.red,
		marginLeft: 10,
	},
	setting: {
		position: "absolute", 
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		top: 5, 
		right: 20
	},
	securityContainer: {
		justifyContent: "center", 
		alignItems: "center",
		alignSelf: "center", flexDirection: "row"
	}
});

export default styles;
