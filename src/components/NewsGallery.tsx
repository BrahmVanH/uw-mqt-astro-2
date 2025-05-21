// import React, { useState } from "react";
// import { Card } from "./ui/card";
// // import bgImg from "@/image/our-impact-page/health-impact-page/transparent-slideshow-backdrop-responsive-blue-ring-01.png";

// export interface Props {
//   events: UWEvent[];
//   bgImgSrc: string;
//   bgImgAlt: string;
// }
// interface UWEvent {
//   title: string;
//   text: string;
//   image: string;
//   imageAlt: string;
//   link: string;
// }

// const NewsGallery: React.FC<Props> = ({ events, bgImgSrc, bgImgAlt }) => {
//   const [selectedEventSrc, setSelectedEventSrc] = useState(events[0].image);
//   const [selectedEventAlt, setSelectedEventAlt] = useState(events[0].title);
//   const [selectedEvent, setSelectedEvent] = useState(events[0]);

//   const handleSelectEvent = (event: any) => {
//     setSelectedEventSrc(event.image);
//     setSelectedEventAlt(event.imageAlt);
//     setSelectedEvent(event);
//   };
//   return (
//     <div className="w-full relative">
//       {bgImgSrc && bgImgAlt && (
//         <img
//           className="w-full h-full object-cover"
//           src={bgImg.src}
//           alt={bgImgAlt}
//         />
//       )}

//       <div className="m-4 w-full flex flex-col justify-center items-center">
//         <div className="w-full ">
//           <div className="w-[50%] ">
//             <h1>{selectedEvent?.title}</h1>
//             <p>{selectedEvent?.text}</p>
//           </div>
//           {selectedEventSrc && selectedEventAlt && (
//             <div className="w-[50%] ">
//               <img src={selectedEventSrc} alt={selectedEventAlt} />
//             </div>
//           )}
//         </div>
//         <div className="w-full grid-cols-3 gap-4">
//           {events?.map((event: any) => (
//             <Card key={event.id}>
//               <button onClick={() => handleSelectEvent(event)}>
//                 <img src={event.image} alt={event.title} />
//               </button>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewsGallery;
