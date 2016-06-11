'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ActivityIndicatorIOS,
  ListView,
  Platform,
  ProgressBarAndroid,
  StyleSheet,
  Text,
  View,
} = ReactNative;

var RNFS = require('react-native-fs');

// var TimerMixin = require('react-timer-mixin');
// var invariant = require('fbjs/lib/invariant');
var dismissKeyboard = require('dismissKeyboard');

var DocumentListItem = require('./DocumentListItem');
var PlayView = require('./PlayView');
// var SearchBar = require('SearchBar');

// Results should be cached keyed by the query
// with values of null meaning "being fetched"
// and anything besides null and undefined
// as the result of a valid query
var resultsCache = {
  dataForQuery: {},
  nextPageNumberForQuery: {},
  totalForQuery: {},
};

var LOADING = {};

var DocumentListView = React.createClass({
  getInitialState: function() {
    return {
      isLoading: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  },

  componentDidMount: function() {
    this.fetchDocuments();
  },

  render: function() {
    var content = this.state.dataSource.getRowCount() === 0 ?
      <NoDocuments/> :
      <ListView
        ref="listview"
        renderSeparator={this.renderSeparator}
        dataSource={this.state.dataSource}
        renderFooter={this.renderFooter}
        renderRow={this.renderRow}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={true}
        showsVerticalScrollIndicator={false}
      />;

    return (
      <View style={styles.container}>
        <View style={styles.separator} />
        {content}
      </View>
    );
  },

  renderSeparator: function(
    sectionID: number | string,
    rowID: number | string,
    adjacentRowHighlighted: boolean
  ) {
    var style = styles.rowSeparator;
    if (adjacentRowHighlighted) {
        style = [style, styles.rowSeparatorHide];
    }
    return (
      <View key={'SEP_' + sectionID + '_' + rowID}  style={style}/>
    );
  },

  renderFooter: function() {
  },

  renderRow: function(
    doc: Object,
    sectionID: number | string,
    rowID: number | string,
    highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,
  ) {
    return doc.isFile() ?
      (<DocumentListItem
        key={doc.name}
        onSelect={() => this.selectDoc(doc)}
        onHighlight={() => highlightRowFunc(sectionID, rowID)}
        onUnhighlight={() => highlightRowFunc(null, null)}
        doc={doc}
      />) : null;
  },

  selectDoc: function(doc: Object) {
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: doc.name,
        component: PlayView,
        passProps: {doc},
      });
    } else {
      dismissKeyboard();
      this.props.navigator.push({
        title: doc.name,
        name: 'doc',
        movie: doc,
      });
    }
  },

  getDataSource: function(movies: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(movies);
  },

  fetchDocuments: function() {
    var self = this;
    RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then((result) => {
        console.log('GOT RESULT', result);
        self.setState({
          isLoading: false,
          dataSource: this.getDataSource(result),
        });
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
  },
});

var NoDocuments = React.createClass({
  render: function() {
    return (
      <View style={[styles.container, styles.centerText]}>
        <Text style={styles.noMoviesText}>{'No movies found'}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 64,
  },
  centerText: {
    alignItems: 'center',
  },
  noMoviesText: {
    marginTop: 80,
    color: '#888888',
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  scrollSpinner: {
    marginVertical: 20,
  },
  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginLeft: 4,
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },
});

module.exports = DocumentListView;
