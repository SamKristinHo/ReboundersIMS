/**
 * Component to set visual event modal when user clicks on an event
 */

import React from "react";
import dayjs from "dayjs";

// this info gets passed in from the {event} from calendar component
type EventDetailModalProps = {
  event: {
    title: string;
    start: string;
    end: string;
    resources: Array<{ id: string } | string>;
  };
  onClose: () => void;
};

const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
}) => {
  // reformatting resources to be put into UL
  const formattedResources = event.resources.map((r) =>
    typeof r === "string" ? r : r.id
  );

  //reformatting time string to be displayed in EST, non military time
  const formattedTime = (time: string) => {
    return dayjs(time).format("h:mm A");
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{event.title}</h3>
      </div>
      <p>
        <strong>Start:</strong> {formattedTime(event.start)}
      </p>
      <p>
        <strong>End:</strong> {formattedTime(event.end)}
      </p>
      <div className="mt-4">
        <strong>Resources:</strong>
        <ul className="list-disc list-inside">
          {formattedResources.map((res, i) => (
            <li key={i}>{res}</li>
          ))}
        </ul>
      </div>
      <button
        onClick={onClose}
        className="text-sm text-gray-500 hover:text-red-600"
      >
        ✕
      </button>
    </div>
  );
};

export default EventDetailModal;
