import React from 'react';
import Colors from '../constants/Colors';
import Button from '../components/Button';
import Header from '../components/Header';
import Box from '../components/Box';
import UtilService from '../utils/utils';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Picker, Image } from 'react-native';
import { i } from '../constants/Style';
import { width } from '../constants/Layout';
import { t } from '../constants/Text';
import { pic } from '../constants/Image';
import { Actions, Scene, Router } from 'react-native-router-flux'

export default class testController extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      login: false,
      email: '',
      password: '',
      type:'',
    };
  }

  render() {
    const { login } = this.state;
    return (
      <ScrollView style={i.container}>

        <Header />

        <View style={{ margin: 12, position: "relative" }}>

          <TouchableOpacity onPress={()=>Actions.wifi()}>
            <Text>Wifi-Connection</Text>
          </TouchableOpacity>

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

          <Text style={[t.TitleText, { marginVertical: 8 }]}> 3) Enter Equip Pase</Text>

          <TextInput
            style={i.input}
            placeholder={'Enter a value'}
            onChangeText={(password) => this.setState({ password })}
          />

          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity style={styles.button} >
              <Text style={{ color: Colors.WHITE }}>Find Controller</Text>
            </TouchableOpacity>
          </View>


          <Text style={[t.TitleText, { marginVertical: 8 }]}> 4) Enter Config Page</Text>
          <TextInput
            style={i.input}
            onChangeText={(password) => this.setState({ password })}
          />

          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity style={styles.button} >
              <Text style={{ color: Colors.WHITE }}>Config Page</Text>
            </TouchableOpacity>
          </View>


          <Text style={[t.TitleText, { marginTop: 8 }]}> 5) Enter Config Page</Text>

          <Text style={[t.text_g, { marginTop: 8 }]}>WIFI-SSID</Text>
          <TextInput
            style={i.input}
            placeholder={'Enter a value'}
            onChangeText={(ssid) => this.setState({ ssid })}
          />

          <Text style={[t.text_g, { marginTop: 8 }]}>WIFI-Password</Text>
          <TextInput
            style={i.input}
            placeholder={'Enter a value'}
            onChangeText={(pass) => this.setState({ pass })}
          />

          <Text style={[t.text_g, { marginTop: 8 }]}>Equipament Name  </Text>
          <TextInput
            style={i.input}
            placeholder={'Enter a value'}
            onChangeText={(name) => this.setState({ name })}
          />

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

          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{color:Colors.PINK}}>Click here to enter in the advanced configs:</Text>
            <TouchableOpacity style={[styles.button, {width:80}]} onPress={()=>Actions.admin()}>
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
  }
});
