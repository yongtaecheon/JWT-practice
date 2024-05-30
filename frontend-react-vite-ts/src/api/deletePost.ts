import axios from "axios";

axios.defaults.withCredentials = true;

export const deletePost = (id:number) => {
  axios.delete(`/boards/delete/${id}`)
  return 1;
}