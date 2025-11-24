const OMDB_API_KEY = 'coloque sua chave aqui';
const listaFilmesContainer = document.querySelector('.lista-filmes');
const searchInput = document.quertSelector('.searchInput');
/**
 * @param {Object} filme
 */
function criarCardFilme(filme) {
    const card = document.createElement('div');
    card.classList.add('card-filme');

    card.dataset.imdbId = filme.imbdID;

    const rating = filme.imdbRating ? `🌟 ${filme.imdbRating}` : `🌟 N/A`;

    card.innerHTML = `
    <img scr="${filme.Poster !== 'N/A' ? filme.Poster : 'placeholder.jpg'}"
        alt=${filme.Title}"
        class="poster-filme">
    <span class="avaliacao">${rating}</span>
    <div class="card-detalhes">
        <h3 class="titulo-filme">${filme.Title} (${filme.Year})</h3>
        <button class="botao-adicionar" data-title="${filme.Title}"
            +Minha Lista
        </button>
    `;

    card.addEventListener('click', () => buscarEExibirDetalhes(filme.imdbID));

    return card;
}
/**
 * @param {string} termo
 */
async function buscarFilmes(termo) {
    if (!termo) return;

    listaFilmesContainer.innerHTML = '<p style="text-align: center; color: gray;"> carregando...</p>';

    try{
        const response = await fetch(`https://www.omdbapi.com/?s=${termo}&apikey=${OMDB_API_KEY}`);
        const data = await response.json();

        listaFilmesContainer.innerHTML = '';

        if (data.response === 'True' && data.Search) {
            data.Search.forEach(async (filmeBase) => {
                const filmeDetalhado = await buscarDetalhes(filmeBase.imdbID);
                if (filmeDetalhado) {
                    listaFilmesContainer.appendChild(criarCardFilme(filmeDetalhado));
                }
            });
        } else {
            listaFilmesContainer.innerHTML = `<p style"text-align: center;">nenhum filme encontrado para "${termo}".</p>`;
        }
    } catch (error) {
        console.error("erro ao buscar filme:", error);
        listaFilmesContainer.innerHTML = '<p style"text-align: center; color: red"> erro na conexão com a API.</p>';
    }
} 

async function buscarDetalhes(imdbID) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${termo}&plot=full&apikey=${OMDB_API_KEY}`);
        const data = await response.json();
        return data.Response === 'True' ? data : null;
    } catch (error) {
        console.error("erro ao buscar detalhes:", error);
        return null;
    }
}

function buscarEExibirDetalhes(imdbID) {
    alert(`funcionalidade de detalhes/trailer para ID: ${imdbID} (ainda precisa ser implementado).`);

}

let searchTimeout;
searchInput.addEventListener('input', (event) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        buscarFilmes(event.target.value.trim());
    }, 500);
});

document.addEventListener('DOMContentLoaded', () => {
    buscarFilmes('popular');
});