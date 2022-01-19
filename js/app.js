const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();

    //VALIDAR FORMULARIO
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        //MSJ ERROR
        mostrarError('Ambos campos son obligatorios');

        return;
    }

    //CONSULTAR API
    consultarApi(ciudad, pais);
}

function mostrarError(msj) {

    //CREAR ALERTA
    const alerta = document.querySelector('.bg-red-100');

    if (!alerta) {
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
    <strong class= "font-bold">Error!</strong>
    <span class= "block">${msj}</span>
    `;

        container.appendChild(alerta);

        //ELIMINAR ALERTA

        setTimeout(() => {
            alerta.remove();

        }, 5000);
    }
}

function consultarApi(ciudad, pais) {

    const appId = 'd955c0c764567d38aae3fc16b5d0a6d0';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    spinner(); //SPINNER DE CARGA

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML(); //LIMPIAR HTML PREVIAMENTE
            if (datos.cod === "404") {
                mostrarError('Ciudad no encontrada')
                return;
            }
            console.log(datos)
            //IMPRIME RESPUESTA 
            mostrarClima(datos);
        })
}

function mostrarClima(datos) {
    const { name, main: { temp, temp_max, temp_min } } = datos;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const tActual = document.createElement('p');
    tActual.innerHTML = `${centigrados} &#8451`;
    tActual.classList.add('font-bold', 'text-6xl');

    const tMax = document.createElement('p');
    tMax.innerHTML = ` Max: ${max} &#8451`;
    tMax.classList.add('text-xl');

    const tMin = document.createElement('p');
    tMin.innerHTML = ` Min: ${min} &#8451`;
    tMin.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(tActual);
    resultadoDiv.appendChild(tMax);
    resultadoDiv.appendChild(tMin);

    resultado.appendChild(resultadoDiv);

}

const kelvinACentigrados = grados => parseInt(grados - 273.15);

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner() {

    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
`;
    resultado.appendChild(divSpinner);
}
