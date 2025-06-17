import { positions } from "./setShips.js"; // Importa os índices onde os navios estão posicionados

let min = 1; // valor mínimo para sortear (inclusive)
let max = 21; // valor máximo (exclusive)

let green = []; // array com os índices sorteados
const numerosSet = new Set(); // garante que os números sorteados sejam únicos

// Função que escolhe 5 posições aleatórias de navios para mudar a cor para verde
export function getGreenPositions() {
    const divCoords = document.querySelectorAll(".map div div"); // seleciona todos os pontos do mapa

    // Sorteia 5 números únicos entre min e max
    while (green.length < 5) {
        const numeros = Math.floor(Math.random() * max) + min;
        numerosSet.add(numeros); // adiciona ao Set (evita repetidos)
        green = [...numerosSet]; // atualiza o array com os valores únicos
    }

    // Para cada número sorteado, aplica a classe "green" e remove a "orange"
    for (let i = 0; i < green.length; i++) {
        divCoords[positions[green[i]]].classList.add("green");
        divCoords[positions[green[i]]].classList.remove("orange");
    }
}
