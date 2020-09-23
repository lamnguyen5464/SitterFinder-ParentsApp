import update from "immutability-helper";
import {FetchStatus} from "../../shared/utils/fetchStatus/fetchStatus";
import * as constants from "./constants";

const initialState = {
	signIn: {
		status: FetchStatus.default(),
		error: null,
		userInfo: {}
	}
};

function loginReducer(state = initialState, action) {
	switch (action.type) {
	case constants.SIGN_IN: {
		return update(state, {
			signIn: {
				status: {$set: FetchStatus.fetching()}
			}
		});
	}
	case constants.SIGN_IN_SUCCESS: {
		return update(state, {
			signIn: {
				status: {$set: FetchStatus.success()},
				userInfo: {$set: action.payload.result.data}
			}
		});
	}
	case constants.SIGN_IN_FAILURE: {
		const {error} = action.payload;
		return update(state, {
			signIn: {
				status: {$set: FetchStatus.failure()},
				error: {$set: error}
			}
		});
	}
	default:
		return state;
	}
}

export default loginReducer;
