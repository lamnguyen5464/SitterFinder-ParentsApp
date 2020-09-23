import Constant from "../../shared/utils/constant/Constant";
import {AxiosFetch} from "../../api/AxiosFetch";

String.prototype.format = function () {
	var args = [].slice.call(arguments);
	return this.replace(/(\{\d+\})/g, function (a){
		return args[+(a.substr(1,a.length-2))||0];
	});
};

// League
// eslint-disable-next-line no-empty-pattern
export function getLeague({ }) {
	// eslint-disable-next-line no-unused-vars
	return new Promise((rs, rj) => {
		AxiosFetch({
			method: "GET",
			url: Constant.URL.API_URL_PATH.league.allLeague.url + "?page=1&perPage=100000",
			contentType: "application/json",
			onSuccess: data => {
				rs(data);
			},
			onError: error => {
				rj(error);
			},
			hasToken: true
		});
	});
}

// Upcomming events
// eslint-disable-next-line no-empty-pattern
export function getUpcommingEvents({ }) {
	return new Promise((rs, rj) => {
		AxiosFetch({
			method: "GET",
			url: Constant.URL.API_URL_PATH.eventUpcomming.url + "?page=1&perPage=1000",
			contentType: "application/x-www-form-urlencoded",
			onSuccess: data => {
				rs(data);
			},
			onError: error => {
				rj(error);
			},
			hasToken: true
		});
	});
}

// Created league
// eslint-disable-next-line no-empty-pattern
export function getCreatedLeagues({ }) {
	// eslint-disable-next-line no-unused-vars
	return new Promise((rs, rj) => {
		AxiosFetch({
			method: "GET",
			url: Constant.URL.API_URL_PATH.league.createdLeague.url + "?type=created",
			data: null,
			onSuccess: data => {
				rs(data);
			},
			onError: error => {
				rj(error);
			},
			hasToken: true
		});
	});
}

// Joined league
// eslint-disable-next-line no-empty-pattern
export function getJoinedLeagues({ }) {
	// eslint-disable-next-line no-unused-vars
	return new Promise((rs, rj) => {
		AxiosFetch({
			method: "GET",
			url: Constant.URL.API_URL_PATH.league.joinedLeague.url + "?type=joined",
			data: null,
			onSuccess: data => {
				rs(data);
			},
			onError: error => {
				rj(error);
			},
			hasToken: true
		});
	});
}

// Delete league
// eslint-disable-next-line no-empty-pattern
export function deleteLeagues({leagueId}) {
	// eslint-disable-next-line no-unused-vars
	return new Promise((rs, rj) => {
		AxiosFetch({
			method: "DELETE",
			url: Constant.URL.API_URL_PATH.league.deleteLeague.url.format(leagueId),
			data: null,
			onSuccess: data => {
				rs(data);
			},
			onError: error => {
				rj(error);
			},
			hasToken: true
		});
	});
}

// Update device token
export function updateDeviceTokenByOs({token, os}) {
	return new Promise((rs, rj) => {
		AxiosFetch({
			method: "PUT",
			url: Constant.URL.API_URL_PATH.notification.changeDeviceToken.url,
			data: {"token": token, "os": os},
			onSuccess: data => {
				rs(data);
			},
			onError: error => {
				rj(error);
			},
			hasToken: true
		});
	});
}

export default {
	getLeague,
	getUpcommingEvents,
	deleteLeagues,
	getCreatedLeagues,
	getJoinedLeagues,
	updateDeviceTokenByOs
};
