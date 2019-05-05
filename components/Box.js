import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { t } from '../constants/Text';
import { Actions, Scene, Router } from 'react-native-router-flux'
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const width = Dimensions.get('window').width;

export default class Box extends React.Component {
 
  render() {
    const { title } = this.props;
    return (
        <View onPress={()=>Actions.main()} style={styles.box}>
            <Text style={{textAlign:'center', color:Colors.WHITE}}>{title}</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
     box:{
        marginTop:12,
        borderRadius:6,
        width:width/4,
        height:width/4.2,
        marginRight:12,
        backgroundColor:Colors.BLUE,
        justifyContent:'center',
        alignItems:'center',
     },
  });
  