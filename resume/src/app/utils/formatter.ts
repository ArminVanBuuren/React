
const rusPatt = `^(\\+7|7|8)?[\\s\\-]?(\\(?[489][0-9]{2}\\)?[\\s\\-]?)([0-9]{3}[\\s\\-]?)([0-9]{2}[\\s\\-]?)([0-9]{2})$`;
const rbPatt = `^(\\+375|375)?[\\s\\-]?(\\(?17|29|33|44\\)?[\\s\\-]?)([0-9]{3}[\\s\\-]?)([0-9]{2}[\\s\\-]?)([0-9]{2})$`;

export const getPhoneNumber = (input: string): PhoneResult => {

	let result = input.match(rusPatt);
	if (result && result.length > 3){
		return {
			source: result[0],
			display: `+7 (${result[2]}) ${result[3]}-${result[4]}-${result[5]}`,
			normal: `+7${result.splice(2).join('')}`,
		};
	}

	result = input.match(rbPatt);
	if (result && result.length > 3){
		return {
			source: result[0],
			display: `+375 (${result[2]}) ${result[3]}-${result[4]}-${result[5]}`,
			normal:`+375${result.splice(2).join('')}`,
		};
	}

	return {
		source: input,
		display: '',
		normal:'',
	};
};


export interface PhoneResult {
	source: string;
	display: string;
	normal: string;
}
