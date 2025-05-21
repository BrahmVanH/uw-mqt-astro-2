export interface Config {
  title: string;
  volumes: Volume[];
}

export interface Volume {
  rangeString: string;
  yearEntries: YearEntry[];
}

export interface YearEntry {
  year: string;
  entries: string[];
}
