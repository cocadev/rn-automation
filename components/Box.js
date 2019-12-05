import * as React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Colors from '../constants/Colors';

const width = Dimensions.get('window').width;

export default class Box extends React.Component {
	render() {
		const { title } = this.props;
		return (
			<View onPress={() => Actions.main()} style={styles.box}>
				<Text style={{ textAlign: 'center', color: Colors.WHITE }}>{title}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	box: {
		marginTop: 12,
		borderRadius: 6,
		width: width / 4,
		height: width / 4.2,
		marginRight: 12,
		backgroundColor: Colors.BLUE,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
