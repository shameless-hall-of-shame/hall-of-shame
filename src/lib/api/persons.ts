import {getDb} from '../../database';
import {IssueEntity, PersonEntity} from '../../database/types';

export interface Person extends PersonEntity {
  eventsCount: number;
  issuesCount: number;
}

export const getAllPersons = (): Person[] => {
  const db = getDb();
  const allPersons = Object.values(db.persons).map(
    (person: PersonEntity): Person => {
      const eventsCount = Object.values(db.events).filter((event) =>
        event.personsIds.includes(person.id)
      ).length;
      const issuesCount = Object.values(db.issues).filter(
        (issue) => issue.userId === person.id
      ).length;
      return {
        ...person,
        eventsCount,
        issuesCount,
      };
    }
  );
  return allPersons.sort(
    (a, b) => b.issuesCount + b.eventsCount - (a.issuesCount + a.eventsCount)
  );
};

export interface PersonInfo extends PersonEntity {
  eventsCount: number;
  issuesCount: number;
  issues: IssueEntity[];
}

export const getPerson = (id: string): PersonInfo => {
  const db = getDb();

  const eventsCount = Object.values(db.events).filter((event) =>
    event.personsIds.includes(id)
  ).length;
  const issues = Object.values(db.issues).filter(
    (issue) => issue.userId === id
  );

  const personBasicInfo = db.persons[id];

  return {
    ...personBasicInfo,
    eventsCount,
    issuesCount: issues.length,
    issues,
  };
};

export const getAllPersonsIds = () => {
  const db = getDb();
  return Object.keys(db.persons);
};
