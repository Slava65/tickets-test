import Point from "../Point/Point";
import { ITicket } from "../../types";

const declensions: { [k: number]: string } = {
  0: "ОК",
  1: "КА",
  2: "КИ",
  3: "КИ",
};
const carriers: { [k: string]: string } = {
  TK: require("../../assets/turkish_air.jpg"),
  S7: require("../../assets/S7_logo.png"),
  SU: require("../../assets/aeroflot.jpg"),
  BA: require("../../assets/BritishAir.jpg"),
};

export default function Ticket({ ticket }: { ticket: ITicket }) {
  return (
    <li className="ticket">
      <div className="ticket__buy">
        <img
          className="ticket__company-logo"
          src={carriers[ticket.carrier]}
        ></img>
        <button className="ticket__buy-button">
          Купить <br /> за {ticket.price.toLocaleString("ru-RU")}
        </button>
      </div>
      <div className="route">
        <Point ticket={ticket} isOrigin={true} />
        <div className="transfer">
          <p className="transfer__text">
            {ticket.stops} ПЕРЕСАД{declensions[ticket.stops]}
          </p>
          <div className="transfer__linecontainer">
            <div className="transfer__line"></div>
            <div className="transfer__picture"></div>
          </div>
        </div>
        <Point ticket={ticket} isOrigin={false} />
      </div>
    </li>
  );
}
