// import ReactNative from "react-native";
// import I18n from "i18n-js";

// // Import all locales
// import en from "./en.json";
// import vi from "./vi.json";

// // Should the app fallback to English if user locale doesn't exists
// I18n.fallbacks = true;
// I18n.defaultLocale = "en";

// // Define the supported translations
// I18n.translations = {
// 	en,
// 	vi
// };

// I18n.locale = "en";

// const currentLocale = I18n.currentLocale();
// console.log(currentLocale);

// // Is it a RTL language?
// export const isRTL = currentLocale.indexOf("en") === 0 || currentLocale.indexOf("vi") === 0;

// // Allow RTL alignment in RTL languages
// ReactNative.I18nManager.allowRTL(isRTL);

// // The method we'll use instead of a regular string
// export function strings(name, params = {}) {
// 	return I18n.t(name, params);
// }

// export default I18n;

import I18n from "i18n-js";
import * as RNLocalize from "react-native-localize";

import en from "./en.json";
import vi from "./vi.json";

const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

I18n.fallbacks = true;
I18n.translations = {
  en,
  vi
};

export default I18n;