export default function buildCalendar(value, cardsFromContext) {
  const startDay = value.clone().startOf("month").startOf("week");
  const endDay = value.clone().endOf("month").endOf("week");
  const day = startDay.clone().subtract(1, "day");
  const calendar = [];

  while (day.isBefore(endDay, "day")) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => {
          const dayClone = day.add(1, "day").clone(); // increments "day" by one day
          let cards = [];

          cardsFromContext.forEach((card) => {
            if (card.deadline && dayClone.isSame(card.deadline))
              cards.push(card);
          });

          return {
            id: dayClone.format("YYYY-MM-DD"),
            number: dayClone.format("D"),
            cards,
          };
        })
    );
  }
  return calendar;
}
