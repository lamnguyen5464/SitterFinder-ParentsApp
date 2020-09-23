import update from "immutability-helper";
import {FetchStatus} from "../../shared/utils/fetchStatus/fetchStatus";
import * as constants from "./constants";

const initialState = {
	signUp: {
		status: FetchStatus.default(),
		error: null,
		data: {}
	}
};

function signUpReducer(state = initialState, action) {
	switch (action.type) {
	case constants.SIGN_UP: {
		return update(state, {
			signUp: {
				status: {$set: FetchStatus.fetching()}
			}
		});
	}
	case constants.SIGN_UP_SUCCESS: {
		return update(state, {
			signUp: {
				status: {$set: FetchStatus.success()},
				error: {$set: null},
				data: {$set: action.payload.result.data}
			}
		});
	}
	case constants.SIGN_UP_FAILURE: {
		const {error} = action.payload;
		return update(state, {
			signUp: {
				status: {$set: FetchStatus.failure()},
				error: {$set: error}
			}
		});
	}
	default:
		return state;
	}
}

export default signUpReducer;
