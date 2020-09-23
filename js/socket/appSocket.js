import io from "socket.io-client";
import Constant from "../shared/utils/constant/Constant";

const socket = io(Constant.URL.socket.url, {
	secure: true,
	reconnect: true,
	rejectUnauthorized: false,
	transports: ["websocket"]
});

export default socket;
