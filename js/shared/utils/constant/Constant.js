export default {
	/**
   * Define staging and production URL
   */
	URL: {
		urls: {
			staging: "http://35.201.156.178/", //34.93.169.54 - http://35.223.47.84
 			production: "http://35.201.156.178" 
		},
		socket: {
			url: "https://staging-fanathon.inapps.technology:8443",
			resultUpdated: "result_updated",
		},
		API_URL_PATH: {
			login: {
				url: "/api/auth/signin",
				desc: "Login user name and password",
				params: [
					{

						"email": "tintest@gmail.com",
						"loginType": "BASIC",
						"password": "admin123"
					}
				],
				method: "POST"
			},
			logout: {
				url: "/auth/logout",
				desc: "Logout",
				params: [
					{
						"registrationId": "string"
					  }
				],
				method: "POST"
			},
			reset_password: {
				url: "/api/users/resetPassword",
				desc: "Recover password via email",
				params: [
					{
						email: "string",
						token: "string",
					}
				],
				method: "POST"
			},
			resetPasswordToken: {
				url: "/api/users/updatePasswordByResetToken",
				desc: "Recover password via email by token",
				params: [
					{
						email: "string",
						token: "string",
					}
				],
				method: "POST"
			},
			signup: {
				url: "/api/auth/signup",
				desc: "Register new user name and password",
				params: [
					{
						"authorities": [
							"string"
						  ],
						"email": "string",
						"loginType": "SOCIAL",
						"name": "string",
						"password": "string",
						"phoneNumber": "string"
					}
				],
				method: "POST"
			},
			change_password: {
				url: "/api/users/changePassword",
				desc: "Change password",
				params: [
					{
						"currentPassword": "string",
						"email": "string",
						"newPassword": "string",
					}
				],
				method: "POST"
			},
			notification: {
				changeDeviceToken: {
					url: "/users/me/notification",
					desc: "Change notification token",
					params: [
						{
							token: "string",
							os: "android||ios",
						}
					],
					method: "POST"
				}
			},
			league: {
				create: {
					url: "/leagues",
					desc: "Create new league",
					params: [
						{
							"name": "string",
							"image": "string",
							"status": "string",
							"detail": "string",
							"events": [
								{
									"id": "string",
									"start": "2019-08-28T02:03:26.055Z",
									"end": "2019-08-28T02:03:26.055Z"
								}
							]
						}
					],
					method: "POST"
				},
				createdLeague: {
					url: "/users/me/leagues",
					desc: "Get leagues created",
					params: [
						{
							"type": "created",
						}
					],
					method: "GET"
				},
				joinedLeague: {
					url: "/users/me/leagues",
					desc: "Get league joined",
					params: [
						{
							"type": "joined",
						}
					],
					method: "GET"
				},
				updateLeague: {
					url: "/leagues/{0}",
					desc: "Update new league",
					params: [
						{
							"name": "string",
							"image": "string",
							"status": "string",
							"detail": "string",
							"events": [
								{
									"id": "string",
									"start": "2019-08-28T02:03:26.055Z",
									"end": "2019-08-28T02:03:26.055Z"
								}
							]
						}
					],
					method: "PUT"
				},
				deleteLeague: {
					url: "/leagues/{0}",
					desc: "Delete league",
					params: [
						{

						}
					],
					method: "DELETE"
				},
				allLeague: {
					url: "/leagues/public",
					desc: "Get all leagues",
					params: [
						{

						}
					],
					method: "GET"
				},
				getUrlImageUploaded: {
					url: "/files/image",
					desc: "Get signed url for uploading to google storage",
					params: [
						{
							"filename": "file stype",
						}
					],
					method: "POST"
				},
				leagueDetail: {
					url: "/leagues/",
					desc: "Get detail league",
					params: [
						{

						}
					],
					method: "GET"
				},
				leagueCategories: {
					url: "/categories?leagueId={0}",
					desc: "Get detail league categories",
					params: [
						{

						}
					],
					method: "GET"
				},
				leaguePlayers: {
					url: "/players?leagueId={0}",
					desc: "Get detail league",
					params: [
						{

						}
					],
					method: "GET"
				},
				joinLeague: {
					url: "/leagues/{0}/join",
					desc: "Join league",
					params: [
						{
							"invitedBy": "string"
						}
					],
					method: "PUT"
				},
				results: {
					url: "/results?leagueId={0}&type=",
					desc: "Get results of league",
					params: [
						{
							"type": "all||me||friends",
						}
					],
					method: "GET"
				},
				ballots: {
					url: "/ballots?leagueId={0}&playerId=",
					desc: "Get ballot of player in league",
					params: [
						{

						}
					],
					method: "GET"
				}
			},
			ballot: {
				create: {
					url: "/ballots?leagueId={0}",
					desc: "Create new ballot",
					params: [
						{
							"leagueId": "string",
							"body": {
								"id": "string",
 								"ballots": [
									{
										"categoryId": "string",
										"eventLeagueId": "string",
										"items": [
											{
												"categoryNomineeId": "string",
												"rank": 0
											}
										]
									}
								]
							}
						}
					],
					method: "POST"
				}
			},
			event: {
				eventCategories: {
					url: "/categories?eventId={0}",
					desc: "Get event categories",
					params: [
						{

						}
					],
					method: "GET"
				},
				league: {
					url: "/leagues/public?eventId={0}",
					desc: "Get event categories",
					params: [
						{

						}
					],
					method: "GET"
				}
			},
			user: {
				getUserProfile: {
					url: "/api/users/findby/username/email?searchString={0}",
					desc: "Get user profile",
					params: [
						{
							searchString: "test@yahoo.com"
						}
					],
					method: "GET"
				},
				updateProfilePicture: {
					url: "/users/me/profile",
					desc: "Get user profile",
					params: [
						{

						}
					],
					method: "PUT"
				},
				updateProfile: {
					url: "/api/users/save",
					desc: "Update user profile",
					params: [
						{
							"address": "string",
							"authorities": [
							  "string"
							],
							"avatar": "string",
							"createdOn": "2019-10-27T04:27:40.953Z",
							"customId": "string",
							"email": "string",
							"emergencyContact": "string",
							"firstName": "string",
							"id": "string",
							"idPassport": "string",
							"joinedDate": "2019-10-27T04:27:40.953Z",
							"lastName": "string",
							"modifiedBy": "string",
							"modifiedOn": "2019-10-27T04:27:40.953Z",
							"partners": [
							  {
									"address": "string",
									"authorities": [
								  "string"
									],
									"avatar": "string",
									"createdOn": 0,
									"email": "string",
									"emergencyContact": "string",
									"firstName": "string",
									"id": "string",
									"idPassport": "string",
									"joinedDate": 0,
									"lastName": "string",
									"modifiedBy": "string",
									"modifiedOn": 0,
									"partners": [
								  null
									],
									"password": "string",
									"phoneNumber": "string",
									"socialNetwork": "string",
									"socialToken": "string",
									"userName": "string"
							  }
							],
							"password": "string",
							"phoneNumber": "string",
							"socialNetwork": "string",
							"socialToken": "string",
							"userName": "string"
						  }
					],
					method: "POST"
				},
				getVersion: {
					url: "/api/auth/version",
					desc: "Get version",
					params: [
						{

						}
					],
					method: "GET"
				}
			},
			sitter: {
				getDetailProfile: {
					url: "/api/sitters/",
					desc: "Get detail profile sitter",
					params: [
						{

						}
					],
					method: "GET"
				},
				getDetailAvailable: {
					url: "/api/sitters/availabletimes?sitterId=",
					desc: "Get detail available time profile sitter",
					params: [
						{

						}
					],
					method: "GET"
				},
				updateDesc: {
					url: "/api/sitters/introducesitter/update/{0}",
					desc: "Update desc",
					params: [
						{
							idSitter: "",
							desc: ""
						}
					],
					method: "PUT"
				},
				updateRates: {
					url: "/api/sitters/babysittingrates/update/{0}",
					desc: "Update desc",
					params: [
						{
							idSitter: "",
							ratePerHourForNumberOfChilds: {
								"ONE_CHILD":8,
								"THREE_CHILDS":4,
								"FOUR_CHILDS":4,
								"TWO_CHILDS":4
							}
						}
					],
					method: "PUT"
				},
				updateYoe: {
					url: "/api/sitters/experiences/update/{0}",
					desc: "Update Yoe",
					params: [
						{
							idSitter: "",
							experiences: { 
								"INFANTS":3,
								"TODDLERS":8,
								"AGE_OF_SCHOOL": 8
							},
						}
					],
					method: "PUT"
				},
				updateSpecialYoe: {
					url: "/api/sitters/specialexperiences/update/{0}",
					desc: "Update Yoe",
					params: [
						{
							idSitter: "",
							specialExperiences: [
								"INFANTS",
								"TODDLERS",
								"AGE_OF_SCHOOL"
							],
						}
					],
					method: "PUT"
				},
				updateCer: {
					url: "/api/sitters/backgroundbasic/update/{0}",
					desc: "Update Yoe",
					params: [
						{
							idSitter: "",
							specialExperiences: [
								"INFANTS",
								"TODDLERS",
								"AGE_OF_SCHOOL"
							],
						}
					],
					method: "PUT"
				},
				updateTime: {
					url: "/api/sitters/generalavailability/update/{0}",
					desc: "Update Time",
					params: [
						{
						  "afternoon": true,
						  "dateOfWeek": {
								"code": "SUN",
								"label": "Sunday",
								"recurringAvaibilityId": "string"
						  },
						  "evening": true,
						  "morning": true,
						}
					  ],
					method: "PUT"
				}
			}
		}
	},
	PLATFORMS: {
		ANDROID: "android",
		IOS: "ios"
	},
	STATUS: {
		PRIVATE: "private",
		PROTECTED: "protected",
		PUBLIC: "public"
	},
	/**
   * Define methods for request apis
   */
	METHOD: {
		post: "POST",
		put: "PUT",
		get: "GET",
		delete: "DELETE"
	},
	SOCIAL_TYPE: {
		facebook: "facebook",
		google: "google",
	},
	LOGIN_TYPE: {
		social: "SOCIAL",
		original: "BASIC"
	},
	USER_TYPE: {
		parent: "PARENT",
		sitter: "SITTER",
	},
	/**
   * Set timeout request
   */
	TIME_OUT_REQUEST: 100000,

	/**
   * Constant for key/value in storage manager
   */
	USER: {
		USER_INFO: "USER_INFO",
		USER_DETAIL_INFO: "USER_DETAIL_INFO",
		USER_TOKEN: "USER_TOKEN",
		USER_EMAIL: "USER_EMAIL",
		TOKEN_INFO: "TOKEN_INFO",
		DEVICE_TOKEN: "DEVICE_TOKEN",
		TOUCH_ID: "TOUCH_ID",
		FACE_ID: "FACE_ID",
	},
	NOTIFICATION: {
		VIBRATE_TIME: 500,
	},

	/**
   * Constant for mocking data
   */
	MOCKING_DATA: {
		USER: {
			USERNAME: "Admin@gmail.com",
			PASSWORD: "admin"
		},
		PLACE_HOLDER: "https://immedilet-invest.com/wp-content/uploads/2016/01/user-placeholder.jpg"
	},
	WEB_CLIENT_ID:
    "1041263869787-8t9n4n2pqblpbam972kt798klbvo0gri.apps.googleusercontent.com",
	LOCATION_BACKGROUND_BTN: [0, 0.36, 1],
	BACKGROUND_COLORS: ["#37c8b7", "#1bd0c0", "#3ac7b7"],
	PAYMENT: [
		["#226089", "#226089", "#81BEF7"],
		["#088A08", "#01DF01", "#D8D8D8"],
		["#04B4AE", "#01DFD7", "#BEF781"],
		["#B40404", "#F78181", "#F6CECE"],
		["#08088A", "#5882FA", "#2E9AFE"],
	],
	CONFIG_IMAGE_PICKER: {
		title: "Select Profile picture",
		storageOptions: {
			quality: 0.8,
			maxHeight: 500,
			maxWidth: 500,
			storageOptions: {
				skipBackup: true,
			},
		},
	},
	FORBIDDEN: "Forbidden",
	TOUCH_FACE_ID: {
		title: "Authentication Required", // Android
		imageColor: "#e00606", // Android
		imageErrorColor: "#ff0000", // Android
		sensorDescription: "Touch sensor", // Android
		sensorErrorDescription: "Failed", // Android
		cancelText: "Cancel", // Android
		fallbackLabel: "Show Passcode", // iOS (if empty, then label is hidden)
		unifiedErrors: false, // use unified error messages (default false)
		passcodeFallback: true, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
	},
	calendarTime: [
		[{name: "am", code: "am"}, 
			{name: "SUN", code: "SU"}, 
			{name: "MON", code: "MO"}, 
			{name: "TUE", code: "TU"}, 
			{name: "WED", code: "WE"}, 
			{name: "THU", code: "TH"}, 
			{name: "FRI", code: "FR"}, 
			{name: "SAT", code: "SA"}],
		[{name: "mid\nday", code: "mid\nday"}, 
			{name: "SUN", code: "SU"}, 
			{name: "MON", code: "MO"}, 
			{name: "TUE", code: "TU"}, 
			{name: "WED", code: "WE"}, 
			{name: "THU", code: "TH"}, 
			{name: "FRI", code: "FR"}, 
			{name: "SAT", code: "SA"}],
		[{name: "pm", code: "pm"}, 
			{name: "SUN", code: "SU"}, 
			{name: "MON", code: "MO"}, 
			{name: "TUE", code: "TU"}, 
			{name: "WED", code: "WE"}, 
			{name: "THU", code: "TH"}, 
			{name: "FRI", code: "FR"}, 
			{name: "SAT", code: "SA"}], 
	],
	NUMs:[
		"0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96","97","98","99","100","101","102","103","104","105","106","107","108","109","110","111","112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","128","129","130","131","132","133","134","135","136","137","138","139","140","141","142","143","144","145","146","147","148","149","150","151","152","153","154","155","156","157","158","159","160","161","162","163","164","165","166","167","168","169","170","171","172","173","174","175","176","177","178","179","180","181","182","183","184","185","186","187","188","189","190","191","192","193","194","195","196","197","198","199","200","201","202","203","204","205","206","207","208","209","210","211","212","213","214","215","216","217","218","219","220","221","222","223","224","225","226","227","228","229","230","231","232","233","234","235","236","237","238","239","240","241","242","243","244","245","246","247","248","249","250","251","252","253","254","255","256","257","258","259","260","261","262","263","264","265","266","267","268","269","270","271","272","273","274","275","276","277","278","279","280","281","282","283","284","285","286","287","288","289","290","291","292","293","294","295","296","297","298","299","300","301","302","303","304","305","306","307","308","309","310","311","312","313","314","315","316","317","318","319","320","321","322","323","324","325","326","327","328","329","330","331","332","333","334","335","336","337","338","339","340","341","342","343","344","345","346","347","348","349","350","351","352","353","354","355","356","357","358","359","360","361","362","363","364","365","366","367","368","369","370","371","372","373","374","375","376","377","378","379","380","381","382","383","384","385","386","387","388","389","390","391","392","393","394","395","396","397","398","399","400","401","402","403","404","405","406","407","408","409","410","411","412","413","414","415","416","417","418","419","420","421","422","423","424","425","426","427","428","429","430","431","432","433","434","435","436","437","438","439","440","441","442","443","444","445","446","447","448","449","450","451","452","453","454","455","456","457","458","459","460","461","462","463","464","465","466","467","468","469","470","471","472","473","474","475","476","477","478","479","480","481","482","483","484","485","486","487","488","489","490","491","492","493","494","495","496","497","498","499","500","501","502","503","504","505","506","507","508","509","510","511","512","513","514","515","516","517","518","519","520","521","522","523","524","525","526","527","528","529","530","531","532","533","534","535","536","537","538","539","540","541","542","543","544","545","546","547","548","549","550","551","552","553","554","555","556","557","558","559","560","561","562","563","564","565","566","567","568","569","570","571","572","573","574","575","576","577","578","579","580","581","582","583","584","585","586","587","588","589","590","591","592","593","594","595","596","597","598","599","600","601","602","603","604","605","606","607","608","609","610","611","612","613","614","615","616","617","618","619","620","621","622","623","624","625","626","627","628","629","630","631","632","633","634","635","636","637","638","639","640","641","642","643","644","645","646","647","648","649","650","651","652","653","654","655","656","657","658","659","660","661","662","663","664","665","666","667","668","669","670","671","672","673","674","675","676","677","678","679","680","681","682","683","684","685","686","687","688","689","690","691","692","693","694","695","696","697","698","699","700","701","702","703","704","705","706","707","708","709","710","711","712","713","714","715","716","717","718","719","720","721","722","723","724","725","726","727","728","729","730","731","732","733","734","735","736","737","738","739","740","741","742","743","744","745","746","747","748","749","750","751","752","753","754","755","756","757","758","759","760","761","762","763","764","765","766","767","768","769","770","771","772","773","774","775","776","777","778","779","780","781","782","783","784","785","786","787","788","789","790","791","792","793","794","795","796","797","798","799","800","801","802","803","804","805","806","807","808","809","810","811","812","813","814","815","816","817","818","819","820","821","822","823","824","825","826","827","828","829","830","831","832","833","834","835","836","837","838","839","840","841","842","843","844","845","846","847","848","849","850","851","852","853","854","855","856","857","858","859","860","861","862","863","864","865","866","867","868","869","870","871","872","873","874","875","876","877","878","879","880","881","882","883","884","885","886","887","888","889","890","891","892","893","894","895","896","897","898","899","900","901","902","903","904","905","906","907","908","909","910","911","912","913","914","915","916","917","918","919","920","921","922","923","924","925","926","927","928","929","930","931","932","933","934","935","936","937","938","939","940","941","942","943","944","945","946","947","948","949","950","951","952","953","954","955","956","957","958","959","960","961","962","963","964","965","966","967","968","969","970","971","972","973","974","975","976","977","978","979","980","981","982","983","984","985","986","987","988","989","990","991","992","993","994","995","996","997","998","999"
	],
	OVERNIGHT: [
		"Yes", "No"
	],
	GENDER: [
		"Male", "Female"
	],
	JOBTYPE: [
		"PART_TIME", "FULL_TIME"
	],
	RECURRING_AVAILABLE_TIME: [
		{
			"afternoon": false,
			"dateOfWeek": {
			  "code": "SUN",
			  "label": "Sunday",
			},
			"evening": false,
			"morning": false,
		},
		{
			"afternoon": false,
			"dateOfWeek": {
			  "code": "MON",
			  "label": "Monday",
			},
			"evening": false,
			"morning": false,
		},
		{
			"afternoon": false,
			"dateOfWeek": {
			  "code": "TUE",
			  "label": "Tuesday",
			},
			"evening": false,
			"morning": false,
		},
		{
			"afternoon": false,
			"dateOfWeek": {
			  "code": "WED",
			  "label": "Wednesday",
			},
			"evening": false,
			"morning": false,
		},
		{
			"afternoon": false,
			"dateOfWeek": {
			  "code": "THU",
			  "label": "Thursday",
			},
			"evening": false,
			"morning": false,
		},
		{
			"afternoon": false,
			"dateOfWeek": {
			  "code": "FRI",
			  "label": "Friday",
			},
			"evening": false,
			"morning": false,
		},
		{
			"afternoon": false,
			"dateOfWeek": {
			  "code": "SAT",
			  "label": "Saturday",
			},
			"evening": false,
			"morning": false,
		},
	]
};
