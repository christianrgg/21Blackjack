let deck = [];
const tipos = [`C`,`H`,`D`,`S`];
const especiales = [`A`,`J`,`Q`,`K`];
const btnPedir = document.querySelector(`#btnPedir`);
const btnDetener = document.querySelector(`#btnDetener`);
const btnNuevo = document.querySelector(`#btnNuevo`);
const btnApostar = document.querySelector(`#btnApostar`);



const divJugadorCartas = document.querySelector(`#jugador-cartas`);
const divCartasComputadora = document.querySelector(`#computador-cartas`);
const apuestaEnMesa = document.querySelectorAll(`h2`)
const efectivo = document.querySelectorAll(`span`);

let puntosJugador = 0;
let puntosComputadora = 0;
let puntosHTML = document.querySelectorAll(`h2`);
let apuesta = 0;
let banco = 500;


//Esta función hace una nueva baraja
const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }
    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
            }
        }
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}
crearDeck();

//Esta función me permite tomar una carta
const pedirCarta = () => {
    if (deck.length ===0) {
        throw `No hay cartas en el deck`;
    }
    const carta = deck.pop();
    return carta;
}
pedirCarta();

//Esta función me da el valor de la carta
const valorCarta = (carta) => {
    const valor = carta.substring (0, carta.length - 1);
    return (isNaN(valor))?
        (valor === `A`) ? 10 : 11 
        : valor * 1;
}
const valor = valorCarta(pedirCarta());

//Función turno computadora
const turnoComputadora = (puntosMinimo) => {
    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[0].innerText = puntosComputadora;

        const imgCarta = document.createElement(`img`);
        imgCarta.src = `Assets/cartas/${carta}.png`;
        imgCarta.classList.add(`circle_2_img`);
        divCartasComputadora.append(imgCarta);

        if(puntosMinimo>21) {
            break
        }

    } while ((puntosComputadora < puntosMinimo) && (puntosMinimo <=21)) 
    setTimeout(()=>{
        if(puntosComputadora === puntosMinimo) {
                banco = banco + apuesta;
                apuesta = 0;
                efectivo[0].innerText = `Efectivo disponible: $${banco}.00`;
                apuestaEnMesa[3].innerText = `Apuesta $${apuesta}.00`;
                btnPedir.disabled = true;
                btnDetener.disabled = true;
                alert(`Nadie gana`);
            } else if (puntosMinimo > 21) {
                apuesta = 0;
                efectivo[0].innerText = `Efectivo disponible: $${banco}.00`;
                apuestaEnMesa[3].innerText = `Apuesta $${apuesta}.00`;
                btnPedir.disabled = true;
                btnDetener.disabled = true;
                alert(`Computadora Gana`)
            } else if (puntosComputadora>21){
                banco = banco + (apuesta*2);
                apuesta = 0;
                efectivo[0].innerText = `Efectivo disponible: $${banco}.00`;
                apuestaEnMesa[3].innerText = `Apuesta $${apuesta}.00`;
                btnPedir.disabled = true;
                btnDetener.disabled = true;
                alert(`Jugador Gana`)
            } else if (puntosComputadora>puntosMinimo && puntosComputadora<=21) {
                apuesta = 0;
                efectivo[0].innerText = `Efectivo disponible: $${banco}.00`;
                apuestaEnMesa[3].innerText = `Apuesta $${apuesta}.00`;
                btnPedir.disabled = true;
                btnDetener.disabled = true;
                alert(`Computadora Gana`)
            }
    },50);
}

// Eventos
btnPedir.addEventListener(`click`,() =>{
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[2].innerText = puntosJugador;

    const imgCarta = document.createElement(`img`);
    imgCarta.src = `Assets/cartas/${carta}.png`;
    imgCarta.classList.add(`circle_2_img`);
    divJugadorCartas.append(imgCarta);

    if (puntosJugador>21) {
        console.warn(`Perdiste`);
        btnPedir.disable = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21 ){
        console.warn(`21 Genial`);
        btnPedir.disable = true;
        turnoComputadora(puntosJugador);
    }
    btnApostar.disabled = true;
});

btnDetener.addEventListener(`click`,() =>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener(`click`,() =>{
    console.clear();
    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[2].innerText = 0;
    divCartasComputadora.innerHTML = ``;
    divJugadorCartas.innerHTML = ``;
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    btnApostar.disabled = false;
})

btnApostar.addEventListener(`click`,()=>{
    banco = banco - 100;
    efectivo[0].innerText = `Efectivo disponible: $${banco}.00`
    apuesta = apuesta + 100;
    apuestaEnMesa[3].innerText = `Apuesta $${apuesta}.00`
    
})
