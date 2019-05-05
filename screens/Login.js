import React from 'react';
import Colors from '../constants/Colors';
import Button from '../components/Button';
import Header from '../components/Header';
import Box from '../components/Box';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Dimensions, ImageBackground, TouchableHighlight } from 'react-native';
import { i } from '../constants/Style';
import { t } from '../constants/Text';
import { pic } from '../constants/Image';
import { Actions, Scene, Router } from 'react-native-router-flux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import wifi from 'react-native-android-wifi';

const width = Dimensions.get('window').width;

export default class Main extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      login: false,
      modal: false,
      email: '',
      password: '',
      modalVisible: false,
      numbers : []
    };
  }

  componentDidMount() {
    console.log(wifi);
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

      } else {
        console.log("You will not able to retrieve wifi available networks list");
      }
    } catch (err) {
      console.warn(err)
    }
  }

  renderWifiModal() {
    var wifiListComponents = [];
    for (w in this.state.wifiList) {
      wifiListComponents.push(
        <TouchableOpacity
          key={w}
          style={styles.instructionsContainer}
          onPress={() => {
            console.log('************* w *************', this.state.wifiList[w].SSID)
            this.setState({ modalVisible: false })
            var joined = this.state.numbers.concat({title: this.state.wifiList[w].SSID, key:w});
            this.setState({ numbers: joined })
          }}
        >
          <Text style={styles.instructionsTitle}>{this.state.wifiList[w].SSID}</Text>
          <Text>BSSID: {this.state.wifiList[w].BSSID}</Text>
          <Text>Capabilities: {this.state.wifiList[w].capabilities}</Text>
          <Text>Frequency: {this.state.wifiList[w].frequency}</Text>
          <Text>Level: {this.state.wifiList[w].level}</Text>
          <Text>Timestamp: {this.state.wifiList[w].timestamp}</Text>
        </TouchableOpacity>
      );
    }
    return wifiListComponents;
  }


  mysili() {
    return (
      <ScrollView horizontal style={{ flexDirection: 'row' }}>

        <Box title={'My Office'} />

        <TouchableOpacity onPress={() => Actions.main()}>
          <Box title={'My Home'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Actions.newcontroller()}>
          <Box title={'ADD NEW'} />
        </TouchableOpacity>

      </ScrollView>
    )
  }

  loginView() {
    return (
      <View>
        <Text style={[t.text_g, { marginTop: 8 }]}>Login</Text>

        <TextInput
          style={i.input}
          onChangeText={(email) => this.setState({ email })}
        />

        <Text style={[t.text_g, { marginTop: 8 }]}>Password</Text>
        <TextInput
          style={i.input}
          onChangeText={(password) => this.setState({ password })}
        />

        <Text style={[t.text_g, { marginTop: 2, textAlign: 'right' }]}>Forgot password?</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 22 }}>
          <TouchableOpacity style={i.button} onPress={() => this.setState({ login: true })}>
            <Text style={{ color: Colors.WHITE }}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={i.button}>
            <Text style={{ color: Colors.WHITE }}>Create Account</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }

  crateController = () => {
    console.log('****************************', this.state.code)
    axios.get(`https://io.siitec.com/cmd/cmd=quick_acess&controller_quick_acess_id=` + this.state.code)
      .then(res => {
        const value = res.data;
        this.setState({ value });
      })
  }

  renderModal() {
    return (
      <Modal
        visible={this.state.modal}
        transparent={true}
        onRequestClose={() => { }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={[t.TitleText, { marginVertical: 8 }]}>Enter the Controller Code</Text>

            <TextInput
              style={i.input}
              placeholder={'Enter the controller code'}
              onChangeText={(code) => this.setState({ code })}
            />

            <TouchableOpacity 
              //  onPress={this.crateController}
              onPress={this.getWifiNetworksOnPress.bind(this)}
               style={[i.button, { marginTop: 15 }]} >
              <Text style={{ color: Colors.WHITE }}>Find</Text>
            </TouchableOpacity>

            {/* <View style={{flexDirection:'row', marginTop:12}}>

                   <View style={{flex:1, alignItems:'center'}}>
                     <Text>Sii :</Text>
                     <Text>Name :</Text>
                     <Text>Validate Code:</Text>
                   </View>

                   <View style={{flex:1, alignItems:'center'}}>
                     <Text>fdsf</Text>
                     <Text>Sii:</Text>
                     <Text>Sii:</Text>
                   </View>

                </View> */}

            <TouchableOpacity style={{ marginTop: 15, justifyContent: 'flex-end', width: '100%' }} onPress={() => this.setState({ modal: false })}>
              <Text style={{ textAlign: 'right', marginRight: 20 }}>Close</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    );
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

  render() {

    const { login } = this.state;

    return (
      <ScrollView style={i.container}>

        <ImageBackground source={pic.image_grad} style={styles.grad} >


          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <EvilIcons name={"user"} size={30} color={Colors.WHITE} style={{ marginRight: 3 }} />
              <Text style={t.text_w}>LOGIN</Text>
            </View>
            <Ionicons name={"md-menu"} size={30} color={Colors.WHITE} style={{ marginLeft: 8 }} />
          </View>

          <Text style={[t.HeadText, { marginTop: width / 16 }]}>My Space</Text>


        </ImageBackground>

        <View style={{ margin: 12, position: "relative" }}>

          <Text style={[t.TitleText, { marginTop: 8 }]}>Local Sii</Text>

          <ScrollView horizontal>
            {
              this.state.numbers.map((number) =>
              <View style={{ flexDirection: 'row' }} key={number.key}>
                <TouchableOpacity >
                  <Box title={number.title} />
                </TouchableOpacity>
              </View>
            )}
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => this.setState({ modal: true })}>
                <Box title={'NEW\n\nENTER EQUIPMENT CODE'} />
              </TouchableOpacity>
            </View>
          </ScrollView>

          <Text style={[t.TitleText, { marginTop: 12 }]}>My Sii</Text>

          {login && this.mysili()}
          {!login && this.loginView()}
          {this.renderModal()}

          <Modal
            visible={this.state.modalVisible}
            onRequestClose={() => { }}>
            <TouchableHighlight style={i.button} onPress={() => this.setState({ modalVisible: false })}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableHighlight>
            <ScrollView>
              {this.renderWifiModal()}
            </ScrollView>
          </Modal>

        </View>
        <View style={{ marginTop: 28 }}></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0,0.5)",
    alignItems: "center",
    justifyContent: "center"
  },
  modal: {
    width: width - 40,
    height: width / 1.5,
    borderRadius: 5,
    shadowColor: "black",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    backgroundColor: "white"
  },
  grad: {
    width: width,
    height: width / 2.1,
    paddingHorizontal: 12
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
});
