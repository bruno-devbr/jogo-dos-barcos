import { greenPoints, orangePoints } from "./coordsGame-event.js";

// Se acertar 5 verdes, chama modal de vitória
export function endGame_win() {
    if (greenPoints == 5) {
        modal("Verde", "Parabéns", "Venceu!");
    }
}

// Se acertar 5 laranjas, chama modal de derrota
export function endGame_lose() {
    if (orangePoints == 5) {
        modal("Laranja", "Infelizmente", "Perdeu!");
    }
}

const modalDiv = document.querySelector(".modal div");
const textDiv = document.querySelector(".text");
const closeBtn = document.querySelector(".fechar");
const timeSpan = document.querySelector(".time");
const timeSpan_child = document.querySelector(".time span");

function modal(cor, status, resultado) {
    let i = 5;

    // Oculta botão de fechar e texto original
    closeBtn.style.display = "none";
    textDiv.style.display = "none";

    // Mostra contador regressivo
    timeSpan.style.display = "inline";
    timeSpan_child.textContent = i;

    // Texto final exibido no modal
    const textWin = document.createElement("p");
    textWin.textContent = `Você achou 5 barcos ${cor}, ${status} você ${resultado}`;
    modalDiv.appendChild(textWin);

    // Corrigido: usa setInterval e limpa com clearInterval
    const interval = setInterval(() => {
        i--;
        timeSpan_child.textContent = i;

        if (i < 0) {
            clearInterval(interval); // Impede que continue executando após reload
            location.reload();
        }
    }, 1000);
}
