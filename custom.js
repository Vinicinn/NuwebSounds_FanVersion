// You Code Javascript
const baseUrl = 'https://nuweb.vercel.app/api/NuwebPlay'
async function getContent() {
    let request = await fetch(baseUrl)
    let data = await request.json()
    let mapeamento = data.items.map(element =>
        itemLista = {
            nome: element.track.name,
            tempo: element.track.duration_ms,
            autor: element.track.artists,
            imagem: element.track.album.images[1].url
        })
    console.log(data)
    criarItem(mapeamento)
}
function criarItem(musicas) {
    musicas.forEach(element => {
        // Criação dos Items da Lista
        var lista = document.getElementById("Lista");
        var item = document.createElement("li");
        var divnomeautor = document.createElement("div");
        var pnome = document.createElement("p");
        var pautor = document.createElement("p");
        var divimg = document.createElement("div");
        var divtempo = document.createElement("div");
        // Atribuindo Id dos Items
        pnome.id = "pNome"
        pautor.id = "pAutor"
        divimg.id = "mscImagem"
        divnomeautor.id = "mscNome"
        divtempo.id = "mscTempo"
        item.id = "itemLista"
        // Atribuição dos Elementos aos Items
        pnome.innerHTML = element.nome;
        pautor.innerHTML = concatenarAutores(element.autor);
        divimg.innerHTML = `<img src=${element.imagem} alt = "" id="imagem"></img >`;
        divtempo.innerHTML = converterTempo(element.tempo);
        // Adicionando na Lista HTML
        pnome.appendChild(pautor)
        divnomeautor.appendChild(divimg);
        divnomeautor.appendChild(pnome);
        item.appendChild(divnomeautor);
        item.appendChild(divtempo);
        lista.appendChild(item);
    });

}
function concatenarAutores(autores) {
    let temporario = " "
    let aux = 1
    // Percorrendo quantidade de autores, concatenando e acrescentando ','
    for (let i = 0; i < autores.length; i++) {
        temporario = temporario.concat(autores[i].name)
        if (autores.length == 2 && aux == 1) {
            temporario = temporario.concat(", ")
            aux++
        }
    }
    return temporario
}

function converterTempo(milisegundos) {
    minutos = Math.floor(milisegundos / 60000)
    segundos = ((milisegundos % 60000) / 1000).toFixed(0)
    return minutos + ":" + (segundos < 10 ? '0' : '') + segundos
}
function filtrarMusicas() {
    // Declarando variaveis
    var entrada, filtro, lista, musicas, nome, i, valorTexto;
    entrada = document.getElementById("barra");
    filtro = entrada.value.toUpperCase();
    lista = document.getElementById("Lista");
    musicas = lista.getElementsByTagName("li");
    quebra = lista.getElementsByTagName("br")
    // Percorrendo lista, filtrando e ocultando
    for (i = 0; i < musicas.length; i++) {
        nome = musicas[i].getElementsByTagName("p")[0];
        valorTexto = nome.innerText;
        if (valorTexto.toUpperCase().indexOf(filtro) > -1) {
            musicas[i].style.display = "";
        }
        else {
            musicas[i].style.display = "none";

        }

    }

}

getContent()