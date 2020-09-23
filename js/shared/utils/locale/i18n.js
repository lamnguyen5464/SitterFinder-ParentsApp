import ReactNative from "react-native";
import I18n from "i18n-js";

// Import all locales
import en from "./en.json";
import fr from "./fr.json";

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;
I18n.defaultLocale = "en";

// Define the supported translations
I18n.translations = {
	en,
	fr
};

I18n.locale = "en";

const currentLocale = I18n.currentLocale();

// Is it a RTL language?
export const isRTL = currentLocale.indexOf("en") === 0 || currentLocale.indexOf("fr") === 0;

// Allow RTL alignment in RTL languages
ReactNative.I18nManager.allowRTL(isRTL);

// The method we'll use instead of a regular string
export function strings(name, params = {}) {
	return I18n.t(name, params);
}

export default I18n;