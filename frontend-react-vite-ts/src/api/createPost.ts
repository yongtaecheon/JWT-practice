import axios from "axios";

axios.defaults.withCredentials = true;

export const createPost = (title: string, content: string, username: string) => {
  if (!content) {
    alert('내용을 작성해주세요');
    return 0;
  }
  else if (!title) {
    alert('제목을 작성해주세요');
    return 0;
  }
  const formattedDate = new Date(Date.now()).toISOString().slice(0,10);
  axios.post('/boards/create', { title, content, username, createdAt: formattedDate })
    .then((response) => {
      console.log(response.data);
    });
  return 1;
  }