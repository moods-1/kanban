import axios from "axios";

export const createColumn = (data) => {
  try {
    const URL = `${window.location.origin}/api/column/`;
    axios.post(URL, data);
  } catch (err) {
    console.error(err);
  }
};

export const updateColumnName = async (columnId, columnName) => {
  try {
    const res = await axios.put(
      `${window.location.origin}/api/column/update-name/`,
      {
        columnId,
        columnName,
      }
    );
    return res.status;
  } catch (err) {
    console.error(err);
  }
};

export const deleteColumn = async (boardId, columnId) => {
  try {
    const res = await axios.delete(
      `${window.location.origin}/api/column/delete/`,
      {
        data: {
          boardId,
          columnId,
        },
      }
    );
    return res.status;
  } catch (err) {
    console.error(err);
  }
};
