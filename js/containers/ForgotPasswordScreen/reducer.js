import update from "immutability-helper";
import {FetchStatus} from "../../shared/utils/fetchStatus/fetchStatus";
import * as constants from "./constants";

const initialState = {
	resetPassword: {
		status: FetchStatus.default(),
		error: null
	}
};

function resetPasswordReducer(state = initialState, action) {
	switch (action.type) {
	case constants.RESET_PASSWORD: {
		return update(state, {
			resetPassword: {
				status: {$set: FetchStatus.fetching()}
			}
		});
	}
	case constants.RESET_PASSWORD_SUCCESS: {
		return update(state, {
			resetPassword: {
				status: {$set: FetchStatus.success()}
			}
		});
	}
	case constants.RESET_PASSWORD_FAILURE: {
		const {error} = action.payload;
		return update(state, {
			resetPassword: {
				status: {$set: FetchStatus.failure()},
				error: {$set: error}
			}
		});
	}
	default:
		return state;
	}
}

export default resetPasswordReducer;
