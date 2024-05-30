export interface Board {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  username: string;
}

export const demoDb: Board[] = [
  {
    id: 1,
    title: '안녕하세요',
    content: '반갑습니다 해당페이지는 JWT 연습용 게시판 입니다',
    createdAt: '2024-01-01',
    username: 'test',
  },
];
