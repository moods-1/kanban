import React, { createContext, useState, useMemo, useEffect } from "react";
import { getBoardShallow, getBoard } from "../API/board";
import { getUser, setDbCurrBoard } from "../API/user";

export const UserContext = createContext({});

export const UserContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");
  const [boardList, setBoardList] = useState([]);
  const [currBoardName, setCurrBoardName] = useState("");
  const [currBoardId, setCurrBoardId] = useState("");
  const [currBoard, setCurrBoard] = useState(null);
  const [createCount, setCreateCount] = useState(0);

  useEffect(() => {
    if (userId && createCount > 0) {
      async function getData() {
        const res = await getUser(userId);
        const updatedUser = res.data;
        setUser(updatedUser);
      }
      getData();
    }
  }, [userId, createCount]);

  useEffect(() => {
    const getAllBoards = async () => {
      const allBoards = {};
      if (user && user.boards) {
        setUserId(user._id);
        const pending = user.boards.map(async (boardId) => {
          return await getBoardShallow(boardId);
        });
        const resolved = await Promise.all(pending);
        resolved.map((res) => (allBoards[res.data._id] = res.data));
        const boardList = user.boards.map((boardId) => {
          if (allBoards[boardId]) {
            return allBoards[boardId];
          }
          return null;
        });
        setBoardList(boardList);
      }
    };
    getAllBoards();
  }, [user]);

  useEffect(() => {
    const getCurrBoard = async () => {
      if (currBoardId) {
        await setDbCurrBoard(user._id, currBoardId);
        setCurrBoardId(currBoardId);
        const loadedData = { columns: {}, columnOrder: [] };
        const res = await getBoard(currBoardId);
        const loadedBoard = res.data;
        setCurrBoardName(loadedBoard.name);
        const loadedColumns = {};
        const loadedOrder = [];
        loadedBoard.columns.forEach((col) => {
          col.id = col._id;
          col.taskIds = col.cards.map((card) => card._id);
          loadedColumns[col._id] = col;
          loadedOrder.push(col._id);
        });
        loadedData.columns = loadedColumns;
        loadedData.columnOrder = loadedOrder;
        setCurrBoard(loadedData);
      } else {
        if (boardList[0]) {
          setCurrBoardId(boardList[0]._id);
        }
      }
    };
    getCurrBoard();
  }, [currBoardId, createCount, boardList, user._id]);

  const providerValue = useMemo(
    () => ({
      user,
      setUser,
      loggedIn,
      setLoggedIn,
      boardList,
      currBoardName,
      currBoardId,
      setCurrBoardId,
      currBoard,
      setCurrBoard,
      createCount,
      setCreateCount,
    }),
    [
      user,
      setUser,
      loggedIn,
      setLoggedIn,
      currBoardName,
      boardList,
      currBoardId,
      setCurrBoardId,
      currBoard,
      setCurrBoard,
      createCount,
      setCreateCount,
    ]
  );

  return (
    <UserContext.Provider value={providerValue}>
      {props.children}
    </UserContext.Provider>
  );
};
