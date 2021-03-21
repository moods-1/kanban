import axios from "axios";

export const getUser = async (userId) => {
  try {
    const URL = `${window.location.origin}/user/${userId}`;
    return await axios.get(URL);
  } catch (err) {
    console.error(err);
  }
};
export const setDbCurrBoard = async (userId, boardId) => {
  try {
    let data = {id: userId, board: boardId}
    const URL = `${window.location.origin}/user/setCurrBoard`;
    return await axios.post(URL,data);
  } catch (err) {
    console.error(err);
  }
};
