import type { Feature, FeatureCollection } from "geojson";

export interface UserGeo {
  success: boolean;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  region: string;
  fallback:
  | {}
  | {
    latitude: UserGeo["latitude"];
    longitude: UserGeo["longitude"];
    country: UserGeo["country"];
  };
}

export type ParagraphWithLink = {
  link: string;
  linkText: string;
  text: string;
  text2: string;
};

export interface HousingProgram {
  name: string;
  provider: string;
  description: string;
  link: string;
  serviceAreas: ServiceAreas[];
  requirements: string[];
  type: HousingProgramTypes[];
}

export interface FoodProgram {
  name: string;
  provider: string;
  description: string;
  link: string;
  serviceAreas: ServiceAreas[];
  requirements: string[];
}

export enum HousingProgramTypes {
  HOME_REHABILITATION = "home rehabilitation",
  RENT = "rent",
  UTILITIES = "utilities",
  MISCELLANEOUS = "miscellaneous",
}

export enum ServiceAreas {
  ALGER = "alger",
  DELTA = "delta",
  DICKINSON = "dickinson",
  IRON = "iron",
  MARQUETTE = "marquette",
  SCHOOLCRAFT = "schoolcraft",
  MENOMINEE = "menominee",
  ALL = "all",
}

export interface FoodPantryGeoFeatureCollection extends FeatureCollection { }

export type FoodPantry = {
  name: string;
  address: Address;
  phone: string;
  email: string;
  contact: PantryContact;
  website: string;
  donate: PantryDonate;
  flags: string[];
  geo: GeoCoords;
  hours: PantryHours | string;
};

export type Address = {
  street: string;
  city: string;
  po: string;
  state: string;
  zip: string;
};

type PantryContact = {
  name: string;
  email: string;
  phone: string;
};

type PantryDonate = {
  link: string;
  message: string[];
};

type GeoCoords = {
  lat: number;
  lng: number;
};

export type PantryHours = {
  m: string;
  t: string;
  w: string;
  th: string;
  f: string;
  sa: string;
  su: string;
};
