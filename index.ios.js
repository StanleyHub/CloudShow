/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  NavigatorIOS,
  Text,
  View
} from 'react-native';

var RNFS = require('react-native-fs');
var DocumentListView = require('./DocumentListView');
var PictureListView = require('./PictureListView');
var VideoListView = require('./VideoListView');

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

class CloudShow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'doc',
    };
  }

  componentDidMount() {
    console.log(RNFS.DocumentDirectoryPath);
    // RNFS.writeFile(RNFS.DocumentDirectoryPath + '/test.pptx', 'Lorem ipsum dolor sit amet', 'utf8')
    //   .then((success) => {
    //     console.log('FILE WRITTEN!');
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  }

  renderContent(pageText: string) {
    return (
      <View style={styles.tabContent}>
        <Text style={styles.tabText}>{pageText}</Text>
      </View>
    );
  }

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
}

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

AppRegistry.registerComponent('CloudShow', () => CloudShow);
