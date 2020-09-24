import React, {Component} from "react";
import {View, Text, StatusBar} from "react-native";
import BaseScreen from "./js/containers/BaseScreen";
import IAHeader from "./js/shared/components/IAHeader";
import {Provider} from "react-redux";
import PaymentScreen from "./js/containers/PaymentScreen";
import store from "./js/store/configureStore";

const StoreRedux = new store();
export class Screen1 extends BaseScreen{

	render(){
		return(
			// <View>
			// 	<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>
			// 	<IAHeader 
			// 		viewLeft={this.renderBackButton()}
			// 		viewRight={<Text>Go</Text>}
			// 		onPressRight={()=>{
			// 			console.log("pressed Go");
			// 			this.goToScreen(Screen2, {});
			// 			}
			// 		}
			// 		onPressLeft={()=>{
			// 			console.log("pressed Back screen 1");
			// 			this.goBack();
			// 			}
			// 		}/>

			// 	<Text>Screen 1</Text>
			// </View>
			<Provider store = {StoreRedux}>
				<PaymentScreen/>
			</Provider>
		);
	}
}
export class Screen2 extends BaseScreen{

	render(){
		return(
			<View>
				<StatusBar barStyle="dark-content" backgroundColor="black" translucent={true}/>
				<IAHeader 
					viewLeft={this.renderBackButton()}
					viewRight={<Text>Go</Text>}
					onPressLeft={()=>{
						console.log("pressed Back screen 2");
						this.goBack()
						}
					}/>

				<Text>Screen 2</Text>
			</View>
		);
	}
}