import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import List from "./List";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Paper,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useStyles } from "../themes/boardStyles";
import { UserContext } from "../contexts/UserContext";
import { Grid } from "@material-ui/core";
import CreateModal from "./CreateModal";
import Members from "./Members";
import axios from "axios";

function Board(props) {
  const classes = useStyles();
  const history = useHistory();
  const {
    user,
    boardList,
    currBoardName,
    currBoardId,
    setCurrBoardId,
    currBoard,
  } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [limitError, setLimitError] = useState(false);
  const { id } = useParams();

  const handleCreate = async () => {
    let boardCount = 0;
    let premium = false;
    const id = user._id;
    await axios
      .get(`${window.location.origin}/user/${id}`)
      .then((data) => {
        boardCount = data.data.boards.length;
        premium = data.data.premium;
      })
      .catch((err) => console.log(err));
    setLimitError(boardCount < 10 || premium ? false : true);
    setShowBoardModal(true);
  };

  useEffect(() => {
    setCurrBoardId(id);
  }, [id, setCurrBoardId]);

  useEffect(() => {
    if (currBoardId) {
      history.push(`/board/${currBoardId}`);
    }
  }, [currBoardId, history]);

  const Dropdown = () => {
    const allBoards = boardList.map((board) => (
      <Link
        to={`/board/${board._id}`}
        key={board._id}
        className={classes.dropDownLink}
      >
        <Typography
          variant="subtitle1"
          className={classes.dropDownItem}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {board.name}
        </Typography>
      </Link>
    ));

    return (
      <Grid item>
        <Paper
          className={classes.dropdown}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <Typography variant="body1">Select board</Typography>
          <hr />
          {allBoards}
        </Paper>
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.blue}>
        <Toolbar>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
          >
            <Grid item>
              <Typography className={`${classes.title} ${classes.boardName}`}>
                {currBoardName === "untitled"
                  ? "My School Board"
                  : currBoardName}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                className={classes.buttonCreate}
                type="submit"
                variant="outlined"
                color="primary"
                onClick={() => handleCreate()}
              >
                Create board
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className={classes.buttonCreate}
                onClick={() => setShowModal(true)}
              >
                Create column
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className={classes.buttonCreate}
                onClick={() => setShowMembers(true)}
              >
                Members
              </Button>
              <IconButton
                color="inherit"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <MenuIcon className={classes.menu} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <List loadedData={currBoard} currBoardId={currBoardId} />
      {showBoardModal && (
        <CreateModal
          setShowModal={setShowModal}
          setShowBoardModal={setShowBoardModal}
          type="board"
          limitError={limitError}
        />
      )}
      {showModal && (
        <CreateModal
          setShowModal={setShowModal}
          type="column" 
        />
      )}
      {showDropdown && <Dropdown />}
      {showMembers && <Members setShowMembers={setShowMembers} />}
    </div>
  );
}

export default Board;
