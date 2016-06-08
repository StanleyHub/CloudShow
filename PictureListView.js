'use strict';

var React = require('react');
var ReactNative = require('react-native');

var {
  StyleSheet,
  Text,
  View,
} = ReactNative;

var PictureListView = React.createClass({
  render: function() {
    return (
      <View style={[styles.container, styles.centerText]}>
        <Text>Coming soon...</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 164,
  },
  centerText: {
    alignItems: 'center',
  },
});

module.exports = PictureListView;
