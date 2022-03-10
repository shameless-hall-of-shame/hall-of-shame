import fs from 'fs-extra';

import {DB, EventEntity, IssueEntity, PersonEntity} from './types';

import PersonsDb from './storage/persons.json' assert {type: 'json'};
import EventsDb from './storage/events.json' assert {type: 'json'};
import IssuesDb from './storage/issues.json' assert {type: 'json'};

export const getDb = () => ({
  persons: PersonsDb as DB<PersonEntity>,
  events: EventsDb as DB<EventEntity>,
  issues: IssuesDb as DB<IssueEntity>,
});
