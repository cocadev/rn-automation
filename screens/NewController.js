import React, { Component } from 'react';
import { Modal, Dimensions, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, Picker, Image, ScrollView, View, PermissionsAndroid, ToastAndroid } from 'react-native';
import Header from '../components/Header';

import wifi from 'react-native-android-wifi';
import { i } from '../constants/Style';
import _ from 'underscore'
import { t } from '../constants/Text';
import UtilService from '../utils/utils';
import { Actions } from 'react-native-router-flux';
import config from '../utils/config';

const width = Dimensions.get('window').width;

export default class NewController extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isWifiNetworkEnabled: null,
      ssid: '',
      password: '',
      ssidExist: null,
      currentSSID: null,
      currentBSSID: null,
      wifiList: null,
      modalVisible: false,
      status: null,
      level: null,
      ip: null,
      type:'',
    };
    this.connectOnPress = this.connectOnPress.bind(this)
  }

  componentDidMount() {
    this.askForUserPermissions();
  }

  async askForUserPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Wifi networks',
          'message': 'We need your permission in order to find wifi networks'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Thank you for your permission! :)");
        this.getWifiNetworksOnPress()
        
      } else {
        console.log("You will not able to retrieve wifi available networks list");
      }
    } catch (err) {
      console.warn(err)
    }
  }

  serviceCheckOnPress() {
    wifi.isEnabled(
      (isEnabled) => {
        this.setState({ isWifiNetworkEnabled: isEnabled });
        console.log(isEnabled);
      });
  }

  serviceSetEnableOnPress(enabled) {
    wifi.setEnabled(enabled)
  }

  connectOnPress = (ssid) => {

    wifi.findAndConnect(ssid, this.state.password, (found) => {
      this.setState({ ssidExist: found, modalVisible: false, ssid });
      if(found){
        console.log('- found -', found)
        ToastAndroid.show('You are connected !', ToastAndroid.SHORT);
        Actions.config({passCode: this.state.password, ssid });
      } else {
        ToastAndroid.show('Wrong !', ToastAndroid.SHORT);
      }
    });

  }

  disconnectOnPress() {
    wifi.disconnect();
  }

  getWifiNetworksOnPress() {
    wifi.loadWifiList((wifiStringList) => {
      console.log(wifiStringList);
      var wifiArray = JSON.parse(wifiStringList);
      this.setState({
        wifiList: wifiArray,
        modalVisible: true
      });
    },
      (error) => {
        console.log(error);
      }
    );
  }

  renderModal() {

    var wifiListComponents = [];
    var mapping = _.find(this.state.wifiList, (u)=>{
      return u.SSID.substring(0, config.LOCAL_PASSWORD_LENGTH)  == config.LOCAL_PASSWORD 
    })

    if(mapping){
      return (
        <View style={styles.modalContainer}>
             <View style={styles.modal}>
              
            <Text style={[styles.instructions, {marginVertical:12}]}>{mapping.SSID.substring(0, config.LOCAL_PASSWORD_LENGTH)}</Text>
            <TextInput
              style={[i.input, {width:180}]}
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(event) => this.setState({ password: event })}
              value={this.state.password}
              placeholder={'password'} />
            <View style={[styles.row, {flexDirection:'row'}]}>
              <TouchableHighlight style={[i.button, {marginTop:16, width:120, marginHorizontal:12}]} onPress={() => this.setState({ modalVisible: false })}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableHighlight>
              <TouchableHighlight style={[i.button, {marginTop:16, width:120, marginHorizontal:12}]} onPress={()=>this.connectOnPress(mapping.SSID)}>
                <Text style={styles.buttonText}>Connect</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.modalContainer}>
             <View style={styles.modal}>
                <Text style={{marginVertical:20}}>Not found</Text>
                <TouchableHighlight style={i.button} onPress={() => this.setState({ modalVisible: false })}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableHighlight>
          </View>
        </View>
      )
    }
  }

  firstPage(){
    return(
      <View>
          <Text style={[t.TitleText, { marginTop: 8 }]}> 1) Select Controller Type</Text>
          <Picker
            selectedValue={this.state.type}
            style={{ height: 50, width: width - 150 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ type: itemValue })
            }>

            <Picker.Item value='' label='Choose Type'/>
            <Picker.Item label="Sii Room" value="1" />
            <Picker.Item label="Sii IoT" value="2" />
            <Picker.Item label="Sii Box" value="3" />

          </Picker>

          <Text style={[t.TitleText, { marginTop: 8 }]}> 2) Put Equipment in Discovery Mode</Text>
          <Text>You selected : {this.state.type}</Text>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image source={UtilService.ChangeImg(this.state.type)} style={{ width: 120, height: 120, marginVertical: 10, }} />
          </View>

      </View>
    )
  }

  render() {
    const { ssidExist } = this.state
    return (
      <ScrollView>
        <Header />
        <View style={styles.container}>

            { this.firstPage()}
       
        </View>

        <Modal
          visible={this.state.modalVisible}
          onRequestClose={() => { }}>
            {this.renderModal()}
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#e9e9e9',
    marginBottom: 100
  },
  row: {
    flexDirection: 'row'
  },
  title: {
    fontSize: 20,
  },
  instructionsContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  instructionsTitle: {
    marginBottom: 10,
    color: '#333333'
  },
  instructions: {
    color: '#333333'
  },
  buttonText: {
    color: 'white'
  },
  answer: {
    marginTop: 5,
    marginLeft:12
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0,0.5)",
    alignItems: "center",
    justifyContent: "center"
 },
 modal: {
      width: width-40,
      height: width/1.7,
      borderRadius: 5,
      shadowColor: "black",
      alignItems: "center",
      justifyContent: "center",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      backgroundColor: "white"
 },
});