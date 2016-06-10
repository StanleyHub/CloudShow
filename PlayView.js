'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ProgressViewIOS,
} = ReactNative;

// require the module
var RNFS = require('react-native-fs');

var uploadUrl = 'http://buz.co/rnfs/upload-tester.php';  // For testing purposes, go to http://requestb.in/ and create your own link

var PlayView = React.createClass({
  getInitialState: function() {
    return {
      progress: 1,
    };
  },

  renderSubview: function() {
    if(this.state.progress >= 0 && this.state.progress < 1) {
      return (<View style={styles.uploadView}>
        <TouchableOpacity
          onPress={this.play}
          activeOpacity={0.6}>
          <Image
            style={styles.button}
            source={require('./images/start-96.png')}
          />
        </TouchableOpacity>
        <View style={[styles.progressContainer, styles.center]}>
          <Text>{'文件上传中'}</Text>
          <ProgressViewIOS
            style={styles.progressView}
            progressTintColor="orange"
            progress={0.8}>
          </ProgressViewIOS>
        </View>
      </View>);
    }
    if(this.state.progress == 1) {
      return (<View style={styles.presentView}>
        <View style={styles.currentPage}>
          <Image source={{uri: 'http://img4.cache.netease.com/news/2016/6/10/201606100857298ab4c.jpg'}}
            style={{flex: 1,}}/>
        </View>
        <View style={styles.nextPage}>
          <Image source={{uri: 'http://img4.cache.netease.com/news/2016/6/10/201606100857298ab4c.jpg'}}
            style={{flex: 1,}}/>
        </View>
        <View style={styles.control}>
          <TouchableOpacity
            style={styles.preButton}
            activeOpacity={0.6}>
            <Image
              style={styles.button}
              source={require('./images/pre-50.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextButton}
            activeOpacity={0.6}>
            <Image
              style={styles.button}
              source={require('./images/next-50.png')}
            />
          </TouchableOpacity>
        </View>
      </View>);
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        {this.renderSubview()}
      </View>
    );
  },

  play: function() {
    var files = [
      {
        name: 'test.pptx',
        filename: this.props.doc.name,
        filepath: this.props.doc.path,
        filetype: 'application/vnd.ms-powerpoint'
      }
    ];

    var uploadBegin = response => {
      var jobId = response.jobId;
      console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
    };

    var uploadProgress = response => {
      var percentage = Math.floor((response.totalBytesSent/response.totalBytesExpectedToSend) * 100);
      console.log('UPLOAD IS ' + percentage + '% DONE!');
    };

    // create an object of options
    var options = {
      toUrl: uploadUrl,
      files: files,
      beginCallback: uploadBegin,
      progressCallback: uploadProgress
    };

    // upload files
    RNFS.uploadFiles(options)
      .then(response => {
        this.setState({progress: 1});
      })
      .catch(err => {
        console.log(err);
      });
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  uploadView: {
    flex: 1,
    // backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent:'center',
  },
  progressView: {
    width: 300,
    marginTop: 5,
  },
  center: {
    alignItems: 'center',
  },
  startBtn: {
    width: 96,
    height: 96,
  },
  presentView: {
    marginTop: 64,
    marginBottom: 50,
    flex: 1,
  },
  currentPage: {
    flex: 1,
    alignItems: 'stretch',
    padding: 10,
  },
  nextPage: {
    flex: 1,
    alignItems: 'stretch',
    padding: 20,
  },
  control: {
    backgroundColor: 'lightgrey',
    height: 50,
    flexDirection: 'row',
    justifyContent:'center',
  },
  nextButton: {
    marginLeft: 30,
  },
});

module.exports = PlayView;
