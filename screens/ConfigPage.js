import React from 'react';
import { Modal, Dimensions, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, Picker, Image, ScrollView, View, PermissionsAndroid, ToastAndroid } from 'react-native';
import Header from '../components/Header';

import wifi from 'react-native-android-wifi';
import { i } from '../constants/Style';
import _ from 'underscore'
import { t } from '../constants/Text';
import UtilService from '../utils/utils';
import { Actions } from 'react-native-router-flux';
import Colors from '../constants/Colors';
import axios from 'axios';
import config from '../utils/config';

const width = Dimensions.get('window').width;

export default class SettingsScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props);
    this.state = {
      name: '',
      pass: '',
      ssid: '',
      data: [],
      type: '',
      controller: '',
      firm: '',
      hardware: '',
      server : config.SERVER,
      key : '',
      modalVisible:true
    }
  }

  componentDidMount() {
    axios.get(config.LOCAL_PING)
      .then(res => {
        const data = res.data;
        ToastAndroid.show('You are connected !', ToastAndroid.SHORT);
        this.setState({ 
          name: data.name,
          pass: data.ssid_pass,
          ssid: data.ssid,
          data: data,
          type: data.type,
          controller: data.controller_id,
          firm: data.firmware_version,
          hardware: data.hardware_version,
          server : data.server,
          key : data.master_key,
        });
        console.log(' hi my jsons ==> ', data)
        this.setState({modalVisible:false})

      }).catch(() => {
        ToastAndroid.show('Connection Fail !', ToastAndroid.SHORT);
        Actions.pop()
        this.setState({modalVisible:false})

      });
  }

  checkstatus(){
    return(
      <View>
          <Text style={[t.text_g, { marginTop: 8 }]}>New Admin Code</Text>
          <TextInput
            style={i.input}
            placeholder={'Enter a value'}
            onChangeText={(code) => this.setState({ code })}
          />

          <Text style={[t.text_g, { marginTop: 8 }]}>Admin Code Repeat</Text>
          <TextInput
            style={i.input}
            placeholder={'Enter a value'}
            onChangeText={(repeat) => this.setState({ repeat })}
          />
      </View>
    )
  }

  renderModal() {
    return (
      <Modal
        visible={this.state.modalVisible}
        transparent={true}
        onRequestClose={() => {}}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
             <Text>Loading ...</Text>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    console.log('this.props.passCode', this.props.passCode)
    const { data } = this.state;
    return (
      <ScrollView >
        <Header />
        <View style={{margin:12}}>
          <Text style={[t.TitleText, { marginTop: 8 }]}> 5) Enter Config Page</Text>

          <Text style={[t.text_g, { marginTop: 8 }]}>WIFI-SSID</Text>
          <TextInput
            style={i.input}
            placeholder={'Enter a value'}
            onChangeText={(ssid) => this.setState({ ssid })}
            value={this.state.ssid}
          />

          <Text style={[t.text_g, { marginTop: 8 }]}>WIFI-Password</Text>
          <TextInput
            style={i.input}
            placeholder={'Enter a value'}
            onChangeText={(pass) => this.setState({ pass })}
            value={this.state.pass}
            secureTextEntry={true}
          />

          <Text style={[t.text_g, { marginTop: 8 }]}>Equipament Name  </Text>
          <TextInput
            style={i.input}
            placeholder={'Enter a value'}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
          />

          <Text style={[t.text_g, { marginTop: 8 }]}>Type  </Text>
          <TextInput
            style={[i.input, {color:Colors.DARK}]}
            editable = {false}
            placeholder={'Enter a value'}
            onChangeText={(type) => this.setState({ type })}
            value={this.state.type}
          />

          <Text style={[t.text_g, { marginTop: 8 }]}>Controller ID  </Text>
          <TextInput
            style={[i.input, {color:Colors.DARK}]}
            editable = {false}
            placeholder={'Enter a value'}
            onChangeText={(controller) => this.setState({ controller })}
            value={this.state.controller}
          />

          <Text style={[t.text_g, { marginTop: 8 }]}>Firmware Version </Text>
          <TextInput
            style={[i.input, {color:Colors.DARK}]}
            editable = {false}
            placeholder={'Enter a value'}
            onChangeText={(firm) => this.setState({ firm })}
            value={this.state.firm}
          />

          <Text style={[t.text_g, { marginTop: 8 }]}>Hardware Version </Text>
          <TextInput
            style={[i.input, {color:Colors.DARK}]}
            editable = {false}
            placeholder={'Enter a value'}
            onChangeText={(hardware) => this.setState({ hardware })}
            value={this.state.hardware}
          />

          <Text style={[t.text_g, { marginTop: 8 }]}>Server </Text>
          <TextInput
            style={i.input}
            placeholder={'Enter a value'}
            onChangeText={(server) => this.setState({ server })}
            value={this.state.server}
          />

          <Text style={[t.text_g, { marginTop: 8 }]}>Master Key </Text>
          <TextInput
            style={i.input}
            placeholder={'Enter a value'}
            onChangeText={(key) => this.setState({ key })}
            value={this.state.key}
          />

          {this.props.passCode == 'sii123' && this.checkstatus()}

          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{color:Colors.PINK, fontSize: 12}}>Click here to enter in the advanced configs:</Text>
            <TouchableOpacity style={[styles.button, {width:70}]} onPress={()=>Actions.admin()}>
              <Text style={{ color: Colors.WHITE }}>Config</Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity style={styles.button} >
              <Text style={{ color: Colors.WHITE }}>Update Configuration</Text>
            </TouchableOpacity>
          </View>

          <Text style={[t.text_g, { marginTop: 2, textAlign: 'center' }]}>Wait for Equipment to Connect to Internet</Text>
          
        </View>
        {this.renderModal()}
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.BLUE,
    width: 160,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginVertical: 15,
    borderRadius: 4
  },
  textInput: {
    height: 30,
    borderColor: Colors.BLUE,
    borderWidth: 1,
    fontSize: 16,
    borderRadius: 4,
    paddingHorizontal: 12
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0,0.5)",
    alignItems: "center",
    justifyContent: "center"
  },
  modal: {
    width: width /3,
    height: width / 3,
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