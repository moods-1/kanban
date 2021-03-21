import React, { useState, useContext } from "react";
import {
  TextField,
  Typography,
  Button,
  Grid,
  Paper,
  IconButton,
} from "@material-ui/core";
import { useStyles } from "../themes/createModalStyles";
import CloseIcon from "@material-ui/icons/Close";
import { createBoard } from "../API/board";
import { createColumn } from "../API/column";
import { createCard } from "../API/card";
import { UserContext } from "../contexts/UserContext";

function CreateModal(props) {
  const classes = useStyles();
  const { setShowColumnModal, setShowBoardModal, type, limitError } = props;
  const {
    user,
    createCount,
    setCreateCount,
    currBoardId,
    setCurrBoardId,
  } = useContext(UserContext);

  const [title, setTitle] = useState("");

  const handleCreate = (data, type) => {
    switch (type) {
      case "board": {
        const cleanedData = {
          id: data._id,
          title: title,
        };
        async function getData() {
          const res = await createBoard(cleanedData);
          const boardId = res.data._id;
          boardId && setCurrBoardId(boardId);
          setCreateCount(createCount + 1);
        }
        getData();
        break;
      }
      case "column": {
        const cleanedData = {
          boardId: currBoardId,
          title: title,
        };
        createColumn(cleanedData);
        setCreateCount(createCount + 1);
        break;
      }
      case "card": {
        const cleanedData = {
          columnId: props.columnId,
          title: title,
        };
        createCard(cleanedData);
        setCreateCount(createCount + 1);
        break;
      }
      default:
        return;
    }
  };
  const handleClose = () => {
    setShowColumnModal(false);
    setShowBoardModal(false);
  };

  const handleClick = () => {
    handleCreate(user, type);
    handleClose();
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.backdrop}
    >
      <Paper className={classes.modal}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item className={classes.close}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
          {!limitError && (
            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems="center"
              className={classes.modalMain}
            >
              <Grid item>
                <Typography variant="h4" className={classes.title}>
                  Create a new {type}
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  placeholder="Add Title"
                  variant="outlined"
                  className={classes.input}
                  onChange={(e) => setTitle(e.target.value)}
                ></TextField>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.createButton}
                  onClick={handleClick}
                >
                  <Typography variant="body1">Create</Typography>
                </Button>
              </Grid>
            </Grid>
          )}
          {limitError && (
            <Grid className={classes.warning}>
              <Typography>
                "Board limit of 10 reached. Delete boards or upgrade to
                premium."
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Grid>
  );
}

export default CreateModal;
