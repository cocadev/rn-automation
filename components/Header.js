import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { t } from '../constants/Text';
import { pic } from '../constants/Image';
import { Actions } from 'react-native-router-flux';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const width = Dimensions.get('window').width;

export default class Header extends React.Component {
	render() {
		return (
			<View>
				<ImageBackground source={pic.image_grad} style={styles.grad}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
						<TouchableOpacity
							onPress={() => Actions.pop()}
							style={{ flexDirection: 'row', alignItems: 'center' }}
						>
							<MaterialCommunityIcons
								name={'keyboard-backspace'}
								size={30}
								color={Colors.WHITE}
								style={{ marginRight: 3 }}
							/>
						</TouchableOpacity>
						<Ionicons name={'md-menu'} size={30} color={Colors.WHITE} style={{ marginLeft: 8 }} />
					</View>

					<Text style={[ t.HeadText, { marginTop: width / 16 } ]}>My Space</Text>
					<Text style={{ color: Colors.WHITE }}>________________</Text>
					<Text style={[ t.text_w, { marginTop: 6 } ]}>{'Nugoe Design\nBeleo Halodl e'}</Text>
				</ImageBackground>

				<View style={styles.roundView}>
					<View style={{ paddingHorizontal: 12, borderRightColor: Colors.PURPLE, borderRightWidth: 2 }}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={t.text_p}>23</Text>
							<MaterialCommunityIcons
								name={'temperature-celsius'}
								size={16}
								color={Colors.PURPLE}
								style={{ marginLeft: 2 }}
							/>
						</View>
						<Text style={t.ThinText}>Kind </Text>
					</View>

					<View style={{ marginHorizontal: 12 }}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={t.text_p}>OCUPADO</Text>
						</View>
						<Text style={t.ThinText}>Good </Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	grad: {
		width: width,
		height: width / 2.1,
		paddingHorizontal: 12
	},
	roundView: {
		flexDirection: 'row',
		marginTop: -15,
		marginLeft: 12,
		backgroundColor: Colors.HEAVYBLUE,
		borderRadius: 20,
		paddingVertical: 4,
		height: 30,
		width: 150
	}
});
