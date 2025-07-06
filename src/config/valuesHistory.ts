import type {
  Config,
  ValuesHistoryPageQueryResponse,
} from "@/types/valuesHistory";
import { valuesHistoryPageQuery } from "@/lib/API/queries/pages";
import { getContent } from "@/lib/API";
import { getDefaultProps } from "@/lib/error";

const content: Config["content"] = {
  heading: "Our Values and History",
  subheading:
    "United Way of Marquette County has a long history of serving the community. Learn more about our values and history.",
  ourMission: {
    title: "Our Mission",
    text: "United Way seeks to improve lives by mobilizing the caring power of communities around the world to advance the common good. True to our founding spirit, whenever there is a need in our communities, United Way is there. We bring a comprehensive approach to every challenge, actively listening and responding to local needs. Our reach across tens of thousands of communities means we can share innovations and scale impact to improve lives around the world.",
  },
  ourValues: {
    title: "Our Core Values",
    values: [
      "Focusing community resources to meet community needs.",
      "Provide local employers, employees, and other donors a cost-effective system with which to effectively address	Marquette County health and human services needs through charitable gifts of money, time, and goods.",
      "Provide opportunities for personal participation in raising and distributing contributions to organizations that are tax exempt under federal law.",
      "Distribute funds given through the community investment process to member eligible agencies which provides priority services to county citizens.",
      "Forward donor designated funds to legally tax exempt organizations as directed by donors.",
      "Provide referrals to individuals requesting assistance to the appropriate agencies.",
      "Encourage sound management within member agencies.",
      "Encourage efficiency, cooperative planning and coordination among all organizations serving the county.",
    ],
  },
};

export async function getValuesHistoryImages(): Promise<ValuesHistoryPageQueryResponse> {
  try {
    const response = await getContent(valuesHistoryPageQuery);

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    const data = response.data as ValuesHistoryPageQueryResponse;

    if (!data) {
      throw new Error("No values history page data returned from API");
    }

    return data;
  } catch (error) {
    return getDefaultProps<ValuesHistoryPageQueryResponse>(
      "valuesHistoryImages",
    );
  }
}

async function getPageContent(): Promise<Config> {
  try {
    const graphQLResponse = await getValuesHistoryImages();
    if (!graphQLResponse) {
      throw new Error("No values history page content data returned from API");
    }
    const images = graphQLResponse;
    if (!images) {
      throw new Error("No  values history page data returned from API");
    }
    const imageOne = {
      src: images?.valuesHistories?.nodes[0]?.valuesAndHistoryFields?.image1
        ?.node?.sourceUrl as string,
      alt: images?.valuesHistories?.nodes[0]?.valuesAndHistoryFields
        ?.imageAlt1 as string,
      height: images?.valuesHistories?.nodes[0]?.valuesAndHistoryFields?.image1
        ?.node?.mediaDetails?.height as number,
      width: images?.valuesHistories?.nodes[0]?.valuesAndHistoryFields?.image1
        ?.node?.mediaDetails?.width as number,
    };
    const imageTwo = {
      src: images?.valuesHistories?.nodes[0]?.valuesAndHistoryFields?.image2
        ?.node?.sourceUrl as string,
      alt: images?.valuesHistories?.nodes[0]?.valuesAndHistoryFields
        ?.imageAlt2 as string,
      height: images?.valuesHistories?.nodes[0]?.valuesAndHistoryFields?.image2
        ?.node?.mediaDetails?.height as number,
      width: images?.valuesHistories?.nodes[0]?.valuesAndHistoryFields?.image2
        ?.node?.mediaDetails?.width as number,
    };
    const imageThree = {
      src: images?.valuesHistories?.nodes[0]?.valuesAndHistoryFields?.image3
        ?.node?.sourceUrl as string,
      alt: images?.valuesHistories?.nodes[0]?.valuesAndHistoryFields
        ?.imageAlt3 as string,
      height: images?.valuesHistories?.nodes[0]?.valuesAndHistoryFields?.image3
        ?.node?.mediaDetails?.height as number,
      width: images?.valuesHistories?.nodes[0]?.valuesAndHistoryFields?.image3
        ?.node?.mediaDetails?.width as number,
    };
    return { imageOne, imageTwo, imageThree, content };
  } catch (error) {
    return getDefaultProps<Config>("valuesHistoryPage");
  }
}

export default getPageContent;
