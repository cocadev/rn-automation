import { pic } from '../constants/Image';

class UtilService {
	////////////////////////
	///// date systeme /////
	////////////////////////
	static getDateTime(date) {
		let d = new Date(date);
		const padWithZero = (number) => {
			const string = number.toString();
			if (number < 10) {
				return '0' + string;
			}
			return string;
		};
		return padWithZero(d.getMonth() + 1) + '/' + padWithZero(d.getDate()) + '  ' + d.getFullYear();
	}

	static getHourMinutes(date) {
		let dd = new Date(date);
		let h = dd.getHours(),
			m = dd.getMinutes();
		let AP = ' AM';
		if (h > 12) {
			h = h - 12;
			AP = ' PM';
		}

		return h + '' + AP;
	}

	static getDay(date) {
		let dd = new Date(date);
		let h = dd.getDay();
		console.log('what is day ', h);
		if (h == 0) {
			AP = ' Sunday ';
		}
		if (h == 1) {
			AP = ' Monday ';
		}
		if (h == 2) {
			AP = ' Tuesday ';
		}
		if (h == 3) {
			AP = ' Wednesday ';
		}
		if (h == 4) {
			AP = ' Thirsday ';
		}
		if (h == 5) {
			AP = ' Friday ';
		}
		if (h == 6) {
			AP = ' Saturday ';
		}
		return AP;
	}

	////////////////////////
	///// date systeme /////
	////////////////////////
	static getDateTime(date) {
		let d = new Date(date);
		const padWithZero = (number) => {
			const string = number.toString();
			if (number < 10) {
				return '0' + string;
			}
			return string;
		};
		return padWithZero(d.getMonth() + 1) + '/' + padWithZero(d.getDate()) + '  ' + d.getFullYear();
	}

	static getHourMinutes(date) {
		let dd = new Date(date);
		let h = dd.getHours(),
			m = dd.getMinutes();
		let AP = ' AM';
		if (h > 12) {
			h = h - 12;
			AP = ' PM';
		}

		return h + '' + AP;
	}

	static getDay(date) {
		let dd = new Date(date);
		let h = dd.getDay();
		console.log('what is day ', h);
		if (h == 0) {
			AP = ' Sunday ';
		}
		if (h == 1) {
			AP = ' Monday ';
		}
		if (h == 2) {
			AP = ' Tuesday ';
		}
		if (h == 3) {
			AP = ' Wednesday ';
		}
		if (h == 4) {
			AP = ' Thirsday ';
		}
		if (h == 5) {
			AP = ' Friday ';
		}
		if (h == 6) {
			AP = ' Saturday ';
		}
		return AP;
	}

	static ChangeImg(h) {
		if (h == '') {
			AP = pic.image_0;
		}
		if (h == 1) {
			AP = pic.image_1;
		}
		if (h == 2) {
			AP = pic.image_2;
		}
		if (h == 3) {
			AP = pic.image_3;
		}
		return AP;
	}
}

export default UtilService;
