const wrapper = document.querySelector(".wrapper");
let page = 1;
let pageTotalCount = 1;
let API = "https://pokeapi.co/api/v2/pokemon";
let nextPage = "";
let prevPage = "";

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const pageText = document.querySelector(".page");

async function getData() {
  const res = await fetch(API);
  const data = await res.json();
  pageTotalCount = data.count;

  return data;
}

render();

async function render() {
  const pokemonData = await getData();

  const pokemonList = pokemonData.results;
  nextPage = pokemonData.next;
  prevPage = pokemonData.previous;

  pageTotalCount = Math.ceil(pokemonData.count / 20);

  pageText.innerText = `${page} | ${pageTotalCount}`;

  wrapper.innerHTML = "";
  pokemonList.forEach(async (pokemon) => {
    const res = await fetch(pokemon.url);
    const data = await res.json();
    const imageUrl = data.sprites.front_default;
    const pokemonTypes = data.types[0];

    wrapper.innerHTML += `
    <div class="card">
    <div class="first-content">
      <img src="${imageUrl}" alt="">
      <span>${pokemon.name}</span>
    </div>
    <div class="second-content">
      <span>Type: ${pokemonTypes.type.name}</span>
      <span>Height: ${data.height}</span>
      <span>Weight: ${data.weight}</span>
    </div>
  </div>
    `;
  });
}

prev.addEventListener("click", () => {
  if (page <= 1) {
    return;
  }
  API = prevPage;
  page--;
  render();
});

next.addEventListener("click", () => {
  if (page >= pageTotalCount) {
    return;
  }
  API = nextPage;
  page++;
  render();
});
