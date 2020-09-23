import {SPLASH_ANIM, SPLASH_COUNTER, SPLASH_ANIM_FINISH} from "./constants";

export function splashAnim() {
	return {
		type: SPLASH_ANIM
	};
}

export function splashAnimCounter(num) {
	return {
		type: SPLASH_COUNTER,
		num
	};
}

export function splashAnimFinish() {
	return {
		type: SPLASH_ANIM_FINISH
	};
}
