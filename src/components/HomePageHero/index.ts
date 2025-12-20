import { getDefaultProps, onImageError } from '@/lib/error';
import type { HomePageHeroFieldsFeature1, RootQueryToHomePageHeroConnection } from '@/types/__generated__/types';
import type { AstroGlobal } from 'astro';


export interface Props {
  bg: string;
  bgMobile: string;
  heading: string;
  subheading: string;
  features: HomePageHeroFeature[];
  bgAlt: string;
  bgMobileAlt: string;
}

export interface HomePageHeroFeature {
  title: string;
  priority: boolean;
  text: string;
  subtext: string;
  link: string;
  linkText: string;
  linkTwo?: string;
  linkTextTwo?: string;
  img?: string;
  imgAlt?: string;
  optionalMedia?: string;
  optionalMediaTitle?: string;
}

function createProps(graphQLContent: RootQueryToHomePageHeroConnection, Astro: AstroGlobal): Props {
  if (!graphQLContent?.nodes[0]?.homePageHeroFields) {
    return getDefaultProps<Props>('HomePageHero createProps', Astro);
  }

  const root = graphQLContent?.nodes[0]?.homePageHeroFields;
  const featureEntries = Object.entries(root).filter((field) => field[0].toLowerCase().startsWith('feature'))

  let features: HomePageHeroFeature[] = featureEntries
    .map((entry) => {
      const [key, value] = entry;
      const featureNum = key.match(/\d+/)?.[0]; // Extract the feature number from the key
      return { featureNum, feature: value as HomePageHeroFeature };
    })
    .filter(({ feature }) => feature.title && feature.text)
    .map(({ featureNum, feature }) => {
      const featureKey = `feature${featureNum}` as keyof typeof root;
      return {
        ...feature,
        linkTwo: (root[featureKey] as any)?.secondLink ?? '',
        linkTextTwo: (root[featureKey] as any)?.secondLinkText ?? '',
        img: (root[featureKey] as any)?.image?.node?.sourceUrl ?? '',
        imgAlt: (root[featureKey] as any)?.image?.node?.altText ?? '',
        optionalMedia: (root[featureKey] as any)?.optionalMedia?.node?.mediaItemUrl ?? '',
        optionalMediaTitle: (root[featureKey] as any)?.optionalMediaLabel ?? '',
      };
    })
    .reverse();




  return {
    bg: root?.bg?.node?.sourceUrl ?? onImageError('missing bg image home page hero').src,
    bgMobile: root?.bgMobile?.node?.sourceUrl ?? onImageError('missing bg mobile image home page hero').src,
    heading: root?.heading ?? '',
    subheading: root?.subheading ?? '',
    features,
    bgAlt: root?.bg?.node?.altText ?? 'placeholder image',
    bgMobileAlt: root?.bgMobile?.node?.altText ?? 'placeholder image',
  };
}


export { createProps };