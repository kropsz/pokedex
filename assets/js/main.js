
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMore')
const limit = 5
let offset = 0

const maxRecord = 151

function loadPokemonItens(offset, limit) {

    pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">    
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
    
            <div class="detail">
                <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            </li>
            `).join('')
        pokemonList.innerHTML += newHtml

    })
}

loadPokemonItens(offset, limit)
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtoRecord = offset + limit
    if(qtoRecord >= maxRecord){
        const newLimit = maxRecord - offset
        loadMoreButton(offset, newLimit)
    }else{
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }

    loadPokemonItens(offset, limit)
})

