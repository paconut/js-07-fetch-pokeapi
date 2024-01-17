const BASE_URL = 'https://pokeapi.co/api/v2/';

const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
    }
}

document.getElementById('fetch-btn')
    .addEventListener('click', async () => {
        const text = document.getElementById('poke-name').value.toLowerCase();
        const pokemon = await fetchPokemon(text);
        localStorage.setItem('currentPokeId', pokemon.id);
        displayPokemonCard(pokemon);
    })

document.addEventListener('DOMContentLoaded', async () => {
    const storedId = localStorage.getItem('currentPokeId');
    const initialId = storedId ? parseInt(storedId) : 1;
    const pokemon = await fetchPokemon(initialId);
    displayPokemonCard(pokemon);
})

function displayPokemonCard(pokemon) {
    const pokemonCardContainer = document.querySelector('.pokemonCard');

    // Crear la estructura de la tarjeta
    const card = document.createElement('div');
    card.classList.add('tarjeta');

    const image = document.createElement('img');
    image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    image.alt = pokemon.name;

    const name = document.createElement('h2');
    name.innerHTML = pokemon.name;

    const id = document.createElement('p');
    id.innerHTML = `ID: ${pokemon.id}`;

    const weight = document.createElement('p');
    weight.innerHTML = `Weight: ${pokemon.weight} kg`;

    //Agregar a la estructura
    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(id);
    card.appendChild(weight);

    pokemonCardContainer.appendChild(card);//Se agrega todo
}