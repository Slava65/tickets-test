import { useId, useState, useEffect } from "react";
import { IFilters } from "../../types";
const currencyList = ["RUB", "USD", "EUR"];

export default function FilterList({
  filters,
  onFilter,
  onOnlyOneFilter,
}: {
  filters: IFilters;
  onFilter: Function;
  onOnlyOneFilter: Function;
}) {
  const [hoverFilter, setHoverFilter] = useState<string | undefined>("");
  const [focusedCurrenceButton, setFocusedCurrenceButton] =
    useState<string>("11");
  //Управление фокусом кнопок валюты
  useEffect(() => {
    document.getElementById(focusedCurrenceButton)?.focus();
    document?.addEventListener("mousedown", (e) => {
      e.preventDefault();
      return false;
    });
    return () => {
      document?.removeEventListener("mousedown", (e) => {
        e.preventDefault();
        return false;
      });
    };
  }, [focusedCurrenceButton]);
  //Установка видимости кнопки "только" при наведении мыши (изменении стейта hoverFilter)
  useEffect(() => {
    document
      .querySelector(`[data-btnid="${hoverFilter}"]`)
      ?.removeAttribute("hidden");
  }, [hoverFilter]);
  //Обработчик чек-бокса
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilter(e.target.value);
  };
  //Установка id элемента, на который наведена мышь в state
  const handleSetHover = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    setHoverFilter(target.dataset.id);
  };
  //Установка невидимости кнопки "только" при уходе мыши
  const handleUnsetHover = () => {
    setHoverFilter("");
    document
      .querySelector(`[data-btnid="${hoverFilter}"]`)
      ?.setAttribute("hidden", "");
  };
  //Обработчик кнопки "только"
  const handleOnlyOneButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const checkBoxes = document.querySelectorAll(".transferFilter__item");
    (checkBoxes as unknown as HTMLInputElement[]).forEach((checkBox) => {
      if (checkBox.getAttribute("value") === target.dataset.btnid) {
        checkBox.checked = true;
      } else {
        checkBox.checked = false;
      }
    });
    onOnlyOneFilter(target.dataset.btnid);
  };
  //Для установки фокуса первой и последней кнопок currency с округленными краями
  const onFocus = () => {
    document
      .getElementById("11")
      ?.setAttribute("class", "currency__button currency__button_first");
    document
      .getElementById((currencyList.length + 10).toString())
      ?.setAttribute("class", "currency__button currency__button_last");
  };
  //обработчик кнопки валюты
  const handleCurrencyButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setFocusedCurrenceButton(target.id);
  };

  return (
    <section className="filterlist">
      <div className="currency">
        <p className="filterlist__title">ВАЛЮТА</p>
        <ul className="currency__list">
          {currencyList &&
            currencyList.map((currency, index) => (
              <li className="currency__item" key={useId()}>
                <button
                  className="currency__button"
                  id={(index + 11) as unknown as string}
                  onFocus={onFocus}
                  onClick={handleCurrencyButton}
                >
                  {currency}
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div className="transferFilter">
        <p className="filterlist__title">КОЛИЧЕСТВО ПЕРЕСАДОК</p>
        <ul className="transferFilter__list">
          {(Object.keys(filters) as unknown as (keyof IFilters)[])
            .sort((a, b) => (a % 10) - a / 10 - ((b % 10) - b / 10))
            .map((typeFilter) => (
              <li
                className="transferFilter__type"
                key={useId()}
                onMouseEnter={handleSetHover}
                onMouseLeave={handleUnsetHover}
                data-id={typeFilter}
              >
                <div className="transferFilter__checkboxblock">
                  <input
                    className="transferFilter__item"
                    type="checkbox"
                    value={typeFilter}
                    onChange={handleChange}
                    id={typeFilter as unknown as string | undefined}
                  ></input>
                  <label className="transferFilter__text">
                    {filters[typeFilter as keyof IFilters].text}
                  </label>
                </div>
                <button
                  hidden
                  className="transferFilter__only"
                  data-btnid={typeFilter as unknown as string | undefined}
                  onClick={handleOnlyOneButton}
                >
                  только
                </button>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
