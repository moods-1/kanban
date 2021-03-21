import React, { useState } from "react";
import { useStyles } from "../themes/membersTheme";
import {
  TextField,
  Container,
  Avatar,
  Button,
  Typography,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { debounce } from "lodash";
import axios from "axios";

function AddMembers({
  boardId,
  memberLength,
  setMemberLength,
  premium,
  setMembers,
}) {
  const classes = useStyles();
  const [shares, setShares] = useState([]);

  const handleFilter = debounce((e) => {
    const email = e.target.value;
    email === "" && setShares([]);
    axios
      .get(`${window.location.origin}/user/filter-by-email/${email}`)
      .then((data) => setShares(data.data))
      .catch((err) => console.log(err));
  }, 750);

  const handleShareButton = async (e, id) => {
    let item = e.target;
    let data = {
      boardId: boardId,
      id: id,
    };

    await axios
      .post(`${window.location.origin}/api/board/share/`, data)
      .then((res) => {
        if (item.className === "MuiButton-label") {
          item.parentElement.style.display = "none";
        } else {
          // To prevent only the Avatar or email disappearing when clicked
          while (item.className !== "MuiButton-label")
            item = item.parentElement;
          item.parentElement.style.display = "none";
        }
        setMemberLength(res.data.length);
        axios
          .get(`${window.location.origin}/user/board-members/${res.data}`)
          .then((data) => setMembers(data.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {(memberLength < 10 || premium) && (
        <Container className={classes.container}>
          <TextField
            className={classes.textField}
            variant="outlined"
            size="small"
            fullWidth={true}
            label="Search for members by email"
            name="memberSearch"
            onChange={(e) => handleFilter(e)}
          />
          {shares.length > 0 && (
            <h4 className={classes.select}>Click to add.</h4>
          )}
          <Container
            className={`${classes.scrollContainer} ${classes.container}`}
          >
            {shares.length > 0 &&
              shares.map((member, index) => (
                <Button
                  className={classes.memberList}
                  fullWidth={true}
                  key={index}
                  name="button"
                  color="primary"
                  variant="contained"
                  size="small"
                  display=""
                  onClick={(e) => handleShareButton(e, member._id)}
                >
                  <Avatar src={member.image} alt="member" />
                  <p>{member.email}</p>
                  <AddCircleOutlineIcon />
                </Button>
              ))}
          </Container>
        </Container>
      )}
      {memberLength > 9 && !premium && (
        <Container className={classes.warning}>
          <Typography>
            The limit of 10 members has been reached. Remove some members or
            upgrade to premium.
          </Typography>
        </Container>
      )}
    </>
  );
}

export default AddMembers;
