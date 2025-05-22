import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

// Base schema that other schemas can extend
const dynamicSchema = {
	title: z.string(),
	description: z.string(),
	layout: z.string().optional(),
	slug: z.string(),

	formUrl: z.string().optional(),
	learnMoreUrl: z.string().optional(),
	requiresGraphqlQuery: z.boolean().optional(),
};

const staticSchema = {
	title: z.string(),
	description: z.string(),
	layout: z.string().optional(),
	slug: z.string(),
};

//  gql dependent content schema - most of them require graphql queries and have a field
//  to indicate so. Default is no graphql query. Those without graphql queries that are outside of the parent's
// /static dir are server rendered and are not dependent on graphql queries.
// - This comment is brought to you by the song Murmaider II by Dethklok

const aboutSchema = z.object({
	...dynamicSchema,
});

const partnerSchema = z.object({
	...dynamicSchema,
});

const financialSecuritySchema = z.object({
	...dynamicSchema,
});

// Static content schema - these are rendered at build time and do not require graphql queries
// - This comment is brought to you by the song Murmaider III by Dethklok

const staticAboutSchema = z.object({
	...staticSchema,
});

const staticGetInvolvedSchema = z.object({
	...staticSchema,
});

const staticIndividualSchema = z.object({
	...staticSchema,
});

const staticPartnerSchema = z.object({
	...staticSchema,
});

const staticOurImpactSchema = z.object({
	...staticSchema,
});

const staticCommunityResilienceSchema = z.object({
	...staticSchema,
});

const staticFinancialSecuritySchema = z.object({
	...staticSchema,
});

const staticHealthyCommunitySchema = z.object({
	...staticSchema,
});

const staticYouthOpportunitySchema = z.object({
	...staticSchema,
});

const staticRootSchema = z.object({
	...staticSchema,
});

// Define dynamic collections
const about = defineCollection({
	loader: glob({ pattern: '*.{md,mdx}', base: 'src/content/about/' }),
	schema: aboutSchema,
});

const financialSecurity = defineCollection({
	loader: glob({
		pattern: '*.{md,mdx}',
		base: 'src/content/our-impact/financial-security/',
	}),
	schema: financialSecuritySchema,
});

const partner = defineCollection({
	loader: glob({
		pattern: '*.{md,mdx}',
		base: 'src/content/get-involved/partner/',
	}),
	schema: partnerSchema,
});

// Define static collections
const staticRoot = defineCollection({
	loader: glob({
		pattern: '*.{md,mdx}',
		base: 'src/content/our-impact/static/',
	}),
	schema: staticRootSchema,
});

const staticAbout = defineCollection({
	loader: glob({ pattern: '*.{md,mdx}', base: 'src/content/about/static/' }),
	schema: staticAboutSchema,
});

const staticGetInvolved = defineCollection({
	loader: glob({
		pattern: '*.{md,mdx}',
		base: 'src/content/get-involved/static/',
	}),
	schema: staticGetInvolvedSchema,
});

const staticIndividual = defineCollection({
	loader: glob({
		pattern: '*.{md,mdx}',
		base: 'src/content/our-impact/individual/static/',
	}),
	schema: staticIndividualSchema,
});

const staticPartner = defineCollection({
	loader: glob({
		pattern: '*.{md,mdx}',
		base: 'src/content/get-involved/partner/static/',
	}),
	schema: staticPartnerSchema,
});

const staticOurImpact = defineCollection({
	loader: glob({
		pattern: '*.{md,mdx}',
		base: 'src/content/our-impact/static/',
	}),
	schema: staticOurImpactSchema,
});

const staticCommunityResilience = defineCollection({
	loader: glob({
		pattern: '*.{md,mdx}',
		base: 'src/content/our-impact/community-resilience/static/',
	}),
	schema: staticCommunityResilienceSchema,
});

const staticHealthyCommunity = defineCollection({
	loader: glob({
		pattern: '*.{md,mdx}',
		base: 'src/content/our-impact/healthy-community/static/',
	}),
	schema: staticHealthyCommunitySchema,
});

const staticYouthOpportunity = defineCollection({
	loader: glob({
		pattern: '*.{md,mdx}',
		base: 'src/content/our-impact/youth-opportunity/static/',
	}),
	schema: staticYouthOpportunitySchema,
});

const staticFinancialSecurity = defineCollection({
	loader: glob({
		pattern: '*.{md,mdx}',
		base: 'src/content/our-impact/financial-security/static/',
	}),
	schema: staticFinancialSecuritySchema,
});

export const collections = {
	about,
	financialSecurity,
	partner,
	staticFinancialSecurity,
	staticAbout,
	staticPartner,
	staticRoot,
	staticGetInvolved,
	staticIndividual,
	staticOurImpact,
	staticCommunityResilience,
	staticHealthyCommunity,
	staticYouthOpportunity,
};

// Export dynamic types
export type About = z.infer<typeof aboutSchema>;
export type FinancialSecurity = z.infer<typeof financialSecuritySchema>;
export type Partner = z.infer<typeof partnerSchema>;

// Export static types
export type StaticAbout = z.infer<typeof staticAboutSchema>;
export type StaticFinancialSecurity = z.infer<typeof staticFinancialSecuritySchema>;
export type StaticPartner = z.infer<typeof staticPartnerSchema>;
export type StaticRoot = z.infer<typeof staticRootSchema>;
export type StaticGetInvolved = z.infer<typeof staticGetInvolvedSchema>;
export type StaticIndividual = z.infer<typeof staticIndividualSchema>;
export type StaticOurImpact = z.infer<typeof staticOurImpactSchema>;
export type StaticCommunityResilience = z.infer<typeof staticCommunityResilienceSchema>;
export type StaticHealthyCommunity = z.infer<typeof staticHealthyCommunitySchema>;
export type StaticYouthOpportunity = z.infer<typeof staticYouthOpportunitySchema>;
