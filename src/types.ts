export interface ITicket {
  origin: string;
  origin_name: string;
  destination: string;
  destination_name: string;
  departure_date: string;
  departure_time: string;
  arrival_date: string;
  arrival_time: string;
  carrier: string;
  stops: number;
  price: number;
}

export interface IFilters {
  10: { status: boolean; text: "Все" };
  0: { status: boolean; text: "Без пересадок" };
  1: { status: boolean; text: "1 пересадка" };
  2: { status: boolean; text: "2 пересадки" };
  3: { status: boolean; text: "3 пересадки" };
}
