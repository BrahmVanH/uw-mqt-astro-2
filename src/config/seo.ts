import type { Config } from "../types/seo";

const config: Config = {
  siteName: "United Way of Marquette County",
  defaultDescription:
    "United is the Way we create lasting change. United Way brings communities together to find strength and share hope.",
  defaultImage: "/logo-mqt-2.svg",
  organization: {
    name: "United Way of Marquette County",
    socialLinks: [
      "https://www.facebook.com/unitedwaymarquette/",
      "https://www.linkedin.com/company/united-way-worldwide",
      "https://www.instagram.com/unitedwaymqt/",
    ],
    address: {
      streetAddress: "1414 W Fair Ave #26",
      addressLocality: "Marquette",
      addressRegion: "MI",
      postalCode: "49855",
      addressCountry: "US",
    },
    contact: {
      telephone: "+19062268171",
      email: "arickauer@unitedway.org",
    },
    foundingDate: "1962",
    keywords:
      "community support, donations, volunteerism, Marquette County, nonprofit, United Way",
    geoCoordinates: {
      latitude: 46.5577611995377,
      longitude: -87.41756452778365,
    },
    openingHours: "Mo-Fr 08:30-17:30",
  },
} as const;

export default config