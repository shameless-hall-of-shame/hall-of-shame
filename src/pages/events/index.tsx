import {EventItemInfo, getAllEvents} from 'lib/api/event';
import type {GetStaticProps} from 'next';
import type {FC} from 'react';

import NextLink from 'next/link';
import EventItem from 'components/EventItem';

interface EventsPageProps {
  allEvents: EventItemInfo[];
}

const EventsPage: FC<EventsPageProps> = ({allEvents}) => {
  return (
    <div className="md:container mx-auto p-4">
      <ul className="list-none grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 xl:gap-4">
        {allEvents.map((event) => (
          <li key={event.id} className="shadow-sm rounded-lg overflow-hidden">
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;

export const getStaticProps: GetStaticProps = () => {
  const allEvents = getAllEvents();

  return {
    props: {
      allEvents,
    },
  };
};
