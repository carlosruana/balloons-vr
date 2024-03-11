import React from 'react';
import {
	View,
	Animated,
	Text,
	Sphere,
	Sound,
	asset,
} from 'react-vr';

class Balloon extends React.Component {
	static propTypes = {
		xPos: React.PropTypes.number.isRequired,
		zPos: React.PropTypes.number.isRequired
	};
	constructor(props) {
		super(props);

		this.state = {
			elevationAnim: new Animated.Value(-1), // init y position
			radiusAnim: new Animated.Value(0.1), // init balloon radius
			rotateAnim: new Animated.Value(0)
		};

		this.zPos = this.props.zPos;

		if (this.props.zPos > -1 && this.props.zPos < 1) {
			this.zPos *= 10;
		}
	}
	componentDidMount() {
		Animated.parallel([
			Animated.timing(          // Uses easing functions
			this.state.elevationAnim,    // The value to drive
			{
				toValue: 2,
				duration: 15000,
				delay: 1000
			}),            // Configuration
			Animated.timing(          // Uses easing functions
				this.state.radiusAnim,    // The value to drive
				{
					toValue: 1,
					duration: 15000,
					delay: 1000
				}            // Configuration
			),            // Configuration
			Animated.timing(          // Uses easing functions
				this.state.rotateAnim,    // The value to drive
				{
					toValue: 360,
					duration: 15000,
					delay: 1000
				}            // Configuration
			)
		]).start(() => {
			this.props.missBalloon();
		});
	}
	render() {
		return (
			<Animated.View
				style={{
					transform: [
						{ translateX: this.props.xPos },
						{ translateY: this.state.elevationAnim },
						{ translateZ: this.zPos },
						{ rotateX: this.zPos < 0 ? '180deg' : '0deg' },
						{ rotateY: this.state.rotateAnim },
						{ scale : this.state.radiusAnim },
					],
				}}
			>
				<Sphere
					onEnter={ this.props.onEnter }
					radius={ 0.6 }
					widthSegments={20}
					heightSegments={20}
					texture={asset('dock-drawing.jpg')}
					style={{
						transform: [
							{ rotateY: this.zPos < 0 ? '240deg' : '0deg' }
						]
                  	}}
				/>
				<Sound
					volume={5}
					source={{
						'wav': asset('bubble-pop.wav'),
					}} />
			</Animated.View>
		);
	}
}
export default Balloon;