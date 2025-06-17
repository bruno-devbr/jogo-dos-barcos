import { topPositions, leftPositions } from "./createCoords.js"; // Importa arrays com posições em px das coordenadas
import { getCoords } from "./coordsGame-event.js"; // Importa função que trata o clique no botão "Jogar"

// Seletores dos campos de latitude e seus valores iniciais
const latInput = document.querySelector("#latitude");
const latSelect = document.querySelector("#ns");
latInput.value = "0";
latSelect.value = "N";

// Elemento da linha de latitude no mapa e aviso de erro
const latDiv = document.querySelector(".latitude");
const wanted = document.querySelector("#aviso");

// Função que posiciona a linha de latitude com base no input do usuário
function setLatDivPosition() {
    let lat = String(latInput.value) + String(latSelect.value); // Ex: "30N"

    let contadorLat = 90; // Começa do 90°N
    let letraLat = "N";

    for (let i = 0; i < topPositions.length; i++) {
        let valueLat = contadorLat + letraLat;

        // Quando a latitude bate com a da iteração, aplica a posição correspondente
        if (lat == valueLat) {
            latDiv.style.top = topPositions[i] + "px";
        }

        // Tratamento especial para o 0S (linha do Equador sul)
        if (lat == "0S") {
            latDiv.style.top = topPositions[9] + "px";
        }

        // Atualiza o hemisfério conforme o índice (a partir de 9 troca pra sul)
        if (i >= 9) {
            letraLat = "S";
            contadorLat += 10;
        } else {
            contadorLat -= 10;
        }

        // Limpa qualquer aviso de erro
        wanted.textContent = "";
    }

    // Atualiza o texto exibido ao usuário com a latitude formatada
    const latSpan = document.querySelector("#lat1");
    latSpan.textContent = latInput.value + "°" + latSelect.value;

    // Caso seja 0, mostra "0°" sem hemisfério
    if (latInput.value == "0") {
        latSpan.textContent = "0°";
    }
}

// Seletores dos campos de longitude e seus valores iniciais
const longInput = document.querySelector("#longitude");
const longSelect = document.querySelector("#eo");
longInput.value = "0";
longSelect.value = "O";

// Elemento da linha de longitude no mapa
const longDiv = document.querySelector(".longitude");

// Função que posiciona a linha de longitude com base no input do usuário
function setLongDivPosition() {
    let long = String(longInput.value) + String(longSelect.value); // Ex: "60E"

    let contadorLong = 180; // Começa do 180°O
    let letraLong = "O";

    for (let i = 0; i < leftPositions.length; i++) {
        let valueLong = contadorLong + letraLong;

        // Quando bate com a longitude atual, aplica a posição em px
        if (long == valueLong) {
            longDiv.style.left = leftPositions[i] + "px";
        }

        // Tratamento para 0E (Meridiano de Greenwich)
        if (long == "0E") {
            longDiv.style.left = leftPositions[9] + "px";
        }

        // Troca hemisfério de Oeste para Leste a partir do índice 9
        if (i >= 9) {
            letraLong = "E";
            contadorLong += 20;
        } else {
            contadorLong -= 20;
        }

        // Limpa o aviso de erro
        wanted.textContent = "";
    }

    // Atualiza o texto exibido ao usuário com a longitude formatada
    const longSpan = document.querySelector("#lon1");
    longSpan.textContent = longInput.value + "°" + longSelect.value;

    // Caso seja 0, mostra "0°" sem hemisfério
    if (longInput.value == "0") {
        longSpan.textContent = "0°";
    }
}

// Eventos para atualizar a posição das linhas conforme o usuário digita ou muda o select
latInput.addEventListener("input", setLatDivPosition);
longInput.addEventListener("input", setLongDivPosition);

latSelect.addEventListener("change", setLatDivPosition);
longSelect.addEventListener("change", setLongDivPosition);

// Botão "Jogar" que dispara verificação de coordenadas
const jogarBtn = document.querySelector("#btnJogar");
jogarBtn.addEventListener("click", getCoords);
