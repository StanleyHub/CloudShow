import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
} from 'react-native';

var TabBarView = require('./TabBarView');

class CloudShow extends React.Component {

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{}}
        renderScene={this.renderScene}/>
    );
  }

  renderScene(route, navigator) {
    return (<TabBarView navigator={navigator} />);
  }
}

const styles = StyleSheet.create({
});

AppRegistry.registerComponent('CloudShow', () => CloudShow);
