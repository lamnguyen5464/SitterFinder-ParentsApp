/**
 * Example data
 */
import {Dimensions} from "react-native";

const {width} = Dimensions.get("window");

const largeItemSize = width / 2;
const smallItemSize = width / 4;
const widthItem = (width - 16) / 2;

export default [
	{
		title: "Lorem Ipsum",
		subtitle: "Lorem Ipsum is simply",
		description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
		image: require("@assets/images/bg4.jpg"),
		avatar: require("@assets/images/avatar1.jpg"),
		status: "in stock",
		price: "4.50"
	},
	{
		title: "Lorem Ipsum",
		subtitle: "Lorem Ipsum is simply",
		description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
		image: require("@assets/images/bg5.jpg"),
		avatar: require("@assets/images/avatar2.jpg"),
		status: "in stock",
		price: "9.50"
	},
	{
		title: "Lorem Ipsum",
		subtitle: "Lorem Ipsum is simply",
		description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
		image: require("@assets/images/bg6.jpg"),
		avatar: require("@assets/images/avatar1.jpg"),
		status: "in stock",
		price: "8.00"
	},
	{
		title: "Lorem Ipsum",
		subtitle: "Lorem Ipsum is simply",
		description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
		image: require("@assets/images/bg7.jpg"),
		avatar: require("@assets/images/avatar2.jpg"),
		status: "in stock",
		price: "40.50"
	}
];

export const dataWithIcon = [
	{label: "Inbox", icon: "inbox", key: 0},
	{label: "Starred", icon: "star", key: 1},
	{label: "Sent mail", icon: "send", key: 2},
	{label: "Colored label", icon: "color-lens", key: 3},
	{label: "A very long title that will be truncated", icon: "delete", key: 4}
];

export const dataOnlyImage = [
	require("@assets/images/bg2.jpg"),
	require("@assets/images/bg1.jpg"),
	require("@assets/images/bg3.jpg"),
	require("@assets/images/bg2.jpg"),
	require("@assets/images/bg5.jpg"),
	require("@assets/images/bg6.jpg"),
	require("@assets/images/bg7.jpg"),
	require("@assets/images/bg4.jpg"),
	require("@assets/images/bg2.jpg"),
	require("@assets/images/bg1.jpg"),
	require("@assets/images/bg3.jpg"),
	require("@assets/images/bg4.jpg"),
	require("@assets/images/bg5.jpg"),
	require("@assets/images/bg6.jpg"),
	require("@assets/images/bg7.jpg"),
	require("@assets/images/bg4.jpg")
];

export const dataOnlyImageUri = [
	{
		key: 1,
		uri: "https://source.unsplash.com/random?1"
	},
	{
		key: 2,
		uri: "https://source.unsplash.com/random?2"
	},
	{
		key: 3,
		uri: "https://source.unsplash.com/random?3"
	},
	{
		key: 4,
		uri: "https://source.unsplash.com/random?4"
	},
	{
		key: 5,
		uri: "https://source.unsplash.com/random?5"
	},
	{
		key: 6,
		uri: "https://source.unsplash.com/random?6"
	},
	{
		key: 7,
		uri: "https://source.unsplash.com/random?7"
	},
	{
		key: 8,
		uri: "https://source.unsplash.com/random?8"
	},
	{
		key: 9,
		uri: "https://source.unsplash.com/random?9"
	},
	{
		key: 10,
		uri: "https://source.unsplash.com/random?10"
	}
];

export const dataWithSecondSection = [
	{
		data: [
			{
				image: require("@assets/images/bg2.jpg"),
				size: {
					width: largeItemSize,
					height: largeItemSize
				}
			}
		]
	},
	{
		data: [
			{
				image: require("@assets/images/bg1.jpg"),
				size: {
					width: smallItemSize,
					height: smallItemSize
				}
			},
			{
				image: require("@assets/images/bg3.jpg"),
				size: {
					width: smallItemSize,
					height: smallItemSize
				}
			},
			{
				image: require("@assets/images/bg4.jpg"),
				size: {
					width: largeItemSize,
					height: smallItemSize
				}
			}
		]
	},
	{
		data: [
			{
				image: require("@assets/images/bg2.jpg"),
				size: {
					width: largeItemSize,
					height: smallItemSize
				}
			}
		]
	},
	{
		data: [
			{
				image: require("@assets/images/bg1.jpg"),
				size: {
					width: smallItemSize,
					height: smallItemSize
				}
			},
			{
				image: require("@assets/images/bg3.jpg"),
				size: {
					width: smallItemSize,
					height: smallItemSize
				}
			}
		]
	},
	{
		data: [
			{
				image: require("@assets/images/bg4.jpg"),
				size: {
					width: smallItemSize,
					height: smallItemSize
				}
			},
			{
				image: require("@assets/images/bg2.jpg"),
				size: {
					width: smallItemSize,
					height: smallItemSize
				}
			}
		]
	},
	{
		data: [
			{
				image: require("@assets/images/bg3.jpg"),
				size: {
					width: largeItemSize,
					height: smallItemSize
				}
			}
		]
	},
	{
		data: [
			{
				image: require("@assets/images/bg4.jpg"),
				size: {
					width: largeItemSize,
					height: largeItemSize
				}
			}
		]
	},
	{
		data: [
			{
				image: require("@assets/images/bg1.jpg"),
				size: {
					width: largeItemSize,
					height: largeItemSize
				}
			}
		]
	}
];

export const dataWithSecondSection2 = [
	{
		data: [
			{
				image: require("@assets/images/bg3.jpg"),
				size: {
					width: widthItem,
					height: widthItem * 2
				}
			}
		]
	},
	{
		data: [
			{
				image: require("@assets/images/bg1.jpg"),
				size: {
					width: widthItem,
					height: widthItem
				}
			},
			{
				image: require("@assets/images/bg2.jpg"),
				size: {
					width: widthItem,
					height: widthItem
				}
			}
		]
	},
	{
		data: [
			{
				image: require("@assets/images/bg3.jpg"),
				size: {
					width: widthItem,
					height: widthItem
				}
			},
			{
				image: require("@assets/images/bg1.jpg"),
				size: {
					width: widthItem,
					height: widthItem
				}
			}
		]
	},
	{
		data: [
			{
				image: require("@assets/images/bg2.jpg"),
				size: {
					width: widthItem,
					height: widthItem * 2
				}
			}
		]
	},
	{
		data: [
			{
				image: require("@assets/images/bg4.jpg"),
				size: {
					width: widthItem,
					height: widthItem * 2
				}
			}
		]
	},
	{
		data: [
			{
				image: require("@assets/images/bg2.jpg"),
				size: {
					width: widthItem,
					height: widthItem
				}
			},
			{
				image: require("@assets/images/bg3.jpg"),
				size: {
					width: widthItem,
					height: widthItem
				}
			}
		]
	}
];

export const onBoardingData = [
	{
		title: "Lorem Ipsum",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
		backgroundColor: "rgba(2,100,188,.8)",
		gradients: ["rgba(28, 162, 98, .8)", "rgba(66, 184, 146, .8)"],
		image: "https://unsplash.it/800/800?image=674",
		imageFull: "https://unsplash.it/1200/1200?image=674",
		imageBlur: "https://unsplash.it/1200/1200?image=674&blur",
		icon: "star-face",
		iconImage: require("@assets/images/flower-pot.png"),
		img: require("@assets/images/airbaloon.png"),
		video: require("@assets/videos/Ground-Zero.mp4"),
		videoAnimate: require("@assets/videos/The-Launch.mp4"),
		color: "rgba(37, 1, 13, 1)"
	},
	{
		title: "Consectetur",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
		backgroundColor: "rgba(97,180,9,.8)",
		gradients: ["rgba(14, 84, 194, 1)", "rgba(209, 67, 141, .8)"],
		image: "https://unsplash.it/800/800?image=668",
		imageFull: "https://unsplash.it/1200/1200?image=668",
		imageBlur: "https://unsplash.it/1200/1200?image=668&blur",
		icon: "diamond",
		iconImage: require("@assets/images/footprints.png"),
		img: require("@assets/images/boat.png"),
		video: require("@assets/videos/Keep_Running.mp4"),
		videoAnimate: require("@assets/videos/Flying-Birds.mp4"),
		color: "rgba(36, 1, 13, 1)"
	},
	{
		title: "Adipisicing elitt",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
		backgroundColor: "rgba(83,103,153, .8)",
		gradients: ["rgba(60, 206, 207, .8)", "rgba(51, 19, 104, .8)"],
		image: "https://unsplash.it/800/800?image=504",
		imageFull: "https://unsplash.it/1200/1200?image=504",
		imageBlur: "https://unsplash.it/1200/1200?image=1083&blur",
		icon: "settings",
		iconImage: require("@assets/images/happy-sun.png"),
		img: require("@assets/images/egypt.png"),
		video: require("@assets/videos/Crocodile.mp4"),
		videoAnimate: require("@assets/videos/Stone-Falls.mp4"),
		color: "rgba(35, 1, 13, 1)"
	},

	{
		title: "sit amet",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
		backgroundColor: "rgba(167,167,167, .9)",
		gradients: ["rgba(33, 204, 172, .8)", "rgba(143, 218, 213, .8)"],
		image: "https://unsplash.it/800/800?image=532",
		imageFull: "https://unsplash.it/1200/1200?image=532",
		imageBlur: "https://unsplash.it/1200/1200?image=532&blur",
		icon: "star",
		iconImage: require("@assets/images/holly.png"),
		img: require("@assets/images/mount.png"),
		video: require("@assets/videos/Snow_Wires.mp4"),
		videoAnimate: require("@assets/videos/Love-Boat.mp4"),
		color: "rgba(34, 1, 13, 1)"
	},
	{
		title: "Sed do eiusmod",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
		backgroundColor: "rgba(18,113,134,.9)",
		gradients: ["rgba(20, 124, 220, .8)", "rgba(39, 234, 189, .8)"],
		image: "https://unsplash.it/800/800?image=529",
		imageFull: "https://unsplash.it/1200/1200?image=529",
		imageBlur: "https://unsplash.it/1200/1200?image=529&blur",
		icon: "music-note-eighth",
		iconImage: require("@assets/images/kite.png"),
		img: require("@assets/images/plane.png"),
		video: require("@assets/videos/Fire-Snow.mp4"),
		videoAnimate: require("@assets/videos/The-Launch.mp4"),
		color: "rgba(33, 1, 13, 1)"
	}
];

export const LottieDataLine = [
	{
		title: "Welcome to ReactXs",
		description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
		backgroundColor: "black",
		source: require("@assets/lottie/mobile_app.json"),
		button: "GET STARTED"
	},
	{
		title: "Lorem Ipsum",
		description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
		backgroundColor: "black",
		source: require("@assets/lottie/strategy_shape.json"),
		button: "NEXT"
	},
	{
		title: "Lorem Ipsum",
		description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
		backgroundColor: "black",
		source: require("@assets/lottie/ui_ux.json"),
		button: "DONE"
	}
];

export const LottieDataSimple = [
	{
		title: "Welcome to ReactXs",
		description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
		backgroundColor: "#E84A6A",
		textColor: "white",
		source: require("@assets/lottie/mobile_app.json")
	},
	{
		title: "Lorem Ipsum",
		description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
		backgroundColor: "white",
		textColor: "black",
		source: require("@assets/lottie/lock.json")
	}
];
