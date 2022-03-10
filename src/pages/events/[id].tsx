import Collapse from 'components/Collapse';
import {EventInfo, getAllEventsIds, getEvent} from 'lib/api/event';
import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';

import NextLink from 'next/link';

type EventDetailPageProps = {
  eventInfo: EventInfo;
};

const EventDetailPage: NextPage<EventDetailPageProps> = ({eventInfo}) => {
  const {cover, name, issues, description, personsCount} = eventInfo;
  return (
    <div>
      <header
        className="bg-contain md:bg-cover bg-no-repeat md:bg-center pt-20 md:pt-60"
        style={{backgroundImage: `url(${cover})`}}>
        <div className="backdrop-blur-sm bg-white/40">
          <div className="md:container mx-auto px-4 py-2 md:py-4">
            <h1 className="text-lg md:text-2xl bold">{name}</h1>
            <div className="mt-2 text-sm text-gray-600">{description}</div>
          </div>
        </div>
      </header>

      <div className="md:container mx-auto py-2">
        <header className="p-2 md:p-4 text-gray-600">
          {personsCount} 名用户，{issues.length} 条发言
        </header>
        <ul className="list-none  space-y-2 md:space-y-4 mt-2">
          {issues.map(({id, title, bodyHtml, url, person, userId, date}) => {
            const {avatarUrl, name, login} = person;
            return (
              <li key={id} className="p-2 md:p-4 flex bg-white md:rounded-lg">
                <aside className="flex-shrink-0">
                  <NextLink href={`/persons/${userId}`}>
                    <a className="block">
                      <img
                        src={avatarUrl}
                        className="mt-2 w-8 h-8 md:w-10 md:h-10  rounded-full ring ring-offset"
                        alt=""
                      />
                    </a>
                  </NextLink>
                </aside>
                <div className="ml-3 md:ml-4 flex-1">
                  <header>
                    <NextLink href={`/persons/${userId}`}>
                      <a className="block space-x-2">
                        {name ? <span>{name}</span> : null}
                        <span className="text-sm text-gray-600">@{login}</span>
                      </a>
                    </NextLink>
                    <time className="text-sm text-gray-600">{date}</time>
                  </header>
                  <Collapse
                    className="border p-3 md:p-4 mt-2 rounded-lg"
                    title={
                      <h3 className="text-sm md:text-base break-all">
                        {title}
                      </h3>
                    }>
                    <div className="p-4">
                      <header className="flex items-center py-2 text-xs md:text-sm ">
                        <a
                          href={url}
                          target="_blank"
                          className="block text-sky-500"
                          rel="noreferrer noopener">
                          在 Github 中查看
                        </a>
                      </header>
                      <article
                        className="text-gray-600 text-sm md:text-base"
                        dangerouslySetInnerHTML={{
                          __html: bodyHtml || '',
                        }}></article>
                    </div>
                  </Collapse>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default EventDetailPage;

export const getStaticProps: GetStaticProps = (props) => {
  const eventInfo = getEvent(props?.params?.id as string);
  return {
    props: {
      eventInfo,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const allEventsIds = getAllEventsIds();
  return {
    paths: allEventsIds.map((id) => `/events/${id}`),
    fallback: true,
  };
};
