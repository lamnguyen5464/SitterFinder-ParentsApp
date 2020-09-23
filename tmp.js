import React, {Component} from "react";
import {View, Keyboard, Alert, TouchableOpacity, Text} from "react-native";
import I18n from "./js/shared/utils/locale/i18n";

export default class Tmp extends Component{

    render(){
        return(
            <View>

<Text>12312312</Text>   
                <Text>{I18n.t("ok")}</Text>
                <Text>12312312</Text>
            </View>

        );
    }

}