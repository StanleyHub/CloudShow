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
} = ReactNative;

// require the module
var RNFS = require('react-native-fs');

var uploadUrl = 'http://buz.co/rnfs/upload-tester.php';  // For testing purposes, go to http://requestb.in/ and create your own link

  // <ScrollView contentContainerStyle={styles.contentContainer}>
  //   <View style={styles.mainSection}>
  //     <Image
  //       source={getImageSource(this.props.movie, 'det')}
  //       style={styles.detailsImage}
  //     />
  //     <View style={styles.rightPane}>
  //       <Text style={styles.movieTitle}>{this.props.movie.title}</Text>
  //       <Text>{this.props.movie.year}</Text>
  //       <View style={styles.mpaaWrapper}>
  //         <Text style={styles.mpaaText}>
  //           {this.props.movie.mpaa_rating}
  //         </Text>
  //       </View>
  //       <Ratings ratings={this.props.movie.ratings} />
  //     </View>
  //   </View>
  //   <View style={styles.separator} />
  //   <Text>
  //     {this.props.movie.synopsis}
  //   </Text>
  //   <View style={styles.separator} />
  //   <Cast actors={this.props.movie.abridged_cast} />
  // </ScrollView>

var PlayView = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.play}
          activeOpacity={0.6}>
          <Image
            style={styles.button}
            source={require('./images/start-96.png')}
          />
        </TouchableOpacity>
      </View>
    );
  },

  play: function() {
    console.log('play......');
    // create an array of objects of the files you want to upload
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
        console.log('FILES UPLOADED!');
      })
      .catch(err => {
        console.log(err);
      });
    // var uploadUrl1 = 'http://buz.co/rnfs/upload-tester.php';
    // var progress1 = data => {
    //   console.log('uploading...');
    //   // this.setState({ output: text });
    // };
    //
    // var begin1 = res => {
    //   // jobId1 = res.jobId;
    //   console.log('begin upload...');
    // };
    //
    // var options = {
    //   toUrl: uploadUrl1,
    //   files: [{ name: 'myfile', filename: this.props.doc.name, filepath: this.props.doc.path, filetype: 'image/jpeg' }],
    //   beginCallback: begin1,
    //   progressCallback: progress1
    // };
    //
    // RNFS.uploadFiles(options).then(res => {
    //   console.log('uploaded...');
    // }).catch(err => this.showError(err));
  }
});

var styles = StyleSheet.create({
  container: {
    marginTop: 64,
  },
  startBtn: {
    width: 96,
    height: 96,
  },
  rightPane: {
    justifyContent: 'space-between',
    flex: 1,
  },
  movieTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  rating: {
    marginTop: 10,
  },
  ratingTitle: {
    fontSize: 14,
  },
  ratingValue: {
    fontSize: 28,
    fontWeight: '500',
  },
  mpaaWrapper: {
    alignSelf: 'flex-start',
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 3,
    marginVertical: 5,
  },
  mpaaText: {
    fontFamily: 'Palatino',
    fontSize: 13,
    fontWeight: '500',
  },
  mainSection: {
    flexDirection: 'row',
  },
  detailsImage: {
    width: 134,
    height: 200,
    backgroundColor: '#eaeaea',
    marginRight: 10,
  },
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  castTitle: {
    fontWeight: '500',
    marginBottom: 3,
  },
  castActor: {
    marginLeft: 2,
  },
});

module.exports = PlayView;
