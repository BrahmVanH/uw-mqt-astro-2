export function formatPostType(s: string) {
  const words = s.split("_");
  console.log("words: ", words);
  const formattedWords = words.map((word, i) => {
    if (i === 0) {
      return word
    } else if (i === words.length - 1) {
      return pluralizeWord(capitalizeFirstLetter(word))
    } else { return capitalizeFirstLetter(word) }
  })
  console.log("formatted words: ", formattedWords)
  return formattedWords.join("");

}

function pluralizeWord(word: string) {
  let letters = word.split("");
  switch (letters.at(-1)) {
    case 'o':
      letters.push('e', 's');
      break;
    case 'y':
      letters = letters.slice(0, -1)
      letters.push('i', 'e', 's');
      break;
    default:
      letters.push('s')
  }

  return letters.join("")
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}




export const getContentQuery = (path: string) => {
  if (path !== "/") path = removeTrailingSlash(path);

  switch (path) {
    case "/":
      return homePageQuery;
    case "/get-involved/partner":
      return partnerPageQuery;
    case "/our-impact":
      return ourImpactPageQuery;
    case "/our-impact/healthy-community":
      return healthyCommunityPageQuery;
    case "/our-impact/financial-security":
      return financialSecurityPageQuery;
    case "/our-impact/community-resiliency":
      return communityResiliencyPageQuery;
    case "/our-impact/youth-opportunity":
      return youthOpportunityPageQuery;
    case "/get-involved/partner/campaign-toolkit":
      return campaignToolkitPageQuery;
    case "/about/values-history":
      return valuesHistoryPageQuery;
    case "/about/our-culture":
      return ourCulturePageQuery;
    case "/about/our-leadership":
      return ourLeadershipPageQuery;
    case "/get-involved":
      return getInvolvedPageQuery;
    case "/get-involved/individuals":
      return individualsPageQuery;
    case "/get-involved/partner/agencies":
      return agenciesPageQuery;
    case "/united-for-alice":
      return alicePageQuery;
    default:
      return homePageQuery;
  }
};

const removeTrailingSlash = (path: string) => {
  return path.replace(/\/$/, "");
};