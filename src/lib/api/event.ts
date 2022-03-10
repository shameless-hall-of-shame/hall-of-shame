import {EventEntity, IssueEntity, PersonEntity} from 'database/types';
import {getDb} from '../../database';

export interface EventItemInfo
  extends Omit<EventEntity, 'issuesIds' | 'personsIds'> {
  issuesCount: number;
  personsCount: number;
}

export const getAllEvents = () => {
  const db = getDb();

  const events: EventItemInfo[] = Object.values(db.events)
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .map(({issuesIds, personsIds, ...rest}) => {
      return {
        ...rest,
        issuesCount: issuesIds.length,
        personsCount: personsIds.length,
      };
    });

  return events;
};

export interface EventInfo extends EventEntity {
  issues: Array<
    IssueEntity & {
      person: PersonEntity;
      date: string;
    }
  >;
  personsCount: number;
}

export const getEvent = (id: string): EventInfo => {
  const db = getDb();

  const event = db.events[id];

  const issues = event.issuesIds

    .map((issueId) => {
      const issueDetail = db.issues[issueId];

      const personInfo = db.persons[issueDetail.userId];

      const date = new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      }).format(new Date(issueDetail.createdAt));

      return {
        ...issueDetail,
        date,
        person: personInfo,
      };
    })
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const personsCount = Array.from(new Set(issues.map((i) => i.userId))).length;

  return {
    ...event,
    issues,
    personsCount,
  };
};

export const getAllEventsIds = () => {
  const db = getDb();
  return Object.keys(db.events);
};
