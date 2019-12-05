import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Picker, Modal } from 'react-native';
import { t } from '../constants/Text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Colors from '../constants/Colors';
import UtilService from '../utils/utils';

const width = Dimensions.get('window').width;

export default class Button extends React.Component {
	state = {
		count: this.props.switchs,
		modal: false,
		isDateTimePickerVisible: false,
		date: new Date()
	};

	_showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

	_hideDateTimePicker = (date) => this.setState({ isDateTimePickerVisible: false, date });

	_handleDatePicked = (date) => {
		console.log('A date has been picked: ', date);
		this._hideDateTimePicker(date);
	};

	renderModal() {
		return (
			<Modal visible={this.state.modal} transparent={true} onRequestClose={() => {}}>
				<View style={styles.modalContainer}>
					<View style={styles.modal}>
						<Text style={[ t.TitleText, { marginVertical: 8 } ]}>Enter the Controller Code</Text>

						<Picker
							selectedValue={this.state.language}
							style={{ height: 50, width: width - 150 }}
							onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}
						>
							<Picker.Item label="Black Scene" value="java" />
							<Picker.Item label="Lights Off" value="js" />
							<Picker.Item label="Lights On" value="js" />
						</Picker>

						<TouchableOpacity
							style={{ marginTop: 35, justifyContent: 'flex-end', width: '100%' }}
							onPress={() => this.setState({ modal: false })}
						>
							<Text style={{ textAlign: 'right', marginRight: 20 }}>Close</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		);
	}

	renderSystemModal() {
		return (
			<Modal visible={this.state.modal} transparent={true} onRequestClose={() => {}}>
				<View style={styles.modalContainer}>
					<View style={styles.modal}>
						<TouchableOpacity onPress={this._showDateTimePicker}>
							<Text>Show DatePicker</Text>
						</TouchableOpacity>

						<Text style={[ t.TitleText, { marginTop: 20 } ]}>
							{UtilService.getDateTime(this.state.date)}
						</Text>

						<DateTimePicker
							isVisible={this.state.isDateTimePickerVisible}
							onConfirm={this._handleDatePicked}
							onCancel={this._hideDateTimePicker}
						/>

						<TouchableOpacity
							style={{ marginTop: 35, justifyContent: 'flex-end', width: '100%' }}
							onPress={() => this.setState({ modal: false })}
						>
							<Text style={{ textAlign: 'right', marginRight: 20 }}>Close</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		);
	}

	render() {
		const { icon, switchs, title, system } = this.props;
		return (
			<View
				style={{
					position: 'relative',
					padding: 12,
					paddingRight: 25,
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<TouchableOpacity onPress={() => this.setState({ count: this.state.count + 1 })} style={styles.box}>
					<MaterialCommunityIcons name={icon} size={45} color={Colors.BLUE} />
					<Text style={t.text_b}>{this.state.count % 2 == 1 ? 'ON' : 'OFF'}</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => this.setState({ modal: true })} style={styles.boxIcon}>
					<Ionicons name={'ios-more'} size={25} color={Colors.WHITE} />
				</TouchableOpacity>

				<Text style={[ t.ThinText, { marginTop: 8 } ]}>{title}</Text>

				{system !== 1 && this.renderModal()}
				{system == 1 && this.renderSystemModal()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	box: {
		borderRadius: 6,
		width: width / 4.5,
		height: width / 4,
		borderColor: Colors.GREY,
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	boxIcon: {
		position: 'absolute',
		right: 7,
		bottom: 35,
		zIndex: 1,
		backgroundColor: Colors.BLUE,
		borderRadius: 18,
		width: 36,
		height: 36,
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalContainer: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0,0.5)',
		alignItems: 'center',
		justifyContent: 'center'
	},
	modal: {
		width: width - 40,
		height: width / 1.7,
		borderRadius: 5,
		shadowColor: 'black',
		alignItems: 'center',
		justifyContent: 'center',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.4,
		shadowRadius: 3,
		backgroundColor: 'white'
	}
});
