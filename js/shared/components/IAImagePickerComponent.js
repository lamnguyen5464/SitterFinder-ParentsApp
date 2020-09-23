import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Image, TouchableOpacity, View} from "react-native";
import LinearGradient from "react-native-linear-gradient/index";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-picker/index";
import {colors} from "../utils/colors/colors";
import { images } from "../../../assets";

export default class IAImagePickerComponent extends PureComponent {

    static propTypes = {
    	// onChoseImg: PropTypes.func,
    	onUploadImg: PropTypes.func,
    	onPickImgResult: PropTypes.func,
    	onPressImg: PropTypes.func,
    	onDeleteImg: PropTypes.func,
    	image: PropTypes.string,
    	styleImage: PropTypes.object,
    	styleNoImage: PropTypes.object,
    	disableImg: PropTypes.bool,
    	visibleDeleteImg: PropTypes.bool,
    	iconDefault: PropTypes.element,
    };

    static defaultProps = {
    	...PureComponent.defaultProps,
    	image: null,
    	disableImg: false,
    	visibleDeleteImg: false,
    	onPressImg: () => {
    	},
    	onDeleteImg: () => {
    	},
    	onUploadImg: () => {
    	},
    	onPickImgResult: () => {},
    	styleImage: {
    		borderRadius: 15,
    	},
    	styleNoImage: {

    	},
    	iconDefault: null,
    };

    constructor(props) {
    	super(props);
    	this.state = {
    		imageUrl: this.props.image,
    	};
    }

    getStyle() {
    	return {
    		container: {
    			flex: 1,
    		},
    		containerView: {
    			position: "absolute",
    			alignItems: "center",
    			justifyContent: "flex-start",
    		},
    		iconAdd: {
    			color: "white",
    		},
    		iconDelete: {
    			borderRadius: 13,
    			marginRight: 5,
    			marginTop: 5,
    			shadowColor: "#00000080",
    			shadowOpacity: 0.8,
    			shadowRadius: 13,
    			shadowOffset: {
    				height: 5,
    				width: 1,
    			},
    			elevation: 5,
    		},
    		bgIconDelete: {
    			width: 26,
    			height: 26,
    			borderRadius: 13,
    			backgroundColor: colors.orange,
    			alignItems: "center",
    			justifyContent: "center"
    		},
    		image: {
    			width: "100%",
    			height: "100%",
    			alignItems: "flex-end",
    		},
    		noImage: {
    			flex: 1,
    			alignItems: "center",
    			justifyContent: "center",
    		},
    	};
    }

    componentDidMount() {

    }

    _onDeleteImage = () => {
    	this.setState({
    		imageUrl: null,
    	});
    	this.props.onDeleteImg();
    };

    _onPressImage = () => {
    	// this.props.onPressImg();
    	this._choseImage();
    };

    _choseImage = () => {
    	const options = {
    		quality: 1.0,
    		maxHeight: 500,
    		maxWidth: 500,
    		storageOptions: {
    			skipBackup: true,
    		},
    	};

    	ImagePicker.showImagePicker(options, (response) => {
    		console.log("Response = ", response);

    		if (response.didCancel) {
    			console.log("User cancelled photo picker");
    		} else if (response.error) {
    			console.log("ImagePickerComponent Error: ", response.error);
    		} else if (response.customButton) {
    			console.log("User tapped custom button: ", response.customButton);
    		} else {
    			let source = response.uri;
    			// this.props.onUploadImg(response);
    			console.log("ImagePickerzz: ", source);
    			// You can also display the image using data:
    			// let source = { uri: 'data:image/jpeg;base64,' + response.data };
    			this.setState({
    				imageUrl: source,
    			});
    			let imageItem = {image: source, data: response};
    			this.props.onUploadImg(imageItem);
    			this.props.onPickImgResult(imageItem);
    		}
    	});
    };

    render() {
    	let {styleImage, styleNoImage, iconDefault} = this.props;
    	let hasImg = this.state.imageUrl !== null && !this.state.imageUrl.includes("no-image.png");
    	return <LinearGradient
    		style={styleImage}
    		colors={[colors.orange, colors.orange_heavy]}
    		start={{x: 0, y: 0}}
    		end={{x: 0, y: 0}}
    		useAngle={true}
    		angle={225}
    	>
    		{
    			(this.state.imageUrl !== null && !this.state.imageUrl.includes("no-image.png")) ?
    				<View style={this.getStyle().image}>
    					<TouchableOpacity
    						style={{position: "absolute", width: "100%", height: "100%"}}
    						onPress={this._onPressImage}
    						activeOpacity={0.9}
    						disabled={this.props.isLoading || this.props.disableImg}
    					>
    						<Image
    							style={styleImage}
    							source={hasImg ? {uri: this.state.imageUrl} : images.addImage}
    						/>

    					</TouchableOpacity>

    					{
    						this.props.visibleDeleteImg &&
                            <TouchableOpacity
                            	style={this.getStyle().iconDelete}
                            	onPress={this._onDeleteImage}
                            	activeOpacity={0.5}
                            >
                            	<View style={this.getStyle().bgIconDelete}>
                            		<Ionicons
                            			style={{color: "white"}}
                            			name={"ios-close"}
                            			size={25}
                            		/>
                            	</View>
                            </TouchableOpacity>
    					}
    				</View>
    				:
    				<View style={[this.getStyle().noImage, styleNoImage]}>
    					<TouchableOpacity
    						style={[this.getStyle().noImage]}
    						activeOpacity={0.3}
    						onPress={this._choseImage}
    						disabled={this.props.isLoading}
    					>
    						<View
    						>
    							{iconDefault}
    						</View>
    					</TouchableOpacity>
    				</View>
    		}

    	</LinearGradient>;
    }
}