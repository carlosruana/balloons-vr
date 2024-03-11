import React from 'react';
import Balloon from './Balloon';

import {
	View,
	Sphere,
	Sound,
	asset,
} from 'react-vr';

export default class BalloonParty extends React.Component {
	static propTypes = {
		balloons: React.PropTypes.number.isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			balloonMap: new Map(),
			balloonsExploded: 0,
			balloonsMissed: 0,
			explodeSound: "stop",
			missSound: "stop"
		};
	}
	randomIntFromInterval(min,max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	}

	explodeBalloon(index) {
		if (this.state.balloonMap.size === 1 && (this.state.balloonsExploded + this.state.balloonsMissed + 1 === this.props.balloons )) {
			this.props.finishLevel(this.state.balloonsExploded, this.state.balloonsMissed);
		}
		this.setState((prevState) => {
			let newBalloonMap = new Map(prevState.balloonMap.entries());

			newBalloonMap.delete(index);

			return {
				balloonMap: newBalloonMap,
				balloonsExploded: prevState.balloonsExploded + 1,
				explodeSound: "play"
			}
		});
	}

	missBalloon(index) {
		// if it has been exploded do not miss it
		if (!this.state.balloonMap.get(index)) return false;

		if (this.state.balloonMap.size === 1 && (this.state.balloonsExploded + this.state.balloonsMissed + 1 === this.props.balloons )) {
			this.props.finishLevel(this.state.balloonsExploded, this.state.balloonsMissed);
		}
		this.setState((prevState) => {
			let newBalloonMap = new Map(prevState.balloonMap.entries());

			newBalloonMap.delete(index);

			return {
				balloonMap: newBalloonMap,
				balloonsMissed: prevState.balloonsMissed + 1,
				missSound: "play"
			}
		});
	}


	componentDidMount() {
		let index = 0;

		const createBalloon = () => {
			const x = this.randomIntFromInterval(-20, 20);
			const z = this.randomIntFromInterval(-10, -1);

			console.log(this.state.balloonMap);

			this.setState((prevState) => {
				let newBalloonMap = new Map(prevState.balloonMap.entries());
				const balloonKey = index;

				newBalloonMap.set(index, (
					<Balloon
						key={index}
						xPos={x}
						zPos={z}
						onEnter={() => this.explodeBalloon(balloonKey)}
						missBalloon={ () => this.missBalloon(balloonKey) }
					/>
				));

				return {
					balloonMap: newBalloonMap
				};
			});

			index++;
			if (index === this.props.balloons) {
				clearTimeout(balloonInterval);
			}
		};

		const balloonInterval = setInterval(createBalloon, 5000);
	}

	stopSound() {
		this.setState((prevState) => {
			return {
				explodeSound: "stop",
				missSound: "stop"
			}
		});
	}

	render() {
		return (
			<View>
				{ Array.from(this.state.balloonMap.values()) }
				<Sound
					playControl={this.state.explodeSound}
					onEnded={() => this.stopSound()}
					volume={5}
					source={{
						'wav': asset('balloon-explose-1.wav'),
					}} />
				<Sound
					playControl={this.state.missSound}
					onEnded={() => this.stopSound()}
					volume={5}
					source={{
						'wav': asset('bubble-miss.wav'),
					}} />
			</View>
		);
	}

	/*render() {
		const DEG2RAD = Math.PI / 180;

		return (
			<View>
				{Array.apply(null, {length: this.props.balloons}).map((obj, index) => {
					const theta = DEG2RAD * (index / this.props.balloons) * 360;
					const randomSeed = Math.random();
					const balloonDistance = randomSeed * 80;
					const x = Math.cos(theta) * balloonDistance;
					const z = Math.sin(theta) * balloonDistance;

					return (
						<Balloon
							key={index}
							xPos={x}
							zPos={z}
						/>
					);
				})}
			</View>
		);
	}*/
}