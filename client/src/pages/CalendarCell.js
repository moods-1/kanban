import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useStyles } from "../themes/calendarCellStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CalendarCard from "./CalendarCard";

function CalendarCell({ day }) {
  const [cards, setCards] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setCards(day.cards);
  }, [day]);

  return (
    <Grid item className={classes.day}>
      <span>
        <Typography className={`${classes.p} ${classes.dayNumber}`}>
          {day.number}
        </Typography>
        {cards.length === 0 ? null : cards.length > 1 ? (
          <Typography className={`${classes.p} ${classes.cardCount}`}>
            {cards.length} Cards
          </Typography>
        ) : (
          <Typography className={`${classes.p} ${classes.cardCount}`}>
            {cards.length} Card
          </Typography>
        )}
      </span>

      <Droppable droppableId={day.id}>
        {(provided) => (
          <div
            className={classes.cardContainer}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {cards.map((card, index) => (
              <CalendarCard key={card._id} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Grid>
  );
}

export default CalendarCell;
