const url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const input = document.getElementById("search-input");
const btn = document.getElementById("search-button");


const fetchData = async () => {
  const res = await fetch(url);
  const data = await res.json();
  search(data.results);
  //console.log(data.results);
}

//fetchData();

const getRemainingData = async obj => {
  const res = await fetch(obj.url);
  const data = await res.json();
  setData(data);
}

const setData = data => {
  document.getElementById("types").innerHTML = "";
  document.getElementById("pokemon-name").textContent = (data.name).toUpperCase();
  document.getElementById("pokemon-id").textContent = "#" + data.id;
  document.getElementById("weight").textContent = data.weight;
  document.getElementById("height").textContent = data.height;
  document.getElementById("img").innerHTML = `
    <img src="${data.sprites.front_default}" id="sprite" alt="${data.name}" />
    `;
  document.getElementById("hp").textContent = data.stats[0].base_stat;
  document.getElementById("attack").textContent = data.stats[1].base_stat;
  document.getElementById("defense").textContent = data.stats[2].base_stat;
  document.getElementById("special-attack").textContent = data.stats[3].base_stat;
  document.getElementById("special-defense").textContent = data.stats[4].base_stat;
  document.getElementById("speed").textContent = data.stats[5].base_stat;
  (data.types).forEach(typ => {
    document.getElementById("types").innerHTML += `<span>${(typ.type.name).toUpperCase()}</span>`
  });
}

const search = array => {
  const digitRegex = /^\d+$/;
  const digit = digitRegex.test(input.value) ? Number(input.value) : null;
  const ids = array.map(obj => obj.id);
  const names = array.map(obj => obj.name);


  if (digit !== null) {
    if (ids.includes(digit)) {
      /* document.getElementById("pokemon-name").textContent = array[digit - 1].name.toUpperCase();
      document.getElementById("pokemon-id").textContent = "#" + array[digit - 1].id; */

      getRemainingData(array[digit - 1]);

    } else {
      alert("Pokémon not found");
    }
  } else if(input.value !== "") {
     if (names.includes((input.value).toLowerCase())) {
      /*document.getElementById("pokemon-name").textContent = array[names.indexOf((input.value).toLowerCase())].name.toUpperCase();
      document.getElementById("pokemon-id").textContent = "#" + array[names.indexOf((input.value).toLowerCase())].id; */

      getRemainingData(array[names.indexOf((input.value).toLowerCase())]);

    } else {
      alert("Pokémon not found");
    }

  }
}

btn.addEventListener("click", fetchData)
