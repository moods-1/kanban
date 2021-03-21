import React from "react";
import { Typography, Grid, Paper, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Upload from "./Upload";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "2",
    background: "rgba(0,0,0,0.6)",
  },
  modal: {
    display: "flex",
    background: "#ffffff",
    padding: "1rem",
    width: "380px",
    height: "400px",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.1)",
  },
  modalMain: {
    height: "80%",
  },
  title: {
    fontWeight: "800",
    marginTop: "0.5rem",
  },
  createButton: {
    padding: "1rem 3rem",
    borderRadius: "8px",
    background: "#759CFC",
    textTransform: "capitalize",
    "&:hover": {
      background: "#759CFC",
    },
  },
  input: {
    width: "300px",
  },
  close: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    color: "#ccc",
  },
}));
function UploadImage({ setShowUpload }) {
  const classes = useStyles();

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
            <IconButton onClick={() => setShowUpload(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
            className={classes.modalMain}
          >
            <Grid item>
              <Typography variant="h4" className={classes.title}>
                Choose Your Profile Image
              </Typography>
            </Grid>
            <Grid item>
              <Upload setShowUpload={setShowUpload} />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default UploadImage;
