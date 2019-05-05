import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View, WebView, Text } from 'react-native';
import { i } from '../constants/Style';
import Header from '../components/Header';
import config from '../utils/config';

export default class Admin extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={i.container}>
        <Header />
        <View style={{margin:12, borderRadius:4, borderColor:'#ddd', borderWidth:2, flex:1}}>
          <WebView
              onNavigationStateChange={this.onNavigationStateChange}
              startInLoadingState
              scalesPageToFit
              javaScriptEnabled
              style={{ flex: 1 }}
              source={{uri: config.LOCAL_URL}}
          />
        </View>
      </View>
    );
  }
}
