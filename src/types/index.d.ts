import type {
  HowToContributeComponent,
  ImpactStatistic,
  OurImpactHomePage,
  PartnersTickerItem,
  RootQueryToAliceReportPdfConnection,
  RootQueryToCampaignToolkitAssetConnection,
  RootQueryToFaqConnection,
  RootQueryToFourPillarsHeroComponentConnection,
  RootQueryToGetInvolvedHeroConnection,
  RootQueryToGirlScoutsComponentConnection,
  RootQueryToHeroComponentOurImpactPageConnection,
  RootQueryToHomePageHeroConnection,
  RootQueryToHowToContributeComponentConnection,
  RootQueryToImpactCarouselConnection,
  RootQueryToImpactStatisticConnection,
  RootQueryToMobileFoodPantryComponentConnection,
  RootQueryToNorthwoodsAirLifelineConnection,
  RootQueryToPartnerPageHeroConnection,
  RootQueryToPartnersTickerItemConnection,
  RootQueryToValuesHistoryConnection,
  RootQueryToVitaTaxPrepConnection,
  RootQueryToYmcaComponentConnection,
  RootQueryToIndividualsPageHeroConnection,
  RootQueryToMediaItemConnection,
  RootQueryToFourPillarsPreviewConnection,
  // RootQueryToSeniorCenterConnection,
} from "@/__generated__/types";
import type AliceReport from "@/components/AliceReport.astro";

import type { FooterComponentQueryResponse } from "@/types/footer";
export interface HomePageQueryResponse {
  homePageHeroes: RootQueryToHomePageHeroConnection;
  partnersTickerItems: RootQueryToPartnersTickerItemConnection;
  impactCarousels: RootQueryToImpactCarouselConnection;
  howToContributeComponents: RootQueryToHowToContributeComponentConnection;
  impactStatistics: RootQueryToImpactStatisticConnection;
}

export interface PartnerAgenciesPageQueryResponse {
  partnersTickerItems: RootQueryToPartnersTickerItemConnection;
}

export interface GetInvolvedPageQueryResponse {
  getInvolvedHeroes: RootQueryToGetInvolvedHeroConnection;
  partnersTickerItems: RootQueryToPartnersTickerItemConnection;
  impactCarousels: RootQueryToImpactCarouselConnection;
  howToContributeComponents: RootQueryToHowToContributeComponentConnection;
}

export interface PartnerPageQueryResponse {
  partnerPageHeroes: RootQueryToPartnerPageHeroConnection;
  partnersTickerItems: RootQueryToPartnersTickerItemConnection;
  impactCarousels: RootQueryToImpactCarouselConnection;
  howToContributeComponents: RootQueryToHowToContributeComponentConnection;
}

export interface OurImpactPageQueryResponse {
  heroComponentOurImpactPages: RootQueryToHeroComponentOurImpactPageConnection;
  fourPillarsPreviews: RootQueryToFourPillarsPreviewConnection;
  impactCarousels: RootQueryToImpactCarouselConnection;
  faqs: RootQueryToFaqConnection;
  howToContributeComponents: RootQueryToHowToContributeComponentConnection;
  impactStatistics: RootQueryToImpactStatisticConnection;
}

export interface CommunityResiliencyPageQueryResponse {
  fourPillarsHeroComponents: RootQueryToFourPillarsHeroComponentConnection;
  // seniorCenters: RootQueryToSeniorCenterConnection;
  impactCarousels: RootQueryToImpactCarouselConnection;
  aliceReportPdfs: RootQueryToAliceReportPdfConnection;
  howToContributeComponents: RootQueryToHowToContributeComponentConnection;
}

export interface YouthOpportunityPageQueryResponse {
  fourPillarsHeroComponents: RootQueryToFourPillarsHeroComponentConnection;
  northwoodsAirLifelines: RootQueryToNorthwoodsAirLifelineConnection;
  ymcaComponents: RootQueryToYmcaComponentConnection;
  girlScoutsComponents: RootQueryToGirlScoutsComponentConnection;
  impactCarousels: RootQueryToImpactCarouselConnection;

  howToContributeComponents: RootQueryToHowToContributeComponentConnection;
}

export interface FinancialSecurityPageQueryResponse {
  fourPillarsHeroComponents: RootQueryToFourPillarsHeroComponentConnection;
  vitaTaxPreps: RootQueryToVitaTaxPrepConnection;
  aliceReportPdfs: RootQueryToAliceReportPdfConnection;
  howToContributeComponents: RootQueryToHowToContributeComponentConnection;
}

export interface HealthyCommunityPageQueryResponse {
  fourPillarsHeroComponents: RootQueryToFourPillarsHeroComponentConnection;
  howToContributeComponents: RootQueryToHowToContributeComponentConnection;
  mobileFoodPantryComponents: RootQueryToMobileFoodPantryComponentConnection;
}
export interface CampaignToolkitPageQueryResponse {
  campaignToolkitAssets: RootQueryToCampaignToolkitAssetConnection;
}

export interface IndividualsPageQueryResponse {
  individualsPageHeroes: RootQueryToIndividualsPageHeroConnection;
  impactCarousels: RootQueryToImpactCarouselConnection;
  faqs: RootQueryToFaqConnection;
}

export interface ValuesHistoryPageQueryResponse {
  valuesHistories: RootQueryToValuesHistoryConnection;
}

export interface OurCulturePageQueryResponse {
  mediaItem1: RootQueryToMediaItemConnection;
  mediaItem2: RootQueryToMediaItemConnection;
}

export interface OurLeadershipPageQueryResponse {
  mediaItem1: RootQueryToMediaItemConnection;
  mediaItem2: RootQueryToMediaItemConnection;
  mediaItem3: RootQueryToMediaItemConnection;
}

export interface YoopersUnitedNeedsFetchResponse {
  data: YoopersUnitedNeed[];
}

export interface YoopersUnitedNeed {
  id: string;
  domain_id: string;
  agency: Agency;
  initiative: Initiative;
  groups: Group[];
  need_title: string;
  need_body: string;
  need_address: string;
  need_address2: string | null;
  need_city: string;
  need_state: string;
  need_postal: string;
  need_type: string;
  need_contact: string;
  need_response_notify: string;
  need_date: string;
  need_date_type: string;
  need_impact_area: string;
  need_volunteers_needed: string;
  need_public: string;
  need_allow_groups: string;
  need_hours: string;
  need_comments: string;
  need_latitude: string;
  need_longitude: string;
  need_date_close: string;
  family_friendly: string;
  outdoors: string;
  outdoors_plan: string | null;
  accessible: string;
  tags: Tag[];
  shifts: Shift[];
  need_status: string;
  created_at: string;
  background_check_required: string;
  updated_at: string;
}

interface Agency {
  id: string;
  domain_id: string;
  agency_name: string;
}

interface Initiative {
  id: string;
  domain_id: string;
  init_title: string;
}

interface Group {
  id: string;
  domain_id: string;
  group_title: string;
}

interface Tag {
  id: string;
  name: string;
}

interface Shift {
  id: string;
  start: string;
  end: string;
  duration: string;
  slots: string;
}

export interface GTagConsentSettings {
  functionality_storage: string;
  security_storage: string;
  analytics_storage: string;
  ad_storage: string;
  ad_user_data: string;
  ad_personalization: string;
  personalization_storage: string;
}
