export type Config = {
	heading: string;
	text: string;
	metrics: AliceDataMetrics[];
  link: string;
  linkText: string;
};


type AliceDataMetrics = {
	title: string;
	text: string;
};
