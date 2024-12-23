import Ticket from "../Ticket/Ticket";
import { ITicket } from "../../types";

export default function TicketList({
  filteredTickets,
  isLoading,
}: {
  filteredTickets: ITicket[] | undefined;
  isLoading: boolean;
}) {
  return (
    <section className="ticketlist">
      {isLoading && (
        <p className="ticketlist__loading">Подождите, идёт загрузка</p>
      )}
      <ul className="ticketlist__list">
        {filteredTickets &&
          filteredTickets.map((ticket: ITicket) => (
            <Ticket key={self.crypto.randomUUID()} ticket={ticket} />
          ))}
      </ul>
    </section>
  );
}
