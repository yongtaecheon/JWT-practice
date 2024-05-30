import axios from "axios";

axios.defaults.withCredentials = true;

export const modifyPost = (id:number, title: string, content: string, username: string) => {
  const formattedDate = new Date(Date.now()).toISOString().slice(0,10);
  axios.patch(`/boards/modify/${id}`, { title, content, username, createdAt: formattedDate })
    .then((response) => {
      console.log(response.data);
      return 1;
    })
  return 0;
}