import axios from "axios";

export const createBoard = async (data) => {
  try {
    const URL = `${window.location.origin}/api/board/`;
    return await axios.post(URL, data);
  } catch (err) {
    console.error(err);
  }
};

export const getBoard = async (boardId) => {
  try {
    const URL = `${window.location.origin}/api/board/${boardId}`;
    return await axios.get(URL);
  } catch (err) {
    console.error(err);
  }
};

export const getBoardShallow = async (boardId) => {
  try {
    const URL = `${window.location.origin}/api/board/${boardId}?shallow=true`;
    return await axios.get(URL);
  } catch (err) {
    console.error(err);
  }
};

export const editBoard = async (boardId, data) => {
  try {
    const URL = `${window.location.origin}/api/board/${boardId}`;
    return await axios.patch(URL, data);
  } catch (err) {
    console.error(err);
  }
};
