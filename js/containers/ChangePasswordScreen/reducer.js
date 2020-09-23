import update from "immutability-helper";
import {FetchStatus} from "../../shared/utils/fetchStatus/fetchStatus";
import * as constants from "./constants";

const initialState = {
	changePassword: {
		status: FetchStatus.default(),
		error: null
	},
	resetPasswordByToken: {
		status: FetchStatus.default(),
		error: null
	}
};

function changePasswordReducer(state = initialState, action) {
	switch (action.type) {
	case constants.CHANGE_PASSWORD: {
		return update(state, {
			changePassword: {
				status: {$set: FetchStatus.fetching()}
			}
		});
	}
	case constants.CHANGE_PASSWORD_SUCCESS: {
		return update(state, {
			changePassword: {
				status: {$set: FetchStatus.success()}
			}
		});
	}
	case constants.CHANGE_PASSWORD_FAILURE: {
		const {error} = action.payload;
		return update(state, {
			changePassword: {
				status: {$set: FetchStatus.failure()},
				error: {$set: error}
			}
		});
	}
	case constants.RESET_PASSWORD_BY_TOKEN: {
		return update(state, {
			resetPasswordByToken: {
				status: {$set: FetchStatus.fetching()}
			}
		});
	}
	case constants.RESET_PASSWORD_BY_TOKEN_SUCCESS: {
		return update(state, {
			resetPasswordByToken: {
				status: {$set: FetchStatus.success()}
			}
		});
	}
	case constants.RESET_PASSWORD_BY_TOKEN_FAILURE: {
		const {error} = action.payload;
		return update(state, {
			resetPasswordByToken: {
				status: {$set: FetchStatus.failure()},
				error: {$set: error}
			}
		});
	}
	default:
		return state;
	}
}

export default changePasswordReducer;
