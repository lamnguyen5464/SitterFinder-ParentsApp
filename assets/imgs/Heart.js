import React from "react";
import Svg, {Defs, LinearGradient, Stop, Path, G, Use} from "react-native-svg";

const Heart = props => (
	<Svg width={76} height={78} {...props}>
		<Defs>
			<LinearGradient
				x1="100%"
				y1="104.337%"
				x2="0%"
				y2="-15.814%"
				id="prefix__c">
				<Stop stopColor="#EA053B" offset="0%" />
				<Stop stopColor="#D0021B" offset="100%" />
			</LinearGradient>
			<Path
				d="M23.96 6.56C23.61 2.76 20.88 0 17.465 0c-2.275 0-4.359 1.208-5.531 3.143C10.772 1.183 8.774 0 6.534 0 3.12 0 .39 2.758.04 6.56c-.028.168-.141 1.051.204 2.493.498 2.078 1.647 3.97 3.323 5.466L11.928 22l8.505-7.48c1.676-1.498 2.825-3.388 3.323-5.467.345-1.441.232-2.325.204-2.493z"
				id="prefix__b"
			/>
		</Defs>
		<G fill="none" fillRule="evenodd">
			<G fillRule="nonzero" transform="translate(24 29)">
				<Use fill="#000" filter="url(#prefix__a)" xlinkHref="#prefix__b" />
				<Use fill="url(#prefix__c)" xlinkHref="#prefix__b" />
			</G>
			<Path
				d="M31.545 32.91a3.64 3.64 0 00-3.636 3.635.454.454 0 11-.909 0A4.55 4.55 0 0131.545 32a.454.454 0 110 .91z"
				fill="#FFF"
			/>
		</G>
	</Svg>
);

export default Heart;
