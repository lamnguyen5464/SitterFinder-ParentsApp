import {SPLASH_ANIM, SPLASH_COUNTER, SPLASH_ANIM_FINISH} from "./constants";

const initialState = {
	isAniming: false,
	isAnimFinish: false,
	num: 0
};

function splashReducer(state = initialState, action) {
	switch (action.type) {
	case SPLASH_ANIM:
		return {
			...state,
			isAniming: true
		};
	case SPLASH_COUNTER:
		return {
			...state,
			num: state.num + 1
		};
	case SPLASH_ANIM_FINISH:
		return {
			...state,
			isAnimFinish: true
		};
	default:
		return state;
	}
}

export default splashReducer;
