import { WP_URL_CLNT } from "astro:env/client";

export const UW_MQT_LOGO_SVG_URL_ENDPOINT =
  //  import.meta.env.PROD ?
  `https://res.cloudinary.com/doixcciwn/images/v1740446448/logo-mqt-3/logo-mqt-3.jpg?_i=AA`
// :"http://localhost:10020/wp-content/uploads/2025/02/logo-mqt-2.svg"

export const YOUR_HELP_MATTERS_COMPONENT_BG_URL_ENDPOINT =
  "/wp-content/uploads/2025/08/your-help-matters-bg-02.svg";

export const CONTENT_COLLECTIONS_HERO_BG_URL_ENDPOINT = import.meta.env.PROD
  ? "/wp-content/uploads/2025/02/content-collections-hero-bg.jpg"
  : "/wp-content/uploads/2025/01/content-collections-hero-bg.png";

export const UPCAP_211_SERVICE_GRAPHIC_URL_ENDPOINT = import.meta.env.PROD
  ? "/wp-content/uploads/2025/02/upper-peninsula-211.jpg"
  : "/wp-content/uploads/2025/01/upper-peninsula-211.jpg";
export const UPCAP_211_SERVICES_URL =
  "https://upcap.org/program/u-p-2-1-1-call-center/";

export const APPLY_FOR_SAFETY_NET_FUNDING_URL =
  "https://form.jotform.com/231794514854060";

export const SINGLE_CARE_TERMS_AND_CONDITIONS_URL =
  "https://www.singlecare.com/terms-and-conditions#fw";
export const SINGLE_CARE_PRIVACY_URL =
  "https://www.singlecare.com/privacy-policy#fw";

export const MOBILE_FOOD_PANTRY_SCHEDULE_URL =
  "https://www.feedwm.org/mobile-pantry-schedule/?county=Marquette";

export const OUR_CULTURE_PAGE_IMG_ONE_TITLE = "goody-kids-live-united";
export const OUR_CULTURE_PAGE_IMG_TWO_TITLE =
  "equality-and-diversity-hand-holding-sign";

export const OUR_LEADERSHIP_PAGE_IMG_ONE_TITLE =
  "andrew-rickauer-director-headshot";
export const OUR_LEADERSHIP_PAGE_IMG_TWO_TITLE = "26-campaign-cochairs";
export const OUR_LEADERSHIP_PAGE_IMG_THREE_TITLE = "UW-BOD-Christmas-2023";

export const ALICE_INTERACTIVE_REPORT_URL =
  "https://www.unitedforalice.org/michigan";

export const YOOPERS_UNITED_RESPOND_TO_NEED_ROUTE =
  "/need/respondIndividual/?need_id=";
export const YOOPERS_UNITED_NEED_DETAILS_ROUTE = "/need/detail/?need_id=";
export const YOOPERS_UNITED_NEEDS_PAGE_ENDPOINT = "/need/";

export const elementIds = [
  "up-211",
  "donor-privacy-policy",
  "mobile-food-pantry",
  "contact-info",
  "faqs",
  "alice-report-heading",
  "current-irs-form-990",
  "our-impact-carousel",
];


export const WINGS_OF_GLORY_IMG_1 = 'https://api.uwmqt.org/wp-content/uploads/2025/11/wings-of-glory-print-framed-on-wall-cropped.jpg';
export const WINGS_OF_GLORY_IMG_2 = 'https://api.uwmqt.org/wp-content/uploads/2025/11/lithograph-proof.jpg';
export const WINGS_OF_GLORY_IMG_3 = 'https://api.uwmqt.org/wp-content/uploads/2025/11/wings-of-glory-print-take-2-authentics-proof.jpg';

// 2025 Campaign placeholder images
export const CAMPAIGN_2025_IMG_1 = import.meta.env.PROD ? 'https://api.uwmqt.org/wp-content/uploads/2025/11/cancer-care.jpg' : 'http://localhost:10020/wp-content/uploads/2025/11/cancer-care.jpg';
export const CAMPAIGN_2025_IMG_2 = import.meta.env.PROD ? 'https://api.uwmqt.org/wp-content/uploads/2025/11/happy-volunteer-at-barry-center-food-pantry.png' : 'http://localhost:10020/wp-content/uploads/2025/11/happy-volunteer-at-barry-center-food-pantry.png';

// Giving Tuesday placeholder images
export const GIVING_TUESDAY_IMG_1 = 'https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Community+Support+Image';
export const GIVING_TUESDAY_IMG_2 = 'https://via.placeholder.com/800x400/EF4444/FFFFFF?text=Early+Giving+Campaign+Image';
