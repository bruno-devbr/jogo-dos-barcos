// Array de índices que indicam em quais pontos (divs) inserir navios pretos
export const positions = [
    21, 48, 49, 83, 112, 117, 134, 149, 156, 159, 164, 191, 217, 221, 232, 241,
    257, 263, 271, 272, 302, 307,
];

// Função que coloca navios nas coordenadas especificadas
export function setShipsPosition() {
    // Pega todas as divs internas que representam pontos no mapa
    const divCoords = document.querySelectorAll(".map div div");

    for (let i = 0; i < positions.length; i++) {
        // Cria um elemento <img> para o navio preto
        const img_BlackShips = document.createElement("img");

        // Define caminho da imagem e tamanho
        img_BlackShips.setAttribute("src", "./images/navio-black.png");
        img_BlackShips.style.width = "25px";

        // Ajusta sobreposição do navio
        img_BlackShips.style.zIndex = "1";

        // Ajusta posição relativa pra centralizar sobre o ponto
        img_BlackShips.style.position = "relative";
        img_BlackShips.style.top = "-15.5px"; // sobe verticalmente
        img_BlackShips.style.left = "-6.5px"; // desloca horizontalmente

        // Adiciona o navio na div correspondente ao índice no array "positions"
        divCoords[positions[i]].appendChild(img_BlackShips);
    }
}
