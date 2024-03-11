import React from 'react';
import BalloonParty from './BalloonParty';

import {
	View,
	Sphere,
	Text,
	VrButton,
	Pano,
	asset,
} from 'react-vr';

export default class GameController extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			exploded: 0,
			missed: 0,
			gameStarted: false,
			showResults: false
		};
	}

	startGame() {
		this.setState(() => {
			return {
				exploded: 0,
				missed: 0,
				gameStarted: true,
				showResults: false
			};
		});
	}

	finishLevel(balloonsExploded, balloonsMissed) {
		console.log("finishLevel");

		this.setState(() => {
			return {
				exploded: balloonsExploded,
				missed: balloonsMissed,
				gameStarted: false,
				showResults: true
			};
		});
	}

	render() {
		return (
			<View>
				{ !this.state.gameStarted && (
					<VrButton onClick={() => this.startGame()}
							  style={{
						padding: 0.1,
						backgroundColor: 'blue',
						transform: [{translate: [-0.5, 0.5, -3]}],
					}}>
						<Text style={{
						fontSize: 0.7,
						textAlign: 'center',
						textAlignVertical: 'center'
					}}>
							Start
						</Text>
					</VrButton>
				) }
				<View>
					<Pano source={asset('dock-drawing.jpg')}/>
					{ this.state.gameStarted && (
						<BalloonParty
							finishLevel={(exploded, missed) => this.finishLevel(exploded, missed)}
							balloons={3}
						/>
					) }
				</View>
				{ this.state.showResults && (
					<View style={{
						padding: 0.1,
						backgroundColor: 'blue',
						transform: [{translate: [-0.5, 0.5, -3]}],
					}}>
						<Text>Exploded: {this.state.exploded}</Text>
						<Text>Missed: {this.state.missed}</Text>
					</View>
				)}
			</View>
		);
	}
}