import update from "immutability-helper";
import {FetchStatus} from "../../shared/utils/fetchStatus/fetchStatus";
import * as constants from "./constants";

const initialState = {
	userSitterProfile: {
		status: FetchStatus.default(),
		error: null,
		data: {}
	},
	getUserSitterAvailable: {
		status: FetchStatus.default(),
		error: null,
		data: []
	},
	updateDesc: {
		status: FetchStatus.default(),
		error: null,
		data: {}
	},
	updateRate: {
		status: FetchStatus.default(),
		error: null,
		data: {}
	},
	updateYoe: {
		status: FetchStatus.default(),
		error: null,
		data: {}
	},
	updateSpecialYoe: {
		status: FetchStatus.default(),
		error: null,
		data: {}
	},
	updateCer: {
		status: FetchStatus.default(),
		error: null,
		data: {}
	},
	updateTime: {
		status: FetchStatus.default(),
		error: null,
		data: {}
	}
};

function userProfileSitterReducer(state = initialState, action) {
	switch (action.type) {
		
	case constants.GET_USER_SITTER: {
		return update(state, {
			userSitterProfile: {
				status: {$set: FetchStatus.fetching()},
				error: {$set: null}
			}
		});
	}
	case constants.GET_USER_SITTER_SUCCESS: {
		return update(state, {
			userSitterProfile: {
				status: {$set: FetchStatus.success()},
				error: {$set: null},
				data: {$set: action.payload.result.data}
			}
		});
	}
	case constants.GET_USER_SITTER_FAILURE: {
		return update(state, {
			userSitterProfile: {
				status: {$set: FetchStatus.failure()},
				error: {$set: action.payload.error.data ? action.payload.error.data .message : ""}
			}
		});
	}
	case constants.GET_USER_AVAILABLE_SITTER: {
		return update(state, {
			getUserSitterAvailable: {
				status: {$set: FetchStatus.fetching()},
				error: {$set: null}
			}
		});
	}
	case constants.GET_USER_AVAILABLE_SITTER_SUCCESS: {
		return update(state, {
			getUserSitterAvailable: {
				status: {$set: FetchStatus.success()},
				error: {$set: null},
				data: {$set: action.payload.result.data}
			}
		});
	}
	case constants.GET_USER_AVAILABLE_SITTER_FAILURE: {
		return update(state, {
			getUserSitterAvailable: {
				status: {$set: FetchStatus.failure()},
				error: {$set: action.payload.error.data ? action.payload.error.data .message : ""}
			}
		});
	}
	case constants.UPDATE_DESC: {
		return update(state, {
			updateDesc: {
				status: {$set: FetchStatus.fetching()},
				error: {$set: null}
			}
		});
	}
	case constants.UPDATE_DESC_SUCCESS: {
		return update(state, {
			updateDesc: {
				status: {$set: FetchStatus.success()},
				error: {$set: null},
				data: {$set: action.payload.result.data}
			}
		});
	}
	case constants.UPDATE_DESC_FAILURE: {
		return update(state, {
			updateDesc: {
				status: {$set: FetchStatus.failure()},
				error: {$set: action.payload.error.data ? action.payload.error.data .message : ""}
			}
		});
	}
	case constants.UPDATE_RATES: {
		return update(state, {
			updateRate: {
				status: {$set: FetchStatus.fetching()},
				error: {$set: null}
			}
		});
	}
	case constants.UPDATE_RATES_SUCCESS: {
		return update(state, {
			updateRate: {
				status: {$set: FetchStatus.success()},
				error: {$set: null},
				data: {$set: action.payload.result.data}
			}
		});
	}
	case constants.UPDATE_RATES_FAILURE: {
		return update(state, {
			updateRate: {
				status: {$set: FetchStatus.failure()},
				error: {$set: action.payload.error.data ? action.payload.error.data .message : ""}
			}
		});
	}
	case constants.UPDATE_YOE: {
		return update(state, {
			updateYoe: {
				status: {$set: FetchStatus.fetching()},
				error: {$set: null}
			}
		});
	}
	case constants.UPDATE_YOE_SUCCESS: {
		return update(state, {
			updateYoe: {
				status: {$set: FetchStatus.success()},
				error: {$set: null},
				data: {$set: action.payload.result.data}
			}
		});
	}
	case constants.UPDATE_YOE_FAILURE: {
		return update(state, {
			updateYoe: {
				status: {$set: FetchStatus.failure()},
				error: {$set: action.payload.error.data ? action.payload.error.data .message : ""}
			}
		});
	}
	case constants.UPDATE_SPECIAL_YOE: {
		return update(state, {
			updateSpecialYoe: {
				status: {$set: FetchStatus.fetching()},
				error: {$set: null}
			}
		});
	}
	case constants.UPDATE_SPECIAL_YOE_SUCCESS: {
		return update(state, {
			updateSpecialYoe: {
				status: {$set: FetchStatus.success()},
				error: {$set: null},
				data: {$set: action.payload.result.data}
			}
		});
	}
	case constants.UPDATE_SPECIAL_YOE_FAILURE: {
		return update(state, {
			updateSpecialYoe: {
				status: {$set: FetchStatus.failure()},
				error: {$set: action.payload.error.data ? action.payload.error.data .message : ""}
			}
		});
	}
	case constants.UPDATE_CER: {
		return update(state, {
			updateCer: {
				status: {$set: FetchStatus.fetching()},
				error: {$set: null}
			}
		});
	}
	case constants.UPDATE_CER_SUCCESS: {
		return update(state, {
			updateCer: {
				status: {$set: FetchStatus.success()},
				error: {$set: null},
				data: {$set: action.payload.result.data}
			}
		});
	}
	case constants.UPDATE_CER_FAILURE: {
		return update(state, {
			updateCer: {
				status: {$set: FetchStatus.failure()},
				error: {$set: action.payload.error.data ? action.payload.error.data .message : ""}
			}
		});
	}
	case constants.UPDATE_TIME: {
		return update(state, {
			updateTime: {
				status: {$set: FetchStatus.fetching()},
				error: {$set: null}
			}
		});
	}
	case constants.UPDATE_TIME_SUCCESS: {
		return update(state, {
			updateTime: {
				status: {$set: FetchStatus.success()},
				error: {$set: null},
				data: {$set: action.payload.result.data}
			}
		});
	}
	case constants.UPDATE_TIME_FAILURE: {
		return update(state, {
			updateTime: {
				status: {$set: FetchStatus.failure()},
				error: {$set: action.payload.error.data ? action.payload.error.data .message : ""}
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

export default userProfileSitterReducer;
