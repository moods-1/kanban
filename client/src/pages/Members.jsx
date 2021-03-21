import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Grid,
  Paper,
  IconButton,
  Box,
  Avatar,
  Button,
  Container,
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import PersonIcon from "@material-ui/icons/Person";
import { useStyles } from "../themes/membersTheme";
import CloseIcon from "@material-ui/icons/Close";
import AddMembers from "../pages/AddMembers";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

function Members({ setShowMembers }) {
  const classes = useStyles();
  const [showSearch, setShowSearch] = useState(false);
  const [members, setMembers] = useState([]);
  const { currBoardId, user } = useContext(UserContext);
  const [memberLength, setMemberLength] = useState();
  //const [ids, setIds] = useState();
  const premium = user.premium;

  useEffect(() => {
    axios
      .get(`${window.location.origin}/api/board/${currBoardId}`)
      .then((data) => {
        const ids = data.data.members;
        setMemberLength(ids.length);
        axios
          .get(`${window.location.origin}/user/board-members/${ids}`)
          .then((data) => setMembers(data.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [currBoardId]);

  return (
    <Box
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
          <Container className={`${classes.head} ${classes.container}`}>
            <Typography variant="h3">Members</Typography>
            <Grid item className={classes.close}>
              <IconButton
                className={classes.closeBtn}
                onClick={() => setShowMembers(false)}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Container>
          <Container
            className={`${classes.memberProfiles} ${classes.container}`}
          >
            <AvatarGroup max={8}>
              {members.map((member, index) => (
                <Avatar
                  className={classes.avatar}
                  alt={member.email}
                  src={member.image}
                  key={index}
                />
              ))}
            </AvatarGroup>
          </Container>

          <Button
            className={classes.addBtn}
            color="primary"
            variant="contained"
            startIcon={<PersonIcon />}
            onClick={() => setShowSearch(!showSearch)}
          >
            <Typography>Add members ...</Typography>
          </Button>
          <hr className={classes.hr} />
          {showSearch && (
            <AddMembers
              boardId={currBoardId}
              memberLength={memberLength}
              setMemberLength={setMemberLength}
              setMembers={setMembers}
              premium={premium}
            />
          )}
        </Grid>
      </Paper>
    </Box>
  );
}

export default Members;
