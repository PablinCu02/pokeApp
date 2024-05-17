const imgPoke2 = document.querySelector('#poke2');
const namePoke2 = document.querySelector('#nombrePoke-rival');
const poke2Tipo = document.querySelector('#tipoRival');
const poke2Ataque = document.querySelector('#ataqueRival');

const imgPoke = document.querySelector('#poke');

const namePoke= document.querySelector('#nombrePoke-propio');
const pokeTipo= document.querySelector('#tipoPropio');
const pokeAtaque = document.querySelector('#ataquePropio');
const btnPelear =document.querySelector('#btn-combate');

const input=document.querySelector('#input');
const btnElegir=document.querySelector('#btn-poke');



const getNumRandom = () => {
    let min = Math.ceil(0);
    let max = Math.floor(1001);

    return Math.floor(Math.random() * (max - min) + min);
  }

  const obtenerPokePropio = () => {
    const num = parseInt(input.value); // Obtener el valor del input y convertirlo a entero

    // Verificar si el valor es un número y está dentro del rango permitido (1-1000)
    if (!isNaN(num) && num >= 1 && num <= 1000) {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`)
            .then((res) => {
                console.log(res);
                return res.data;
            })
            .then((res) => {
                console.log(res);
                imgPoke.src = res.sprites.back_default;
                pokeTipo.innerHTML = res.types[0].type.name;
                namePoke.innerHTML = res.name;
                pokeAtaque.innerHTML = res.stats[0].base_stat;
            });
    } else {
        // Mostrar mensaje de error si el valor no es válido
        alert("Por favor ingresa un número válido entre 1 y 1000.");
        // También podrías limpiar el input aquí si lo consideras necesario
        input.value = "";
    }
};


const obtenerPokeRival = () =>{

    const numPokeRival = getNumRandom();

    axios.get(`https://pokeapi.co/api/v2/pokemon/${numPokeRival}`).then((res)=>{
        console.log(res);
        return res.data
    }).then((res)=>{
        console.log(res);
        imgPoke2.src = res.sprites.front_default;
        poke2Tipo.innerHTML = res.types[0].type.name;
        namePoke2.innerHTML = res.name;
        poke2Ataque.innerHTML = res.stats[0].base_stat;
    })

    console.log(imgPoke2);
}

const combate = () => {
    const ataqueRival = parseInt(poke2Ataque.textContent);
    const ataquePropio = parseInt(pokeAtaque.textContent);
    if (ataquePropio > ataqueRival) {
        alert("¡Ganaste el enfrentamiento!");
    } else if (ataqueRival > ataquePropio) {
        alert("¡Perdiste el enfrentamiento!");
    } else {
        alert("¡Es un empate!");
    }
};



window.addEventListener('load', obtenerPokeRival);
btnElegir.addEventListener('click', obtenerPokePropio);
btnPelear.addEventListener('click', combate);




