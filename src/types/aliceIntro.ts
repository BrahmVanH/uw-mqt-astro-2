export type Config = {
	heading: string;
	text: string;
	heading2: string;
	text2: string;
	aliceDemographic: AliceDemographic;
	text3: string;
  link: string;
  linkText?: string;
};

type AliceDemographic = {
	title: string;
	descriptors: string[];
	
};


