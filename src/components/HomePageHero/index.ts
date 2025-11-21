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
  let features: HomePageHeroFeature[] = featureEntries.map((entry) => entry[1]) as HomePageHeroFeature[]
  features = features.filter((feature) => feature.title  && feature.text ).map((feature, i) => {
    return {
      ...feature,
      linkTwo: (root[`feature${i + 1}` as keyof typeof root] as any)?.secondLink ?? '',
      linkTextTwo: (root[`feature${i + 1}` as keyof typeof root] as any)?.secondLinkText ?? '',
      img: (root[`feature${i + 1}` as keyof typeof root] as any)?.image?.node?.sourceUrl ?? '',
      imgAlt: (root[`feature${i + 1}` as keyof typeof root] as any)?.image?.node?.altText ?? '',
      optionalMedia: (root[`feature${i + 1}` as keyof typeof root] as any)?.optionalMedia?.node?.mediaItemUrl ?? '',
      optionalMediaTitle: (root[`feature${i + 1}` as keyof typeof root] as any)?.optionalMediaLabel ?? '',
    }
  }).reverse();




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

// export { createProps, HomePageHero, HomePageHeroVariant }

export { createProps };
export { default as HomePageHero } from './index.astro';
export { default as HomePageHeroVariant } from './Variant1.astro';