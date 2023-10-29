import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

async function fetchCharacters() {
  cardContainer.innerHTML = "";

  const url = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`;
  try {
    const response = await fetch(url);
    const characterData = await response.json();

    maxPage = characterData.info.pages;

    const characters = characterData.results;
    pagination.textContent = `${page} / ${maxPage}`;

    characters.forEach((character) => {
      cardContainer.append(createCharacterCard(character));
    });
  } catch (error) {
    console.error("Error message: ", error);
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Sorry we failed :((((((";
    cardContainer.append(errorMessage);
  }
}
// Task 3
prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchCharacters();
  }
});
nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    fetchCharacters();
  }
});

// Search by Submit
searchBar.addEventListener("submit", (event) => {
  event.preventDefault();

  const formElements = event.target.elements;
  searchQuery = formElements.query.value;
  fetchCharacters();
});

// Search by Input
const searchInput = document.querySelector(".search-bar__input");
searchInput.addEventListener("input", () => {
  searchQuery = searchInput.value;
  fetchCharacters();
});

fetchCharacters();
