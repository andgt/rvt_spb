'use strict'

// Мобильное меню

let navMain = document.querySelector(".main-nav");
let navToggle = document.querySelector(".main-nav__button-toggle");
let wrapperOpen = document.querySelector(".header__wrapper");
let buttonAdd = document.querySelector(".button__add");

navMain.classList.remove("main-nav--no-js");

navToggle.onclick = function () {
  if (navMain.classList.contains("main-nav__closed")) {
    navMain.classList.remove("main-nav__closed");
    wrapperOpen.classList.add("header__wrapper--open-menu");
    buttonAdd.classList.add("button__add--open");
    navMain.classList.add("main-nav__opened");
  } else {
    buttonAdd.classList.remove("button__add--open");
    wrapperOpen.classList.remove("header__wrapper--open-menu");
    navMain.classList.remove("main-nav__opened");
    navMain.classList.add("main-nav__closed");
  }
}

// Очищает строку поиска

let btnClean = document.querySelector(".form-search__btn-clean");

btnClean.onclick = function () {
  searchInput.value = "";
};

// Калькулятор

let inputRanges = document.querySelectorAll(".calculate__input-range");
let inputRangeArea = document.getElementById("rangearea");
let inputRangeBathroom = document.getElementById("rangebathroom");
let selectArea = document.getElementById("area");
let selectBathroom = document.getElementById("bathroomarea");

const assignValue = function () {
  selectBathroom.value = inputRangeBathroom.value;
  selectArea.value = inputRangeArea.value;
};

for (let inputRange of inputRanges) {
  inputRange.addEventListener("input", function () {
    assignValue();
  });
};

assignValue();

/*
  ТП = Тип помещения (вторичка или новостройка) * ПР.
  ПР = Площадь ремонта.
  ЭЛ = Электрика (частичн. или новая) Эл * ПР.
  ТР = Тип ремонта (дизайнерский, косметический, капитальный) ТР * ПР.
  РС = Ремонт санузла (да, нет) РС * ПС.
  ПС = Площадь санузла.
  ПТ = Потолки (гипсокартон, натяжной, 2-уровня) ПТ * ПР.
  ТПЛ = Теплый пол (да, нет) ТПЛ * ПР.
  ДВ = Двери (нет, 1, 2, 3, 4, 5) ДВ.
  ВХД = Входная дверь (да, нет).

  Cумма = ((ТП * ПР) + (ЭЛ * ПР) + (ТР * ПР) + (РС * ПС) + (ПТ * ПР) + (ТПЛ * ПР) + (ДВ + 8500)) * 0,05;
  ВХД = Cумма * 0,05.
  Общая сумма = ВХД + Сумма.
*/

let output = document.querySelector(".calculate__total-output");
let formCalc = document.getElementById("calcform");

const calculation = function () {
  let typeOfPremises = document.getElementById("roomtype"); // Тип помещения
  let repairArea = document.getElementById("area"); // Площадь ремонта
  let electrician = document.getElementById("electrician"); // Электрика
  let typeOfRepair = document.getElementById("repair"); //Тип ремонта
  let repairBathroom = document.getElementById("bathroom"); // Ремонт санузла
  let bathroomArea = document.getElementById("bathroomarea"); // Площадь санузла
  let bathroomareaField = document.getElementById("bathroomfield"); // Заголовок
  let ceilings = document.getElementById("ceilings"); // Потолки
  let floors = document.getElementById("floors"); // Полы
  let doors = document.getElementById("doors"); // Двери
  let entrance = document.getElementById("entrance"); // Входная дверь
  let entranceOutput = document.getElementById("entranceoutput"); // Входна дверь Да/Нет переключатель

// Фон переключателя

  if (entrance.value <= "20") {
    entranceOutput.value = "Да";
    entrance.style.backgroundColor = "#4496f6";
  } else {
    entranceOutput.value = "Нет";
    entrance.style.backgroundColor = "#f3f4f8";
  }

  // Скрытие/появление пункта "Площадь санузла"

  let bathroomField = document.querySelector(".calculate__field--bathroom");

  if (repairBathroom.value === "0") {
    bathroomField.classList.remove("calculate__field--bathroom-show");
    bathroomField.classList.add("calculate__field--bathroom-hidden");
  } else {
    bathroomField.classList.remove("calculate__field--bathroom-hidden");
    bathroomField.classList.add("calculate__field--bathroom-show");
  }

  let typeOfPrem = parseInt(typeOfPremises.value) * parseInt(repairArea.value);
  let electric = parseInt(electrician.value) * parseInt(repairArea.value);
  let typeOfRep = parseInt(typeOfRepair.value) * parseInt(repairArea.value);
  let repairBath = parseInt(repairBathroom.value) * parseInt(bathroomArea.value);
  let ceil = parseInt(ceilings.value) * parseInt(repairArea.value);
  let floor = parseInt(floors.value) * parseInt(repairArea.value);
  let door = parseInt(doors.value);

  let sum = typeOfPrem + electric + typeOfRep + repairBath + ceil + floor + door;
  let entranceSum;

  if (entrance.value <= "20") {
    entranceOutput.value = "Да";
    entrance.style.backgroundColor = "#4496f6";
    entranceSum = sum * 0.05;
  } else {
    entranceOutput.value = "Нет";
    entrance.style.backgroundColor = "#f3f4f8";
    entranceSum = 0;
  }

  let totalSum = entranceSum + sum;

  output.value = totalSum.toLocaleString('ru') + " руб.";
};

calculation();

formCalc.oninput = function () {
   calculation();
  };



