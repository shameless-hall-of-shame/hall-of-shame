import type {GetStaticProps, NextPage} from 'next';

import {getAllPersons, Person} from 'lib/api/persons';

import {FormEventHandler, useState} from 'react';
import PersonItem from 'components/PersonItem';

type PersonsPageProps = {
  allPersons: Person[];
};

const PersonsPage: NextPage<PersonsPageProps> = ({allPersons}) => {
  const {persons, handleSearch, isFiltered} = useSearchablePersons(allPersons);

  return (
    <div className="md:container mx-auto p-4">
      <header className="flex justify-center py-4">
        <form
          action="#"
          className="flex items-center w-full"
          onSubmit={handleSearch}>
          <input
            type="text"
            name="keyword"
            placeholder="Username / Email / Company / Location / Twitter"
            autoComplete="off"
            className="flex-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm border-gray-300 rounded-md"
          />
          <button className="ml-2 flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
            搜索
          </button>
        </form>
      </header>
      {isFiltered ? (
        <div className="p-2 text-gray-500">
          搜索到<span className="text-500"> {persons.length} </span>个用户
        </div>
      ) : null}
      <ul className="list-none grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 xl:gap-4">
        {persons.map((person) => (
          <li key={person.id} className="bg-white rounded-md">
            <PersonItem person={person} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonsPage;

function useSearchablePersons(allPersons: Person[]) {
  const [persons, setPersons] = useState(allPersons);
  const [isFiltered, setIsFiltered] = useState(false);

  const handleSearch: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const keyword = (
      (event.target as HTMLFormElement).keyword as HTMLInputElement
    ).value
      .trim()
      .toLowerCase();

    if (!keyword) {
      setPersons(allPersons);
      setIsFiltered(false);
      return;
    }

    const searchResults = allPersons.filter(
      ({twitterUsername, email, login, company, location, name}) => {
        return [name, email, login, twitterUsername, company, location]
          .filter((value) => Boolean(value))
          .map((value) => String(value).toLowerCase())
          .some((value) => value.includes(keyword));
      }
    );

    setPersons(searchResults);
    setIsFiltered(true);
  };

  return {persons, handleSearch, isFiltered};
}

export const getStaticProps: GetStaticProps = () => {
  const allPersons = getAllPersons();

  return {
    props: {
      allPersons,
    },
  };
};
