import socket from "../../socket/appSocket";
import Constant from "../../shared/utils/constant/Constant";

export function addUserDataListener(callback) {
	socket.off(Constant.URL.socket.resultUpdated);
	socket.on(Constant.URL.socket.resultUpdated, data => onReceiveData(data, callback));
}

export function removeUserDataListener() {
	socket.off(Constant.URL.socket.resultUpdated);
}

export function onReceiveData(data, callback) {
	if (data.users && data.users.length > 0) return callback(data.users);
}
