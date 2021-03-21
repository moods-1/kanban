import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import { DragDropContext } from "react-beautiful-dnd";
import { useStyles } from "../themes/calendarStyles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import buildCalendar from "../utils/buildCalendar";
import CalendarCell from "./CalendarCell";
import { UserContext } from "../contexts/UserContext";
import { updateCard } from "../API/card";
import { getBoard } from "../API/board";

function Calendar() {
  const { currBoardId } = useContext(UserContext);
  const [calendar, setCalendar] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment());
  const classes = useStyles();

  const fetchBoardFromDb = async (boardId) => {
    const res = await getBoard(boardId);
    return res;
  };

  useEffect(() => {
    fetchBoardFromDb(currBoardId).then((res) => {
      const { columns } = res.data;
      let cards = [];

      // makes an array of all the Card objects in the current board
      columns.forEach((column) => {
        cards = [...cards, ...column.cards];
      });

      setCalendar(buildCalendar(currentDate, cards));
    });
  }, [currBoardId, currentDate]);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newCalendar = JSON.parse(JSON.stringify(calendar));
    let sourceCards = [];
    let destinationCards = [];
    let sourceWeek = 0;
    let sourceDay = 0;
    let destinationWeek = 0;
    let destinationDay = 0;

    // finds the indices of the source calendar cell and the destination cell
    for (let i = 0; i < calendar.length; i++) {
      for (let j = 0; j < calendar[i].length; j++) {
        if (calendar[i][j].id === source.droppableId) {
          sourceCards = JSON.parse(JSON.stringify(calendar[i][j].cards));
          sourceWeek = i;
          sourceDay = j;
        }
        if (calendar[i][j].id === destination.droppableId) {
          destinationCards = JSON.parse(JSON.stringify(calendar[i][j].cards));
          destinationWeek = i;
          destinationDay = j;
        }
      }
    }

    const draggedCard = sourceCards.filter(
      (card) => card._id === draggableId
    )[0];

    // case for if card was re-arranged in the same column
    if (sourceWeek === destinationWeek && sourceDay === destinationDay) {
      sourceCards.splice(source.index, 1);
      sourceCards.splice(destination.index, 0, draggedCard);
      newCalendar[sourceWeek][sourceDay].cards = sourceCards;
      setCalendar(newCalendar);
      return;
    }

    /*
			if card was dropped to a different calendar day, the card's 
			deadline will be changed to the date of the new calendar cell
		*/
    updateCard({
      cardId: draggedCard._id,
      property: "deadline",
      newData: destination.droppableId,
    });

    sourceCards.splice(source.index, 1);
    newCalendar[sourceWeek][sourceDay].cards = sourceCards;
    destinationCards.splice(destination.index, 0, draggedCard);
    newCalendar[destinationWeek][destinationDay].cards = destinationCards;
    setCalendar(newCalendar);
  };

  return (
    <>
      <h1 className={classes.h1}>
        {currentDate.format("MMMM") + " " + currentDate.format("YYYY")}
      </h1>

      <Container style={{ marginBottom: "50px" }}>
        <Grid container>
          <Grid item className={`${classes.day} ${classes.names}`}>
            Sun
          </Grid>
          <Grid item className={`${classes.day} ${classes.names}`}>
            Mon
          </Grid>
          <Grid item className={`${classes.day} ${classes.names}`}>
            Tue
          </Grid>
          <Grid item className={`${classes.day} ${classes.names}`}>
            Wed
          </Grid>
          <Grid item className={`${classes.day} ${classes.names}`}>
            Thur
          </Grid>
          <Grid item className={`${classes.day} ${classes.names}`}>
            Fri
          </Grid>
          <Grid item className={`${classes.day} ${classes.names}`}>
            Sat
          </Grid>
        </Grid>

        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container>
            {calendar.map((week) =>
              week.map((day) => <CalendarCell key={day.id} day={day} />)
            )}
          </Grid>
        </DragDropContext>
      </Container>
    </>
  );
}

export default Calendar;
