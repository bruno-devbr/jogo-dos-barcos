import { endGame_win, endGame_lose } from "./end-game.js"; // Importa funções que encerram o jogo

// Inputs de latitude e longitude
const latInput = document.querySelector("#latitude");
const latSelect = document.querySelector("#ns");

const longInput = document.querySelector("#longitude");
const longSelect = document.querySelector("#eo");

let divCoords; // Lista das divs com coordenadas no mapa

// Função chamada no início para armazenar as divs com as coordenadas
export function getDivCoords() {
    divCoords = document.querySelectorAll(".map div div");
}

// Função chamada ao clicar em "Jogar", pega os valores dos inputs
export function getCoords() {
    let lat = Number(latInput.value);
    let long = Number(longInput.value);

    // Se for hemisfério sul, latitude negativa
    if (latSelect.value == "S") {
        lat = -lat;
    }

    // Se for hemisfério oeste, longitude negativa
    if (longSelect.value == "O") {
        long = -long;
    }

    start(lat, long); // Inicia verificação da posição
}

// Verifica se há um navio (img) naquela coordenada
function verificaBarco(div) {
    const img = div.querySelector("img");
    return !!img;
}

const wanted = document.querySelector("#aviso"); // Campo de aviso

// Percorre todas as divs e compara as coordenadas
function start(lat, long) {
    divCoords.forEach((div) => {
        const divLat = div.getAttribute("data-latitude");
        const divLong = div.getAttribute("data-longitude");

        // Se latitude e longitude batem com a div atual
        if (divLat === String(lat) && divLong === String(long)) {
            const barco = verificaBarco(div);

            // Se existe um navio
            if (barco) {
                const corBarco = div.classList;

                // Se o navio for verde
                if (corBarco == "green") {
                    classGreen(div);
                    modal("verde");
                }

                // Se o navio for laranja
                else if (corBarco == "orange") {
                    classOrange(div);
                    modal("laranja");
                }
            } else {
                wanted.textContent = "clique em um barco";
            }
        }
    });
}

// Contador e texto dos navios verdes
const greenPointsText = document.querySelector("#pontosGreen");
export let greenPoints = 0;

// Marca navio como verde
function classGreen(div) {
    const img = div.querySelector("img");

    img.setAttribute("src", "");
    img.setAttribute("src", "./images/navio-green.png");

    greenPoints++;
    greenPointsText.textContent = greenPoints;

    endGame_win(); // Chama função de vitória
}

// Contador e texto dos navios laranjas
const orangePointsText = document.querySelector("#pontosOrange");
export let orangePoints = 0;

// Marca navio como laranja
function classOrange(div) {
    const img = div.querySelector("img");

    img.setAttribute("src", "");
    img.setAttribute("src", "./images/navio-orange.png");

    orangePoints++;
    orangePointsText.textContent = orangePoints;

    endGame_lose(); // Chama função de derrota
}

// Modal com informações do navio clicado
const modalDiv = document.querySelector(".modal");
const latText = document.querySelector("#longitudeText");
const longText = document.querySelector("#latitudeText");
const colorText = document.querySelector("#color");

// Preenche e exibe o modal
function modal(barco) {
    modalDiv.style.display = "block";
    latText.textContent =
        "longitude :" + longInput.value + "°" + longSelect.value;
    longText.textContent =
        "latitude: " + latInput.value + "°" + latSelect.value;
    colorText.textContent = "barco: " + barco;
}

// Botão de fechar o modal
const closeBtn = document.querySelector(".fechar");
closeBtn.addEventListener("click", () => {
    modalDiv.style.display = "none";
});
