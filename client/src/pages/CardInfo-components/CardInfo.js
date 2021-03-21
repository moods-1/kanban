import React, { useState } from "react";
import {
  Typography,
  Container,
  Box,
  Button,
  CardContent,
  Card,
} from "@material-ui/core";
import { Assignment } from "@material-ui/icons";
import { useStyles } from "../../themes/cardInfoStyles";
import CardInfoDescription from "./CardInfoDescription";
import CardInfoDeadline from "./CardInfoDeadline";
import CardInfoComment from "./CardInfoComment";

function CardInfo({ task, showCardInfo, closeCardInfo }) {
  const classes = useStyles();
  const [info, setInfo] = useState({
    name: "",
    description: "",
    deadline: "",
    comment: "",
    tags: [],
    attachments: [],
  });
  const [showDescription, setShowDescription] = useState(true);
  const [showDeadline, setShowDeadline] = useState(true);
  const [showComment, setShowComment] = useState(true);

  // description section handlers
  const addDescription = () => {
    setShowDescription(true);
  };
  const handleSaveDescription = (description) => {
    setInfo({ ...info, description });
  };
  const handleDeleteDescription = () => {
    setShowDescription(false);
  };

  // deadline section handlers
  const addDeadline = () => {
    setShowDeadline(true);
  };
  const handleSaveDeadline = (deadline) => {
    setInfo({ ...info, deadline });
  };
  const handleDeleteDeadline = () => {
    setShowDeadline(false);
  };

  // comment section handlers
  const addComment = () => {
    setShowComment(true);
  };
  const handleSaveComment = (comment) => {
    setInfo({ ...info, comment });
  };
  const handleDeleteComment = () => {
    setShowComment(false);
  };
  return (
    <Container
      maxWidth={false}
      className={showCardInfo ? classes.dBlock : classes.dNone}>
      <Box className={classes.bg} onClick={() => closeCardInfo()} />
      <Card className={classes.cardContainer}>
        <CardContent className={classes.header}>
          <Box className={classes.titleContainer}>
            <Assignment color="primary" style={{ marginRight: "3px" }} />
            <Typography className={`${classes.marginRight} ${classes.title}`}>
              {task.title}
            </Typography>
            <Box
              className={`${classes.cardStatus} ${classes.marginRight}`}></Box>
          </Box>
          <Typography
            variant="body1"
            style={{ color: "gray" }}
            className={classes.marginLeft}>
            In List "Math"
          </Typography>
          <Button className={classes.closeCard} onClick={() => closeCardInfo()}>
            &times;
          </Button>
        </CardContent>
        <CardContent className={classes.cardContent}>
          <Box m={0} className={`${classes.cardBody} ${classes.left}`}>
            <CardInfoDescription
              saveDescription={handleSaveDescription}
              showDescription={showDescription}
              deleteDescription={handleDeleteDescription}
              cardId={task._id}
              cardDescription={task.description}
            />
            <CardInfoDeadline
              saveDeadline={handleSaveDeadline}
              showDeadline={showDeadline}
              deleteDeadline={handleDeleteDeadline}
              cardId={task._id}
              cardDeadline={task.deadline}
            />
            <CardInfoComment
              saveComment={handleSaveComment}
              showComment={showComment}
              deleteComment={handleDeleteComment}
              cardId={task._id}
              cardComment={task.comment}
            />
          </Box>
          <Box m={0} className={`${classes.cardBody} ${classes.right}`}>
            <Box mt={1.5}>
              <Typography variant="subtitle2" align="center">
                ADD TO CARD:
              </Typography>
              <Button
                className={`${classes.add} ${
                  !showDescription ? classes.dBlock : classes.dNone
                }`}
                onClick={addDescription}>
                Description
              </Button>
              <Button
                className={`${classes.add} ${
                  !showDeadline ? classes.dBlock : classes.dNone
                }`}
                onClick={addDeadline}>
                Deadline
              </Button>
              <Button
                className={`${classes.add} ${
                  !showComment ? classes.dBlock : classes.dNone
                }`}
                onClick={addComment}>
                Comment
              </Button>
            </Box>
            <Box mt={4}>
              <Typography variant="subtitle2" align="center">
                ACTIONS:
              </Typography>
              <Button className={`${classes.add} ${classes.dBlock}`}>
                Move
              </Button>
              <Button className={`${classes.add} ${classes.dBlock}`}>
                Copy
              </Button>
              <Button className={`${classes.add} ${classes.dBlock}`}>
                Share
              </Button>
              <Button className={`${classes.add} ${classes.dBlock}`}>
                Delete
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default CardInfo;
