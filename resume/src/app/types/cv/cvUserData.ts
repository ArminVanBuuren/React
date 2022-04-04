
export interface CvData {
	[user: string]: CvUserData;
}

export interface CvUserData {
	avatar: string;
	localized: Array<CvUserDataInfo>;
}

export interface CvUserDataInfo {
	langMatches: Array<string>;
	name: string;
	position: string;
	contacts: CvContact;
	experience: Array<CvExperience>;
	education: Array<CvExperience>;
	skills: Array<string>;
}

export interface CvContact {
	tel?: Array<string>;
	github?: Array<string>;
	telegram?: Array<string>;
	skype?: Array<string>;
	linkedin?: Array<string>;
}

export interface CvExperience {
	start: Date;
	end: Date | null;
	name: string;
	about: string;
	position: string;
	achievements: Array<string>;
}
