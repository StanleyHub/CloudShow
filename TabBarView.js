import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  NavigatorIOS,
  Text,
  Image,
  View
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

var DocumentListView = require('./DocumentListView');
var PictureListView = require('./PictureListView');
var VideoListView = require('./VideoListView');

var TabBarView = React.createClass({

  getInitialState: function() {
    return {
      selectedTab: 'doc',
      tabBarHeight: 50
    };
  },

  hideTabbar() {
    this.setState({tabBarHeight: 0});
  },

  showTabbar() {
    this.setState({tabBarHeight: 50});
  },

  render() {
    return (
      <TabNavigator
        tabBarStyle={{ height: this.state.tabBarHeight, overflow: 'hidden' }}
        sceneStyle={{ paddingBottom: this.state.tabBarHeight }}
        unselectedTintColor="#7891AA"
        tintColor="#E74D42"
        barTintColor="white">
        <TabNavigator.Item
          title="文档"
          selectedTitleStyle={{color: '#e74c3c'}}
          renderIcon={() => <Image source={require('./images/document-unselected.png')} />}
          renderSelectedIcon={() => <Image source={require('./images/document.png')} />}
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
              passProps: { hideTabbar:  this.hideTabbar, showTabbar: this.showTabbar },
            }}/>
        </TabNavigator.Item>
        <TabNavigator.Item
          title="图片"
          selectedTitleStyle={{color: '#e74c3c'}}
          renderIcon={() => <Image source={require('./images/picture-unselected.png')} />}
          renderSelectedIcon={() => <Image source={require('./images/picture.png')} />}
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
        </TabNavigator.Item>
        <TabNavigator.Item
          title="视频"
          selectedTitleStyle={{color: '#e74c3c'}}
          renderIcon={() => <Image source={require('./images/video-unselected.png')} />}
          renderSelectedIcon={() => <Image source={require('./images/video.png')} />}
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
        </TabNavigator.Item>
      </TabNavigator>
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
