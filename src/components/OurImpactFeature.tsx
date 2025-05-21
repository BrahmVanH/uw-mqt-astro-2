// import * as React  from 'react';

// import { getStringPreview } from '@/lib/utils';
// import placeholderImg from '@/assets/image/placeholder.svg';

// import { getDefaultProps, onImageError } from '@/lib/error';

// export interface Props {
//   pillars: FeaturePillar[]
// }

export {}



// import * as React from "react";
// import type {
//   ImpactCarouselFieldsCarouselItemsItem2,
//   ImpactCarouselFieldsCarouselItemsItem3,
//   RootQueryToImpactCarouselConnection,
// } from "@/__generated__/types";
// import { getStringPreview } from "@/lib/utils";
// import LearnMoreBtn from "./LearnMoreBtn";
// import placeholderImg from "@/image/placeholder.svg";
// import { getDefaultProps, onImageError } from "@/lib/error";

// export interface Props {
//   carouselItems?: CarouselItem[];
//   bgImgSrc?: string;
//   bgImgAlt?: string;
// }

// interface CarouselItem {
//   title: string;
//   text: string;
//   image: string;
//   imageAlt: string;
//   link?: string;
//   linkText?: string;
// }

// export function createProps(
//   wpContent: RootQueryToImpactCarouselConnection,
// ): Props {
//   if (
//     !wpContent ||
//     !wpContent.nodes ||
//     !Array.isArray(wpContent.nodes) ||
//     wpContent.nodes.length === 0 ||
//     !wpContent.nodes[0]?.impactCarouselFields
//   ) {
//     return getDefaultProps<Props>("impactCarousel createProps");
//   }
//   const root = wpContent?.nodes[0]?.impactCarouselFields;

//   const carouselItemsObj = root?.carouselItems;

//   if (!carouselItemsObj) {
//     return getDefaultProps<Props>(
//       "impactCarousel createProps carouselItemsObj",
//     );
//   }

//   const carouselItemsArr = Object.keys(carouselItemsObj)
//     .map((key) => carouselItemsObj[key as keyof typeof carouselItemsObj])
//     .filter(
//       (
//         item,
//       ): item is
//         | ImpactCarouselFieldsCarouselItemsItem2
//         | ImpactCarouselFieldsCarouselItemsItem3 =>
//         item !== null && item !== undefined,
//     );
//   const carouselItems = carouselItemsArr
//     .map((item) => ({
//       title: item?.title as string,
//       text: item?.text as string,
//       image:
//         item?.image?.node?.sourceUrl ??
//         onImageError("Missing image carousel item in OurImpactCarousel"),
//       imageAlt: item?.image?.node?.altText ?? "placeholder image",
//       link: item?.link as string,
//       linkText: item?.linkText as string,
//     }))
//     .reverse();

//   return {
//     bgImgSrc:
//       root?.bgImg?.node?.sourceUrl ??
//       onImageError("Missing image in OurImpactCarousel"),
//     bgImgAlt: root?.bgImg?.node?.altText ?? "placeholder image",
//     carouselItems,
//   };
// }

// const OurImpactCarousel: React.FC<Props> = ({
//   carouselItems,
//   bgImgSrc = placeholderImg.src,
//   bgImgAlt,
// }) => {
//   const [selectedItem, setSelectedItem] = React.useState(carouselItems[0]);

//   const handleSelectItem = React.useCallback((item: CarouselItem) => {
//     setSelectedItem(item);
//   }, []);

//   return (
//     <section className="w-full ">
//       <div className="w-full flex flex-row">
//         {/* 
//       {bgImgSrc && (
//         <img
//         className="absolute  w-full h-full   object-cover row-start-1  row-span-5 col-start-1 col-span-3  z-1"
//           src={bgImgSrc}
//           alt={bgImgAlt ?? ""}
//           />
//         )} */}

//         <div className="z-20 w-1/2 relative">
//           {selectedItem.image && selectedItem.imageAlt && (
//             <img
//               src={selectedItem.image}
//               alt={selectedItem.imageAlt}
//               className="  max-h-[600px] left-2 rounded-[100%] object-cover mx-auto w-min"
//             />
//           )}
//           <div className="w-2/3 right-2 absolute rounded-[100%]">
//             <h1 className="text-2xl font-bold mb-4">{selectedItem?.title}</h1>
//             <p className="mb-4 ">{selectedItem?.text}</p>
//             {selectedItem.link && selectedItem.linkText && (
//               <LearnMoreBtn
//                 size="md"
//                 text={selectedItem.linkText}
//                 href={selectedItem.link}
//                 openInNewTab={true}
//                 color="blue"
//                 ariaLabel="Learn more about our impact"
//               />
//             )}
//           </div>
//         </div>

//         <div className="nav z-20 col-span-3 row-start-4 row-span-2 w-full grid grid-cols-1 lg:grid-cols-3 grid-rows-3 lg:grid-rows-1 lg:gap-2 b-transparent mt-2 lg:mt-0 text-black ">
//           {carouselItems?.map((item: CarouselItem) => (
//             <div
//               key={item.title}
//               className={`self-center transition-all duration-300 border-none box-shadow max-h-[400px] ${
//                 selectedItem.title === item.title
//                   ? "ring-2 ring-primary-blue-4 tertiary-black-gradient bg-opacity-20 transform scale-105"
//                   : "lg:hover:shadow-md"
//               }`}
//             >
//               <button
//                 onClick={() => handleSelectItem(item)}
//                 className="w-full h-[80%] p-2 flex flex-row items-center"
//               >
//                 <div className="w-1/2 my-auto">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-[600px] object-cover "
//                   />
//                 </div>
//                 <p className="hidden lg:block text-sm w-1/2 ml-2 my-auto">
//                   {getStringPreview(item.text, 100)}
//                 </p>
//                 <p className="lg:hidden text-sm w-1/2 ml-2 my-auto">
//                   {getStringPreview(item.text, 50)}
//                 </p>
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OurImpactCarousel;
