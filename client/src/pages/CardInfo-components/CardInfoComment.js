import React, { useState } from "react";
import { Typography, Box, TextField, Button } from "@material-ui/core";
import { ChatBubbleOutlineRounded } from "@material-ui/icons";
import { useStyles } from "../../themes/cardInfoStyles";
import { updateCard } from "../../API/card";

function CardInfoComment({
  saveComment,
  showComment,
  deleteComment,
  cardId,
  cardComment,
}) {
  const [disabled, setDisabled] = useState(true);
  const [comment, setComment] = useState("");
  const classes = useStyles();

  const handleChange = (e) => {
    setComment(e.target.value);
    setDisabled(false);
  };

  const confirmSave = async () => {
    const data = {
      cardId: cardId,
      property: "comment",
      newData: comment,
    };
    const res = await updateCard(data);
    if (res.status === 200) {
      saveComment(comment);
      setDisabled(true);
    }
  };

  const handleDeleteSection = () => {
    deleteComment();
  };

  return (
    <Box
      className={`${classes.section} ${
        showComment ? classes.dBlock : classes.dNone
      }`}>
      <Typography className={classes.subHeader}>
        <ChatBubbleOutlineRounded
          color="primary"
          style={{ marginRight: "4px" }}
        />
        Add Comment:
      </Typography>
      <TextField
        id="outlined-textarea"
        multiline
        rows={2}
        variant="outlined"
        color="primary"
        placeholder="Write a comment..."
        onChange={handleChange}
        className={classes.field}
        value={comment || cardComment}
      />
      <Box className={classes.field}>
        <Button
          disabled={disabled}
          size="large"
          color="primary"
          onClick={confirmSave}>
          Save
        </Button>
        <Button
          size="small"
          color="primary"
          className={classes.cancel}
          onClick={handleDeleteSection}>
          &times;
        </Button>
      </Box>
    </Box>
  );
}
export default CardInfoComment;
