import { useState, useEffect, useRef } from "react";
import TicketList from "./components/TicketList/TicketList";
import FilterList from "./components/FilterList/FilterList";
import Preloader from "./components/Preloader/Preloader";
import { ITicket, IFilters } from "./types";
import getTickets from "../src/api/api";

function App() {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<ITicket[] | undefined>(
    []
  );
  const [filters, setFilters] = useState<IFilters>({
    10: { status: false, text: "Все" },
    0: { status: false, text: "Без пересадок" },
    1: { status: false, text: "1 пересадка" },
    2: { status: false, text: "2 пересадки" },
    3: { status: false, text: "3 пересадки" },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const firstRender = useRef(0);

  useEffect(() => {
    if (firstRender.current < 2) {
      setIsLoading(true);
      getTickets().then((res) => {
        const sortedTickets = res.sort((a, b) => a.price - b.price);
        setTickets(sortedTickets);
        setFilteredTickets(sortedTickets);
        setIsLoading(false);
        firstRender.current++;
      });
    } else {
      const currentTickets = toFilter();
      setFilteredTickets(currentTickets.sort((a, b) => a.price - b.price));
    }
  }, [filters]);
  //Изменение фильтра чекбоксами
  const onFilter = (filterKey: keyof IFilters) => {
    const currentStatus = filters[filterKey].status;
    setFilters({
      ...filters,
      [filterKey]: {
        ...filters[filterKey as keyof IFilters],
        status: !currentStatus,
      },
    });
  };
  //Фильтрация 
  const toFilter = () => {
    const checkedFilters = (
      Object.keys(filters) as unknown as (keyof IFilters)[]
    ).filter((filterType) => filters[filterType].status);
    if (
      checkedFilters.map((i) => Number(i)).includes(10) ||
      !checkedFilters[0]
    ) {
      return tickets;
    } else {
      return tickets.filter((ticket) => {
        return checkedFilters.map((i) => Number(i)).includes(ticket.stops);
      });
    }
  };
  //Изменение фильтра кнопкой только
  const onOnlyOneFilter = (filterKey: keyof IFilters) => {
    let copyFilters = structuredClone(filters);
    for (let key in copyFilters) {
      if (key === filterKey.toString()) {
        copyFilters[key as unknown as keyof IFilters].status = true;
      } else {
        copyFilters[key as unknown as keyof IFilters].status = false;
      }
    }
    setFilters(copyFilters);
  };

  return (
    <>
      {isLoading && <Preloader />}
      <FilterList
        filters={filters}
        onFilter={onFilter}
        onOnlyOneFilter={onOnlyOneFilter}
      />
      <TicketList filteredTickets={filteredTickets} isLoading={isLoading} />
    </>
  );
}

export default App;
