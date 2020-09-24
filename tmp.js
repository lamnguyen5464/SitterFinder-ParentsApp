import React, {Component} from "react";
import {View, Keyboard, Alert, TouchableOpacity, Text} from "react-native";
import I18n from "./js/shared/utils/locale/i18n";
import {PacmanIndicator} from "react-native-indicators";
import BaseScreen from "./js/containers/BaseScreen";
import store from "./js/store/configureStore";


const Store = new store();
export default class Tmp extends BaseScreen{

    render(){
        return(
            <Provider store = {Store}>

            </Provider>
        );
    }

}