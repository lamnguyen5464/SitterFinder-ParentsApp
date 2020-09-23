import React from "react";
import {View} from "react-native";
import JitsiMeet, {JitsiMeetView} from "react-native-jitsi-meet";
import BaseScreen from "../BaseScreen";
import DropdownAlert from "react-native-dropdownalert";
import {colors} from "../../shared/utils/colors/colors";
import IALocalStorage from "../../shared/utils/storage/IALocalStorage";
import { AxiosFetch } from "../../api/AxiosFetch";

class VideoScreen extends BaseScreen {
	constructor(props) {
		super(props);
		this.onConferenceTerminated = this.onConferenceTerminated.bind(this);
		this.onConferenceJoined = this.onConferenceJoined.bind(this);
		this.onConferenceWillJoin = this.onConferenceWillJoin.bind(this);
	}

	async componentDidMount() {
		let user = await IALocalStorage.getUserInfo();
		AxiosFetch({
			method: "POST",
			url: "api/calls/save",
			data: {
				fromId: user.id,
				time: new Date().getMilliseconds(),
				toId: "-Lw0ypLS3OAF-xnLWYaZ",
			},
			contentType: "application/json",
			onSuccess: data => {	
			},
			onError: error => {
			},
			hasToken: true
		});
		this.dropDownAlertRef.alertWithType("success", "Success", "Welcome to BabySitter interview. You will be interviewed something before starting working job by our administrator!" );
		
		setTimeout(() => {
			JitsiMeet.call("https://meet.jit.si/" + "admin_coff" + user.id);
		}, 1000);
	}

	onConferenceTerminated(nativeEvent) {
		/* Conference terminated event */
		this.goBack();
	}

	onConferenceJoined(nativeEvent) {
		/* Conference joined event */
	}

	onConferenceWillJoin(nativeEvent) {
		/* Conference will join event */
	}

	render() {
		return (
			<View style={{flex: 1, backgroundColor: "black"}}>
				<JitsiMeetView onConferenceTerminated={this.onConferenceTerminated} onConferenceJoined={this.onConferenceJoined} onConferenceWillJoin={this.onConferenceWillJoin} style={{flex: 1, height: "100%", width: "100%"}} />
				<DropdownAlert warnColor={colors.orange} warnImageSrc={null} successImageSrc={null} ref={ref => this.dropDownAlertRef = ref} />
			</View>
		);
	}
}

export default VideoScreen;