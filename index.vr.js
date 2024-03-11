import React from 'react';
import GameController from './vr/components/GameController';

import {
  AppRegistry,
  asset,
  Text,
  View,
} from 'react-vr';

export default class balloons_vr extends React.Component {
  render() {
    return (
        <GameController/>
    );
  }
};

AppRegistry.registerComponent('balloons_vr', () => balloons_vr);
