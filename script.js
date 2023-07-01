const API_URL = 'https://pokeapi.co/api/v2/pokemon';
const SPRITES_URL = 'https://pokeapi.co/api/v2/pokemon-form';



const pokemonListElement = document.getElementById('pokemonList');
const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');

const fetchPokemonData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
};

const fetchPokemonSprites = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.sprites.front_default;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
};

const displayPokemons = async (pokemons) => {
  pokemonListElement.innerHTML = '';

  for (const pokemon of pokemons) {
    const pokemonData = await fetchPokemonData(pokemon.url);
    const spriteUrl = await fetchPokemonSprites(`${SPRITES_URL}/${pokemonData.id}`);

    const abilities = pokemonData.abilities.map((ability) => ability.ability.name).join(', ');
    const moves = pokemonData.moves.map((move) => move.move.name).join(', ');

    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');
    pokemonElement.innerHTML = `
      <h3>${pokemonData.name}</h3>
      <img src="${spriteUrl}" alt="${pokemonData.name} sprite">
      <p><strong>Abilities:</strong> ${abilities}</p>
      <p><strong>Moves:</strong> ${moves}</p>
      <p><strong>Weight:</strong> ${pokemonData.weight}</p>
    `;

    pokemonListElement.appendChild(pokemonElement);
  }
};

// const totalPokemons = 50;
// const pageSize = 10;
// const maxPages = 5;
// let totalPages = Math.ceil(totalPokemons / pageSize);
// let currentPage = 1;


// const loadPokemons = async (page) => {
//   const offset = (page - 1) * pageSize;
//   const limit = pageSize;
//   const url = `${API_URL}?offset=${offset}&limit={limit}`;
//   const data = await fetchPokemonData(url);

//   if (data) {
//     const pokemons = data.results;
//     displayPokemons(pokemons);
//   }
// };

// let isFirstLoad = true;

// // Event listener for previous button
// prevButton.addEventListener('click', () => {
//   if (currentPage > 1) {
//     currentPage--;
//     loadPokemons(currentPage);
//   }
// });

// // Event listener for next button
// nextButton.addEventListener('click', () => {
//   currentPage++;
//   loadPokemons(currentPage);
// });

// // Load initial page
// if (isFirstLoad) {
//   loadPokemons(currentPage);
//   isFirstLoad = false;
// }

const totalPokemons = 50;
const pageSize = 10;
const maxPages = Math.ceil(totalPokemons / pageSize);
let currentPage = 1;

const loadPokemons = async (page) => {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;
  const url = `${API_URL}?offset=${offset}&limit=${limit}`;
  const data = await fetchPokemonData(url);

  if (data) {
    const pokemons = data.results;
    displayPokemons(pokemons);
  }
};

prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    loadPokemons(currentPage);
  }
});

nextButton.addEventListener('click', () => {
  if (currentPage < maxPages) {
    currentPage++;
    loadPokemons(currentPage);
  }
});

loadPokemons(currentPage);







  
