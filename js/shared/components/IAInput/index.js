import React from "react";
import {Dropdown} from "react-native-material-dropdown";
import NormalInput from "./NormalInput";

export default function IAInput({type, ...rest}) {
	switch (type) {
	case "dropdown":
		return <Dropdown {...rest} />;
	default:
		return <NormalInput {...rest} />;
	}
}
