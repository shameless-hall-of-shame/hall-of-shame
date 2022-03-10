import type {FC} from 'react';

import NextLink from 'next/link';
import type {EventItemInfo} from 'lib/api/event';

interface EventItemProps {
  event: EventItemInfo;
}

const EventItem: FC<EventItemProps> = ({
  event: {id, name, cover, issuesCount, personsCount},
}) => {
  return (
    <NextLink href={`/events/${id}`}>
      <a
        className="flex flex-col justify-end h-60 bg-cover bg-no-repeat overflow-hidden hover:shadow-lg transition-all duration-300"
        style={{backgroundImage: `url(${cover})`}}>
        <div className="backdrop-blur-sm bg-white/60 p-4">
          <h1>{name}</h1>
          <div className="text-sm text-gray-600 mt-2">
            {personsCount} 名用户，{issuesCount} 条发言
          </div>
        </div>
      </a>
    </NextLink>
  );
};

export default EventItem;
