import { ITicket } from "../../types";

export default function Point({
  ticket,
  isOrigin,
}: {
  ticket: ITicket;
  isOrigin: boolean;
}) {
  let formatter = new Intl.DateTimeFormat("ru", {
    day: "numeric",
    month: "short",
    year: "numeric",
    weekday: "short",
  });
  const dateTimeFormatter = (dateTimeString: string) => {
    const dateTimeArr = dateTimeString.split(".").map((item, index) => {
      if (index === 2) return Number("20" + item);
      else return Number(item);
    });
    const date = new Date(dateTimeArr[2], dateTimeArr[1], dateTimeArr[0]);
    let dateArr = formatter.format(date).split(" ");
    dateArr.pop();
    dateArr = [...dateArr.slice(1), dateArr[0]];
    dateArr[1] = dateArr[1].slice(0, -1);
    dateArr[2] = dateArr[2] + ",";
    dateArr[3] = dateArr[3].slice(0, -1);
    dateArr[3] = dateArr[3][0].toUpperCase() + dateArr[3].substring(1);
    return dateArr.join(" ");
  };
  return (
    <div className={`point ${!isOrigin && "point_right"}`}>
      <p className="point__time">
        {isOrigin ? ticket.departure_time : ticket.arrival_time}
      </p>
      <p className="point__airport">
        {isOrigin
          ? ticket.origin + ", " + ticket.origin_name
          : ticket.destination_name + ", " + ticket.destination}{" "}
      </p>
      <p className="point__date">
        {isOrigin
          ? dateTimeFormatter(ticket.departure_date)
          : dateTimeFormatter(ticket.arrival_date)}
      </p>
    </div>
  );
}
