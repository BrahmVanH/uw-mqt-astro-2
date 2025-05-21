import { Card } from "../ui/card";
import type { UWGalleryItem } from "./index.astro";

export interface Props {
  event: UWGalleryItem;
  index: number;
}

const EventsCard: React.FC<Props> = ({ event, index }) => {
  return (
    <Card
      className="p-4 flex justify-center text-center [&>*]:ml-2 last:mr-2"
      key={index}
    >
      <div className="flex flex-col items-center gap-2">
        {event.image && (
          <img
            src={event.image}
            alt={event.imageAlt || ""}
            loading="lazy"
            decoding="async"
          />
        )}
        {event.text && <p className="leading-relaxed">{event.text}</p>}
      </div>
    </Card>
  );
};

export default EventsCard;
