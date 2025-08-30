const tabuleiro = document.getElementById('tabuleiro');
const botaoIniciar = document.getElementById('iniciar-jogo');
const somVitoria = document.getElementById('somVitoria');
const musicaFundo = document.getElementById('musicaFundo');
const somClique = document.getElementById('somClique');

let primeiraCarta = null;
let bloqueio = false;
let paresEncontrados = 0;
let totalPares = 0;

document.body.addEventListener('click', () => {
    tocarSomClique();
});

botaoIniciar.addEventListener('click', () => {
    const linhas = parseInt(document.getElementById('linhas').value);
    const colunas = parseInt(document.getElementById('colunas').value);
    iniciarJogo(linhas, colunas);
    musicaFundo.currentTime = 0;
    musicaFundo.play();
});

function iniciarJogo(linhas, colunas) {
    tabuleiro.innerHTML = '';
    tabuleiro.style.gridTemplateColumns = `repeat(${colunas}, 80px)`;
    tabuleiro.style.gridTemplateRows = `repeat(${linhas}, 100px)`;
    const numCartas = linhas * colunas;
    if (numCartas % 2 !== 0) {
        alert('O número de cartas deve ser par!');
        return;
    }
    const valores = [];
    for (let i = 1; i <= numCartas / 2; i++) {
        valores.push(i, i);
    }
    valores.sort(() => Math.random() - 0.5);
    paresEncontrados = 0;
    totalPares = numCartas / 2;
    valores.forEach(valor => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.valor = valor;
        carta.textContent = valor;
        carta.addEventListener('click', () => virarCarta(carta));
        tabuleiro.appendChild(carta);
    });
}

function tocarSomClique() {
    somClique.currentTime = 0;
    somClique.play().catch(() => {});
}

function virarCarta(carta) {
    if (bloqueio || carta.classList.contains('virada') || carta.classList.contains('encontrada')) {
        return;
    }
    carta.classList.add('virada');
    if (!primeiraCarta) {
        primeiraCarta = carta;
    } else {
        if (primeiraCarta.dataset.valor === carta.dataset.valor) {
            primeiraCarta.classList.add('encontrada');
            carta.classList.add('encontrada');
            primeiraCarta = null;
            paresEncontrados++;
            if (paresEncontrados === totalPares) {
                setTimeout(() => {
                    musicaFundo.pause();
                    somVitoria.play();
                    alert('🎉 Você venceu!');
                }, 300);
            }
        } else {
            bloqueio = true;
            primeiraCarta.classList.add('nao-combinou');
            carta.classList.add('nao-combinou');
            setTimeout(() => {
                primeiraCarta.classList.remove('virada', 'nao-combinou');
                carta.classList.remove('virada', 'nao-combinou');
                primeiraCarta = null;
                bloqueio = false;
            }, 800);
        }
    }
}