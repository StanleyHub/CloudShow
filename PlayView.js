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
  ActivityIndicatorIOS
} = ReactNative;

// require the module
var RNFS = require('react-native-fs');
var Carousel = require('react-native-carousel');

var uploadUrl = 'http://192.168.1.99:8080/api/OpenPPT';

var PlayView = React.createClass({
  getInitialState: function() {
    return {
      progress: 0,
      currentPageUri: '',
      notePageUri: '',
      nextPageUri: '',
      loading: false,
      hasPrePage: false,
      hasNextPage: false,
    };
  },

  renderSubview: function() {
    if(this.state.progress >= 0 && this.state.progress < 1) {
      return (<View style={styles.uploadView}>
        <TouchableOpacity
          onPress={this.play}
          activeOpacity={0.6}>
          <Image
            source={require('./images/start-96.png')}
          />
        </TouchableOpacity>
        {(() => {
          if(this.state.progress > 0 ) {
            return (<View style={[styles.progressContainer, styles.center]}>
                      <Text>{'文件上传中'}</Text>
                      <ProgressViewIOS
                        style={styles.progressView}
                        progressTintColor="#E74C3C"
                        progress={this.state.progress}>
                      </ProgressViewIOS>
                    </View>);
          }
        })()}
      </View>);
    }
    if(this.state.progress == 1) {
      var loader = this.state.loading ?
        <View style={styles.progress}>
          <ActivityIndicatorIOS size='large' color='#E74C3C'/>
        </View> : null;
      return (<View style={styles.presentView}>
        <View style={styles.currentPage}>
          <Carousel
            hideIndicators={false}
            indicatorColor="#E74D42"
            indicatorSize={20}
            indicatorSpace={15}
            inactiveIndicatorColor="#999999"
            indicatorAtBottom={true}
            indicatorOffset={5}
            inactiveIndicatorText= '•'
            indicatorText= '•'
            animate={false}
            delay={1000}>
            <View>
              <Image source={{uri: this.state.currentPageUri}}
                  style={{flex: 1, width: 300}}
                  resizeMode='contain'
                  onLoadStart={(e) => this.setState({loading: true})}
                  onLoad={() => this.setState({loading: false})}>
                {loader}
              </Image>
            </View>
            <View>
              <Image source={{uri: this.state.notePageUri}}
                  style={{flex: 1, width: 300}}
                  resizeMode='contain'
                  onLoadStart={(e) => this.setState({loading: true})}
                  onLoad={() => this.setState({loading: false})}>
                {loader}
              </Image>
            </View>
          </Carousel>
        </View>
        <View style={styles.separator} />
        <View style={styles.nextPage}>
          <Image source={{uri: this.state.nextPageUri}}
              style={{flex: 1, width: 280}}
              resizeMode='contain'
              onLoadStart={(e) => this.setState({loading: true})}
              onLoad={() => this.setState({loading: false})}>
            {loader}
          </Image>
        </View>
        <View style={styles.control}>
          <TouchableOpacity
            style={styles.preButton}
            activeOpacity={0.6}
            onPress={this.prePage}
            disabled={this.state.hasPrePage}>
            <Image
              style={styles.button}
              source={require('./images/pre-50.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextButton}
            activeOpacity={0.6}
            onPress={this.nextPage}
            disabled={this.state.hasNextPage}>
            <Image
              style={styles.button}
              source={require('./images/next-50.png')}
            />
          </TouchableOpacity>
        </View>
      </View>);
    }
  },

  componentWillUnmount: function() {
    fetch('http://192.168.1.99:8080/api/close', {method: 'POST'})
      .then((response) => {
        console.log(response);
      });
    this.props.showTabbar();
  },

  render: function() {
    return (
      <View style={styles.container}>
        {this.renderSubview()}
      </View>
    );
  },

  prePage: function() {
    console.log('pre page');
    this.setState({loading: true});
    fetch('http://192.168.1.99:8080/api/pageup', {method: 'POST'})
      .then((response) => response.json())
      .then(() => {
        console.log('page up done.');
        var cacheBuster = this.getCacheBuster();
        this.setState({
          currentPageUri: 'http://192.168.1.99:8080/api/currentpage' + cacheBuster,
          notePageUri: 'http://192.168.1.99:8080/api/notepage' + cacheBuster,
          nextPageUri: 'http://192.168.1.99:8080/api/nextpage' + cacheBuster
        });
      });
  },

  getCacheBuster: function() {
    return '?random=' + Math.random();
  },

  nextPage: function() {
    console.log('next page');
    this.setState({loading: true});
    fetch('http://192.168.1.99:8080/api/pagedown', {method: 'POST'})
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('page down done.');
        var cacheBuster = this.getCacheBuster();
        this.setState({
          currentPageUri: 'http://192.168.1.99:8080/api/currentpage' + cacheBuster,
          notePageUri: 'http://192.168.1.99:8080/api/notepage' + cacheBuster,
          nextPageUri: 'http://192.168.1.99:8080/api/nextpage' + cacheBuster
        });
      });
  },

  play: function() {
    // this.setState({progress: 1});
    var files = [
      {
        name: this.props.doc.name,
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
      var progress = response.totalBytesSent/response.totalBytesExpectedToSend;
      this.setState({progress: progress});
      console.log('UPLOAD IS ' + progress + 'DONE!');
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
        var cacheBuster = this.getCacheBuster();
        this.setState({
          currentPageUri: 'http://192.168.1.99:8080/api/currentpage' + cacheBuster,
          notePageUri: 'http://192.168.1.99:8080/api/notepage' + cacheBuster,
          nextPageUri: 'http://192.168.1.99:8080/api/nextpage' + cacheBuster
        });
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
    flex: 1,
  },
  currentPage: {
    flex: 1,
    padding: 10,
  },
  nextPage: {
    flex: 1,
    alignItems: 'center',
  },
  control: {
    backgroundColor: 'lightgrey',
    height: 60,
    flexDirection: 'row',
  },
  preButton: {
    marginLeft: 20,
    marginTop:3,
  },
  nextButton: {
    marginLeft: 170,
    marginTop:3,
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  progress: {
    flex: 1,
    justifyContent:'center',
    alignSelf: 'stretch',
  },
  button: {
    width: 55,
    height: 55,
  }
});

module.exports = PlayView;
