// Importa funções de outros arquivos JS
import { setShipsPosition } from "./setShips.js";
import { getGreenPositions } from "./randonColors.js";
import { getDivCoords } from "./coordsGame-event.js";

// Posições verticais (top) para cada latitude no mapa, em pixels
export const topPositions = [
    0, // 90N
    28, // 80N
    74, // 70N
    110, // 60N
    143, // 50N
    172, // 40N
    197, // 30N
    225, // 20N
    253, // 10N
    278, // 0N (linha do equador)
    304, // 10S
    332, // 20S
    360, // 30S
    386, // 40S
    414, // 50S
    447, // 60S
    483, // 70S
    530, // 80S
    554, // 90S
];

// Posições horizontais (left) para cada longitude no mapa, em pixels
export const leftPositions = [
    0, // -180
    44, // -160
    91, // -140
    138, // -120
    186, // -100
    233, // -80
    281, // -60
    329, // -40
    377, // -20
    425, // 0
    472, // 20
    520, // 40
    567, // 60
    615, // 80
    665, // 100
    711, // 120
    758, // 140
    806, // 160
    853, // 180
];

// Cria as linhas (latitudes) e os pontos (coordenadas) e coloca no mapa
function setDivs() {
    let index = 90; // latitude atual (ex: 90, 80, ..., -90)
    let indexSuplementar = 90; // auxiliar para formatar a string (ex: "30S")

    let longIndex = -180; // longitude inicial
    let latIndex = 90; // latitude inicial

    let contador = 1; // controla quando resetar a longitude
    let y = 0; // índice do array topPositions

    for (let i = 0; i < 19; i++) {
        const mapDiv = document.querySelector(".map");

        const divCoords = document.createElement("div");
        let strIndex = "";

        // Define se será N ou S
        strIndex = index < 0 ? "S" : "N";

        // Remove o N/S se a latitude for 0
        if (index == 0) {
            strIndex = "";
        }

        let indexFormatado = Math.abs(indexSuplementar) + strIndex;
        divCoords.classList.add(indexFormatado); // ex: class="30S"

        for (let x = 0; x < 19; x++) {
            const coords = document.createElement("div");

            // Atributos de coordenada para cada ponto
            coords.setAttribute("data-longitude", longIndex);
            coords.setAttribute("data-latitude", latIndex);

            // Define posição e estilo
            coords.style.position = "absolute";
            coords.classList.add("orange");

            divCoords.appendChild(coords);

            // Define posição vertical da linha
            setPositionLat(divCoords, y);

            // Define posição horizontal do ponto
            setPositionLong(coords, x);

            longIndex += 20;
            contador++;

            if (contador == 20) {
                longIndex = -180;
                contador = 1;
            }
        }

        mapDiv.appendChild(divCoords);

        // Prepara para próxima linha
        y++;
        index -= 10;
        latIndex -= 10;
        indexSuplementar -= 10;
    }

    // Chama funções auxiliares para posicionar navios, gerar cores, etc.
    setShipsPosition();
    getGreenPositions();
    getDivCoords();
}

setDivs(); // Executa a função principal ao carregar

// Define a posição vertical (top) da linha de latitude
function setPositionLat(divCoords, y) {
    divCoords.style.position = "absolute";
    divCoords.style.width = "100%";
    divCoords.style.height = "1px";
    divCoords.style.top = topPositions[y] + "px";
}

// Define a posição horizontal (left) de cada ponto de coordenada
function setPositionLong(coords, x) {
    coords.style.position = "absolute";
    coords.style.width = "1px";
    coords.style.height = "1px";
    coords.style.left = leftPositions[x] + "px";
}
