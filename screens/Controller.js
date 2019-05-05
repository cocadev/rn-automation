import React from 'react';
import Colors from '../constants/Colors';
import Button from '../components/Button';
import Header from '../components/Header';
import Box from '../components/Box';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { i } from '../constants/Style';
import { width } from '../constants/Layout';
import { t } from '../constants/Text';

export default class Controller extends React.Component {

  static navigationOptions = {
    header:null
  };

  constructor(props) {
    super(props);
    this.state = {
      login:false,
      email:'',
      password: ''
    };
  }

  render() {
    const { login } = this.state;
    return (
      <ScrollView style={i.container}>
      
         <Header />

         <View style={{margin:12, position:"relative"}}>

           <Text style={[t.TitleText, {marginTop:8}]}>Scenes</Text>

            <ScrollView horizontal>
                <Box title={'Master Off'}/>
                <Box title={'Fleax'}/>
                <Box title={'Sleep'}/>
                <Box title={'Day by Day'}/>
            </ScrollView>

            <Text style={[t.TitleText, {marginTop:12}]}>Controls</Text>

            <ScrollView horizontal >
                <Box title={'LIGHT'}/>
                <Box title={'HYAC'}/>
                <Box title={'TV'}/>
                <Box title={'SOUND'}/>
            </ScrollView>

            <Text style={[t.TitleText, {marginTop:12}]}>Status</Text>

            <ScrollView horizontal >
                <Box title={'Temperature'}/>
                <Box title={'Energy'}/>
            </ScrollView>

            <Text style={[t.TitleText, {marginTop:12}]}>Services</Text>

            <ScrollView horizontal >
                <Box title={'Support'}/>
                <Box title={'Security'}/>
            </ScrollView>

        </View>
         <View style={{marginTop:28}}></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

});
