import type {GetStaticProps, NextPage} from 'next';
import {getAllPersons, Person} from '../lib/api/persons';

import NextLink from 'next/link';
import {EventItemInfo, getAllEvents} from 'lib/api/event';
import PersonItem from 'components/PersonItem';
import EventItem from 'components/EventItem';

interface HomePageProps {
  latestEvents: EventItemInfo[];
  topPersons: Person[];
}

const HomePage: NextPage<HomePageProps> = ({latestEvents, topPersons}) => {
  return (
    <div className="mx-auto relative overflow-hidden">
      <header
        className="bg-cover bg-no-repeat md:bg-center"
        style={{backgroundImage: `url(/cover/react-ukraine.png)`}}>
        <div className=" backdrop-blur-sm bg-white/40">
          <div className="md:container mx-auto p-8 md:p-12 text-center md:text-left ">
            <h1 className="tracking-tight font-extrabold text-gray-900 text-4xl md:text-6xl">
              <span className="text-4xl">🙈</span>
              <span className="block text-indigo-600">Hall of Shame</span>
            </h1>
            <p className="text-gray-500 mt-2  max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              The Memory Hole
            </p>
            <div className="flex justify-center mt-3 md:justify-start">
              <div className="rounded-md shadow">
                <NextLink href="/events">
                  <a className="w-full flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-3 md:text-lg md:px-10">
                    事件
                  </a>
                </NextLink>
              </div>
              <div className="ml-3">
                <NextLink href="/persons">
                  <a className=" w-full flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-3 md:text-lg md:px-10">
                    人物
                  </a>
                </NextLink>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="md:container mx-auto md:flex justify-between mt-4 md:space-x-12 pb-6">
        <div className="flex-1 ">
          <h2 className="px-2 py-2 md:py-4 text-lg text-gray-700">最佳人物</h2>
          <ul className="list-none grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2">
            {topPersons.map((person) => (
              <li key={person.id} className="bg-white rounded-lg overflow-hidden">
                <PersonItem person={person} />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <h2 className="px-2 py-2 md:py-4 text-lg text-gray-700">最新事件</h2>
          <ul className="list-none grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2">
            {latestEvents.map((event) => (
              <li key={event.id} className="rounded-lg overflow-hidden">
                <EventItem event={event} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = () => {
  const events = getAllEvents();
  const persons = getAllPersons();

  return {
    props: {
      latestEvents: events.slice(0, 10),
      topPersons: persons.slice(0, 10),
    },
  };
};
