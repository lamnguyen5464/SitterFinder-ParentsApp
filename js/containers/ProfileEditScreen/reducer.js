import update from "immutability-helper";
import {FetchStatus} from "../../shared/utils/fetchStatus/fetchStatus";
import * as constants from "./constants";

const initialState = {
	userProfile: {
		status: FetchStatus.default(),
		error: null,
		data: {}
	},
	updateUserProfile: {
		status: FetchStatus.default(),
		error: null,
		data: {}
	},
	userProfileUpdate: {
		status: FetchStatus.default(),
		error: null,
	},
	uploadImgGoogleStorage: {
		status: FetchStatus.default(),
		error: null,
		url: "",
	},
	getVersion: {
		status: FetchStatus.default(),
		error: null,
		version: "",
	}
};

function userProfileReducer(state = initialState, action) {
	switch (action.type) {
		
	case constants.GET_USER_PROFILE: {
		return update(state, {
			userProfile: {
				status: {$set: FetchStatus.fetching()},
				error: {$set: null}
			}
		});
	}
	case constants.GET_USER_PROFILE_SUCCESS: {
		return update(state, {
			userProfile: {
				status: {$set: FetchStatus.success()},
				error: {$set: null},
				data: {$set: action.payload.result.data}
			}
		});
	}
	case constants.GET_USER_PROFILE_FAILURE: {
		return update(state, {
			userProfile: {
				status: {$set: FetchStatus.failure()},
				error: {$set: action.payload.error.data ? action.payload.error.data .message : ""}
			}
		});
	}
	case constants.UPDATE_USER_PROFILE: {
		return update(state, {
			updateUserProfile: {
				status: {$set: FetchStatus.fetching()},
				error: {$set: null}
			},
			userProfile: {
				status: {$set: FetchStatus.fetching()},
				error: {$set: null}
			}
		});
	}
	case constants.UPDATE_USER_PROFILE_SUCCESS: {
		return update(state, {
			updateUserProfile: {
				status: {$set: FetchStatus.success()},
				error: {$set: null},
				data: {$set: action.payload.result.data}
			}
		});
	}
	case constants.UPDATE_USER_PROFILE_FAILURE: {
		return update(state, {
			updateUserProfile: {
				status: {$set: FetchStatus.failure()},
				error: {$set: action.payload.error.data ? action.payload.error.data .message : ""}
			}
		});
	}
	case constants.UPLOAD_IMG_GOOGLE: {
		return update(state, {
			uploadImgGoogleStorage: {
				status: {$set: FetchStatus.fetching()},
				error: {$set: null}
			}
		});
	}
	case constants.UPLOAD_IMG_GOOGLE_SUCCESS: {
		return update(state, {
			uploadImgGoogleStorage: {
				status: {$set: FetchStatus.success()},
				error: {$set: null},
				url: {$set: action.payload}
			},
			updateUserProfile: {
				status: {$set: FetchStatus.default()}
			}
		});
	}
	case constants.UPLOAD_IMG_GOOGLE_FAILURE: {
		return update(state, {
			uploadImgGoogleStorage: {
				status: {$set: FetchStatus.failure()},
				error: {$set: action.payload.error.data.message}
			}
		});
	}
	case constants.UPLOAD_USER_PROFILE_PICTURE: {
		return update(state, {
			userProfileUpdate: {
				status: {$set: FetchStatus.fetching()},
				error: {$set: null}
			}
		});
	}
	case constants.UPLOAD_USER_PROFILE_PICTURE_SUCCESS: {
		return update(state, {
			userProfileUpdate: {
				status: {$set: FetchStatus.success()},
				error: {$set: action.payload.result.data.message},
			}
		});
	}
	case constants.UPLOAD_USER_PROFILE_PICTURE_FAILURE: {
		return update(state, {
			userProfileUpdate: {
				status: {$set: FetchStatus.failure()},
				error: {$set: action.payload.error.data.message}
			}
		});
	}
	case constants.GET_VERSION: {
		return update(state, {
			getVersion: {
				status: {$set: FetchStatus.fetching()},
				error: {$set: null},
			}
		});
	}
	case constants.GET_VERSION_SUCCESS: {
		return update(state, {
			getVersion: {
				status: {$set: FetchStatus.success()},
				error: {$set: action.payload.result.data.message},
				version: {$set: action.payload.result.data}
			}
		});
	}
	case constants.GET_VERSION_FAILURE: {
		return update(state, {
			getVersion: {
				status: {$set: FetchStatus.failure()},
				error: {$set: action.payload.error.data && action.payload.error.data.message ? action.payload.error.data.message : ""},
				
			}
		});
	}
	case constants.RESET: {
		return update(state, {
			createLeague: {
				status: {$set: FetchStatus.default()},
				error: {$set: null},
				// data: {$set: {}},
			},
			getUrlImgUploaded: {
				status: {$set: FetchStatus.default()},
				error: {$set: null},
				// url: {$set: ""}
			},
			uploadImgGoogleStorage: {
				status: {$set: FetchStatus.default()},
				error: {$set: null},
				// url: {$set: ""},
			},
			getListEvents: {
				status: {$set: FetchStatus.default()},
				// data: {$set: []},
				error: {$set: null},
			},
			getListCategoriesEvents: {
				status: {$set: FetchStatus.default()},
				data: {$set: []},
				error: {$set: null},
			},
		});
	}
	default:
	  return state;
	}
}

export default userProfileReducer;
