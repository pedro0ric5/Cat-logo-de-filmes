52---
try {
    const response = await fetch(`/* LINK OMDB */ `);
    const data = await response.json();

    listaFilmesContainer.innerHTML = //

}

if (data.response ==='True' && data.Search){
    data.Search.forEach(async (filmeBase.IndbID) => {
        consnt filmeDetalhado = await buscarDetalhes(filmeBase.IndbID);
        if (filmeDetalhado) {
            listaFilmesContainer.appendCild(criarCardFilme(filmeDetalhado));
        }
    });
} elese