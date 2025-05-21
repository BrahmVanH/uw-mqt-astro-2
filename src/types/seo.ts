export interface SocialLinks {
  readonly facebook: string;
  readonly linkedin: string;
  readonly instagram: string;
}

export interface Address {
  readonly streetAddress: string;
  readonly addressLocality: string;
  readonly addressRegion: string;
  readonly postalCode: string;
  readonly addressCountry: string;
}

export interface Contact {
  readonly telephone: string;
  readonly email: string;
}

export interface GeoCoordinates {
  readonly latitude: number;
  readonly longitude: number;
}

export interface Organization {
  readonly name: string;
  readonly socialLinks: readonly [string, string, string];
  readonly address: Address;
  readonly contact: Contact;
  readonly foundingDate: string;
  readonly keywords: string;
  readonly geoCoordinates: GeoCoordinates;
  readonly openingHours: string;
}

export interface Config {
  readonly siteName: string;
  readonly defaultDescription: string;
  readonly defaultImage: string;
  readonly organization: Organization;
}
