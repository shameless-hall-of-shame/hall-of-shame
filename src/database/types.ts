export interface Entity {
  id: string;
}

export interface EventEntity extends Entity {
  name: string;
  issuesIds: string[];
  personsIds: string[];
  cover: string;
  description: string;
  createdAt: string;
}

export interface IssueEntity extends Entity {
  title: string;
  bodyHtml: string | null;
  userId: string;
  databaseId: number;
  createdAt: string;
  url: string;
}

export interface PersonEntity extends Entity {
  id: string;
  email: string | null;
  avatarUrl: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  login: string | null;
  name: string | null;
  createdAt: string;
  databaseId: number;
  twitterUsername: string | null;
  updatedAt: string;
  websiteUrl: string | null;
}

export type DB<T extends Entity> = Record<T['id'], T>;
