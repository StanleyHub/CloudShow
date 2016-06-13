import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  NavigatorIOS,
  Text,
  View
} from 'react-native';

var DocumentListView = require('./DocumentListView');
var PictureListView = require('./PictureListView');
var VideoListView = require('./VideoListView');

var TabBarView = React.createClass({
  
  getInitialState: function() {
    return {
      selectedTab: 'doc',
    };
  },

  render() {
    return (
      <TabBarIOS
        unselectedTintColor="#7891AA"
        tintColor="#E74D42"
        barTintColor="white">
        <TabBarIOS.Item
          title="文档"
          icon={require('./images/document.png')}
          selected={this.state.selectedTab === 'doc'}
          onPress={() => {
            this.setState({
              selectedTab: 'doc',
            });
          }}>
          <NavigatorIOS
            barTintColor='#e74c3c'
            titleTextColor='#ffffff'
            tintColor='#ffffff'
            style={styles.container}
            initialRoute={{
              title: '文档',
              component: DocumentListView,
            }}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="图片"
          icon={require('./images/picture.png')}
          selected={this.state.selectedTab === 'pic'}
          onPress={() => {
            this.setState({
              selectedTab: 'pic',
            });
          }}>
          <NavigatorIOS
            barTintColor='#e74c3c'
            titleTextColor='#ffffff'
            tintColor='#ffffff'
            style={styles.container}
            initialRoute={{
              title: '图片',
              component: PictureListView,
            }}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="视频"
          icon={require('./images/video.png')}
          selected={this.state.selectedTab === 'video'}
          onPress={() => {
            this.setState({
              selectedTab: 'video',
            });
          }}>
          <NavigatorIOS
            barTintColor='#e74c3c'
            titleTextColor='#ffffff'
            tintColor='#ffffff'
            style={styles.container}
            initialRoute={{
              title: '视频',
              component: VideoListView,
            }}/>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'darkgrey',
    margin: 50,
  },
});

module.exports = TabBarView;
