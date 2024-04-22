export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export const demoDb: User[] = [
  {
    id: 1,
    username: 'user1',
    email: 'user1@gmail.com',
    password: '1111',
  },
  {
    id: 2,
    username: 'user2',
    email: 'user2@gmail.com',
    password: '2222',
  },
  {
    id: 3,
    username: 'user3',
    email: 'user3@gmail.com',
    password: '3333',
  },
  {
    id: 4,
    username: 'user4',
    email: 'user4@gmail.com',
    password: '4444',
  },
];
