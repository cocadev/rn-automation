import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
// import { AppLoading, Asset, Font, Icon } from 'expo';
import { Actions, Scene, Router } from 'react-native-router-flux'
import Login from './screens/Login';
import Main from './screens/Main';
import Automation from './screens/Wifi';
import Controller from './screens/Controller';
import NewController from './screens/NewController';
import Admin from './screens/Admin';
import ConfigPage from './screens/ConfigPage';

export default class App extends React.Component {

  render() {

    const scenes = Actions.create(
      <Scene key="root">

        <Scene key="login" component={Login} hideNavBar initial={false} />
        <Scene key="wifi" component={Automation} hideNavBar initial={false} />
        <Scene key="admin" component={Admin} hideNavBar initial={false} />
        <Scene key="config" component={ConfigPage} hideNavBar initial={false} />
        <Scene key="controller" component={Controller} hideNavBar initial={false} />
        <Scene key="newcontroller" component={NewController} hideNavBar initial={false} />
        <Scene key="main" component={Main} hideNavBar initial={false} />

      </Scene>
    );

    return(
      <Router scenes={scenes} />
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
