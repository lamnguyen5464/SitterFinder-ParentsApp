/* eslint-disable no-unused-vars */
/**
 * Author: UraNashel
 * Email: tan.nguyen@inapps.net
 */
import "react-native-gesture-handler";
import React, {Component} from "react";
import {Vibration, Linking, Text} from "react-native";
import {Provider} from "react-redux";
import store from "./js/store/configureStore";
import AppContainer from "./js/route/MainStackRouter";
const Store = new store();
// import firebase, {Notification, NotificationOpen, RemoteMessage} from "react-native-firebase";
import {
	Provider as PaperProvider,
} from "react-native-paper";
import IALocalStorage from "./js/shared/utils/storage/IALocalStorage";
import LogManager from "./js/shared/utils/logging/LogManager";
import DropdownAlert from "react-native-dropdownalert";
import Constant from "./js/shared/utils/constant/Constant";
import {colors} from "./js/shared/utils/colors/colors";
import {deeplinkHandler} from "./js/shared/utils/deeplink/deeplinkHandler";
import NavigationService from "./js/shared/utils/navigation/NavigationService";
import {AlertHelper} from "./js/shared/utils/AlertHelper";

export default class App extends Component {
	// componentDidMount() {
	// 	this._configNotAllowScalingFont();
	// 	console.disableYellowBox = true;
	// 	this.checkPermission();
	// 	this.deeplinkListener();
	// 	this.registerHearingNotification();
	// 	this.registerWatchingNotificationOpened();
	// 	this.registerNotificationInBackground();
	// 	// firebase.messaging().ios.registerForRemoteNotifications();
	// }

	// _configNotAllowScalingFont = () => {
	// 	Text.defaultProps = Text.defaultProps || {};
	// 	Text.defaultProps.allowFontScaling = false;
	// };

	// componentWillUnmount() {
	// 	Linking.removeEventListener("url", deeplinkHandler);
	// }
	

  // deeplinkListener = () => {
  // 	Linking.addEventListener("url", deeplinkHandler);
  // 	Linking.getInitialURL().then(url => {
  // 		if (url) {
  // 			deeplinkHandler({url});
  // 		}
  // 	});
  // }

  // // Detect if state of app changes
  // handleAppStateChange = (nextAppState) => {
  // 	LogManager.showFullLog(`handleAppStateChange-data: ${LogManager.parseJsonObjectToJsonString(nextAppState)}`);
  // 	if (nextAppState === "background") {
  // 		console.log("App has come to the background!");
  // 	} else if (nextAppState === "active") {
  // 		// firebase.notifications().removeAllDeliveredNotifications();
  // 	}
  // }

  // // Request permission
  // async requestPermission() {
  // 	try {
  // 		await firebase.messaging().requestPermission();
  // 		// User has authorised
  // 		await this.registerToken();
  // 	} catch (error) {
  // 		// User has rejected permissions
  // 		console.log("permission rejected");
  // 	}
  // }

  // // Register token
  // async registerToken() {
  // 	const fcmToken = await firebase.messaging().getToken();
  // 	if (fcmToken) {
  // 		console.log("FCM token: " + fcmToken);
  // 		let oldToken = await IALocalStorage.getDeviceToken();
  // 		console.log("Old token: " + oldToken);
  // 		if (oldToken !== fcmToken) {
  // 			await IALocalStorage.setDeviceToken(fcmToken);
  // 		}
  // 	}
  // }

  // // Check permission
  // async checkPermission() {
  // 	const enabled = await firebase.messaging().hasPermission();
  // 	if (enabled) {
  // 		await this.registerToken();
  // 	} else {
  // 		await this.requestPermission();
  // 	}
  // }

  // registerNotificationInBackground = () => {
  // 	firebase.notifications().getInitialNotification()
  // 		.then((notificationOpen: NotificationOpen) => {
  // 			console.log("registerNotificationInBackground:" + LogManager.parseJsonObjectToJsonString(notificationOpen));
  // 			if (notificationOpen) {
  // 				// App was opened by a notification
  // 				// Get the action triggered by the notification being opened
  // 				const action = notificationOpen.action;
  // 				// Get information about the notification that was opened
  // 				const notification: Notification = notificationOpen.notification;

  // 				// Do something for logic
  // 			}
  // 		});
  // }

  // registerWatchingNotificationOpened = () => {
  // 	this.notificationOpenedListener =  firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
  // 		// Get information about the notification that was opened
  // 		console.log("registerWatchingNotificationOpened:" + LogManager.parseJsonObjectToJsonString(notificationOpen));
  // 		if (notificationOpen.notification) {
  // 			// NavigationManager.push('chat', {data: notificationOpen.notification._data})
  // 			let data = notificationOpen.notification._data;

  // 			// Do something for logic
  // 			firebase.notifications().removeAllDeliveredNotifications();
  // 		}
  // 	});
  // }

  // registerHearingNotification = () => {
  // 	this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
  // 		// Process your notification as required
  // 		// ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
  // 	});
  // 	this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
  // 		console.log("registerHearingNotification: " + LogManager.parseJsonObjectToJsonString(notification));
  // 		// Check if token is existed
  // 		// IALocalStorage.getTokenUserInfoFacebook()
  // 		// 	.then(val => {
  // 		// 		if (val != undefined) {
  // 					// Process your notification as required
  // 					// let data = notification._data;
  // 					// // if (!data) return;
  // 					// Vibration.vibrate(Constant.NOTIFICATION.VIBRATE_TIME);

  // 					// // Create the channel for Android 8
  // 					// const channel = new firebase.notifications.Android.Channel("Fanathon-channel", "Fanathon Channel", firebase.notifications.Android.Importance.Max)
  // 					// 	.setDescription("Fanathon")
  // 					// 	.setSound("default")
  // 					// 	.enableLights(true)
  // 					// 	.enableVibration(true)
  // 					// 	.setVibrationPattern(true);

  // 					// const localNotification = new firebase.notifications.Notification({
  // 					// 	sound: "default",
  // 					// 	show_in_foreground: true,
  // 					// 	show_in_background: true,
  // 					// })
  // 					// 	.setNotificationId(notification._notificationId)
  // 					// 	.setTitle("You have a new notification")
  // 					// 	.setBody(notification._body)
  // 					// 	.setData(notification._data)
  // 					// 	.setSound("default")
  // 					// 	.android.setChannelId(notification._channelId ? notification._channelId : "General")
  // 					// 	.android.setColor(colors.orange)
  // 					// 	.android.setVisibility(firebase.notifications.Android.Visibility.Public)

  // 					// 	.android.setDefaults(firebase.notifications.Android.Defaults.All)
  // 					// 	.android.setPriority(firebase.notifications.Android.Priority.Max)
  // 					// 	.android.setGroupAlertBehaviour(firebase.notifications.Android.GroupAlert.All)
  // 					// 	.android.setCategory(firebase.notifications.Android.Category.Alarm);

	// 				  // firebase.notifications().android.createChannel(channel);
	// 				  const localNotification = new firebase.notifications.Notification()
  // 			.setNotificationId(notification._notificationId)
  // 			.setTitle(notification._title)
  // 			.setBody(notification._body)
  // 			.setData(notification._data);
  // 					firebase.notifications().displayNotification(localNotification);
  // 					// firebase.notifications().removeDeliveredNotification(localNotification.notificationId);
  // 			// 	}
  // 			// });

  // 		// Remove all notifications
  // 		// firebase.notifications().removeAllDeliveredNotifications();
  // 	});

  // 	firebase.messaging().onMessage((message) => {
  // 		console.log(`registerHearingNotification : onMessage: ${LogManager.parseJsonObjectToJsonString(message)}`);
  // 		Vibration.vibrate(Constant.NOTIFICATION.VIBRATE_TIME);
  // 		backgroundNotificationHandler(message)
  // 			.then();
  // 	});
  // }

  render() {
  	return (
  		<Provider store={Store}>
  			{/* <PaperProvider>
  				<AppContainer/>
				  <DropdownAlert
  					//   defaultContainer={{ padding: 8, paddingTop: StatusBar.currentHeight, flexDirection: 'row' }}
  					ref={ref => AlertHelper.setDropDown(ref)}
  					onClose={() => AlertHelper.invokeOnClose()}
  				/>
  			</PaperProvider> */}
  		</Provider>
  	);
  }
}

// export const backgroundNotificationHandler = async (message: RemoteMessage) => {
// 	return Promise.resolve(message);
// };

