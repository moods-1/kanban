import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Typography } from "@material-ui/core";
import CardInfo from "./CardInfo-components/CardInfo";
import { Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    listStyle: "none",
    margin: "0.5rem 1rem",
    padding: "1rem",
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px 1px rgba(208,213,223,0.4)",
    fontWeight: "bold",
    width: "290px",
    minHeight: "60px",
    boxSizing: "border-box",
    "&:hover": {
      border: "2px solid #80A3FB",
    },
    "&:active": {
      boxShadow: "0px 0px 10px 1px rgba(128,163,251,0.8)",
    },
  },
  note: {
    color: "#aaa",
  },
});

function Task(props) {
  const [showCardInfo, setShowCardInfo] = useState(false);
  const classes = useStyles(props);
  const { task, idx } = props;
  
  const handleShowCardInfo = () => {
    setShowCardInfo(true);
  };

  const handleCloseCardInfo = () => {
    setShowCardInfo(false);
  };

  return (
    <React.Fragment>
      <Draggable draggableId={task._id} index={idx}>
        {(provided) => (
          <Card
            onClick={handleShowCardInfo}
            className={classes.card}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <span
              style={{
                height: "5px",
                width: "40px",
                borderRadius: "8px",
                border: "0.5px lightgray solid",
                margin: "0.5rem 0",
                background: `${task.color}`,
              }}
            ></span>
            <Typography variant="h6">{task.title || task.name}</Typography>
            {task.deadline ? (
              <Typography variant="body1" className={classes.note}>
                {task.deadline}
              </Typography>
            ) : (
              ""
            )}
          </Card>
        )}
      </Draggable>
      <CardInfo
        task={task}
        showCardInfo={showCardInfo}
        closeCardInfo={handleCloseCardInfo}
      />
    </React.Fragment>
  );
}

export default Task;
