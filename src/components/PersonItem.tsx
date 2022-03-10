import {Person} from 'lib/api/persons';
import type {FC} from 'react';
import Icon, {IconType} from './Icon';

import NextLink from 'next/link';

interface PersonItemProps {
  person: Person;
}

const PersonItem: FC<PersonItemProps> = ({person}) => {
  const {
    id,
    avatarUrl,
    name,
    login,
    eventsCount,
    issuesCount,
    company,
    email,
    location,
    twitterUsername,
  } = person;

  const details = [
    {
      icon: 'email' as IconType,
      value: email,
    },
    {
      icon: 'location' as IconType,
      value: location,
    },
    {
      icon: 'company' as IconType,
      value: company,
    },
    {
      icon: 'twitter' as IconType,
      value: twitterUsername ? `@${twitterUsername}` : null,
    },
  ].filter((detailItem) => Boolean(detailItem.value));
  return (
    <NextLink href={`/persons/${id}`}>
      <a className="h-full flex flex-col justify-between">
        <header className="flex items-center  p-2 flex-1 ">
          <aside className="flex-shrink-0">
            <img
              className="block ring-2 ring-offset-2  align-middle  object-cover w-12 h-12 rounded-full"
              src={avatarUrl}
              alt=""
            />
          </aside>
          <div className="ml-4  overflow-hidden">
            <div className="truncate ">{name}</div>
            <div className="truncate text-sm text-gray-600">@{login}</div>

            {details.length > 0 && (
              <ul className="list-none space-y-1">
                {details.map(({icon, value}) => (
                  <li className="truncate text-xs text-gray-600" key={icon}>
                    <Icon
                      className="inline fill-gray-600  h-3 w-3"
                      type={icon}
                    />
                    <span className="ml-1">{value}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </header>
        <footer className="border-t">
          <dl className="flex divide-x">
            <div className="flex-1 flex items-center justify-between p-2">
              <dt className="text-sm text-gray-500">参与事件</dt>
              <dd className="text-gray-700">{eventsCount}</dd>
            </div>
            <div className="flex-1 flex items-center justify-between p-2">
              <dt className="text-sm text-gray-500">发言</dt>
              <dd className="text-gray-700">{issuesCount}</dd>
            </div>
          </dl>
        </footer>
      </a>
    </NextLink>
  );
};

export default PersonItem;