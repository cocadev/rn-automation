import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput } from 'react-native';

import Button from '../components/Button';
import Header from '../components/Header';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Actions, Scene, Router } from 'react-native-router-flux'
import { i } from '../constants/Style';
import { t } from '../constants/Text';

export default class Main extends React.Component {

  static navigationOptions = {
    header:null
  };

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  render() {
    return (
      <ScrollView style={i.container}>
      
         <Header />

         <View style={{margin:12, position:"relative"}}>
           <Ionicons name={"ios-search"} size={25} color={Colors.BLUE} style={{marginLeft:3, position:'absolute', top:8}} />

           <TextInput
            style={{height: 40, borderBottomColor: Colors.BLUE, borderBottomWidth: 1, paddingLeft:27, fontSize:16}}
            onChangeText={(text) => this.setState({text})}
          />

          <Text style={t.TitleText}>Scenes</Text>

          <ScrollView horizontal>
            <Button icon={'access-point-network'} switchs={0} title={'Master Off'}/>
            <Button icon={'calendar-today'} switchs={1} title={'Day by Day'}/>
            <Button icon={'airballoon'} switchs={0} title={'Relax'}/>
            <Button icon={'sleep'} switchs={1} title={'Sleep'}/>
          </ScrollView>

          <Text style={t.TitleText}>Controls</Text>

          <ScrollView horizontal>
            <Button icon={'lightbulb-on-outline'} switchs={1} title={'Light'}/>
            <Button icon={'door-closed'} switchs={1} title={'Open Door'}/>
            <Button icon={'google-circles-extended'} switchs={1} title={'HTAC'}/>
            <Button icon={'youtube-tv'} switchs={0} title={'TV'}/>
            <Button icon={'cellphone-sound'} switchs={0} title={'Sound'}/>
            <Button icon={'video-input-component'} switchs={0} title={'Curtain'}/>
            <Button icon={'cctv'} switchs={1} title={'Master'}/>
          </ScrollView>

          <Text style={t.TitleText}>Status</Text>

          <ScrollView horizontal>
            <Button icon={'oil-temperature'} switchs={0} title={'Temperature'}/>
            <Button icon={'temperature-kelvin'} switchs={1} title={'Humidity'}/>
            <Button icon={'lightbulb-on-outline'} switchs={0} title={'Light'}/>
            <Button icon={'air-conditioner'} switchs={1} title={'Presence'}/>
            <Button icon={'water-pump'} switchs={1} title={'Water consumption'}/>
            <Button icon={'flash-auto'} switchs={1} title={'Energy consumption'}/>

          </ScrollView>

          <Text style={t.TitleText}>Services</Text>

          <ScrollView horizontal>
            <Button icon={'access-point-network'} system={1} switchs={0} title={'Manutence service'}/>
            <Button icon={'room-service'} system={1} switchs={1} title={'Food service'}/>
            <Button icon={'youtube-tv'} system={1} switchs={0} title={'Clean service'}/>
            <Button icon={'security'} system={1} switchs={1} title={'Security'}/>
          </ScrollView>

          <View style={{marginTop:22}}></View>
         </View>    
      </ScrollView>
    );
  }
}